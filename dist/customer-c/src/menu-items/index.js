import dashboard from "./dashboard";
import administrationNavigation from "modules/administration/navigation";
import collectionNavigation from "modules/collection/navigation";
import financeNavigation from "modules/finance/navigation";
import credit_managementNavigation from "modules/credit-management/navigation";
import loan_operationNavigation from "modules/loan-operation/navigation";

const menuItems = {
  items: [{
    ...dashboard,
    children: [
  ...administrationNavigation,
  ...collectionNavigation,
  ...financeNavigation,
  ...credit_managementNavigation,
  ...loan_operationNavigation
    ],
  }],
};

export default menuItems;
