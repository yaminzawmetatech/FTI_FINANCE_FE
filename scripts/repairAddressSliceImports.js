const fs = require("fs");
const path = require("path");

const replacements = {
  "addressStateSlice": "addressStateSlice",
  "addressDistrictSlice": "addressDistrictSlice",
  "addressTownshipSlice": "addressTownshipSlice",
  "addressCitySlice": "addressCitySlice",
  "addressWardSlice": "addressWardSlice",
  "addressVillageTractSlice": "addressVillageTractSlice",
  "addressVillageSlice": "addressVillageSlice",
};

const walk = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const current = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(current);
    else if (entry.isFile() && /\.(js|jsx)$/.test(entry.name)) {
      let text = fs.readFileSync(current, "utf8");
      for (const [nested, flat] of Object.entries(replacements)) {
        text = text.replace(
          new RegExp(`modules/administration/slices/(?:[^/"']+/)+${nested}`, "g"),
          `modules/administration/slices/${flat}`
        );
      }
      fs.writeFileSync(current, text);
    }
  }
};

walk("src");
