import MainLayout from "layout/MainLayout";
import { getPurchasedModuleIds } from "../config/moduleRegistry";

const moduleRouteLoaders = {
  administration: () => import("modules/administration/routes"),
  "credit-management": () => import("modules/credit-management/routes"),
  "loan-operation": () => import("modules/loan-operation/routes"),
  collection: () => import("modules/collection/routes"),
  finance: () => import("modules/finance/routes"),
};

export const buildApplicationRoutes = async (loginRoutes) => {
  const mainChildren = [];
  const standaloneRoutes = [];

  for (const moduleId of getPurchasedModuleIds()) {
    const loaded = await moduleRouteLoaders[moduleId]();
    mainChildren.push(...(loaded.MainLayoutRoutes || []));
    standaloneRoutes.push(...(loaded.StandaloneRoutes || []));
  }

  return [
    {
      path: "/",
      element: <MainLayout />,
      children: mainChildren,
    },
    ...standaloneRoutes,
    ...loginRoutes,
  ];
};
