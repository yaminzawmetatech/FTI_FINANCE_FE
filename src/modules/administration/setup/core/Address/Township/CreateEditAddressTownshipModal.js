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
import FormInputCheckbox from "components/form/FormInputCheckbox";

export const CreateEditAddressTownshipModal = ({
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
  addressStates,
  addressDistricts,
}) => {
  useEffect(() => {
    if (editFlag === false) {
      reset();
    }
  }, [editFlag, editValues, open, reset]);

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {editFlag === true
          ? "Edit Address Township"
          : "Create New Address Township"}
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
            options={addressStates}
            getOptionLabel={(option) => option?.name || ""}
            id="id"
            name="address_state_id"
            label={<span className="required">Address State</span>}
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
          <FormInputSelect
            control={control}
            options={addressDistricts}
            getOptionLabel={(option) => option?.name || ""}
            id="id"
            name="address_district_id"
            label={<span className="required">Address District</span>}
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
          {columns.map((column) => {
            const isExcludedKey =
              column.accessorKey === "address_state" ||
              column.accessorKey === "address_district";

            const isRequired =
              column.accessorKey !== "description" &&
              column.accessorKey !== "township_mya_mm3";

            const label = isRequired ? (
              <span className="required">{column.header}</span>
            ) : (
              column.header
            );

            const validationRules = {
              required: isRequired,
              minLength:
                column.accessorKey === "name" ||
                column.accessorKey === "ts_pcode"
                  ? {
                      value: 2,
                      message: CommonMessage.MFE00016.replace(
                        "%s",
                        column.accessorKey === "name" ? "Name" : "Township Code"
                      ).replace("%s", "2"),
                    }
                  : false,
              maxLength:
                column.accessorKey === "name" ||
                column.accessorKey === "ts_pcode" ||
                column.accessorKey === "township_mya_mm3" ||
                column.accessorKey === "description"
                  ? {
                      value: 255,
                      message: CommonMessage.MFE00003.replace(
                        "%s",
                        column.accessorKey === "name"
                          ? "Name"
                          : column.accessorKey === "town_pcode"
                          ? "Township Code"
                          : column.accessorKey === "township_mya_mm3"
                          ? "Township Myanmar"
                          : "Description"
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
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
          }}
        >
          <FormInputCheckbox
            control={control}
            label="Is BlackList Area"
            name="is_blacklisted"
          />
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

export default CreateEditAddressTownshipModal;
