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
  "collection": "collection",
  "finance": "finance",
  "credit-management": "credit-management",
  "loan-operation": "loan-operation"
};

export const getEnabledModuleIds = () => ["administration","collection","finance","credit-management","loan-operation"];
