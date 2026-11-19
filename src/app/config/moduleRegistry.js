const configuredModules = process.env.REACT_APP_ENABLED_MODULES
  ?.split(",")
  .map((moduleId) => moduleId.trim())
  .filter(Boolean);

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

const enabled = new Set(configuredModules || Object.keys(moduleRegistry));

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
