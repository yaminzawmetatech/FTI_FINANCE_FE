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

const selected = new Set(config.modules || []);
const dependencies = {
  administration: [],
  "credit-management": [],
  "loan-operation": ["administration", "credit-management"],
  collection: ["administration", "credit-management", "loan-operation"],
  finance: ["administration", "loan-operation"],
};

const addDependencies = (moduleId) => {
  for (const dependency of dependencies[moduleId] || []) {
    selected.add(dependency);
    addDependencies(dependency);
  }
};

for (const moduleId of [...selected]) addDependencies(moduleId);

for (const moduleId of Object.keys(dependencies)) {
  if (!selected.has(moduleId)) {
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
      const importsRemovedModule = /^import/.test(declarationText)
        ? false
        : [...selectedModules].every(
            (selectedModule) =>
              !declarationText.includes(`modules/${selectedModule}/`)
          );
      if (
        declarationText.match(/modules\/([^/"']+)/) &&
        !importsRemovedModule &&
        !declarationText.includes(`modules/`)
      ) {
        declarationPath.remove();
        return;
      }

      if (declarationText.includes("modules/")) {
        const ownerMatches = [...declarationText.matchAll(/modules\/([^/"']+)/g)];
        const removed = ownerMatches.some(
          ([, owner]) => !selectedModules.has(owner)
        );
        if (removed && declarationPath.node.id.type === "Identifier") {
          absentNames.add(declarationPath.node.id.name);
          declarationPath.remove();
        }
      }
    },
  });

  const removeUnavailableRouteObjects = (elements) =>
    elements.filter((element) => {
      if (!element) return false;
      const text = generate(element).code;
      for (const absentName of absentNames) {
        if (
          text.includes(`<${absentName}`) ||
          text.includes(`<${absentName}>`) ||
          text.includes(`${absentName} }`)
        ) {
          return false;
        }
      }
      return true;
    });

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

for (const moduleId of [...selected]) {
  pruneGeneratedRouteFile(
    path.join(output, "src", "modules", moduleId, "routes", "index.js"),
    selected
  );
}

const moduleEnv = [...selected].join(",");
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
  modules: [...selected],
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
      `export const moduleRegistry = ${JSON.stringify(
        Object.fromEntries([...selected].map((moduleId) => [moduleId, moduleId])),
        null,
        2
      )};\n\n` +
      `export const getEnabledModuleIds = () => ${JSON.stringify([...selected])};\n`
  );
}

const routeComposerPath = path.join(output, "src", "app", "router", "index.js");
if (fs.existsSync(routeComposerPath)) {
  const imports = [...selected]
    .map(
      (moduleId) =>
        `import { MainLayoutRoutes as ${moduleId.replace(/-/g, "_")}MainLayoutRoutes, StandaloneRoutes as ${moduleId.replace(/-/g, "_")}StandaloneRoutes } from "modules/${moduleId}/routes";`
    )
    .join("\n");
  const expressions = [...selected]
    .map(
      (moduleId) =>
        `  ...${moduleId.replace(/-/g, "_")}MainLayoutRoutes,\n  ...${moduleId.replace(/-/g, "_")}StandaloneRoutes`
    )
    .join(",\n");
  fs.writeFileSync(
    routeComposerPath,
    `import React from "react";\nimport MainLayout from "layout/MainLayout";\n${imports}\n\n` +
      `export const buildApplicationRoutes = (loginRoutes) => [\n` +
      `  {\n    path: "/",\n    element: <MainLayout />,\n    children: [\n${expressions}\n    ],\n  },\n` +
      `  ...loginRoutes,\n];\n`
  );
}

const menuIndexPath = path.join(output, "src", "menu-items", "index.js");
if (fs.existsSync(menuIndexPath)) {
  const navigationImports = [...selected]
    .map(
      (moduleId) =>
        `import ${moduleId.replace(/-/g, "_")}Navigation from "modules/${moduleId}/navigation";`
    )
    .join("\n");
  const children = [...selected]
    .map((moduleId) => `  ...${moduleId.replace(/-/g, "_")}Navigation`)
    .join(",\n");
  fs.writeFileSync(
    menuIndexPath,
    `import dashboard from "./dashboard";\n${navigationImports}\n\n` +
      `const menuItems = {\n  items: [{\n    ...dashboard,\n    children: [\n${children}\n    ],\n  }],\n};\n\nexport default menuItems;\n`
  );
}

const reducerRegistryPath = path.join(output, "src", "store", "reducers", "reducerRegistry.js");
if (fs.existsSync(reducerRegistryPath)) {
  const imports = [...selected]
    .map(
      (moduleId) =>
        `import ${moduleId.replace(/-/g, "_")}Reducers from "modules/${moduleId}/reducerMap";`
    )
    .join("\n");
  const assignments = [...selected]
    .map((moduleId) => `  Object.assign(reducerMap, ${moduleId.replace(/-/g, "_")}Reducers);`)
    .join("\n");
  fs.writeFileSync(
    reducerRegistryPath,
    `import { combineReducers } from "redux";\n${imports}\n\nexport const getEnabledReducerMap = () => {\n  const reducerMap = {};\n${assignments}\n  return combineReducers(reducerMap);\n};\n`
  );
}

console.log(`Created customer source package at ${output}`);
