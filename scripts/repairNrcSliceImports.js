const fs = require("fs");
const path = require("path");

const replacements = [
  ["nrcStateSlice", "nrcStateSlice"],
  ["nrcTownshipSlice", "nrcTownshipSlice"],
  ["nrcTownshipVarationSlice", "nrcTownshipVarationSlice"],
];

const walk = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const current = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(current);
    else if (entry.isFile() && /\.(js|jsx)$/.test(entry.name)) {
      let text = fs.readFileSync(current, "utf8");
      for (const [name] of replacements) {
        text = text.replace(
          new RegExp(`modules/administration/slices/[^"']*/${name}`, "g"),
          `modules/administration/slices/${name}`
        );
      }
      fs.writeFileSync(current, text);
    }
  }
};

walk("src");
