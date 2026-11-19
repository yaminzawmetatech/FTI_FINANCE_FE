const fs = require("fs");
const path = require("path");

const index = new Map();
const walkFiles = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const current = path.join(directory, entry.name);
    if (entry.isDirectory()) walkFiles(current);
    else if (entry.isFile() && /\.(js|jsx)$/.test(entry.name)) {
      const existing = index.get(entry.name) || [];
      existing.push(current);
      index.set(entry.name, existing);
    }
  }
};
walkFiles("src/modules");

const replaceLegacy = (text) => {
  return text.replace(
    /(["'])([^"']*\/)?features\/[^/"']+\/([^/"']+)\1/g,
    (match, quote, _prefix, fileName) => {
      const candidates = (index.get(fileName) || []).filter((file) =>
        /[\\/](services|slices)[\\/]/.test(file)
      );
      if (candidates.length !== 1) return match;
      return `${quote}${candidates[0].replace(/\\/g, "/").replace(/^src\//, "")}${quote}`;
    }
  );
};

const walkSource = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const current = path.join(directory, entry.name);
    if (entry.isDirectory()) walkSource(current);
    else if (entry.isFile() && /\.(js|jsx)$/.test(entry.name)) {
      let text = fs.readFileSync(current, "utf8");
      const updated = replaceLegacy(text);
      if (updated !== text) fs.writeFileSync(current, updated);
    }
  }
};

walkSource("src");
