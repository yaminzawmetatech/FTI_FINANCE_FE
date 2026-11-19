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
import useNameOfBusinessForm from "./NameOfBusinessHook";

export const CreateEditNameOfBusinessModal = ({
  open,
  onClose,
  editValues,
  editFlag,
  selectedId,
}) => {

  const { control, onSubmit, handleSubmit, reset } =
    useNameOfBusinessForm();

  useEffect(() => {
    if (editFlag === false) {
      reset();
    }
  }, [editFlag, editValues, open, reset]);

  const handleClickSubmit = (data) => {
    handleSubmit((data) => {
      onSubmit(data, editFlag);
      onClose(); // Close the dialog after submission
    })();
  };

  useEffect(() => {
    if (open && editFlag && selectedId) {
      reset(editValues);
    }
  }, [open, editFlag, selectedId, editValues, reset]);

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {editFlag === true ? "Edit Name Of Business" : "Create Name Of Business"}
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
            label="Description"
            name="description"
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

export default CreateEditNameOfBusinessModal;
