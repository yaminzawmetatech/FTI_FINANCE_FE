import dashboard from "./dashboard";
import { getEnabledModuleIds } from "../app/config/moduleRegistry";

const moduleNavigation = {
  administration: () => require("modules/administration/navigation").default,
  "credit-management": () => require("modules/credit-management/navigation").default,
  "loan-operation": () => require("modules/loan-operation/navigation").default,
  collection: () => require("modules/collection/navigation").default,
  finance: () => require("modules/finance/navigation").default,
};

const children = getEnabledModuleIds().reduce((items, moduleId) => {
  const groups = moduleNavigation[moduleId]();
  return items.concat(groups || []);
}, []);

const menuItems = {
  items: [
    {
      ...dashboard,
      children,
    },
  ],
};

export default menuItems;
