import React from "react";
import MainLayout from "layout/MainLayout";
import { MainLayoutRoutes as administrationMainLayoutRoutes, StandaloneRoutes as administrationStandaloneRoutes } from "modules/administration/routes";
import { MainLayoutRoutes as collectionMainLayoutRoutes, StandaloneRoutes as collectionStandaloneRoutes } from "modules/collection/routes";
import { MainLayoutRoutes as financeMainLayoutRoutes, StandaloneRoutes as financeStandaloneRoutes } from "modules/finance/routes";
import { MainLayoutRoutes as credit_managementMainLayoutRoutes, StandaloneRoutes as credit_managementStandaloneRoutes } from "modules/credit-management/routes";
import { MainLayoutRoutes as loan_operationMainLayoutRoutes, StandaloneRoutes as loan_operationStandaloneRoutes } from "modules/loan-operation/routes";

export const buildApplicationRoutes = (loginRoutes) => [
  {
    path: "/",
    element: <MainLayout />,
    children: [
  ...administrationMainLayoutRoutes,
  ...administrationStandaloneRoutes,
  ...collectionMainLayoutRoutes,
  ...collectionStandaloneRoutes,
  ...financeMainLayoutRoutes,
  ...financeStandaloneRoutes,
  ...credit_managementMainLayoutRoutes,
  ...credit_managementStandaloneRoutes,
  ...loan_operationMainLayoutRoutes,
  ...loan_operationStandaloneRoutes
    ],
  },
  ...loginRoutes,
];
