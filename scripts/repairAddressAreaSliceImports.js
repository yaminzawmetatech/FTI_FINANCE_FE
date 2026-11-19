const fs = require("fs");
const path = require("path");

const replacements = [
  ["modules/administration/slices/BlackListArea/blackListAreaSlice", "modules/administration/slices/blackListAreaSlice"],
  ["modules/administration/slices/ExcludeBlackListArea/excludeBlackListAreaSlice", "modules/administration/slices/excludeBlackListAreaSlice"],
];

const walk = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const current = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(current);
    else if (entry.isFile() && /\.(js|jsx)$/.test(entry.name)) {
      let text = fs.readFileSync(current, "utf8");
      for (const [oldPath, newPath] of replacements) text = text.replaceAll(oldPath, newPath);
      fs.writeFileSync(current, text);
    }
  }
};

walk("src");
