import * as React from "react";
import { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Skeleton,
} from "@mui/material";
import FormInputText from "components/form/FormInputText";
import FormInputSelect from "components/form/FormInputSelect";
import { useSelector, useDispatch } from "react-redux";
import { getAddressTownships } from "modules/administration/slices/addressTownshipSlice";
import { getAddressCities } from "modules/administration/slices/addressCitySlice";
import { getAddressWards } from "modules/administration/slices/addressWardSlice";
import FormInputNumber from "components/form/FormInputNumber";
import FormInputDatePicker from "components/form/FormInputDatePicker";
import CommonMessage from "common/CommonMessage";
import { useWatch } from "react-hook-form";

export const CreateEditBillingDateModal = ({
  open,
  onClose,
  editValues,
  setEditValues,
  editFlag,
  control,
  handleSubmit,
  onSubmit,
  reset,
  setValue,
}) => {
  const dispatch = useDispatch();

  const { addressTownships, isLoading } = useSelector(
    (state) => state.addressTownships
  );

  const { addressCities, isLoading: isAddressCityLoading, } = useSelector((state) => state.addressCities);

  const { addressWards, isLoading: isAddressWardLoading, } = useSelector((state) => state.addressWards);

  const township_id = useWatch({
    control,
    name: "township_id",
  });

  const city_id = useWatch({
    control,
    name: "city_id",
  });

  useEffect(() => {
    if (editFlag === false) {
      reset();
    }
  }, [editFlag, editValues, open]);

  useEffect(() => {
    dispatch(getAddressTownships());
  }, [dispatch]);

  useEffect(() => {
    if (township_id) {
      dispatch(getAddressCities({ address_township_id: township_id }));
    }
  }, [dispatch, township_id]);

  useEffect(() => {
    if (city_id) {
      dispatch(getAddressWards({ address_city_id: city_id }));
    }
  }, [dispatch, city_id]);

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {editFlag === true ? "Edit Billing Date" : "Create New Billing Date"}
      </DialogTitle>
      <DialogContent>
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300px", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
          }}
        >
          <FormInputText
            control={control}
            label={<span className="required">MNet Township Code</span>}
            name="mnet_township_code"
            rules={{ required: true }}
          />
          <FormInputText
            control={control}
            label={<span className="required">MNet Township</span>}
            name="mnet_township"
            rules={{ required: true }}
          />
        </Stack>
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300px", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
            marginTop: "20px",
          }}
        >
          {isLoading ? (
            <Skeleton variant="rectangular" height={37.13} />
          ) : (
            <FormInputSelect
              control={control}
              options={addressTownships}
              getOptionLabel={(option) => option?.name || ""}
              id="id"
              name="township_id"
              label={<span className="required">Township</span>}
              rules={{ required: true }}
              onSelect={(value) => {
                setValue("city_id", "");
                setValue("ward_id", "");
              }}
            />
          )}
        </Stack>
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300px", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
            marginTop: "20px",
          }}
        >
          {isAddressCityLoading ? (
            <Skeleton variant="rectangular" height={37.13} />
          ) : (
            <FormInputSelect
              control={control}
              options={addressCities}
              getOptionLabel={(option) => option?.name || ""}
              id="id"
              name="city_id"
              label={<span className="required">City</span>}
              rules={{ required: true }}
              onSelect={(value) => {
                setValue("ward_id", "");
              }}
            />
          )}
        </Stack>
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300px", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          {isAddressWardLoading ? (
            <Skeleton variant="rectangular" height={37.13} />
          ) : (
            <FormInputSelect
              control={control}
              options={addressWards}
              getOptionLabel={(option) => option?.name || ""}
              id="id"
              name="ward_id"
              label="Ward"
            />
          )}
        </Stack>
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300px", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
          }}
        >
          <FormInputText
            control={control}
            label={<span className="required">Collection Date Range</span>}
            name="collection_date_range"
            rules={{ required: true }}
          />
          <FormInputNumber
            control={control}
            label={<span className="required">First Due Date</span>}
            name="first_due_date"
            rules={{ required: true }}
          />
          <FormInputText control={control} label="Version" name="version" />
          <FormInputDatePicker
            control={control}
            label="Version Start Date"
            name="version_start_date"
          />
          <FormInputDatePicker
            control={control}
            label="Version End Date"
            name="version_end_date"
          />
        </Stack>
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300px", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
            marginTop: "30px",
          }}
        >
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
        </Stack>
        <DialogActions sx={{ p: "1.25rem" }}>
          <Button
            onClick={() => {
              reset();
              setEditValues("");
              onClose();
            }}
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={() => {
              handleSubmit((data) => onSubmit(data, editFlag))();
            }}
            variant="contained"
          >
            {editFlag === true ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditBillingDateModal;
