import React from "react";
import { Grid, Skeleton } from "@mui/material";
import FormInputText from "components/form/FormInputText";
import FormInputSelect from "components/form/FormInputSelect";
import FormInputCheckbox from "components/form/FormInputCheckbox";

const ApplicationPermanentAddress = ({
  disabled,
  control,
  setValue,
  addressCities,
  addressCitiesLoading,
  addressDistricts,
  addressDistrictsLoading,
  addressStateLoading,
  addressStates,
  addressTownshipLoading,
  addressVillageLoading,
  addressVillages,
  addressVillageTracts,
  addressVillageTractsLoading,
  addressWards,
  addressWardsLoading,
  permanentAddressTownshipsArr,
  category,
}) => {
  return (
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
        <Grid
          container
          spacing={2}
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={12}>
            <label style={{ fontWeight: "bold", paddingRight: "15px" }}>
              Permanent Address
            </label>
            <FormInputCheckbox
              control={control}
              label="Copy From Current Address?"
              name="current_permanent_same"
              disabled={disabled}
            />
          </Grid>
        </Grid>
      </Grid>
      {category === 3 && (
        <Grid item xs={12}>
          <FormInputText
            multiline
            control={control}
            label="Permanent Address(Api)"
            name="kpay_permanent_address"
            disabled
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
      )}
      {category === 1 && (
        <Grid item xs={12}>
          <FormInputText
            multiline
            control={control}
            label="Mnet Permanent Address(Api)"
            name="mnet_permanent_address"
            disabled
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
      )}
      <Grid item xs={12}>
        {addressStateLoading ? (
          <Skeleton variant="rectangular" height={37.13} />
        ) : (
          <FormInputSelect
            control={control}
            options={addressStates}
            getOptionLabel={(option) => option?.name}
            id="id"
            name="permanent_state_id"
            label="State"
            disabled={disabled}
            onSelect={() => {
              setValue("permanent_district_id", "");
              setValue("permanent_township_id", "");
              setValue("permanent_city_id", "");
              setValue("permanent_ward_id", "");
              setValue("permanent_village_tract_id", "");
              setValue("permanent_village_id", "");
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
            name="permanent_district_id"
            label="District"
            disabled={disabled}
            onSelect={() => {
              setValue("permanent_township_id", "");
              setValue("permanent_city_id", "");
              setValue("permanent_ward_id", "");
              setValue("permanent_village_tract_id", "");
              setValue("permanent_village_id", "");
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
            options={permanentAddressTownshipsArr}
            getOptionLabel={(option) => option?.name}
            id="id"
            name="permanent_township_id"
            label="Township"
            disabled={disabled}
            onSelect={() => {
              setValue("permanent_city_id", "");
              setValue("permanent_ward_id", "");
              setValue("permanent_village_tract_id", "");
              setValue("permanent_village_id", "");
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
            name="permanent_city_id"
            label="City"
            disabled={disabled}
            onSelect={() => {
              setValue("permanent_ward_id", "");
              setValue("permanent_village_tract_id", "");
              setValue("permanent_village_id", "");
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
            name="permanent_ward_id"
            label="Ward"
            onSelect={() => {
              setValue("permanent_village_tract_id", "");
              setValue("permanent_village_id", "");
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
            name="permanent_village_tract_id"
            label="Village Tract"
            disabled={disabled}
            onSelect={() => {
              setValue("permanent_village_id", "");
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
            name="permanent_village_id"
            label="Village"
            disabled={disabled}
          />
        )}
      </Grid>
      <Grid item xs={12}>
        <FormInputText
          multiline
          control={control}
          label="Street/Road"
          name="permanent_road_street"
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
          name="permanent_address_full_address"
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
  );
};

export default React.memo(ApplicationPermanentAddress);
