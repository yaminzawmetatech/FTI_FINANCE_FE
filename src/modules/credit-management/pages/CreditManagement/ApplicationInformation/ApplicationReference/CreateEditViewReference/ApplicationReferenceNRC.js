import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, FormControl, FormLabel, Grid } from "@mui/material";
import FormInputText from "components/form/FormInputText";
import Accordion from "components/Accordion";
import { useController, useWatch } from "react-hook-form";
import FormInputSelect from "components/form/FormInputSelect";
import { getNRCStates } from "modules/administration/slices/nrcStateSlice";
import { getNRCTownships } from "modules/administration/slices/nrcTownshipSlice";

const ApplicationReferenceNRC = ({ control }) => {
  const { field } = useController({
    name: "full_nrc",
    control,
  });
  const dispatch = useDispatch();
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

  const { nrcStates, isLoading: nrcStateLoading } = useSelector(
    (state) => state.nrcStates
  );
  const { nrcTownships, isLoading: nrcTownshipLoading } = useSelector(
    (state) => state.nrcTownships
  );

  const nrcTownshipsByNrcState = useMemo(
    () => nrcTownships.filter((item) => item?.n_r_c_state_id === nrc_state_id),
    [nrcTownships, nrc_state_id]
  );
  useEffect(() => {
    dispatch(getNRCStates());
    dispatch(getNRCTownships());
  }, [dispatch]);

  useEffect(() => {
    const nrc_state = nrcStates.find((item) => item.id === nrc_state_id);
    const nrc_township = nrcTownships.find(
      (item) => item.id === nrc_township_id
    );
    const nrc =
      (nrc_state ? nrc_state.state_code : "") +
      (nrc_township ? `/${nrc_township.township_nrc_code}` : "") +
      (nrc_remark ? `(${nrc_remark})` : "") +
      (nrc_number || "");

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

  const disabled = useWatch({
    control,
    name: "disabled",
  });

  return (
    <Grid
      container
      item
      spacing={2}
      xs={12}
      sm={12}
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Grid item xs={12}>
        <FormInputSelect
          control={control}
          options={nrcStates}
          getOptionLabel={(option) => option?.state_code}
          id="id"
          name="nrc_state_id"
          label="NRC State/Division"
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={12}>
        <FormInputSelect
          control={control}
          options={nrcTownshipsByNrcState}
          getOptionLabel={(option) => option?.township_nrc_code}
          id="id"
          name="nrc_township_id"
          label="NRC District/Township"
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={12}>
        <FormInputSelect
          control={control}
          options={[{ id: "N" }, { id: "E" }, { id: "P" }, { id: "C" }]}
          getOptionLabel={(option) => option?.id}
          id="id"
          name="nrc_remark"
          label="NRC Remark"
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={12}>
        <FormInputText
          control={control}
          label="NRC Number"
          name="nrc_number"
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={12}>
        <FormInputText control={control} disabled name="full_nrc" label="NRC" />
      </Grid>
    </Grid>
  );
};

export default React.memo(ApplicationReferenceNRC);
