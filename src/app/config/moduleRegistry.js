const configuredModules = process.env.REACT_APP_ENABLED_MODULES
  ?.split(",")
  .map((moduleId) => moduleId.trim())
  .filter(Boolean);

export const moduleSourceDependencies = {
  administration: [
    "credit-management",
    "collection",
    "finance",
    "loan-operation",
  ],
  "credit-management": [
    "administration",
    "collection",
    "finance",
    "loan-operation",
  ],
};

export const moduleDependencies = {
  administration: [],
  "credit-management": ["administration"],
  "loan-operation": ["administration", "credit-management"],
  collection: ["administration", "credit-management", "loan-operation"],
  finance: ["administration", "loan-operation"],
};

export const moduleRegistry = {
  administration: "administration",
  "credit-management": "credit-management",
  "loan-operation": "loan-operation",
  collection: "collection",
  finance: "finance",
};

const purchased = new Set(configuredModules || Object.keys(moduleRegistry));
const enabled = new Set(purchased);

const addDependencies = (moduleId) => {
  (moduleDependencies[moduleId] || []).forEach((dependencyId) => {
    enabled.add(dependencyId);
    addDependencies(dependencyId);
  });
};

for (const moduleId of [...enabled]) {
  if (!moduleRegistry[moduleId]) {
    throw new Error(`Unknown module "${moduleId}" in REACT_APP_ENABLED_MODULES.`);
  }
  addDependencies(moduleId);
}

export const getEnabledModuleIds = () => [...enabled];

export const getPurchasedModuleIds = () => [...purchased];

export const getSourceModuleIds = () => {
  const sourceModules = new Set(enabled);
  for (const moduleId of enabled) {
    for (const dependencyId of moduleSourceDependencies[moduleId] || []) {
      sourceModules.add(dependencyId);
    }
  }
  return [...sourceModules];
};
