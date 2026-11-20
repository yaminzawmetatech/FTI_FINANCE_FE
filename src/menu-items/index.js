import dashboard from "./dashboard";
import filterNavigationForModules from "./filterNavigationForModules";
import { getPurchasedModuleIds } from "../app/config/moduleRegistry";

const moduleNavigation = {
  administration: () => require("modules/administration/navigation").default,
  "credit-management": () => require("modules/credit-management/navigation").default,
  "loan-operation": () => require("modules/loan-operation/navigation").default,
  collection: () => require("modules/collection/navigation").default,
  finance: () => require("modules/finance/navigation").default,
};

const purchasedModules = getPurchasedModuleIds();
const children = purchasedModules.reduce((items, moduleId) => {
  const groups = moduleNavigation[moduleId]();
  return items.concat(groups || []);
}, []);

const menuItems = {
  items: [
    {
      ...dashboard,
      children: filterNavigationForModules(children, purchasedModules),
    },
  ],
};

export default menuItems;
