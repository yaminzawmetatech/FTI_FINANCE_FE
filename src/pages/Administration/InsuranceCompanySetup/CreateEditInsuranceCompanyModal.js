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
import useInsuranceCompanyForm from "./InsuranceCompanyHook";

export const CreateEditInsuranceCompanyModal = ({
  open,
  onClose,
  editValues,
  editFlag,
}) => {
  const { control, onSubmit, handleSubmit, reset } = useInsuranceCompanyForm();

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
        email: Array.isArray(editValues.email)
        ? editValues.email.join(", ")
        : JSON.parse(editValues.email || "[]").join(", "),
      });
    }
  }, [open, editFlag, editValues, reset]);

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {editFlag === true
          ? "Edit Insurance Company"
          : "Create New Insurance Company"}
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
            label={<span className="required">Name</span>}
            name="name"
            rules={{
              required: true,
            }}
          />
          <FormInputText
            control={control}
            label={<span className="required">Address</span>}
            name="address"
            rules={{
              required: true,
            }}
            multiline
            sx={{
              pt: 1,
              textarea: {
                minHeight: "80px",
                maxHeight: "80px",
                overflow: "auto !important",
              },
            }}
          />
          <FormInputText
            control={control}
            label={<span className="required">Contact Person</span>}
            name="contact_person"
            rules={{
              required: true,
            }}
          />
          <FormInputText
            control={control}
            label={<span className="required">PIC Mobile Number</span>}
            name="pic_ph_no"
            rules={{
              required: true,
            }}
          />
          <FormInputText
            control={control}
            label={<span className="required">Email</span>}
            name="email"
            rules={{
              required: true,
            }}
          />
          <FormInputText
            control={control}
            label="Email Code"
            name="email_code"
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

export default CreateEditInsuranceCompanyModal;
