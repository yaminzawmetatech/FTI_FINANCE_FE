import * as React from "react";
import { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import FormInputText from "components/form/FormInputText";
import useRefinanceCustomerForm from "./RefinanceCustomerHook";
import FormInputDatePicker from "components/form/FormInputDatePicker";
import dayjs from "dayjs";
import FormInputNumber from "components/form/FormInputNumber";

export const CreateEditRefinanceCustomer = ({
  open,
  onClose,
  editValues,
  editFlag,
}) => {
  const { control, onSubmit, handleSubmit, reset } =
    useRefinanceCustomerForm();

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
        eligible_month:
          editValues?.eligible_month && dayjs(editValues?.eligible_month),
      });
    }
  }, [open, editFlag, editValues, reset]);

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {editFlag === true
          ? "Edit Refinance Customer"
          : "Create New Refinance Customer"}
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
            label={<span className="required">Application ID</span>}
            name="application_id"
            rules={{
              required: true,
            }}
          />
          <FormInputText
            control={control}
            label="Partner ID"
            name="partner_id"
          />
          <FormInputText
            control={control}
            label={<span className="required">Name</span>}
            name="customer_name"
            rules={{
              required: true,
            }}
          />
          <FormInputText
            control={control}
            label={<span className="required">NRC</span>}
            name="nrc"
            rules={{
              required: true,
            }}
          />
          <FormInputNumber
            control={control}
            label={<span className="required">Loan Amount</span>}
            name="loan_amount"
            rules={{
              required: true,
            }}
          />
          <FormInputText
            control={control}
            label={<span className="required">Status</span>}
            name="status"
            rules={{
              required: true,
            }}
          />
          <FormInputText
            control={control}
            label={<span className="required">Refinance Category</span>}
            name="refinance_category"
            rules={{
              required: true,
            }}
          />
          <FormInputNumber
            control={control}
            label="Next Eligible Loan Amount"
            name="next_eligible_loan_amount"
          />
          <FormInputDatePicker
            control={control}
            label="Eligible Month"
            name="eligible_month"
          />
          <FormInputNumber
            control={control}
            label="Next Eligible MI Amount"
            name="next_eligible_mi_amount"
          />
          <FormInputText
            control={control}
            label="Category Name"
            name="category_name"
          />
          <FormInputText
            control={control}
            label="Segment"
            name="segment"
          />
          <FormInputNumber
            control={control}
            label="Min Income(2 times)"
            name="min_income"
          />
          <FormInputNumber
            control={control}
            label="Estimate Income"
            name="estimate_income"
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

export default CreateEditRefinanceCustomer;
