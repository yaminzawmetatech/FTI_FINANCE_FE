const fs = require("fs");
const path = require("path");

const sharedDirectories = [
  ["components/", "components/"],
  ["common/", "common/"],
  ["constants/", "constants/"],
  ["utils/", "utils/"],
];

const walk = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const current = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(current);
    else if (entry.isFile() && /\.(js|jsx)$/.test(entry.name)) {
      let text = fs.readFileSync(current, "utf8");

      for (const [alias] of sharedDirectories) {
        const folder = alias.replace("/", "");
        if (!fs.existsSync(path.join("src", folder))) continue;
        const regex = new RegExp(`(["'])(?:\\.\\.?/)+([^"']*/)?${folder}/([^"']+)\\1`, "g");
        text = text.replace(regex, (_match, quote, _prefix, remainder) => `${quote}${folder}/${remainder}${quote}`);
        text = text.replace(
          new RegExp(`(["'])(?:\\.\\.?/)+${folder}/([^"']+)\\1`, "g"),
          (_match, quote, remainder) => `${quote}${folder}/${remainder}${quote}`
        );
      }

      fs.writeFileSync(current, text);
    }
  }
};

walk("src");
