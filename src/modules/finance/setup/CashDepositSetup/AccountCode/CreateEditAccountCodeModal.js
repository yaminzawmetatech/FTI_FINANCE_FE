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
import { useController, useWatch, useForm } from "react-hook-form";
import CommonMessage from "common/CommonMessage";

export const CreateEditAccountCodeModal = ({
  columns,
  open,
  onClose,
  projectCategories,
  subCategories,
  banks,
  setEditValues,
  editFlag,
  control,
  handleSubmit,
  onSubmit,
  reset,
  handleCategorySelect,
}) => {
  useEffect(() => {
    if (editFlag === false) {
      reset();
    }
    // console.log(sub_category_id);
  }, [editFlag, open, reset]);

  // const sub_category_id = useWatch({
  //   control,
  //   name: "sub_category_id",
  // });

  const type = [
    { key: 1, value: "Income Statement" },
    { key: 2, value: "Balance Sheet" },
  ];

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {editFlag === true ? "Edit Account Code" : "Create New Account Code"}
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
            options={projectCategories}
            getOptionLabel={(option) => option?.name || ""}
            id="id"
            name="category_id"
            label={<span className="required">Category</span>}
            rules={{
              required: true,
            }}
            onSelect={handleCategorySelect}
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
            options={subCategories}
            getOptionLabel={(option) => option?.name || ""}
            id="id"
            name="sub_category_id"
            label="Sub Category"
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
            options={banks}
            getOptionLabel={(option) => option?.name || ""}
            id="id"
            name="bank_id"
            label="Bank"
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
              column.accessorKey === "category" ||
              column.accessorKey === "bank" ||
              column.accessorKey === "sub_category" ||
              column.accessorKey === "type";

            const isRequired =
              column.accessorKey === "account_no" ||
              column.accessorKey === "name";

            const label = isRequired ? (
              <span className="required">{column.header}</span>
            ) : (
              column.header
            );

            const validationRules = {
              required: isRequired,
              maxLength:
                column.accessorKey === "description"
                  ? {
                      value: 255,
                      message: CommonMessage.MFE00003.replace(
                        "%s",
                        "Description"
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
            minWidth: { xs: "300px", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
            marginTop: "20px",
          }}
        >
          <FormInputSelect
            control={control}
            options={type}
            getOptionLabel={(option) => option?.value || ""}
            id="value"
            name="type"
            label="Income / Balance"
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

export default CreateEditAccountCodeModal;
