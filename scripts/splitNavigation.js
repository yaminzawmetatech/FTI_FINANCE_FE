const fs = require("fs");
const path = require("path");

const sourcePath = "src/menu-items/dashboard.js";
const source = fs.readFileSync(sourcePath, "utf8");

const findMatching = (text, openIndex, openChar, closeChar) => {
  let depth = 0;
  let quote = null;
  let escaped = false;
  for (let index = openIndex; index < text.length; index++) {
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
    if (char === openChar) depth++;
    if (char === closeChar) {
      depth--;
      if (depth === 0) return index;
    }
  }
  return -1;
};

const childrenIndex = source.indexOf("children:");
const openBracket = source.indexOf("[", childrenIndex);
const closeBracket = findMatching(source, openBracket, "[", "]");
const content = source.slice(openBracket + 1, closeBracket);

const modules = [
  ["credit-management", "credit-management"],
  ["loan-operation", "loan-operation-module"],
  ["collection", "collection module"],
  ["finance", "finance"],
  ["administration", "Administration"],
];

const moduleObjects = Object.fromEntries(modules.map(([id]) => [id, []]));
let cursor = 0;

while (cursor < content.length) {
  const brace = content.indexOf("{", cursor);
  if (brace < 0) break;
  const close = findMatching(content, brace, "{", "}");
  if (close < 0) break;
  const object = content.slice(brace, close + 1);
  for (const [moduleId, marker] of modules) {
    if (object.includes(`id: "${marker}"`) || object.includes(`id: '${marker}'`)) {
      moduleObjects[moduleId].push(object);
      break;
    }
  }
  cursor = close + 1;
}

const preamble = source.slice(0, source.indexOf("const dashboard"));

for (const [moduleId, objects] of Object.entries(moduleObjects)) {
  if (!objects.length) continue;
  const navigationDir = path.join("src", "modules", moduleId, "navigation");
  fs.mkdirSync(navigationDir, { recursive: true });
  fs.writeFileSync(
    path.join(navigationDir, "index.js"),
    `${preamble}\n\nconst navigation = [\n${objects.join(",\n")}\n];\n\nexport default navigation;\n`
  );
}
