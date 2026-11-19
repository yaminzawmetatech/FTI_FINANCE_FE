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
import useDealerGroupForm from "./DealerGroupHook";
import FormInputCheckbox from "components/form/FormInputCheckbox";

export const CreateEditDealerGroupModal = ({
  open,
  onClose,
  editValues,
  editFlag,
}) => {
  const { control, onSubmit, handleSubmit, reset, setValue } =
    useDealerGroupForm();

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
        {editFlag === true ? "Edit Dealer Group" : "Create New Dealer Group"}
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
            label={<span className="required">Code</span>}
            name="code"
            rules={{
              required: true,
            }}
          />
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
            label="Company Registration No"
            name="company_registration_no"
          />
          <FormInputText
            control={control}
            label="Description"
            name="description"
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
        </Stack>
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
          }}
        >
          {editFlag && (
            <FormInputCheckbox
              control={control}
              label="Is Active?"
              name="in_active"
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

export default CreateEditDealerGroupModal;
