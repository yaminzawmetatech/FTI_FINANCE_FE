const fs = require("fs");
const path = require("path");

const roots = process.argv.slice(2);
if (!roots.length) roots.push("src", "dist/customer-a/src", "dist/customer-c/src");

const resolveImport = (fromFile, specifier) => {
  if (!specifier.startsWith(".") && !specifier.startsWith("modules/") && !specifier.startsWith("features/")) {
    return null;
  }

  if (specifier.startsWith("modules/")) {
    return path.resolve(path.join(path.dirname(path.dirname(path.dirname(fromFile))), specifier));
  }

  return path.resolve(path.dirname(fromFile), specifier);
};

const extensions = ["", ".js", ".jsx", "/index.js", "/index.jsx"];
const unresolved = [];

for (const root of roots) {
  const walk = (directory) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const current = path.join(directory, entry.name);
      if (entry.isDirectory()) walk(current);
      else if (entry.isFile() && /\.(js|jsx)$/.test(entry.name)) {
        const text = fs.readFileSync(current, "utf8");
        const regex = /(?:from\s*|import\s*\(|require\s*\()\s*["']([^"']+)["']/g;
        let match;
        while ((match = regex.exec(text))) {
          const specifier = match[1];
          if (specifier === "react" || specifier.startsWith("@") || specifier.startsWith("store/") ||
              specifier.startsWith("components/") || specifier.startsWith("layout/") ||
              specifier.startsWith("pages/") || specifier.startsWith("themes/") ||
              specifier.startsWith("assets/") || specifier.startsWith("utils/") ||
              specifier.startsWith("constants/") || specifier.startsWith("hooks/") ||
              specifier.startsWith("common/") || specifier.startsWith("routes/") ||
              specifier.startsWith("sections/")) continue;

          const resolved = resolveImport(current, specifier);
          if (!resolved) continue;
          if (!extensions.some((extension) => fs.existsSync(`${resolved}${extension}`))) {
            unresolved.push(`${current}: ${specifier}`);
          }
        }
      }
    }
  };
  walk(root);
}

if (unresolved.length) {
  console.error(unresolved.join("\n"));
  process.exit(1);
}

console.log("Verified relative and module imports in source and customer packages.");
