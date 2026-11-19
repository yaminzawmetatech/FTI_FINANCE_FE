import * as React from "react";
import { useEffect, useMemo } from "react";
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
import useInsurancePremiumFeeForm from "./InsurancePremiumFeeHook";
import FormInputSelect from "components/form/FormInputSelect";
import { getProjectCategory } from "modules/administration/slices/projectcategorySlice";
import { getSubCategory } from "modules/administration/slices/subcategorySlice";
import { dispatch } from "store/index";
import { useSelector } from "react-redux";
import { useWatch } from "react-hook-form";
import { getAllVehicles } from "modules/loan-operation/slices/vehicleSlice";
import FormInputDecimal from "components/form/FormInputDecimal";

export const CreateEditInsurancePremiumFeeModal = ({
  open,
  onClose,
  editValues,
  editFlag,
}) => {
  const { control, onSubmit, handleSubmit, reset } =
    useInsurancePremiumFeeForm();

  const { projectCategories } = useSelector((state) => state.projectCategories);

  const { insuranceCompanies } = useSelector(
    (state) => state.insuranceCompanies
  );

  const { subCategories } = useSelector((state) => state.subCategories);

  const { vehicles, isLoading } = useSelector((state) => state.vehicles);

  useEffect(() => {
    if (editFlag === false) {
      reset();
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
    if (open) {
      dispatch(getProjectCategory());
      dispatch(getSubCategory());
    }
  }, [dispatch, open]);

  useEffect(() => {
    if (open && editFlag) {
      reset({
        ...editValues,
        category_id: editValues?.vehicle?.category_id,
        sub_category_id: editValues?.vehicle?.sub_category_id,
        brand_id: editValues?.vehicle?.brand_id,
        model_id: editValues?.vehicle?.model_id,
      });
    }
  }, [open, editFlag, editValues, reset]);

  const category_id = useWatch({
    control,
    name: "category_id",
  });

  const sub_category_id = useWatch({
    control,
    name: "sub_category_id",
  });

  const brand_id = useWatch({
    control,
    name: "brand_id",
  });

  const subCategoriesByCategory = useMemo(
    () => subCategories.filter((item) => item?.category_id === category_id),
    [subCategories, category_id]
  );

  // // Deduplicate vehicles array by brand_id
  const uniqueBrandVehicles = useMemo(() => {
    const vehicleMap = new Map();
    vehicles.forEach((vehicle) => {
      if (vehicle?.brand_id) {
        vehicleMap.set(vehicle.brand_id, vehicle);
      }
    });
    return Array.from(vehicleMap.values());
  }, [vehicles]);

  // // Deduplicate vehicles array by model_id
  const uniqueModelVehicles = useMemo(() => {
    const vehicleMap = new Map();
    vehicles.forEach((vehicle) => {
      if (vehicle?.model_id) {
        vehicleMap.set(vehicle.model_id, vehicle);
      }
    });
    return Array.from(vehicleMap.values());
  }, [vehicles]);

  useEffect(() => {
    dispatch(
      getAllVehicles({
        params: {
          category_id: category_id,
          sub_category_id: sub_category_id,
          brand_id: brand_id,
        },
      })
    );
  }, [dispatch, category_id, sub_category_id, brand_id]);

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {editFlag === true
          ? "Edit Insurance Premium Fee"
          : "Create New Insurance Premium Fee"}
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
            id="id"
            name="insurance_company_id"
            options={insuranceCompanies}
            getOptionLabel={(option) => option?.name || ""}
            label={<span className="required">Insurance Company</span>}
            rules={{
              required: true,
            }}
          />
          <FormInputSelect
            control={control}
            id="id"
            name="category_id"
            options={projectCategories}
            getOptionLabel={(option) => option?.name || ""}
            label={<span className="required">Category</span>}
            rules={{
              required: true,
            }}
          />
          <FormInputSelect
            control={control}
            id="id"
            name="sub_category_id"
            options={subCategoriesByCategory}
            getOptionLabel={(option) => option?.name || ""}
            label={<span className="required">Sub Category</span>}
            rules={{
              required: true,
            }}
          />
          <FormInputDecimal
            control={control}
            label={<span className="required">Amount</span>}
            name="amount"
            rules={{
              required: true,
            }}
          />
          {isLoading ? (
            <Skeleton variant="rectangular" height={37.13} />
          ) : (
            <FormInputSelect
              control={control}
              options={uniqueBrandVehicles}
              getOptionLabel={(option) => option?.brand_name || "Select Brands"}
              id="brand_id"
              name="brand_id"
              label="Brand Code"
              rules={{
                required: true,
              }}
            />
          )}
          {isLoading ? (
            <Skeleton variant="rectangular" height={37.13} />
          ) : (
            <FormInputSelect
              control={control}
              options={uniqueModelVehicles}
              getOptionLabel={(option) => option?.model_name || "Select Models"}
              id="model_id"
              name="model_id"
              label="Model Code"
              rules={{
                required: true,
              }}
            />
          )}
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

export default CreateEditInsurancePremiumFeeModal;
