const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;

const sourcePath = "src/routes/MainRoutes.js";
const source = fs.readFileSync(sourcePath, "utf8");
const ast = parser.parse(source, {
  sourceType: "module",
  plugins: ["jsx"],
});

let routeArray;
traverse(ast, {
  VariableDeclarator(route) {
    if (route.node.id && route.node.id.name === "MainRoutes") {
      routeArray = route.node.init;
    }
  },
});

if (!routeArray || routeArray.type !== "ArrayExpression") {
  throw new Error("Could not locate MainRoutes ArrayExpression.");
}

const moduleIds = [
  "administration",
  "credit-management",
  "loan-operation",
  "collection",
  "finance",
];

const moduleRoutes = Object.fromEntries(moduleIds.map((id) => [id, []]));
const moduleStandaloneRoutes = Object.fromEntries(moduleIds.map((id) => [id, []]));

const textFromNode = (node) => generate(node).code;

const classifyText = (text) => {
  if (/path:\s*"administration"|\/administration|Administration\b|DepartmentListing|PermissionSets|UserGroup/.test(text)) return "administration";
  if (/CreditManagement|SurveyNameSetup|CustomerList|CreditCriteria|customer-inquiries/.test(text)) return "credit-management";
  if (/LoanOperationModule|StampDuty|Insurance\/|BookingProcess|Disbursement-Payment|CashDepositProcess|RequestForDisbursement|PrepareForContract|KPaySync|WaveMoney|VehicleInfo/.test(text)) return "loan-operation";
  if (/collection-module|CollectionModule|write-off|insufficient-payment|KPayRepayment|RepaymentCreate|AppliedSettlement|AllocatedReminder/.test(text)) return "collection";
  if (/\/finance\b|eom-bom/.test(text)) return "finance";
  return null;
};

const getObjectProperty = (object, name) => {
  if (object.type !== "ObjectExpression") return null;
  const property = object.properties.find(
    (item) =>
      item.type === "ObjectProperty" &&
      ((item.key.type === "Identifier" && item.key.name === name) ||
        (item.key.type === "StringLiteral" && item.key.value === name))
  );
  return property ? property.value : null;
};

const getChildren = (object) => {
  const value = getObjectProperty(object, "children");
  return value && value.type === "ArrayExpression" ? value.elements.filter(Boolean) : [];
};

const getElementText = (object) => textFromNode(object);

for (const topLevel of routeArray.elements.filter(Boolean)) {
  if (topLevel.type !== "ObjectExpression") continue;
  const children = getChildren(topLevel);
  const topText = getElementText(topLevel);

  if (topText.includes("<MainLayout")) {
    for (const child of children) {
      if (child.type !== "ObjectExpression") continue;
      const childText = getElementText(child);
      const moduleId = classifyText(childText);
      if (moduleId) moduleRoutes[moduleId].push(child);
    }
  } else {
    for (const child of children) {
      if (child.type !== "ObjectExpression") continue;
      const childText = getElementText(child);
      const moduleId = classifyText(childText);
      if (moduleId) moduleStandaloneRoutes[moduleId].push(child);
    }
  }
}

const declarations = new Map();
traverse(ast, {
  VariableDeclarator(path) {
    if (path.node.id.type === "Identifier") {
      declarations.set(path.node.id.name, generate(path.parentPath.node).code);
    }
  },
});

const directImports = ast.program.body.filter((node) => node.type === "ImportDeclaration");

for (const moduleId of moduleIds) {
  const mainNodes = moduleRoutes[moduleId];
  const standaloneNodes = moduleStandaloneRoutes[moduleId];
  if (!mainNodes.length && !standaloneNodes.length) continue;

  const names = new Set();
  const scanNames = (node) => {
    const text = textFromNode(node);
    for (const match of text.matchAll(/<([A-Z][A-Za-z0-9]*)/g)) {
      names.add(match[1]);
    }
  };
  [...mainNodes, ...standaloneNodes].forEach(scanNames);

  const importDeclarations = [];
  for (const importNode of directImports) {
    const relevant = importNode.specifiers.some((specifier) => {
      const localName = specifier.local && specifier.local.name;
      return names.has(localName);
    });
    if (relevant) {
      let importText = generate(importNode).code;
      importText = importText.replace(
        /(['"])(?:\.\.\/)*modules\//g,
        (_match, quote) => `${quote}modules/`
      );
      importDeclarations.push(importText);
    }
  }

  const declarationsUsed = [];
  for (const name of names) {
    const declaration = declarations.get(name);
    if (!declaration) continue;
    declarationsUsed.push(declaration);
  }

  fs.mkdirSync(path.join("src", "modules", moduleId, "routes"), { recursive: true });
  const mainText = mainNodes.map(textFromNode).join(",\n");
  const standaloneText = standaloneNodes.map(textFromNode).join(",\n");
  const moduleSource = [
    'import { lazy } from "react";',
    'import Loadable from "components/Loadable";',
    ...importDeclarations,
    "",
    ...declarationsUsed,
    "",
    "const MainLayoutRoutes = [",
    mainText,
    "];",
    "",
    "const StandaloneRoutes = [",
    standaloneText,
    "];",
    "",
    "export { MainLayoutRoutes, StandaloneRoutes };",
  ].join("\n");

  fs.writeFileSync(
    path.join("src", "modules", moduleId, "routes", "index.js"),
    moduleSource
  );
}
