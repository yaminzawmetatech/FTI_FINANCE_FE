import filterNavigationForModules from "./filterNavigationForModules";
import administrationNavigation from "../modules/administration/navigation";

const collectTitles = (items) =>
  items.flatMap((item) => [
    item.title,
    ...(Array.isArray(item.children) ? collectTitles(item.children) : []),
  ]);

const getAdministrationTitles = (moduleIds) =>
  collectTitles(filterNavigationForModules(administrationNavigation, moduleIds));

describe("filterNavigationForModules", () => {
  const navigation = [
    {
      id: "System Configuration",
      children: [
        { id: "Organization & Access" },
        { id: "Product Setup" },
        { id: "Workflow Management" },
        {
          id: "Credit Setup",
          moduleId: "credit-management",
          children: [{ id: "Survey Types" }],
        },
        {
          id: "Loan Setup",
          moduleId: "loan-operation",
          children: [{ id: "Billing Schedule" }],
        },
      ],
    },
  ];

  it("keeps core groups and removes unpurchased business setup", () => {
    const result = filterNavigationForModules(navigation, ["administration"]);

    expect(result[0].children.map((item) => item.id)).toEqual([
      "Organization & Access",
      "Product Setup",
      "Workflow Management",
    ]);
  });

  it("keeps setup owned by purchased business modules", () => {
    const result = filterNavigationForModules(navigation, [
      "administration",
      "credit-management",
    ]);

    expect(result[0].children.map((item) => item.id)).toEqual([
      "Organization & Access",
      "Product Setup",
      "Workflow Management",
      "Credit Setup",
    ]);
  });

  it.each([
    ["Company A", ["administration", "credit-management"]],
    ["Company B", ["administration", "credit-management", "loan-operation"]],
    ["Company C", ["administration", "collection", "finance"]],
  ])("%s always includes core Administration groups", (_company, moduleIds) => {
    const titles = getAdministrationTitles(moduleIds);

    expect(titles).toEqual(
      expect.arrayContaining([
        "Organization & Access",
        "Product Setup",
        "Workflow Management",
      ])
    );
  });

  it("shows only the purchased business setup sections", () => {
    const companyATitles = getAdministrationTitles([
      "administration",
      "credit-management",
    ]);
    const companyBTitles = getAdministrationTitles([
      "administration",
      "credit-management",
      "loan-operation",
    ]);
    const companyCTitles = getAdministrationTitles([
      "administration",
      "collection",
      "finance",
    ]);

    expect(companyATitles).toEqual(
      expect.arrayContaining([
        "Application Form Configuration",
        "Survey Types",
        "Assessment Criteria",
        "Customer Assessment",
      ])
    );
    expect(companyATitles).not.toContain("Loan Calculation Setup");
    expect(companyATitles).not.toContain("Collection Letters");

    expect(companyBTitles).toEqual(
      expect.arrayContaining([
        "Loan Calculation Setup",
        "First Payment Date Rules",
        "Billing Schedule",
        "Contract Templates",
      ])
    );
    expect(companyBTitles).not.toContain("Collection Letters");
    expect(companyBTitles).not.toContain("Financial Accounting");

    expect(companyCTitles).toEqual(
      expect.arrayContaining([
        "Collection Letters",
        "Collections & Recovery",
        "Financial Accounting",
        "Chart of Accounts",
      ])
    );
    expect(companyCTitles).not.toContain("Application Form Configuration");
    expect(companyCTitles).not.toContain("Loan Calculation Setup");
    expect(companyCTitles).not.toContain("Contract Templates");
  });

  it("preserves the Department navigation URL and permission", () => {
    const systemConfiguration = filterNavigationForModules(
      administrationNavigation,
      ["administration"]
    )[0];
    const department = systemConfiguration.children
      .find((group) => group.id === "Administration-basic-setup")
      .children.find((item) => item.id === "Administration-department");

    expect(department.url).toBe("/administration/department");
    expect(department.permission).toBe("DepartmentListing");
  });
});
