import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, Skeleton } from "@mui/material";
import FormInputText from "components/form/FormInputText";
import Accordion from "components/Accordion";
import { useWatch, useController } from "react-hook-form";
import FormInputSelect from "components/form/FormInputSelect";
import { getTypeofBusinesses } from "modules/administration/slices/typeofbusinessSlice";
import { getMainBusinessCategories } from "modules/administration/slices/mainbusinesscategorySlice";
import { getSubBusinessCategories } from "modules/administration/slices/subbusinesscategorySlice";
import FormInputNumber from "components/form/FormInputNumber";
import {
  getAddressDistricts,
  getDistrictByStateAndTownship,
} from "modules/administration/slices/addressDistrictSlice";
import { getAddressTownships } from "modules/administration/slices/addressTownshipSlice";
import { getAddressCities } from "modules/administration/slices/addressCitySlice";

const ApplicationGuarantorOccupation = ({ control, category, setValue }) => {
  const dispatch = useDispatch();

  const { typeofBusinesses } = useSelector((state) => state.typeofBusinesses);

  const [addressTownshipsArr, setAddressTownshipsArr] = useState([]);

 

  const address_district_id = useWatch({
    control,
    name: "employment_district_id",
  });
  const address_state_id = useWatch({
    control,
    name: "employment_state_id",
  });
  const address_township_id = useWatch({
    control,
    name: "employment_township_id",
  });

  const address_city_id = useWatch({
    control,
    name: "employment_city_id",
  });


  const { mainBusinessCategories } = useSelector(
    (state) => state.mainBusinessCategories
  );

  const { subBusinessCategories } = useSelector(
    (state) => state.subBusinessCategories
  );

  const { addressStates, isLoading: addressStateLoading } = useSelector(
    (state) => state.addressStates
  );

  const { addressTownships, isLoading: addressTownshipLoading } = useSelector(
    (state) => state.addressTownships
  );

  const { addressCities, isLoading: addressCitiesLoading } = useSelector(
    (state) => state.addressCities
  );

  const { addressDistricts, isLoading: addressDistrictsLoading } = useSelector(
    (state) => state.addressDistricts
  );

  useEffect(() => {
    if (address_state_id) {
      dispatch(getAddressDistricts({ address_state_id }));
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
      dispatch(getAddressDistricts({ address_state_id }));
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
      setValue("employment_district_id", temp_address_district_id);
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


  const { field } = useController({
    name: "employment_full_address",
    control,
  });
  

  useEffect(() => {
    const state = addressStates.find((item) => item.id === address_state_id);
    const district = addressDistricts.find(
      (item) => item.id === address_district_id
    );
    const township = addressTownships.find(
      (item) => item.id === address_township_id
    );
    const city = addressCities.find((item) => item.id === address_city_id);

    // const employment_full_address =
    //   (state ? state.name : "") +
    //   (district ? `/${district.name}` : "") +
    //   (township ? `/${township.name}` : "") +
    //   (city ? `/${city.name}` : "") +
    // field.onChange(employment_full_address);

    const employment_full_address =
      (state ? state.name : "") +
      (district ? `/${district.name}` : "") +
      (township ? `/${township.name}` : "") +
      (city ? `/${city.name}` : "");

    field.onChange(employment_full_address);

  }, [
    field,
    addressStates,
    addressDistricts,
    addressTownships,
    addressCities,
    address_state_id,
    address_district_id,
    address_township_id,
    address_city_id,
  ]);

  useEffect(() => {
    dispatch(getTypeofBusinesses());
    dispatch(getMainBusinessCategories());
    dispatch(getSubBusinessCategories());
  }, [dispatch]);

  const main_business_category_id = useWatch({
    control,
    name: "main_business_category_id",
  });

  const subBusinessCategoriesByMainBusinessCategoryId = useMemo(
    () =>
      subBusinessCategories.filter(
        (item) => item?.main_business_category_id === main_business_category_id
      ),
    [subBusinessCategories, main_business_category_id]
  );

  const disabled = useWatch({
    control,
    name: "disabled",
  });

  return (
    <Box
      sx={{
        px: 1,
        pb: 1,
        display: "flex",
        gap: 2,
        "@media (max-width: 600px)": {
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ width: "100%", flex: 1 }}>
        <Accordion title="Occupational Information">
          <Box sx={{ mt: 1 }}>
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
                  <FormInputNumber
                    disabled={disabled}
                    control={control}
                    label="Employment Period Year"
                    name="employment_period_year"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputNumber
                    control={control}
                    label="Employment Period Month"
                    name="employment_period_month"
                    disabled={disabled}
                  />
                </Grid>
                {category === 3 && (
                  <Grid item xs={12}>
                    <FormInputText
                      control={control}
                      label="Type of Business(Api)"
                      name="kpay_type_of_business"
                      disabled
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <FormInputSelect
                    control={control}
                    options={typeofBusinesses}
                    getOptionLabel={(option) => option?.code}
                    id="id"
                    name="type_of_business_id"
                    label="Type of Business"
                    disabled={disabled}
                  />
                </Grid>
                {category === 3 && (
                  <Grid item xs={12}>
                    <FormInputText
                      control={control}
                      label="Main Business Category(Api)"
                      name="kpay_main_business_category"
                      disabled
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <FormInputSelect
                    control={control}
                    options={mainBusinessCategories}
                    getOptionLabel={(option) => option?.bc1_code}
                    id="id"
                    label="Main Business Category"
                    name="main_business_category_id"
                    disabled={disabled}
                  />
                </Grid>
                {category === 3 && (
                  <Grid item xs={12}>
                    <FormInputText
                      control={control}
                      label="Sub Business Category(Api)"
                      name="kpay_sub_business_category"
                      disabled
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <FormInputSelect
                    control={control}
                    options={subBusinessCategoriesByMainBusinessCategoryId}
                    getOptionLabel={(option) => option?.bc2_code}
                    id="id"
                    label="Sub Business Category"
                    name="sub_business_category_id"
                    disabled={disabled}
                  />
                </Grid>
                {addressStateLoading ? (
                  <Skeleton variant="rectangular" height={37.13} />
                ) : (
                  <Grid item xs={12}>
                    <FormInputSelect
                      control={control}
                      options={addressStates}
                      getOptionLabel={(option) => option?.name}
                      id="id"
                      name="employment_state_id"
                      label="State"
                      disabled={disabled}
                    />
                  </Grid>
                )}
                {addressDistrictsLoading ? (
                  <Skeleton variant="rectangular" height={37.13} />
                ) : (
                  <Grid item xs={12}>
                    <FormInputSelect
                      control={control}
                      options={addressDistricts}
                      getOptionLabel={(option) => option?.name}
                      id="id"
                      name="employment_district_id"
                      label="District"
                      disabled={disabled}
                    />
                  </Grid>
                )}
                {addressTownshipLoading ? (
                  <Skeleton variant="rectangular" height={37.13} />
                ) : (
                  <Grid item xs={12}>
                    <FormInputSelect
                      control={control}
                      options={addressTownshipsArr}
                      getOptionLabel={(option) => option?.name}
                      id="id"
                      name="employment_township_id"
                      label="Township"
                      disabled={disabled}
                    />
                  </Grid>
                )}
                {addressCitiesLoading ? (
                  <Skeleton variant="rectangular" height={37.13} />
                ) : (
                  <Grid item xs={12}>
                    <FormInputSelect
                      control={control}
                      options={addressCities}
                      getOptionLabel={(option) => option?.name}
                      id="id"
                      name="employment_city_id"
                      label="City"
                      disabled={disabled}
                    />
                  </Grid>
                )}

                <Grid item xs={12}>
                  <FormInputText
                    multiline
                    control={control}
                    label="Street/Road"
                    name="employment_road_street"
                    disabled={disabled}
                    sx={{
                      pt: 1,
                      textarea: {
                        minHeight: "80px",
                        maxHeight: "80px",
                        overflow: "auto !important",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    multiline
                    control={control}
                    label="Full Address"
                    name="employment_full_address"
                    disabled
                    sx={{
                      pt: 1,
                      textarea: {
                        minHeight: "100px",
                        maxHeight: "100px",
                        overflow: "auto !important",
                      },
                    }}
                  />
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
                  <FormInputText
                    control={control}
                    label="Name of Business"
                    name="name_of_business"
                    disabled={disabled}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Business Address"
                    name="employment_full_address"
                    disabled={disabled}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    disabled={disabled}
                    control={control}
                    label="Details of Business"
                    name="details_of_business"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    disabled={disabled}
                    control={control}
                    label="Title Position"
                    name="title_position"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputNumber
                    disabled={disabled}
                    control={control}
                    label="Monthly Income"
                    name="monthly_income"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Accordion>
      </Box>
    </Box>
  );
};

export default React.memo(ApplicationGuarantorOccupation);
