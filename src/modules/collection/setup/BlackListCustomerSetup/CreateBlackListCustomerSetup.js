import * as React from "react";
import { useState, useEffect } from "react";
import { Breadcrumbs, Typography, Button, Grid, Skeleton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import FormInputText from "components/form/FormInputText";
import useBlackListCustomerSetupHookForm from "./BlackListCustomerSetupHook";
import { getNRCStates } from "modules/administration/slices/nrcStateSlice";
import { getNRCTownships } from "modules/administration/slices/nrcTownshipSlice";
import { getNRCRemarks } from "modules/administration/slices/NRCRemarkSlice";
import FormInputSelect from "components/form/FormInputSelect";
import { useController, useWatch } from "react-hook-form";
import { getAddressStates } from "modules/administration/slices/addressStateSlice";
import { getAddressTownships } from "modules/administration/slices/addressTownshipSlice";
import { getAddressWards } from "modules/administration/slices/addressWardSlice";
import { getAddressVillages } from "modules/administration/slices/addressVillageSlice";
import {
  getAddressDistricts,
  getDistrictByStateAndTownship,
} from "modules/administration/slices/addressDistrictSlice";
import { getAddressCities } from "modules/administration/slices/addressCitySlice";
import { getAddressVillageTracts } from "modules/administration/slices/addressVillageTractSlice";
import { resetAddressDistricts } from "modules/administration/slices/addressDistrictSlice";
import { resetAddressCities } from "modules/administration/slices/addressCitySlice";
import { resetAddressWards } from "modules/administration/slices/addressWardSlice";
import { resetAddressVillageTracts } from "modules/administration/slices/addressVillageTractSlice";
import { resetAddressVillages } from "modules/administration/slices/addressVillageSlice";
import { useParams } from "react-router-dom";
import CommonMessage from "common/CommonMessage";

const CreateBlackListCustomerSetup = ({}) => {
  const { mode } = useParams();
  const dispatch = useDispatch();

  const { control, onSubmit, handleSubmit, reset, setValue } =
    useBlackListCustomerSetupHookForm();

  const { field } = useController({
    name: "full_nrc",
    control,
  });

  const nrc_state_id = useWatch({
    control,
    name: "nrc_state_id",
  });

  const nrc_township_id = useWatch({
    control,
    name: "nrc_township_id",
  });

  const nrc_number = useWatch({
    control,
    name: "nrc_number",
  });

  const nrc_remark = useWatch({
    control,
    name: "nrc_remark",
  });

  const nrc = useWatch({
    control,
    name: "full_nrc",
  });

  const { field: nrcTownshipField } = useController({
    name: "nrc_township_id",
    control,
  });

  const [addressTownshipsArr, setAddressTownshipsArr] = useState([]);

  const { field: field_address_full_address } = useController({
    name: "address_full_address",
    control,
  });

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

  const address_street = useWatch({
    control,
    name: "address_street",
  });

  const { nrcStates, isLoading: nrcStateLoading } = useSelector(
    (state) => state.nrcStates
  );
  const { nrcTownships, isLoading: nrcTownshipLoading } = useSelector(
    (state) => state.nrcTownships
  );

  // for NRC Remark (/N,E,P)
  const { nrcRemarks, isLoading: isNRCRemarkLoading } = useSelector(
    (state) => state.nrcRemarks
  );

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

  useEffect(() => {
    if (nrc_state_id) {
      dispatch(
        getNRCTownships({
          n_r_c_state_id: nrc_state_id,
        })
      );
    }
  }, [dispatch, nrc_state_id]);

  useEffect(() => {
    dispatch(getNRCStates());
    dispatch(getNRCRemarks());
    dispatch(getAddressStates());
  }, [dispatch]);

  useEffect(() => {
    const nrc_state = nrcStates.find((item) => item.id === nrc_state_id);
    const nrc_township = nrcTownships.find(
      (item) => item.id === nrc_township_id
    );
    const nrc =
      nrc_state?.state_code &&
      nrc_township?.township_nrc_code &&
      nrc_remark &&
      nrc_number
        ? `${nrc_state?.state_code || ""}/${
            nrc_township?.township_nrc_code || ""
          }(${nrc_remark || ""})${nrc_number || ""}`
        : "";
    field.onChange(nrc);
  }, [
    field,
    nrcStates,
    nrcTownships,
    nrc_number,
    nrc_remark,
    nrc_state_id,
    nrc_township_id,
  ]);

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
    } else if (address_township_id === null && address_state_id) {
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
  }, [address_state_id]);

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
    const state = addressStates.find((item) => item.id === address_state_id);
    const district = addressDistricts.find(
      (item) => item.id === address_district_id
    );
    const township = addressTownships.find(
      (item) => item.id === address_township_id
    );
    const city = addressCities.find((item) => item.id === address_city_id);
    const ward = addressWards.find((item) => item.id === address_ward_id);
    const village_tract = addressVillageTracts.find(
      (item) => item.id === address_village_tract_id
    );
    const village = addressVillages.find(
      (item) => item.id === address_village_id
    );

    const address_full_address =
      (state ? state.name : "") +
      (district ? `/${district.name}` : "") +
      (township ? `/${township.name}` : "") +
      (city ? `/${city.name}` : "") +
      (ward ? `/${ward.name}` : "") +
      (village_tract ? `/${village_tract.name}` : "") +
      (village ? `/${village.name}` : "") +
      (address_street ? `/${address_street}` : "" || "");

    field_address_full_address.onChange(address_full_address);
  }, [
    field_address_full_address,
    addressStates,
    addressDistricts,
    addressTownships,
    addressCities,
    addressWards,
    addressVillageTracts,
    addressVillages.address_state_id,
    address_district_id,
    address_township_id,
    address_city_id,
    address_ward_id,
    address_village_tract_id,
    address_village_id,
    address_street,
  ]);

  return (
    <>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ mb: 2 }}
        className="margin-top-8"
      >
        <Typography color="text.primary">Administration</Typography>
        <Typography color="text.primary">
          {mode === "create"? "Create New BlackList Customer" : "Edit BlackList Customer"}
        </Typography>
      </Breadcrumbs>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormInputText
            control={control}
            label="Code"
            name="black_list_customer_code"
            rules={{ required: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {addressStateLoading ? (
            <Skeleton variant="rectangular" height={37.13} />
          ) : (
            <FormInputSelect
              control={control}
              options={addressStates}
              getOptionLabel={(option) => option?.name}
              id="id"
              name="address_state_id"
              label="Address State"
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
        <Grid item xs={12} sm={6}>
          <FormInputText
            control={control}
            label="Name"
            name="black_list_customer_name"
            rules={{ required: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {addressDistrictsLoading ? (
            <Skeleton variant="rectangular" height={37.13} />
          ) : (
            <FormInputSelect
              control={control}
              options={addressDistricts}
              getOptionLabel={(option) => option?.name}
              id="id"
              name="address_district_id"
              label="Address District"
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
        <Grid item xs={12} sm={6}>
          <FormInputText
            control={control}
            label="Father Name"
            name="father_name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {addressTownshipLoading ? (
            <Skeleton variant="rectangular" height={37.13} />
          ) : (
            <FormInputSelect
              control={control}
              options={addressTownshipsArr}
              getOptionLabel={(option) => option?.name}
              id="id"
              name="address_township_id"
              label="Address Township"
              onSelect={(value) => {
                setValue("address_city_id", "");
                setValue("address_ward_id", "");
                setValue("address_village_tract_id", "");
                setValue("address_village_id", "");
              }}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          {nrcStateLoading ? (
            <Skeleton variant="rectangular" height={37.13} />
          ) : (
            <FormInputSelect
              control={control}
              options={nrcStates}
              getOptionLabel={(option) => option?.state_code}
              id="id"
              name="nrc_state_id"
              label="NRC State/Division"
              rules={{
                required: true,
              }}
              onSelect={(value) => {
                nrcTownshipField.onChange("");
              }}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          {addressCitiesLoading ? (
            <Skeleton variant="rectangular" height={37.13} />
          ) : (
            <FormInputSelect
              control={control}
              options={addressCities}
              getOptionLabel={(option) => option?.name}
              id="id"
              name="address_city_id"
              label="Address City"
              onSelect={(value) => {
                setValue("address_ward_id", "");
                setValue("address_village_tract_id", "");
                setValue("address_village_id", "");
              }}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          {nrcTownshipLoading ? (
            <Skeleton variant="rectangular" height={37.13} />
          ) : (
            <FormInputSelect
              control={control}
              options={nrcTownships}
              getOptionLabel={(option) => option?.township_nrc_code}
              id="id"
              name="nrc_township_id"
              label="NRC District/Township"
              rules={{
                required: true,
              }}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          {addressWardsLoading ? (
            <Skeleton variant="rectangular" height={37.13} />
          ) : (
            <FormInputSelect
              control={control}
              options={addressWards}
              getOptionLabel={(option) => option?.name}
              id="id"
              name="address_ward_id"
              label="Address Ward"
              onSelect={(value) => {
                setValue("address_village_tract_id", "");
                setValue("address_village_id", "");
              }}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          {isNRCRemarkLoading ? (
            <Skeleton variant="rectangular" height={37.13} />
          ) : (
            <FormInputSelect
              control={control}
              options={nrcRemarks}
              getOptionLabel={(option) => option?.value}
              id="value"
              name="nrc_remark"
              label="NRC Remark"
              rules={{
                required: true,
              }}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          {addressVillageTractsLoading ? (
            <Skeleton variant="rectangular" height={37.13} />
          ) : (
            <FormInputSelect
              control={control}
              options={addressVillageTracts}
              getOptionLabel={(option) => option?.name}
              id="id"
              name="address_village_tract_id"
              label="Address Village Tract"
              onSelect={(value) => {
                setValue("address_village_id", "");
              }}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInputText
            control={control}
            label="NRC Number"
            name="nrc_number"
            rules={{
              required: true,
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          {addressVillageLoading ? (
            <Skeleton variant="rectangular" height={37.13} />
          ) : (
            <FormInputSelect
              control={control}
              options={addressVillages}
              getOptionLabel={(option) => option?.name}
              id="id"
              name="address_village_id"
              label="Address Village"
            />
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInputText
            control={control}
            label="NRC"
            disabled
            name="full_nrc"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInputText
            multiline
            control={control}
            label="Address Street/Road"
            name="address_street"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInputText
            control={control}
            label="Passport No"
            name="passport_no"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInputText
            multiline
            control={control}
            label="Full Address"
            name="address_full_address"
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInputText
            control={control}
            label="Nationality"
            name="nationality"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormInputText
            control={control}
            label="Entity & other groups"
            name="entity_and_other_groups"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInputText control={control} label="Source" name="source" />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormInputText
            control={control}
            label="Removal Type"
            name="removal_type"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormInputText
            control={control}
            label="Description"
            name="description"
            rules={{
              maxLength: {
                value: 255,
                message: CommonMessage.MFE00003.replace(
                  "%s",
                  "Description"
                ).replace("%s", "255"),
              },
            }}
          />
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        sx={{ mt: 2, gap: 2, display: "flex", justifyContent: "flex-end" }}
      >
        <Button
          onClick={() => {
            reset();
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={() => {
            handleSubmit((data) => onSubmit(data))();
          }}
          variant="contained"
        >
          {mode === "edit" ? "Update" : "Save"}
        </Button>
      </Grid>
    </>
  );
};

export default CreateBlackListCustomerSetup;
