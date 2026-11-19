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
import FormInputCheckbox from "components/form/FormInputCheckbox";
import CommonMessage from "common/CommonMessage";
import { useWatch } from "react-hook-form";

const CreateEditAddressStateModal = ({
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
  setValue
}) => {
  useEffect(() => {
    if (editFlag === false) {
      reset();
    }
  }, [editFlag, editValues, open]);


  const isLoanOperationSkipped = useWatch({
    control,
    name: "is_loan_operation_skipped",
  });

  const isMOB = useWatch({
    control,
    name: "mob_status",
  });

  useEffect(() => {
    if (!(isLoanOperationSkipped && isMOB)) {
      setValue("is_sms_generated", false);
    }
  }, [isLoanOperationSkipped, isMOB, setValue]);

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {editFlag === true
          ? "Edit Product Category"
          : "Create New Product Category"}
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
            const isExcludeKey =
              column.accessorKey === "user_insurance" ||
              column.accessorKey === "insurance_inspection_require" ||
              column.accessorKey === "mob_status" ||
              column.accessorKey === "is_loan_operation_skipped" ||
              column.accessorKey === "is_sms_generated";

            const isRequired = column.accessorKey !== "description";

            const label = isRequired ? (
              <span className="required">{column.header}</span>
            ) : (
              column.header
            );

            const validationRules = {
              required: isRequired,
              minLength:
                column.accessorKey === "name" || column.accessorKey === "code"
                  ? {
                      value: 2,
                      message: CommonMessage.MFE00016.replace(
                        "%s",
                        column.accessorKey === "name" ? "Name" : "Code"
                      ).replace("%s", "2"),
                    }
                  : false,
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
                          ? "Code"
                          : "Description"
                      ).replace("%s", "255"),
                    }
                  : false,
            };

            return (
              !isExcludeKey && (
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
            label="User Insurance"
            name="user_insurance"
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
          <FormInputCheckbox
            control={control}
            label="Insurance Inspection Require"
            name="insurance_inspection_require"
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
          <FormInputCheckbox
            control={control}
            label="MOB"
            name="mob_status"
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
        <FormInputCheckbox
          control={control}
          label="Skip Loan Operations"
          name="is_loan_operation_skipped"
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
        <FormInputCheckbox
          control={control}
          label="Enable SMS Generation(Application Approved and Rejected)"
          name="is_sms_generated"
          disabled={!(isLoanOperationSkipped && isMOB)}
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

export default CreateEditAddressStateModal;
