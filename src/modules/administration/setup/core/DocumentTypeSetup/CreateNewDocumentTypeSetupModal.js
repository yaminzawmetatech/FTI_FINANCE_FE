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
import CommonMessage from "common/CommonMessage";

export const CreateNewDocumentTypeSetupModal = ({
  open,
  onClose,
  editValues,
  setEditValues,
  editFlag,
  control,
  handleSubmit,
  onSubmit,
  reset,
  columns,
}) => {
  useEffect(() => {
    if (editFlag === false) {
      reset();
    }
  }, [editFlag, editValues, open]);

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {editFlag === true ? "Edit Document Type" : "Create New Document Type"}
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
          {columns.map((column) => {
            const isRequired = column.accessorKey !== "description";

            const label = isRequired ? (
              <span className="required">{column.header}</span>
            ) : (
              column.header
            );

            const validationRules = {
              required: isRequired,
              maxLength:
                column.accessorKey === "name" ||
                column.accessorKey === "code" ||
                column.accessorKey === "description"
                  ? {
                      value: 255,
                      message: CommonMessage.MFE00003.replace(
                        "%s",
                        column.accessorKey === "name"
                          ? "Name"
                          : column.accessorKey === "code"
                          ? "code"
                          : "Description"
                      ).replace("%s", "255"),
                    }
                  : false,
            };

            return (
              <FormInputText
                key={column.accessorKey}
                control={control}
                label={label}
                name={column.accessorKey}
                rules={validationRules}
              />
            );
          })}
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

export default CreateNewDocumentTypeSetupModal;
