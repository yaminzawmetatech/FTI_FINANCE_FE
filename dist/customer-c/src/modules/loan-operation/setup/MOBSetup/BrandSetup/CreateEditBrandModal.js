import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useBrandForm from "./BrandHook";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import FormInputCheckbox from "components/form/FormInputCheckbox";
import FormInputSelect from "components/form/FormInputSelect";
import FormInputText from "components/form/FormInputText";

export const CreateEditBrandModal = ({
  open,
  onClose,
  editValues,
  editFlag,
}) => {
  const { control, onSubmit, handleSubmit, reset, setValue } = useBrandForm();

  const { vehicles } = useSelector((state) => state.vehicles);

  // const { getCategories } = useSelector(
  //   (state) => state.dealerContactPeople
  // );stener indicated an asynchronous response by returning true, but the message channel closed before a response was received

  useEffect(() => {
    if (editFlag === false) {
      reset();
      setValue("in_active", true);
    }
  }, [editFlag, editValues, open, reset]);

  const handleClickSubmit = (data) => {
    handleSubmit(async (data) => {
      const isSuccess = await onSubmit(data, editFlag);
      if (isSuccess) {
        onClose(); // Close the modal if successful
      }
    })();
  };

  useEffect(() => {
    if (open && editFlag) {
      reset({
        ...editValues,
        in_active: editValues?.in_active === 1 ? true : false,
      });
    }
  }, [open, editFlag, editValues, reset]);

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {editFlag === true ? "Edit Brand" : "Create New Brand"}
      </DialogTitle>
      <DialogContent>
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300px", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
            marginTop: "20px",
          }}
        >
          <FormInputText
            control={control}
            label={<span className="required">Brand Name</span>}
            name="brand_name"
            rules={{
              required: false,
            }}
          />
          <FormInputText
            control={control}
            label={<span>Brand Code</span>}
            name="brand_code"
            rules={{
              required: false,
            }}
          />
            <FormInputText
            control={control}
            label={<span>Description</span>}
            name="description"
            rules={{
              required: false,
            }}
          />
        </Stack>
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
          }}
        >
        </Stack>
        <DialogActions sx={{ p: "1.25rem" }}>
          <Button
            onClick={() => {
              reset();
              onClose();
            }}
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
          <Button type="submit" onClick={handleClickSubmit} variant="contained">
            {editFlag === true ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditBrandModal;
