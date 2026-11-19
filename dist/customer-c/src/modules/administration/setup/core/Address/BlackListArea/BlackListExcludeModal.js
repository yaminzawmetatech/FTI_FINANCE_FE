import * as React from "react";
import { useEffect, useState, useCallback, useMemo } from "react";
import { Controller } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Grid,
  Skeleton,
} from "@mui/material";
import FormInputSelect from "components/form/FormInputSelect";
import FormInputText from "components/form/FormInputText";
import FormInputCheckbox from "components/form/FormInputCheckbox";
import useAddressVillageTractForm from "./BlackListAreaHook";
import { useSelector, useDispatch } from "react-redux";
import { useWatch } from "react-hook-form";
import {
  getAddressDistricts,
  getDistrictByStateAndTownship,
  resetAddressDistricts,
} from "modules/administration/slices/addressDistrictSlice";
import {
  getAddressCities,
  resetAddressCities,
} from "modules/administration/slices/addressCitySlice";
import {
  getAddressWards,
  resetAddressWards,
} from "modules/administration/slices/addressWardSlice";
import {
  getAddressVillageTracts,
  resetAddressVillageTracts,
} from "modules/administration/slices/addressVillageTractSlice";
import {
  getAddressVillages,
  resetAddressVillages,
} from "modules/administration/slices/addressVillageSlice";
import { getAddressTownships } from "modules/administration/slices/addressTownshipSlice";
import { getAddressStates } from "modules/administration/slices/addressStateSlice";
import FormInputMultiSelect from "components/form/FormInputMultiSelect";
import { getProjectCategory } from "modules/administration/slices/projectcategorySlice";
import { getSubCategory } from "modules/administration/slices/subcategorySlice";

export const EditBlackListAreaModal = ({
  open,
  onClose,
  editValues,
  editFlag,
  selectedId,
}) => {
  const dispatch = useDispatch();

  const [manuallyRemovedSubCategoryIds, setManuallyRemovedSubCategoryIds] = useState([]);

  const { control, onSubmit, handleSubmit, reset, setValue, resetField } =
    useAddressVillageTractForm();

  const { projectCategories } = useSelector((state) => state.projectCategories);

  const { subCategories } = useSelector((state) => state.subCategories);

  const [addressTownshipsArr, setAddressTownshipsArr] = useState([]);

  const { addressStates, isLoading: addressStateLoading } = useSelector(
    (state) => state.addressStates
  );

  const { addressTownships, isLoading: addressTownshipLoading } = useSelector(
    (state) => state.addressTownships
  );

  const { addressWards, isLoading: addressWardsLoading } = useSelector(
    (state) => state.addressWards
  );

  const { addressVillages, isLoading: addressVillageLoading } = useSelector(
    (state) => state.addressVillages
  );

  const { addressCities, isLoading: addressCitiesLoading } = useSelector(
    (state) => state.addressCities
  );

  const { addressVillageTracts, isLoading: addressVillageTractsLoading } =
    useSelector((state) => state.addressVillageTracts);

  const { addressDistricts, isLoading: addressDistrictsLoading } = useSelector(
    (state) => state.addressDistricts
  );

  const address_district_id = useWatch({
    control,
    name: "address_district_id",
  });
  const address_state_id = useWatch({
    control,
    name: "address_state_id",
  });
  const address_township_id = useWatch({
    control,
    name: "address_township_id",
  });
  const address_city_id = useWatch({
    control,
    name: "address_city_id",
  });

  const address_village_tract_id = useWatch({
    control,
    name: "address_village_tract_id",
  });

  const address_ward_id = useWatch({
    control,
    name: "address_ward_id",
  });

  const address_village_id = useWatch({
    control,
    name: "address_village_id",
  });

  const selectedCategoryArr = useWatch({
    control,
    name: "category_id",
  });

  const selectedSubCategoryArr = useWatch({
    control,
    name: "sub_category_id",
  });

  const subCategoriesArr = useMemo(() => {
    if (selectedCategoryArr && selectedCategoryArr.length > 0) {
      const selectedIds = selectedCategoryArr.map((cat) => cat.id);
      return subCategories.filter((item) =>
        selectedIds.includes(item?.category_id)
      );
    }
    return subCategories;
  }, [subCategories, selectedCategoryArr]);

  useEffect(() => {
    if (!selectedCategoryArr || selectedCategoryArr.length === 0) {
      // If no category is selected, reset the form to its initial state
      //reset();
      resetField('category_id');
      setValue('sub_category_id', []);
      return;
    }

    const selectedCategoryIds = selectedCategoryArr.map((cat) => cat.id);

    // Filter subcategories that are still allowed (not removed)
    const allowedSubCategories = subCategories.filter(
      (sub) =>
        selectedCategoryIds.includes(sub.category_id) &&
        !manuallyRemovedSubCategoryIds.includes(sub.id)
    );

    // Merge with current selected subcategories
    // const merged = [
    //   ...(selectedSubCategoryArr || []),
    //   ...allowedSubCategories.filter(
    //     (sub) => !(selectedSubCategoryArr || []).some((s) => s.id === sub.id)
    //   ),
    // ];

    // setValue("sub_category_id", merged);

     // Keep only subcategories whose parent category is still selected
     const filteredSelectedSubcategories = (selectedSubCategoryArr || []).filter(
      (sub) => selectedCategoryIds.includes(sub.category_id)
    );

    // Add back any allowed subcategories that are not removed or already selected
    const merged = [
      ...filteredSelectedSubcategories,
      ...allowedSubCategories.filter(
        (sub) =>
          !filteredSelectedSubcategories.some((s) => s.id === sub.id)
      ),
    ];

    setValue("sub_category_id", merged);

    // Remove categories that now have no related subcategories
    // const validCategoryIds = new Set(
    //   allowedSubCategories.map((sub) => sub.category_id)
    // );

    // const filteredCategories = selectedCategoryArr.filter((cat) =>
    //   validCategoryIds.has(cat.id)
    // );

    // if (filteredCategories.length === 0) {
    //   // If no valid categories left, reset form
    //   reset();
    // } else if (filteredCategories.length !== selectedCategoryArr.length) {
    //   // If some categories got invalidated
    //   setValue("category_id", filteredCategories);
    // }
    const categoryHasVisibleSubCategory = (categoryId) =>
      subCategories.some(
        (sub) =>
          sub.category_id === categoryId &&
          !manuallyRemovedSubCategoryIds.includes(sub.id)
      );

    // Keep categories even if they have no subcategories for now
    const filteredCategories = selectedCategoryArr.filter(
      (cat) =>
        categoryHasVisibleSubCategory(cat.id) ||
        selectedSubCategoryArr?.some((sub) => sub.category_id === cat.id)
    );

    if (filteredCategories.length === 0) {
      //reset();
      resetField('category_id');
      setValue('sub_category_id', []);
      setManuallyRemovedSubCategoryIds([]); // Clear blocked subcategories to allow clean reselection
    } else if (filteredCategories.length !== selectedCategoryArr.length) {
      setValue("category_id", filteredCategories);
    }
  }, [
    selectedCategoryArr,
    subCategories,
    selectedSubCategoryArr,
    setValue,
    manuallyRemovedSubCategoryIds,
    reset,
  ]);


  // useEffect(() => {
  //   if (!selectedCategoryArr) return;

  //   const selectedCategoryIds = selectedCategoryArr.map((cat) => cat.id);

  //   // Get all subcategories that belong to selected categories
  //   const relatedSubCategories = subCategories.filter((sub) =>
  //     selectedCategoryIds.includes(sub.category_id)
  //   );

  //   // Remove subcategories that no longer match selected categories
  //   const filteredSelectedSubCategories = (selectedSubCategoryArr || []).filter(
  //     (sub) => selectedCategoryIds.includes(sub.category_id)
  //   );

  //   // Add new ones that match selected categories
  //   const merged = [
  //     ...filteredSelectedSubCategories,
  //     ...relatedSubCategories.filter(
  //       (sub) => !filteredSelectedSubCategories.find((s) => s.id === sub.id)
  //     ),
  //   ];

  //   setValue("sub_category_id", merged);
  // }, [selectedCategoryArr, subCategories, selectedSubCategoryArr, setValue]);

  useEffect(() => {
    if (address_state_id === null) {
      dispatch(resetAddressDistricts());
      setAddressTownshipsArr([]);
      dispatch(resetAddressCities());
      dispatch(resetAddressWards());
      dispatch(resetAddressVillageTracts());
      dispatch(resetAddressVillages());
    } else if (address_district_id === null) {
      const townshipsArr = addressStates
        .filter((state) => state.id === address_state_id)
        .map((state) => state.townships)
        .flat();
      setAddressTownshipsArr(townshipsArr);

      dispatch(resetAddressCities());
      dispatch(resetAddressWards());
      dispatch(resetAddressVillageTracts());
      dispatch(resetAddressVillages());
    } else if (address_township_id === null) {
      dispatch(resetAddressCities());
      dispatch(resetAddressWards());
      dispatch(resetAddressVillageTracts());
      dispatch(resetAddressVillages());
    } else if (address_city_id === null) {
      dispatch(resetAddressWards());
      dispatch(resetAddressVillageTracts());
      dispatch(resetAddressVillages());
    } else if (address_ward_id === null) {
      dispatch(resetAddressVillageTracts());
      dispatch(resetAddressVillages());
    } else if (address_village_tract_id === null) {
      dispatch(resetAddressVillages());
    }
  }, [
    dispatch,
    address_state_id,
    address_district_id,
    address_township_id,
    address_city_id,
    address_ward_id,
    address_village_tract_id,
  ]);

  useEffect(() => {
    if (open) {
      dispatch(getAddressStates());
      dispatch(getProjectCategory());
      dispatch(getSubCategory());
    }
  }, [dispatch, open]);

  useEffect(() => {
    if (address_state_id) {
      dispatch(getAddressDistricts({ address_state_id: address_state_id }));
    }
  }, [dispatch, address_state_id]);

  useEffect(() => {
    if (
      address_state_id &&
      address_township_id &&
      address_district_id === null
    ) {
      dispatch(
        getDistrictByStateAndTownship({
          addressStateId: address_state_id,
          addressTownshipId: address_township_id,
        })
      );
    } else if (!address_township_id && address_state_id) {
      dispatch(getAddressDistricts({ address_state_id: address_state_id }));
    }
  }, [dispatch, address_township_id, address_state_id, address_district_id]);

  useEffect(() => {
    if (address_state_id && address_township_id) {
      let district_id = addressTownshipsArr.find(
        (township) => township.id === address_township_id
      )?.address_district_id;
      let temp_address_district_id = addressDistricts.find(
        (district) => district.id === district_id
      )?.id;
      setValue("address_district_id", temp_address_district_id);
    }
  }, [
    address_township_id,
    address_state_id,
    addressDistricts,
    addressTownshipsArr,
  ]);

  useEffect(() => {
    if (address_state_id) {
      const townshipsArr = addressStates
        .filter((state) => state.id === address_state_id)
        .map((state) => state.townships)
        .flat();
      setAddressTownshipsArr(townshipsArr);
    }
  }, [address_state_id, addressStates]);

  useEffect(() => {
    if (address_district_id && !address_township_id) {
      dispatch(getAddressTownships({ address_district_id }));
    }
  }, [dispatch, address_district_id, address_township_id]);

  useEffect(() => {
    setAddressTownshipsArr(addressTownships);
  }, [addressTownships]);

  useEffect(() => {
    if (address_township_id) {
      dispatch(getAddressCities({ address_township_id }));
    }
  }, [dispatch, address_township_id]);

  useEffect(() => {
    if (address_city_id) {
      dispatch(getAddressWards({ address_city_id }));
    }
  }, [dispatch, address_city_id]);

  useEffect(() => {
    if (address_township_id) {
      dispatch(getAddressVillageTracts({ address_township_id }));
    }
  }, [dispatch, address_township_id]);

  useEffect(() => {
    if (address_village_tract_id) {
      dispatch(getAddressVillages({ address_village_tract_id }));
    }
  }, [dispatch, address_village_tract_id]);

  useEffect(() => {
    if (editFlag === false) {
      reset();
    }
  }, [editFlag, editValues, open, reset]);

  const handleClickSubmit = (data) => {
    handleSubmit((data) => {
      onSubmit(data, editFlag);
      onClose(); // Close the dialog after submission
    })();
  };

  useEffect(() => {
    if (open && editFlag && selectedId) {
      reset(editValues);
    }
  }, [open, editFlag, selectedId, editValues, reset]);

  return (
    <Dialog open={open}>
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
        Exclude BlackList Area
      </DialogTitle>
      <DialogContent>
        {/* <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300px", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
            marginTop: "20px",
          }}
        > */}
        <Grid
          container
          spacing={2}
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid
            container
            item
            spacing={2}
            xs={12}
            sm={6}
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs={12}>
              {" "}
              <label style={{ fontWeight: "bold" }}>Address</label>
            </Grid>
            <Grid item xs={12}>
              {addressStateLoading ? (
                <Skeleton variant="rectangular" height={37.13} />
              ) : (
                <FormInputSelect
                  control={control}
                  options={addressStates}
                  getOptionLabel={(option) => option?.name}
                  id="id"
                  name="address_state_id"
                  label="State"
                  onSelect={(value) => {
                    setValue("address_district_id", "");
                    setValue("address_township_id", "");
                    setValue("address_city_id", "");
                    setValue("address_ward_id", "");
                    setValue("address_village_tract_id", "");
                    setValue("address_village_id", "");
                  }}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              {addressDistrictsLoading ? (
                <Skeleton variant="rectangular" height={37.13} />
              ) : (
                <FormInputSelect
                  control={control}
                  options={addressDistricts}
                  getOptionLabel={(option) => option?.name}
                  id="id"
                  name="address_district_id"
                  label="District"
                  onSelect={(value) => {
                    setValue("address_township_id", "");
                    setValue("address_city_id", "");
                    setValue("address_ward_id", "");
                    setValue("address_village_tract_id", "");
                    setValue("address_village_id", "");
                  }}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              {addressTownshipLoading ? (
                <Skeleton variant="rectangular" height={37.13} />
              ) : (
                <FormInputSelect
                  control={control}
                  options={addressTownshipsArr}
                  getOptionLabel={(option) => option?.name}
                  id="id"
                  name="address_township_id"
                  label="Township"
                  onSelect={(value) => {
                    setValue("address_city_id", "");
                    setValue("address_ward_id", "");
                    setValue("address_village_tract_id", "");
                    setValue("address_village_id", "");
                  }}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              {addressCitiesLoading ? (
                <Skeleton variant="rectangular" height={37.13} />
              ) : (
                <FormInputSelect
                  control={control}
                  options={addressCities}
                  getOptionLabel={(option) => option?.name}
                  id="id"
                  name="address_city_id"
                  label="City"
                  onSelect={(value) => {
                    setValue("address_ward_id", "");
                    setValue("address_village_tract_id", "");
                    setValue("address_village_id", "");
                  }}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              {addressWardsLoading ? (
                <Skeleton variant="rectangular" height={37.13} />
              ) : (
                <FormInputSelect
                  control={control}
                  options={addressWards}
                  getOptionLabel={(option) => option?.name}
                  id="id"
                  name="address_ward_id"
                  label="Ward"
                  onSelect={(value) => {
                    setValue("address_village_tract_id", "");
                    setValue("address_village_id", "");
                  }}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              {addressVillageTractsLoading ? (
                <Skeleton variant="rectangular" height={37.13} />
              ) : (
                <FormInputSelect
                  control={control}
                  options={addressVillageTracts}
                  getOptionLabel={(option) => option?.name}
                  id="id"
                  name="address_village_tract_id"
                  label="Village Tract"
                  onSelect={(value) => {
                    setValue("address_village_id", "");
                    setValue("address_city_id", "");
                    setValue("address_ward_id", "");
                  }}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              {addressVillageLoading ? (
                <Skeleton variant="rectangular" height={37.13} />
              ) : (
                <FormInputSelect
                  control={control}
                  options={addressVillages}
                  getOptionLabel={(option) => option?.name}
                  id="id"
                  name="address_village_id"
                  label="Village"
                  onSelect={(value) => {
                    setValue("address_city_id", "");
                    setValue("address_ward_id", "");
                  }}
                />
              )}
            </Grid>
          </Grid>
          <Grid
            container
            item
            spacing={2}
            xs={12}
            sm={6}
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs={12}>
              {" "}
              <label style={{ fontWeight: "bold" }}>Category</label>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="category_id"
                control={control}
                defaultValue={[]}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <Autocomplete
                    multiple
                    disableCloseOnSelect
                    options={projectCategories ?? []}
                    value={value || []}
                    onChange={(_, newValue) => onChange(newValue)}
                    getOptionLabel={(option) => option?.name || ""}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    limitTags={2}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                          checkedIcon={<CheckBoxIcon fontSize="small" />}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.name}
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Category"
                        size="small"
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="sub_category_id"
                control={control}
                defaultValue={[]}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <Autocomplete
                    multiple
                    disableCloseOnSelect
                    options={subCategoriesArr ?? []}
                    value={value || []}
                    // onChange={(_, newValue) => onChange(newValue)}
                    onChange={(_, newValue) => {
                      const removed = (value || []).filter(
                        (v) => !newValue.find((nv) => nv.id === v.id)
                      );
                      const removedIds = removed.map((r) => r.id);
  
                      setManuallyRemovedSubCategoryIds((prev) => [
                        ...new Set([...prev, ...removedIds]),
                      ]);
  
                      onChange(newValue);
                    }}
                    getOptionLabel={(option) => option?.name || ""}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    limitTags={2}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                          checkedIcon={<CheckBoxIcon fontSize="small" />}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.name}
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Sub Category"
                        size="small"
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>
        {/* </Stack> */}
        <DialogActions sx={{ p: "1.25rem" }}>
          <Button
            onClick={() => {
              reset();
              onClose();
              setManuallyRemovedSubCategoryIds([]);
            }}
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
          <Button type="submit" onClick={handleClickSubmit} variant="contained">Submit</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default EditBlackListAreaModal;
