const fs = require("fs");
const path = require("path");

const walk = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const current = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(current);
    else if (entry.isFile() && /\.(js|jsx)$/.test(entry.name)) {
      let text = fs.readFileSync(current, "utf8");
      text = text.replace(
        /(["'])components\/RightApplicationSetupPropertyItem\1/g,
        '"./components/RightApplicationSetupPropertyItem"'
      );
      text = text.replace(
        /(["'])components\/LeftApplicationSetupPropertyItem\1/g,
        '"./components/LeftApplicationSetupPropertyItem"'
      );
      fs.writeFileSync(current, text);
    }
  }
};

walk("src/modules");
