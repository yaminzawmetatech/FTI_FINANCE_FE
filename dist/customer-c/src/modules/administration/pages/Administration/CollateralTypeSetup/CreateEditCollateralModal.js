import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import useVehicleForm from "./CollateralTypeHook";
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
import { getMobCategory } from "modules/administration/slices/projectcategorySlice";
import { getAllVehicles } from "modules/loan-operation/slices/vehicleSlice";
import { dispatch } from "store/index";
import { useWatch } from "react-hook-form";
import useCollateralTypeForm from "./CollateralTypeHook";


export const CreateEditCollateralTypeModal = ({
  open,
  onClose,
  editValues,
  editFlag,
}) => {
  const { control, onSubmit, handleSubmit, reset, setValue } = useCollateralTypeForm();

  const { projectCategories } = useSelector((state) => state.projectCategories);

  const { subCategories } = useSelector((state) => state.subCategories);

  const category_id = useWatch({
    control,
    name: "category_id",
  });


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

  const subCategoriesByCategory = useMemo(
    () => subCategories.filter((item) => item?.category_id === category_id),
    [subCategories, category_id]
  );



  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {editFlag === true ? "Edit Vehicle" : "Create New Vehicle"}
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

          <FormInputSelect
            control={control}
            options={projectCategories ?? []}
            getOptionLabel={(option) => option?.name || ""}
            id="id"
            name="category_id"
            label={<span className="required">Category</span>}
            rules={{
              required: true,
            }}
          />
          <FormInputSelect
            control={control}
            options={subCategoriesByCategory ?? []}
            getOptionLabel={(option) => option?.name || ""}
            id="id"
            name="sub_category_id"
            label={<span className="required">Sub Category</span>}
          // rules={{
          //   required: true,
          // }}
          />
          <FormInputText
            control={control}
            name="name"
            label={<span className="required"> Name</span>}

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

export default CreateEditCollateralTypeModal;
