const fs = require("fs");
const path = require("path");

const axiosSource = "src/features/api";
const axiosCore = "src/core/services/api";
if (fs.existsSync(axiosSource)) {
  fs.mkdirSync(axiosCore, { recursive: true });
  for (const entry of fs.readdirSync(axiosSource)) {
    if (!entry.endsWith(".js")) continue;
    fs.renameSync(path.join(axiosSource, entry), path.join(axiosCore, entry));
  }
}

const replacements = [
  ["../api/axiosInstance", "core/services/api/axiosInstance"],
  ["../../api/axiosInstance", "core/services/api/axiosInstance"],
  ["../../../api/axiosInstance", "core/services/api/axiosInstance"],
  ["../../../../api/axiosInstance", "core/services/api/axiosInstance"],
  ["features/api/axiosInstance", "core/services/api/axiosInstance"],
  ["../api/axiosInstanceV2", "core/services/api/axiosInstanceV2"],
  ["../../api/axiosInstanceV2", "core/services/api/axiosInstanceV2"],
  ["../../../api/axiosInstanceV2", "core/services/api/axiosInstanceV2"],
  ["../../../../api/axiosInstanceV2", "core/services/api/axiosInstanceV2"],
  ["features/api/axiosInstanceV2", "core/services/api/axiosInstanceV2"],
];

const walk = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const current = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(current);
    else if (entry.isFile() && /\.(js|jsx)$/.test(entry.name)) {
      let text = fs.readFileSync(current, "utf8");
      for (const [oldPath, newPath] of replacements) {
        text = text.replaceAll(oldPath, newPath);
      }
      fs.writeFileSync(current, text);
    }
  }
};

walk("src");
