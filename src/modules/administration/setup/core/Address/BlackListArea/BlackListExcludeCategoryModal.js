import * as React from "react";
import { useEffect, useState, useCallback, useMemo } from "react";
import { Controller } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Grid,
  Skeleton,
} from "@mui/material";
import FormInputSelect from "components/form/FormInputSelect";
import FormInputText from "components/form/FormInputText";
import FormInputCheckbox from "components/form/FormInputCheckbox";
import useAddressVillageTractForm from "./BlackListAreaHook";
import { useSelector, useDispatch } from "react-redux";
import { useWatch } from "react-hook-form";
import { getProjectCategory } from "modules/administration/slices/projectcategorySlice";
import { getSubCategory } from "modules/administration/slices/subcategorySlice";

export const BlackListAreaExcludeModal = ({
  open,
  onClose,
  editValues,
  editFlag,
  selectedId,
  selectedRows,
}) => {
  const dispatch = useDispatch();

  const [manuallyRemovedSubCategoryIds, setManuallyRemovedSubCategoryIds] =
    useState([]);

  const { control, onSubmit, handleSubmit, reset, setValue } =
    useAddressVillageTractForm();

  const { projectCategories } = useSelector((state) => state.projectCategories);

  const { subCategories } = useSelector((state) => state.subCategories);

  const selectedCategoryArr = useWatch({
    control,
    name: "category_id",
  });

  const selectedSubCategoryArr = useWatch({
    control,
    name: "sub_category_id",
  });

  const subCategoriesArr = useMemo(() => {
    if (selectedCategoryArr && selectedCategoryArr.length > 0) {
      const selectedIds = selectedCategoryArr.map((cat) => cat.id);
      return subCategories.filter((item) =>
        selectedIds.includes(item?.category_id)
      );
    }
    return subCategories;
  }, [subCategories, selectedCategoryArr]);

  useEffect(() => {
    if (!selectedCategoryArr || selectedCategoryArr.length === 0) {
      // If no category is selected, reset the form to its initial state
      reset();
      return;
    }

    const selectedCategoryIds = selectedCategoryArr.map((cat) => cat.id);

    // Filter subcategories that are still allowed (not removed)
    const allowedSubCategories = subCategories.filter(
      (sub) =>
        selectedCategoryIds.includes(sub.category_id) &&
        !manuallyRemovedSubCategoryIds.includes(sub.id)
    );

    // Keep only subcategories whose parent category is still selected
    const filteredSelectedSubcategories = (selectedSubCategoryArr || []).filter(
      (sub) => selectedCategoryIds.includes(sub.category_id)
    );

    // Add back any allowed subcategories that are not removed or already selected
    const merged = [
      ...filteredSelectedSubcategories,
      ...allowedSubCategories.filter(
        (sub) =>
          !filteredSelectedSubcategories.some((s) => s.id === sub.id)
      ),
    ];

    setValue("sub_category_id", merged);
    const categoryHasVisibleSubCategory = (categoryId) =>
      subCategories.some(
        (sub) =>
          sub.category_id === categoryId &&
          !manuallyRemovedSubCategoryIds.includes(sub.id)
      );

    // Keep categories even if they have no subcategories for now
    const filteredCategories = selectedCategoryArr.filter(
      (cat) =>
        categoryHasVisibleSubCategory(cat.id) ||
        selectedSubCategoryArr?.some((sub) => sub.category_id === cat.id)
    );

    if (filteredCategories.length === 0) {
      reset();
      setManuallyRemovedSubCategoryIds([]); // Clear blocked subcategories to allow clean reselection
    } else if (filteredCategories.length !== selectedCategoryArr.length) {
      setValue("category_id", filteredCategories);
    }
  }, [
    selectedCategoryArr,
    subCategories,
    selectedSubCategoryArr,
    setValue,
    manuallyRemovedSubCategoryIds,
    reset,
  ]);

  useEffect(() => {
    if (open) {
      dispatch(getProjectCategory());
      dispatch(getSubCategory());
    }
  }, [dispatch, open]);

  useEffect(() => {
    if (editFlag === false) {
      reset();
    }
  }, [editFlag, editValues, open, reset]);

  const handleClickSubmit = (data) => {
    handleSubmit((data) => {
      onSubmit(data, editFlag, selectedRows);
      onClose(); // Close the dialog after submission
    })();
  };

  return (
    <Dialog
      open={open}
      sx={{ "& .MuiDialog-paper": { width: "35%" } }}
      maxWidth="md"
    >
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
        Exclude BlackList Area
      </DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300px", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
            marginTop: "20px",
          }}
        >
          <Grid item xs={12}>
            {" "}
            <label style={{ fontWeight: "bold" }}>Category</label>
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="category_id"
              control={control}
              defaultValue={[]}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Autocomplete
                  multiple
                  disableCloseOnSelect
                  options={projectCategories ?? []}
                  value={value || []}
                  onChange={(_, newValue) => onChange(newValue)}
                  getOptionLabel={(option) => option?.name || ""}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  limitTags={2}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.name}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Category"
                      size="small"
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="sub_category_id"
              control={control}
              defaultValue={[]}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Autocomplete
                  multiple
                  disableCloseOnSelect
                  options={subCategoriesArr ?? []}
                  value={value || []}
                  // onChange={(_, newValue) => onChange(newValue)}
                  onChange={(_, newValue) => {
                    const removed = (value || []).filter(
                      (v) => !newValue.find((nv) => nv.id === v.id)
                    );
                    const removedIds = removed.map((r) => r.id);

                    setManuallyRemovedSubCategoryIds((prev) => [
                      ...new Set([...prev, ...removedIds]),
                    ]);

                    onChange(newValue);
                  }}
                  getOptionLabel={(option) => option?.name || ""}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  limitTags={2}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.name}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Sub Category"
                      size="small"
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              )}
            />
          </Grid>
        </Stack>
        <DialogActions sx={{ p: "1.25rem" }}>
          <Button
            onClick={() => {
              reset();
              onClose();
              setManuallyRemovedSubCategoryIds([]);
            }}
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
          <Button type="submit" onClick={handleClickSubmit} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default BlackListAreaExcludeModal;
