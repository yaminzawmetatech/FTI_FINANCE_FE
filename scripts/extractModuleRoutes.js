const fs = require("fs");
const path = require("path");

const sourcePath = "src/routes/MainRoutes.js";
const source = fs.readFileSync(sourcePath, "utf8");
const arrayStart = source.indexOf("const MainRoutes = [");
const preamble = source.slice(0, arrayStart);
const arrayText = source.slice(arrayStart, source.indexOf("\n];", arrayStart) + 2);

const classify = (text) => {
  if (/CreditManagement|SurveyNameSetup/.test(text)) return "credit-management";
  if (/LoanOperationModule|StampDuty|Insurance\/|BookingProcess|Disbursement-Payment|CashDepositProcess|RequestForDisbursement|PrepareForContract|KPaySync|WaveMoney/.test(text)) return "loan-operation";
  if (/collection-module|CollectionModule|write-off|insufficient-payment|KPayRepayment|RepaymentCreate|AppliedSettlement/.test(text)) return "collection";
  if (/finance|eom-bom/.test(text)) return "finance";
  if (/administration|Administration|SMSSetup|GeneralLedgerEntrySetup|SurveyNameSetup/.test(text)) return "administration";
  return null;
};

const findMatchingIndex = (text, start, open, close) => {
  let depth = 0;
  let quote = null;
  let escaped = false;

  for (let index = start; index < text.length; index++) {
    const char = text[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }
    if (char === open) depth++;
    if (char === close) {
      depth--;
      if (depth === 0) return index;
    }
  }

  return -1;
};

const extractObjects = (text, start, end) => {
  const objects = [];
  let quote = null;
  let escaped = false;

  for (let index = start; index < end - 1; index++) {
    const char = text[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }
    if (char !== "{") continue;

    const close = findMatchingIndex(text, index, "{", "}");
    if (close > index && close < end) {
      let depthBefore = 0;
      for (let probe = start; probe < index; probe++) {
        if (text[probe] === "{") depthBefore++;
        if (text[probe] === "}") depthBefore--;
      }
      if (depthBefore === 1) {
        objects.push(text.slice(index, close + 1));
      }
      index = close;
    }
  }

  return objects;
};

const findArrayObjects = (text, arrayNameIndex) => {
  const open = text.indexOf("[", arrayNameIndex);
  if (open < 0) return [];
  const close = findMatchingIndex(text, open, "[", "]");
  if (close < 0) return [];
  return extractObjects(text, open + 1, close);
};

const topLevelObjects = [];
const arrayOpen = arrayText.indexOf("[");
const arrayClose = findMatchingIndex(arrayText, arrayOpen, "[", "]");
if (arrayClose >= 0) {
  let cursor = arrayOpen + 1;
  while (cursor < arrayClose) {
    const brace = arrayText.indexOf("{", cursor);
    if (brace < 0 || brace > arrayClose) break;
    const close = findMatchingIndex(arrayText, brace, "{", "}");
    if (close > brace) {
      topLevelObjects.push(arrayText.slice(brace, close + 1));
      cursor = close + 1;
    } else break;
  }
}

const mainLayout = topLevelObjects.find((object) => /<MainLayout/.test(object));
const moduleMainRoutes = {};
const standaloneRoutes = {};

for (const moduleId of ["administration", "credit-management", "loan-operation", "collection", "finance"]) {
  moduleMainRoutes[moduleId] = [];
  standaloneRoutes[moduleId] = [];
}

if (mainLayout) {
  const childrenKey = mainLayout.indexOf("children:");
  const open = mainLayout.indexOf("[", childrenKey);
  const close = findMatchingIndex(mainLayout, open, "[", "]");
  if (open >= 0 && close >= 0) {
    const objects = findArrayObjects(mainLayout, mainLayout.indexOf("children:", 0));
    for (const object of objects) {
      const moduleId = classify(object);
      if (moduleId) moduleMainRoutes[moduleId].push(object);
    }
  }
}

for (const topLevel of topLevelObjects) {
  if (topLevel === mainLayout) continue;
  const topChildrenKey = topLevel.indexOf("children:");
  if (topChildrenKey >= 0) {
    const open = topLevel.indexOf("[", topChildrenKey);
    const close = findMatchingIndex(topLevel, open, "[", "]");
    if (open >= 0 && close >= 0) {
      const objects = findArrayObjects(topLevel, topChildrenKey);
      for (const object of objects) {
        const moduleId = classify(object);
        if (moduleId) standaloneRoutes[moduleId].push(object);
      }
    }
  } else {
    const moduleId = classify(topLevel);
    if (moduleId) standaloneRoutes[moduleId].push(topLevel);
  }
}

const directImports = [...preamble.matchAll(/^import\s+(.+?)\s+from\s+["']([^"']+)["'];$/gm)];
const lazyDeclarations = [];
const constRegex = /^const\s+([A-Za-z_$][\w$]*)\s*=\s*/gm;
let match;
while ((match = constRegex.exec(preamble)) !== null) {
  let index = match.index + match[0].length;
  let quote = null;
  let escaped = false;
  let parenDepth = 0;
  let braceDepth = 0;
  let bracketDepth = 0;

  for (; index < preamble.length; index++) {
    const char = preamble[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }
    if (char === "(") parenDepth++;
    if (char === ")") parenDepth--;
    if (char === "{") braceDepth++;
    if (char === "}") braceDepth--;
    if (char === "[") bracketDepth++;
    if (char === "]") bracketDepth--;
    if (char === ";" && parenDepth === 0 && braceDepth === 0 && bracketDepth === 0) {
      lazyDeclarations.push({
        name: match[1],
        declaration: preamble.slice(match.index, index + 1),
      });
      constRegex.lastIndex = index + 1;
      break;
    }
  }
}

const getUsedNames = (blocks) =>
  new Set(
    blocks.join("\n").match(/<([A-Z][A-Za-z0-9]*)/g)?.map((tag) => tag.slice(1)) || []
  );

for (const [moduleId, mainRoutes] of Object.entries(moduleMainRoutes)) {
  const standalone = standaloneRoutes[moduleId];
  const allText = [...mainRoutes, ...standalone];
  if (!allText.length) continue;

  const usedNames = getUsedNames(allText);
  const imports = [];

  for (const direct of directImports) {
    const specifier = direct[1];
    const defaultName = specifier.match(/^([A-Za-z_$][\w$]*)/)?.[1];
    const namedNames = [...specifier.matchAll(/\b([A-Za-z_$][\w$]*)\b/g)].map((item) => item[1]);
    if ([defaultName, ...namedNames].some((name) => usedNames.has(name))) {
      imports.push(direct[0]);
    }
  }

  for (const lazy of lazyDeclarations) {
    if (usedNames.has(lazy.name)) imports.push(lazy.declaration);
  }

  const outputDir = path.join("src", "modules", moduleId, "routes");
  fs.mkdirSync(outputDir, { recursive: true });
  const output = [
    'import { lazy } from "react";',
    'import Loadable from "components/Loadable";',
    "",
    ...imports,
    "",
    `export const mainLayoutRoutes = [`,
    mainRoutes.join(",\n"),
    `];`,
    "",
    `export const standaloneRoutes = [`,
    standalone.join(",\n"),
    `];`,
    "",
    "export default { mainLayoutRoutes, standaloneRoutes };",
    "",
  ].join("\n");

  fs.writeFileSync(path.join(outputDir, "index.js"), output);
}

