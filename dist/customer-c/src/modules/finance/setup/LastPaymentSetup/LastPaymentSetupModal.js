import * as React from "react";
import { useEffect, useMemo } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import FormInputText from "components/form/FormInputText";
import useLastPaymentSetupForm from "./LastPaymentSetupHook";
import { getProjectCategory } from "modules/administration/slices/projectcategorySlice";
import { getSubCategory } from "modules/administration/slices/subcategorySlice";
import FormInputSelect from "components/form/FormInputSelect";
import FormInputDatePicker from "components/form/FormInputDatePicker";
import { useSelector, useDispatch } from "react-redux";
import { useWatch } from "react-hook-form";
import dayjs from "dayjs";
import FormInputCheckbox from "components/form/FormInputCheckbox";


export const CreateLastPaymentSetupModal = ({
  open,
  onClose,
  editValues,
  editFlag,
}) => {
  const dispatch = useDispatch();
  const { control, onSubmit, handleSubmit, reset } = useLastPaymentSetupForm();

  const { projectCategories } = useSelector(
    (state) => state.projectCategories
  );

  const { subCategories } = useSelector((state) => state.subCategories);

  const category_id = useWatch({
    control,
    name: "category_id",
  });

  const type = useWatch({
    control,
    name: "type",
  });

  const subCategoriesByCategory = useMemo(
    () => subCategories.filter((item) => item?.category_id === category_id),
    [subCategories, category_id]
  );

  const types = [
    { id: "insufficient", value: "Insufficient Payment" },
    { id: "exceed_payment", value: "Exceed Payment" },
  ];

  useEffect(() => {
    dispatch(getSubCategory());
    dispatch(getProjectCategory());
  }, [dispatch]);

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
    if (open && editFlag) {
      reset({
        ...editValues,
        start_date: editValues?.start_date && dayjs(editValues?.start_date),
        end_date: editValues?.end_date && dayjs(editValues?.end_date),
        in_active: editValues?.in_active === 1 ? true : false,
      });
    }
  }, [open, editFlag, editValues, reset]);

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {editFlag === true
          ? "Edit Last Payment Setup"
          : "Create Last Payment Setup"}
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
            rules={{
              required: true,
            }}
          />
          <FormInputSelect
            control={control}
            options={types}
            getOptionLabel={(option) => option?.value || ""}
            id="id"
            name="type"
            label={<span className="required">Type</span>}
            rules={{
              required: true,
            }}
          />
          <FormInputText
            control={control}
            label={<span className="required">Threshold Amount</span>}
            name="threshold_amount"
            rules={{
              required: true,
            }}
          />
          <FormInputText
            control={control}
            name="retain_period"
            label={
              type === "exceed_payment" ? (
                <span className="required">Retain Period</span>
              ) : (
                "Retain Period"
              )
            }
            rules={{
              required: type === "exceed_payment",
            }}
          />
          <FormInputDatePicker
            control={control}
            label={<span className="required">Start Date</span>}
            name="start_date"
            rules={{
              required: true,
            }}
          />
          <FormInputDatePicker
            control={control}
            label="End Date"
            name="end_date"
          />
          <FormInputCheckbox
            control={control}
            label="Is Active?"
            name="in_active"
          />
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

export default CreateLastPaymentSetupModal;
