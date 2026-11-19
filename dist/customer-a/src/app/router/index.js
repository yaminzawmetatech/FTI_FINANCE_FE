import React from "react";
import MainLayout from "layout/MainLayout";
import { MainLayoutRoutes as administrationMainLayoutRoutes, StandaloneRoutes as administrationStandaloneRoutes } from "modules/administration/routes";
import { MainLayoutRoutes as credit_managementMainLayoutRoutes, StandaloneRoutes as credit_managementStandaloneRoutes } from "modules/credit-management/routes";

export const buildApplicationRoutes = (loginRoutes) => [
  {
    path: "/",
    element: <MainLayout />,
    children: [
  ...administrationMainLayoutRoutes,
  ...administrationStandaloneRoutes,
  ...credit_managementMainLayoutRoutes,
  ...credit_managementStandaloneRoutes
    ],
  },
  ...loginRoutes,
];
