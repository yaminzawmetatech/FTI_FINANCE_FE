const fs = require("fs");
const path = require("path");

const reducerFile = "src/store/reducers/index.js";
let text = fs.readFileSync(reducerFile, "utf8");

const sliceFiles = [];
const walk = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const current = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(current);
    else if (entry.isFile() && /Slice\.js$/.test(entry.name)) {
      sliceFiles.push(current);
    }
  }
};

walk("src/modules");

text = text.replace(
  /^import\s+(.+?)\s+from\s+["'][^"']*\/([^/"']+\.js)["'];$/gm,
  (full, identifier, fileName) => {
    const matches = sliceFiles.filter((file) => path.basename(file) === fileName);
    if (matches.length !== 1) return full;
    return `import ${identifier} from "${matches[0].replace(/\\/g, "/").replace(/^src\//, "")}";`;
  }
);

text = text.replace(
  /^import\s+(.+?)\s+from\s+["'][^"']*(?:\/|^)features\/[^"']+["'];$/gm,
  (full, identifier) => {
    const old = full.match(/["']([^"']+)["']/)?.[1] || "";
    const fileName = path.basename(old);
    const matches = sliceFiles.filter((file) => path.basename(file) === fileName);
    return matches.length === 1
      ? `import ${identifier} from "${matches[0].replace(/\\/g, "/").replace(/^src\//, "")}";`
      : full;
  }
);

fs.writeFileSync(reducerFile, text);
