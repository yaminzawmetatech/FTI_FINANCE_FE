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

export const CreateEditBankModal = ({
  open,
  onClose,
  columns,
  editValues,
  editFlag,
  control,
  handleSubmit,
  onSubmit,
  reset,
  setEditValues,
}) => {
  useEffect(() => {
    if (editFlag === false) {
      reset();
    }
  }, [editFlag, editValues, open]);

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {editFlag === true ? "Edit Bank" : "Create New Bank"}
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
          {columns.map((column) => (
            <FormInputText
              control={control}
              label={
                column.accessorKey !== "description" ? (
                  <span className="required">{`${column.header}`}</span>
                ) : (
                  column.header
                )
              }
              name={column.accessorKey}
              rules={{
                required: column.accessorKey === "description" ? false : true,
                minLength: column.accessorKey === "name" ? {
                  value: 3,
                  message: "Name must have at least 3 characters",
                } : false,
                maxLength: column.accessorKey === "name" ? {
                  value: 255,
                  message: "Name must have at least 255 characters",
                } : false,
              }}
            />
          ))}
          <DialogActions sx={{ p: "1.25rem" }}>
            <Button
              onClick={() => {
                reset();
                setEditValues("");
                onClose();
              }}
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
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditBankModal;
