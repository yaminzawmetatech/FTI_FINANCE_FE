import { getMobCategory, getProjectCategory } from "modules/administration/slices/projectcategorySlice";
import { getAddressTownships } from "modules/administration/slices/addressTownshipSlice";
import { getAddressWards } from "modules/administration/slices/addressWardSlice";
import { getUsers } from "modules/administration/slices/usersSlice";
import { getSubCategory } from "modules/administration/slices/subcategorySlice";
import { getAddressStates } from "modules/administration/slices/addressStateSlice";
import { getAllCollateralTypes } from "modules/administration/slices/collateralTypesSetupSlice";

const administrationSearchProvider = {
  moduleId: "administration",
  optionTypes: [
    "autocomplete_category",
    "autocomplete_mob_category",
    "autocomplete_sub_category",
    "autocomplete_state",
    "autocomplete_township",
    "autocomplete_ward",
    "autocomplete_user",
    "autocomplete_ihco",
    "autocomplete_cmco",
    "autocomplete_collateral_type",
  ],
  selectState: (state) => ({
    users: state.user.users,
    projectCategories: state.projectCategories.projectCategories,
    subCategories: state.subCategories.subCategories,
    addressTownships: state.addressTownships.addressTownships,
    addressStates: state.addressStates.addressStates,
    addressWards: state.addressWards.addressWards,
    collateralTypes: state.collateralTypes.collateralTypes,
  }),
  loaders: {
    autocomplete_category: (dispatch) => dispatch(getProjectCategory()),
    autocomplete_mob_category: (dispatch) => dispatch(getMobCategory()),
    autocomplete_sub_category: (dispatch) => dispatch(getSubCategory()),
    autocomplete_state: (dispatch) => dispatch(getAddressStates()),
    autocomplete_township: (dispatch) => dispatch(getAddressTownships()),
    autocomplete_ward: (dispatch) => dispatch(getAddressWards()),
    autocomplete_user: (dispatch) => dispatch(getUsers()),
    autocomplete_ihco: (dispatch) => dispatch(getUsers("IHCO")),
    autocomplete_cmco: (dispatch) => dispatch(getUsers("CMCO")),
    autocomplete_collateral_type: (dispatch) =>
      dispatch(getAllCollateralTypes({ params: {} })),
  },
};

export default administrationSearchProvider;
