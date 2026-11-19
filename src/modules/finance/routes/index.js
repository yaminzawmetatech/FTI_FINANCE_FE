import { lazy } from "react";
import Loadable from "components/Loadable";

const ProvisionListIndex = Loadable(lazy(() => import("modules/finance/pages/Finance/ProvisionSetup/ProvisionList/ProvisionListIndex")));
const JobQueueLogEntryListIndex = Loadable(lazy(() => import("modules/finance/pages/Finance/EOM/EOMLogEntryList/EOMLogEntryListIndex")));
const JobQueueLogEntryIndex = Loadable(lazy(() => import("modules/finance/pages/Finance/EOM/EOMLogEntry/EOMLogEntryIndex")));
const EomSyncIndex = Loadable(lazy(() => import("modules/finance/pages/Finance/EOM/EOMSync/EOMSyncListIndex")));

const MainLayoutRoutes = [
{
  path: "finance",
  children: [{
    path: "provision-setup",
    element: <ProvisionListIndex />
  }, {
    path: "eom-bom-log-entry-list/:mode",
    element: <JobQueueLogEntryListIndex />
  }]
}
];

const StandaloneRoutes = [
{
  path: "/finance/eom-bom-index/:route",
  element: <JobQueueLogEntryIndex />
},
{
  path: "/finance/eom-bom/:uuid/:route/:mode",
  element: <JobQueueLogEntryIndex />
},
{
  path: "/finance/eom-bom-sync/:id/:route",
  element: <EomSyncIndex />
}
];

export { MainLayoutRoutes, StandaloneRoutes };