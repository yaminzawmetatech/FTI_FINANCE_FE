const fs = require("fs");
const path = require("path");

const modulesRoot = "src/modules";

const walk = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const current = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(current);
    else if (
      entry.isFile() &&
      directory.endsWith(`${path.sep}slices`) &&
      /\.js$/.test(entry.name)
    ) {
      let text = fs.readFileSync(current, "utf8");
      text = text.replace(
        /from\s+["']\.\/([^"']*Service[^"']*)["']/g,
        (_match, serviceName) => `from "../services/${serviceName}"`
      );
      text = text.replace(
        /from\s+["']\.\/([^"']*service[^"']*)["']/g,
        (_match, serviceName) => `from "../services/${serviceName}"`
      );
      fs.writeFileSync(current, text);
    }
  }
};

walk(modulesRoot);
