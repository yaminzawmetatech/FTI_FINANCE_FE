import { getPurchasedModuleIds } from "../config/moduleRegistry";
import filterNavigationForModules from "menu-items/filterNavigationForModules";

const moduleNavigationLoaders = {
  administration: () => import("modules/administration/navigation"),
  "credit-management": () => import("modules/credit-management/navigation"),
  "loan-operation": () => import("modules/loan-operation/navigation"),
  collection: () => import("modules/collection/navigation"),
  finance: () => import("modules/finance/navigation"),
};

export const getModuleNavigation = async () => {
  const groups = [];
  const purchasedModules = getPurchasedModuleIds();
  for (const moduleId of purchasedModules) {
    const loaded = await moduleNavigationLoaders[moduleId]();
    groups.push(...(loaded.default || []));
  }
  return filterNavigationForModules(groups, purchasedModules);
};
