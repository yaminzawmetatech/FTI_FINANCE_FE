import dashboard from "./dashboard";
import administrationNavigation from "modules/administration/navigation";
import credit_managementNavigation from "modules/credit-management/navigation";

const menuItems = {
  items: [{
    ...dashboard,
    children: [
  ...administrationNavigation,
  ...credit_managementNavigation
    ],
  }],
};

export default menuItems;
