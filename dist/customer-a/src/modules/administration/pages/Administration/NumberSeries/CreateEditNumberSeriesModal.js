import * as React from "react";
import { useEffect, useMemo } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import FormInputSelect from "components/form/FormInputSelect";
import { getTable } from "modules/administration/slices/tableSlice";
import { getProjectCategory } from "modules/administration/slices/projectcategorySlice";
import { getSubCategory } from "modules/administration/slices/subcategorySlice";
import { getDocumentTypes } from "modules/administration/slices/documentTypeSlice";
import FormInputText from "components/form/FormInputText";
import { useWatch } from "react-hook-form";
import CommonMessage from "common/CommonMessage";

export const CreateEditNumberSeriesModal = ({
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
  const dispatch = useDispatch();

  const projectCategories = useSelector(
    (state) => state.projectCategories.projectCategories
  );

  const subCategories = useSelector(
    (state) => state.subCategories.subCategories
  );

  useEffect(() => {
    dispatch(getProjectCategory());
    dispatch(getSubCategory());
  }, [dispatch]);

  const category_id = useWatch({
    control,
    name: "category_id",
  });

  const subCategoriesByCategory = useMemo(
    () => subCategories.filter((item) => item?.category_id === category_id),
    [subCategories, category_id]
  );

  useEffect(() => {
    if (editFlag === false) {
      reset();
    }
  }, [editFlag, editValues, open]);

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {editFlag === true ? "Edit Number Series" : "Create New Number Series"}
      </DialogTitle>
      <DialogContent>
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300px", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
            marginTop: "30px",
          }}
        >
          <FormInputSelect
            control={control}
            options={projectCategories}
            getOptionLabel={(option) => option?.name}
            id="id"
            label={<span className="required">{"Category"}</span>}
            name="category_id"
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
            marginTop: "30px",
          }}
        >
          <FormInputSelect
            control={control}
            options={subCategoriesByCategory}
            getOptionLabel={(option) => option?.name}
            id="id"
            label={<span className="required">{"Sub Category"}</span>}
            name="sub_category_id"
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
            marginTop: "30px",
          }}
        >
          {columns.map((column) => {
            const isExcludedKey =
              column.accessorKey === "category" ||
              column.accessorKey === "sub_category";

            const isRequired = column.accessorKey !== "description";

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

export default CreateEditNumberSeriesModal;
