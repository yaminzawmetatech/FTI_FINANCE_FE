import { getDealerByDealerType } from "modules/loan-operation/slices/dealerSlice";

const loanOperationSearchProvider = {
  moduleId: "loan-operation",
  optionTypes: [
    "autocomplete_dealers_by_type",
    "autocomplete_dealer_group",
  ],
  selectState: (state) => ({
    dealers: state.dealers.dealers,
    dealersByType: state.dealers.dealersByType,
    dealerGroups: state.dealerGroups.dealerGroups,
  }),
  loaders: {
    autocomplete_dealers_by_type: (dispatch) =>
      dispatch(getDealerByDealerType(["School", "Travel"])),
  },
};

export default loanOperationSearchProvider;
