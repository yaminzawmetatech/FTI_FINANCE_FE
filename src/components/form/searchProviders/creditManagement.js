const creditManagementSearchProvider = {
  moduleId: "credit-management",
  optionTypes: ["autocomplete_criteria_type", "autocomplete_dealer"],
  selectState: (state) => ({
    creditCriteriaTypes: state.creditCriteriaTypes.creditCriteriaTypes,
    dealers: state.dealers.dealers,
  }),
  loaders: {},
};

export default creditManagementSearchProvider;
