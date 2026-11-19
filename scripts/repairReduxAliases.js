const fs = require("fs");
const path = require("path");

const replacements = [
  [/["'][^"']*node_modules\/@reduxjs\/toolkit\/dist\/index["']/g, '"@reduxjs/toolkit"'],
  [/["'][^"']*node_modules\/react-redux\/[^"']*["']/g, '"react-redux"'],
  [/["'][^"']*node_modules\/react-router-dom\/[^"']*["']/g, '"react-router-dom"'],
];

const walk = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const current = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(current);
    else if (entry.isFile() && /\.(js|jsx)$/.test(entry.name)) {
      let text = fs.readFileSync(current, "utf8");
      for (const [pattern, replacement] of replacements) text = text.replace(pattern, replacement);
      fs.writeFileSync(current, text);
    }
  }
};

walk("src");
