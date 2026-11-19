export const moduleDependencies = {
  "administration": [],
  "credit-management": [],
  "loan-operation": [
    "administration",
    "credit-management"
  ],
  "collection": [
    "administration",
    "credit-management",
    "loan-operation"
  ],
  "finance": [
    "administration",
    "loan-operation"
  ]
};

export const moduleRegistry = {
  "administration": "administration",
  "credit-management": "credit-management"
};

export const getEnabledModuleIds = () => ["administration","credit-management"];
