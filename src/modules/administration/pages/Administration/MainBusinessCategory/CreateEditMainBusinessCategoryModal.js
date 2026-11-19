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

const CreateEditMainBusinessCategoryModal = ({
  columns,
  open,
  onClose,
  setEditValues,
  editFlag,
  control,
  handleSubmit,
  onSubmit,
  reset,
  editValues,
}) => {
  useEffect(() => {
    if (editFlag === false) {
      reset();
    }
  }, [editFlag, editValues, open]);

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {editFlag === true ? "Edit Main Business Category" : "Create New Main Business Category"}
      </DialogTitle>
      <DialogContent>
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300", sm: "360px", md: "400px" },
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
              minLength:
                column.accessorKey === "bc1_code" ||
                column.accessorKey === "bc1_name"
                  ? {
                      value: 2,
                      message: CommonMessage.MFE00016.replace(
                        "%s",
                        column.accessorKey === "bc1_name" ? "Name" : "Code"
                      ).replace("%s", "2"),
                    }
                  : false,
              maxLength:
                column.accessorKey === "bc1_code" ||
                column.accessorKey === "bc1_name" ||
                column.accessorKey === "bc1_name_mm" ||
                column.accessorKey === "description"
                  ? {
                      value: 255,
                      message: CommonMessage.MFE00003.replace(
                        "%s",
                        column.accessorKey === "bc1_name"
                          ? "Name"
                          : column.accessorKey === "bc1_code"
                          ? "Code"
                          : column.accessorKey === "bc1_name_mm"
                          ? "Business Category Myanmar"
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

export default CreateEditMainBusinessCategoryModal;
