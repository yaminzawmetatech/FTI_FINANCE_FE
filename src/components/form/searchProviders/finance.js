import { getBankAccountCodes } from "modules/finance/slices/accountCodeSlice";

const financeSearchProvider = {
  moduleId: "finance",
  optionTypes: ["autocomplete_bank_account_code"],
  selectState: (state) => ({
    bankAccountCodes: state.accountCodes.bankAccountCodes,
  }),
  loaders: {
    autocomplete_bank_account_code: (dispatch) =>
      dispatch(getBankAccountCodes()),
  },
};

export default financeSearchProvider;
