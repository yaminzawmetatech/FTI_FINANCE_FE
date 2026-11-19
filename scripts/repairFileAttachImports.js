const fs = require("fs");
const path = require("path");

const walk = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const current = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(current);
    else if (entry.isFile() && /\.(js|jsx)$/.test(entry.name)) {
      let text = fs.readFileSync(current, "utf8");
      text = text.replace(
        /(["'])[^"']*features\/fileAttach\/fileAttachSlice\1/g,
        "\"modules/administration/slices/fileAttachSlice\""
      );
      fs.writeFileSync(current, text);
    }
  }
};

walk("src");
