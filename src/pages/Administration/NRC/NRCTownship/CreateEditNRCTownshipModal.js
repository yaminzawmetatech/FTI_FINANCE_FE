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
import FormInputSelect from "components/form/FormInputSelect";
import FormInputText from "components/form/FormInputText";
import CommonMessage from "common/CommonMessage";

export const CreateEditNRCTownshipModal = ({
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
  nrcStates,
}) => {
  useEffect(() => {
    if (editFlag === false) {
      reset();
    }
  }, [editFlag, editValues, open]);

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {editFlag === true ? "Edit NRC Township" : "Create New NRC Township"}
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
            options={nrcStates}
            getOptionLabel={(option) => option?.name}
            id="id"
            name="n_r_c_state_id"
            label={<span className="required">NRC State</span>}
            rules={{
              required: true,
            }}
          />
        </Stack>
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300px", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
            marginTop: "20px",
          }}
        >
          {/* {columns.map(
            (column) =>
              column.accessorKey !== "n_r_c_state_name" &&
              column.accessorKey !== "n_r_c_state_code" && (
                <FormInputText
                  control={control}
                  key={column.accessorKey}
                  label={
                    column.accessorKey !== "description" ? (
                      <span className="required">{`${column.header}`}</span>
                    ) : (
                      column.header
                    )
                  }
                  name={column.accessorKey}
                  rules={{
                    required:
                      column.accessorKey === "description" ? false : true,
                  }}
                />
              )
          )} */}
             {columns.map((column) => {
               const isExcludedKey =
               column.accessorKey === "n_r_c_state_code" ||
               column.accessorKey === "n_r_c_state_name";

            const isRequired = column.accessorKey !== "description";

            const label = isRequired ? (
              <span className="required">{column.header}</span>
            ) : (
              column.header
            );

            const validationRules = {
              required: isRequired,
              minLength:
                column.accessorKey === "name"
                  ? {
                      value: 2,
                      message: CommonMessage.MFE00016.replace(
                        "%s",
                        "Township Name"
                      ).replace("%s", "2"),
                    }
                  : false,
              maxLength:
                column.accessorKey === "name" ||
                column.accessorKey === "description"
                  ? {
                      value: 255,
                      message: CommonMessage.MFE00003.replace(
                        "%s",
                        column.accessorKey === "name" ? "Township Name" : "Description"
                      ).replace("%s", "255"),
                    }
                  : false,
            };

            return (
              !isExcludedKey && (
              <FormInputText
                key={column.accessorKey}
                control={control}
                label={label}
                name={column.accessorKey}
                rules={validationRules}
              />
              )
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

export default CreateEditNRCTownshipModal;
