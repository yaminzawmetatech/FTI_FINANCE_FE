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
import { getTable } from "features/table/tableSlice";
import { getProjectCategory } from "features/projectcategory/projectcategorySlice";
import { getSubCategory } from "features/subcategory/subcategorySlice";
import { getDocumentTypes } from "features/documentType/documentTypeSlice";
import FormInputText from "components/form/FormInputText";
import { useWatch } from "react-hook-form";
import CommonMessage from "common/CommonMessage";

export const CreateNewDocumentModal = ({
  open,
  onClose,
  editValues,
  setEditValues,
  editFlag,
  control,
  handleSubmit,
  onSubmit,
  reset,
}) => {
  const dispatch = useDispatch();

  const table = useSelector((state) => state.table.table);

  const projectCategories = useSelector(
    (state) => state.projectCategories.projectCategories
  );

  const subCategories = useSelector(
    (state) => state.subCategories.subCategories
  );

  const documentTypes = useSelector(
    (state) => state.documentTypes.documentTypes
  );

  useEffect(() => {
    dispatch(getTable());
    dispatch(getProjectCategory());
    dispatch(getSubCategory());
    dispatch(getDocumentTypes());
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
        {editFlag === true
          ? "Edit Document Attach"
          : "Create New Document Attach"}
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
            options={table}
            getOptionLabel={(option) => option?.name}
            id="id"
            label={<span className="required">{"Table"}</span>}
            name="table_id"
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
          <FormInputSelect
            control={control}
            options={documentTypes}
            getOptionLabel={(option) => option?.name}
            id="id"
            label={<span className="required">{"Document Type"}</span>}
            name="document_type_id"
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
          <FormInputText
            control={control}
            label="Description"
            name="description"
            rules={{
              maxLength: {
                value: 255,
                message: CommonMessage.MFE00003.replace(
                  "%s",
                  "Description"
                ).replace("%s", "255"),
              },
            }}
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

export default CreateNewDocumentModal;
