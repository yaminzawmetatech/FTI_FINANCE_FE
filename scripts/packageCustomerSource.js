const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const getArg = (name) => {
  const separateIndex = args.indexOf(`--${name}`);
  if (separateIndex >= 0) return args[separateIndex + 1];
  const inline = args.find((arg) => arg.startsWith(`--${name}=`));
  return inline ? inline.slice(`--${name}=`.length) : undefined;
};

const configPath = getArg("config");
const outputArg = getArg("output");

if (!configPath) {
  throw new Error("Usage: npm run package:source -- --config=config/customers/customer-a.json [--output=dist/customer-a]");
}

const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
const output = path.resolve(outputArg || `dist/${config.id || "customer-package"}`);

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });

const copyRootEntries = ["public", "package.json", "package-lock.json", "jsconfig.json", ".env"];
for (const entry of copyRootEntries) {
  if (!fs.existsSync(entry)) continue;
  fs.cpSync(entry, path.join(output, entry), { recursive: true });
}

fs.cpSync("src", path.join(output, "src"), { recursive: true });

const purchased = new Set(config.modules || []);
const selected = new Set(purchased);
const dependencies = {
  administration: [],
  "credit-management": [],
  "loan-operation": ["administration", "credit-management"],
  collection: ["administration", "credit-management", "loan-operation"],
  finance: ["administration", "loan-operation"],
};
const sourceDependencies = {
  administration: [
    "credit-management",
    "collection",
    "finance",
    "loan-operation",
  ],
  "credit-management": [
    "administration",
    "collection",
    "finance",
    "loan-operation",
  ],
};

const addDependencies = (moduleId) => {
  if (!dependencies[moduleId]) {
    throw new Error(`Unknown module "${moduleId}" in customer configuration.`);
  }
  for (const dependency of dependencies[moduleId] || []) {
    selected.add(dependency);
    addDependencies(dependency);
  }
};

for (const moduleId of [...selected]) addDependencies(moduleId);

const sourceModules = new Set(selected);
for (const moduleId of selected) {
  for (const dependency of sourceDependencies[moduleId] || []) {
    sourceModules.add(dependency);
  }
}

for (const moduleId of Object.keys(dependencies)) {
  if (!sourceModules.has(moduleId)) {
    fs.rmSync(path.join(output, "src", "modules", moduleId), {
      recursive: true,
      force: true,
    });
  }
}

const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;

const pruneGeneratedRouteFile = (routeFile, selectedModules) => {
  if (!fs.existsSync(routeFile)) return;
  const ast = parser.parse(fs.readFileSync(routeFile, "utf8"), {
    sourceType: "module",
    plugins: ["jsx"],
  });

  const absentNames = new Set();

  traverse(ast, {
    ImportDeclaration(importPath) {
      const source = importPath.node.source.value;
      if (/^modules\/([^/]+)/.test(source)) {
        const owner = source.match(/^modules\/([^/]+)/)[1];
        if (!selectedModules.has(owner)) {
          importPath.node.specifiers.forEach((specifier) =>
            absentNames.add(specifier.local.name)
          );
          importPath.remove();
        }
      }
    },
  });

  traverse(ast, {
    VariableDeclarator(declarationPath) {
      const declarationText = generate(declarationPath.node).code;
      const ownerMatches = [...declarationText.matchAll(/modules\/([^/"']+)/g)];
      const importsRemovedModule = ownerMatches.some(
        ([, owner]) => !selectedModules.has(owner)
      );
      if (
        importsRemovedModule &&
        declarationPath.node.id.type === "Identifier"
      ) {
        absentNames.add(declarationPath.node.id.name);
        declarationPath.remove();
      }
    },
  });

  const containsUnavailableComponent = (node) => {
    if (!node || typeof node !== "object") return false;
    if (Array.isArray(node)) {
      return node.some(containsUnavailableComponent);
    }

    if (node.type === "JSXOpeningElement") {
      const name = node.name;
      const componentName =
        name.type === "JSXIdentifier"
          ? name.name
          : name.type === "JSXMemberExpression" &&
              name.object.type === "JSXIdentifier"
            ? name.object.name
            : null;
      if (componentName && absentNames.has(componentName)) return true;
    }

    return Object.keys(node)
      .filter(
        (key) =>
          key !== "loc" &&
          key !== "start" &&
          key !== "end" &&
          key !== "extra" &&
          key !== "comments" &&
          key !== "leadingComments" &&
          key !== "innerComments" &&
          key !== "trailingComments"
      )
      .some((key) => containsUnavailableComponent(node[key]));
  };

  const getObjectProperty = (node, name) =>
    node.properties.find(
      (property) =>
        property.type === "ObjectProperty" &&
        ((property.key.type === "Identifier" && property.key.name === name) ||
          property.key.value === name)
    );

  const removeUnavailableRouteObjects = (elements) => {
    const availableElements = [];
    for (const element of elements) {
      if (!element) continue;
      if (element.type !== "ObjectExpression") {
        if (!containsUnavailableComponent(element)) {
          availableElements.push(element);
        }
        continue;
      }

      const childrenProperty = getObjectProperty(element, "children");
      if (childrenProperty?.value.type === "ArrayExpression") {
        const children = childrenProperty.value.elements;
        const originalLength = children.length;
        childrenProperty.value.elements =
          removeUnavailableRouteObjects(children);
        if (originalLength > 0 && childrenProperty.value.elements.length === 0) {
          continue;
        }
      }

      const routeElement = getObjectProperty(element, "element");
      if (routeElement && containsUnavailableComponent(routeElement.value)) {
        continue;
      }

      availableElements.push(element);
    }
    return availableElements;
  };

  traverse(ast, {
    VariableDeclarator(declarationPath) {
      const name = declarationPath.node.id?.name;
      if (
        name !== "MainLayoutRoutes" &&
        name !== "StandaloneRoutes"
      ) {
        return;
      }

      if (declarationPath.node.init?.type === "ArrayExpression") {
        declarationPath.node.init.elements =
          removeUnavailableRouteObjects(declarationPath.node.init.elements);
      }
    },
  });

  fs.writeFileSync(routeFile, generate(ast).code);
};

for (const moduleId of [...purchased]) {
  pruneGeneratedRouteFile(
    path.join(output, "src", "modules", moduleId, "routes", "index.js"),
    purchased
  );
}

const moduleEnv = [...purchased].join(",");
const envPath = path.join(output, ".env");
const existingEnv = fs.existsSync(envPath)
  ? fs.readFileSync(envPath, "utf8")
  : "";
fs.writeFileSync(
  envPath,
  `${existingEnv.replace(/^REACT_APP_ENABLED_MODULES=.*$/m, "").trimEnd()}${existingEnv.trim() ? "\n" : ""}REACT_APP_ENABLED_MODULES=${moduleEnv}\n`
);

const manifest = {
  id: config.id,
  name: config.name,
  modules: [...purchased],
  dependencies: [...selected].filter((moduleId) => !purchased.has(moduleId)),
};
fs.writeFileSync(
  path.join(output, "customer-package.json"),
  `${JSON.stringify(manifest, null, 2)}\n`
);

const registryPath = path.join(output, "src", "app", "config", "moduleRegistry.js");
if (fs.existsSync(registryPath)) {
  fs.writeFileSync(
    registryPath,
    `export const moduleDependencies = ${JSON.stringify(dependencies, null, 2)};\n\n` +
      `export const moduleSourceDependencies = ${JSON.stringify(sourceDependencies, null, 2)};\n\n` +
      `export const moduleRegistry = ${JSON.stringify(
        Object.fromEntries([...selected].map((moduleId) => [moduleId, moduleId])),
        null,
        2
      )};\n\n` +
      `export const getEnabledModuleIds = () => ${JSON.stringify([...selected])};\n\n` +
      `export const getPurchasedModuleIds = () => ${JSON.stringify([...purchased])};\n\n` +
      `export const getSourceModuleIds = () => ${JSON.stringify([...sourceModules])};\n`
  );
}

const routeComposerPath = path.join(output, "src", "app", "router", "index.js");
if (fs.existsSync(routeComposerPath)) {
  const imports = [...purchased]
    .map(
      (moduleId) =>
        `import { MainLayoutRoutes as ${moduleId.replace(/-/g, "_")}MainLayoutRoutes, StandaloneRoutes as ${moduleId.replace(/-/g, "_")}StandaloneRoutes } from "modules/${moduleId}/routes";`
    )
    .join("\n");
  const mainLayoutRoutes = [...purchased]
    .map(
      (moduleId) =>
        `      ...${moduleId.replace(/-/g, "_")}MainLayoutRoutes`
    )
    .join(",\n");
  const standaloneRoutes = [...purchased]
    .map(
      (moduleId) =>
        `  ...${moduleId.replace(/-/g, "_")}StandaloneRoutes`
    )
    .join(",\n");
  fs.writeFileSync(
    routeComposerPath,
    `import React from "react";\nimport MainLayout from "layout/MainLayout";\n${imports}\n\n` +
      `export const buildApplicationRoutes = async (loginRoutes) => [\n` +
      `  {\n    path: "/",\n    element: <MainLayout />,\n    children: [\n${mainLayoutRoutes}\n    ],\n  },\n` +
      `${standaloneRoutes ? `${standaloneRoutes},\n` : ""}` +
      `  ...loginRoutes,\n];\n`
  );
}

const menuIndexPath = path.join(output, "src", "menu-items", "index.js");
if (fs.existsSync(menuIndexPath)) {
  const navigationImports = [...purchased]
    .map(
      (moduleId) =>
        `import ${moduleId.replace(/-/g, "_")}Navigation from "modules/${moduleId}/navigation";`
    )
    .join("\n");
  const children = [...purchased]
    .map((moduleId) => `  ...${moduleId.replace(/-/g, "_")}Navigation`)
    .join(",\n");
  fs.writeFileSync(
    menuIndexPath,
    `import dashboard from "./dashboard";\n` +
      `import filterNavigationForModules from "./filterNavigationForModules";\n` +
      `import { getPurchasedModuleIds } from "../app/config/moduleRegistry";\n` +
      `${navigationImports}\n\n` +
      `const purchasedModules = getPurchasedModuleIds();\n` +
      `const children = filterNavigationForModules([\n${children}\n], purchasedModules);\n\n` +
      `const menuItems = {\n  items: [{\n    ...dashboard,\n    children,\n  }],\n};\n\nexport default menuItems;\n`
  );
}

const reducerRegistryPath = path.join(output, "src", "store", "reducers", "reducerRegistry.js");
if (fs.existsSync(reducerRegistryPath)) {
  const imports = [...sourceModules]
    .map(
      (moduleId) =>
        `import ${moduleId.replace(/-/g, "_")}Reducers from "modules/${moduleId}/reducerMap";`
    )
    .join("\n");
  const assignments = [...sourceModules]
    .map((moduleId) => `  Object.assign(reducerMap, ${moduleId.replace(/-/g, "_")}Reducers);`)
    .join("\n");
  fs.writeFileSync(
    reducerRegistryPath,
    `${imports}\n\nexport const getEnabledReducerMap = () => {\n  const reducerMap = {};\n${assignments}\n  return reducerMap;\n};\n`
  );
}

const searchProviderDirectory = path.join(
  output,
  "src",
  "components",
  "form",
  "searchProviders"
);
const searchProviderFiles = {
  administration: "administration",
  "credit-management": "creditManagement",
  "loan-operation": "loanOperation",
  collection: "collection",
  finance: "finance",
};

for (const [moduleId, providerFile] of Object.entries(searchProviderFiles)) {
  if (!purchased.has(moduleId)) {
    fs.rmSync(path.join(searchProviderDirectory, `${providerFile}.js`), {
      force: true,
    });
  }
}

const searchProviderImports = [...purchased]
  .map(
    (moduleId) =>
      `import ${moduleId.replace(/-/g, "_")}SearchProvider from "./${searchProviderFiles[moduleId]}";`
  )
  .join("\n");
const searchProviderEntries = [...purchased]
  .map(
    (moduleId) =>
      `  "${moduleId}": ${moduleId.replace(/-/g, "_")}SearchProvider`
  )
  .join(",\n");
fs.writeFileSync(
  path.join(searchProviderDirectory, "index.js"),
  `import { buildAdvancedSearchProviderRegistry } from "./createRegistry";\n` +
    `${searchProviderImports}\n\n` +
    `const searchProviders = {\n${searchProviderEntries}\n};\n\n` +
    `export const createAdvancedSearchProviderRegistry = () =>\n` +
    `  buildAdvancedSearchProviderRegistry(searchProviders);\n`
);

console.log(`Created customer source package at ${output}`);
