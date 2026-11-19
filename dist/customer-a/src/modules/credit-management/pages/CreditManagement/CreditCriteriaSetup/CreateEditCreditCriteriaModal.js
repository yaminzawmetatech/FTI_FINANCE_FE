import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Skeleton,
  Grid,
} from "@mui/material";
import FormInputText from "components/form/FormInputText";
import FormInputSelect from "components/form/FormInputSelect";
import { useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import useCreditCriteriaSetupForm from "./CreditCriteriaHook";
import { getProjectCategory } from "modules/administration/slices/projectcategorySlice";
import { getSubCategory } from "modules/administration/slices/subcategorySlice";
import { getCreditCriteriaTypes } from "modules/credit-management/slices/creditCriteriaTypeSlice";
import {
  getCreditCriteria,
  getCreditCriteriaData,
} from "modules/credit-management/slices/creditCriteriaSlice";
import FormInputDatePicker from "components/form/FormInputDatePicker";
import dayjs from "dayjs";
import FormInputCheckbox from "components/form/FormInputCheckbox";
import { FormLabel } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import TextField from "@mui/material/TextField";
import AddIcon from '@mui/icons-material/Add';

export const CreateEditCreditCriteriaModal = ({
  open,
  onClose,
  editFlag,
  selectedId,
  editValues,
}) => {
  const dispatch = useDispatch();
  const [valueFields, setValueFields] = useState([{ id: 1, value: "" }]); // Default value box

  const { control, onSubmit, handleSubmit, reset, setValue } =
    useCreditCriteriaSetupForm();

  const { projectCategories, isLoading: categoryLoading } = useSelector(
    (state) => state.projectCategories
  );

  const { subCategories, isLoading: subCategoryLoading } = useSelector(
    (state) => state.subCategories
  );

  const { creditCriteriaTypes } = useSelector(
    (state) => state.creditCriteriaTypes
  );

  const { creditCriteriaData, isCreditCriteriaDataLoading } = useSelector(
    (state) => state.creditCriteriaData
  );

  const category_id = useWatch({
    control,
    name: "category_id",
  });

  const sub_category_id = useWatch({
    control,
    name: "sub_category_id",
  });

  const type = useWatch({
    control,
    name: "type",
  });

  const is_new_version = useWatch({
    control,
    name: "is_new_version",
  });

  const version_start_date = useWatch({
    control,
    name: "version_start_date",
  });

  const version_end_date = useWatch({
    control,
    name: "version_end_date",
  });

  const new_version_start_date = useWatch({
    control,
    name: "new_version_start_date",
  });

  const new_version_end_date = useWatch({
    control,
    name: "new_version_end_date",
  });

  let subCategoriesArr = [];
  subCategoriesArr = useMemo(() => {
    if (category_id) {
      return subCategories.filter((item) => item?.category_id === category_id);
    }
    return subCategories;
  }, [subCategories, category_id]);

  useEffect(() => {
    if (open) {
      dispatch(getProjectCategory());
      dispatch(getSubCategory());
      dispatch(getCreditCriteriaTypes());
      dispatch(getCreditCriteria());
    }
  }, [dispatch, open]);

  useEffect(() => {
    if (category_id && type) {
      dispatch(
        getCreditCriteriaData({
          category_id: category_id,
          sub_category_id: sub_category_id,
          type: type,
        })
      );
    }
  }, [dispatch, category_id, type]);

  useEffect(() => {
    if (editFlag === false) {
      reset();
    }
  }, [editFlag, editValues, open]);

  const currentDate = dayjs(Date.now());
  useEffect(() => {
    if (
      open &&
      (editFlag === true || editFlag === false) &&
      selectedId &&
      creditCriteriaData
    ) {
      reset({
        ...editValues,
        version_start_date:
          editValues?.start_date && dayjs(editValues?.start_date),
        version_end_date: editValues?.end_date && dayjs(editValues?.end_date),
      });

      const match = creditCriteriaData.find(
        (item) => item.required_category === editValues?.required_category
      );
      setValue("required_key_id", match?.id);

      if (editFlag === false) {
        setValue("value", "");
        setValue("remark", "");
        setValue("version_start_date", currentDate);
      }
    }else if(open && !editFlag){
        reset({});
    }
  }, [open, editFlag, selectedId, editValues, reset, creditCriteriaData]);

  useEffect(() => {
    if (is_new_version && editFlag && new_version_start_date) {
      const newDate = dayjs(new_version_start_date).subtract(1, "day");
      setValue("version_end_date", newDate);
    }
  }, [is_new_version, editFlag, new_version_start_date, setValue]);

  // handle Add click
  const handleAddValue = () => {
    const nextId =
      valueFields.length > 0
        ? Math.max(...valueFields.map((field) => field.id)) + 1
        : 1; // to make unique id
    setValueFields((prev) => [...prev, { id: nextId, value: "" }]);
  };

  // handle Remove click
  const handleRemoveValue = (id) => {
    setValueFields((prev) => {
      const updatedFields = prev.filter((field) => field.id !== id);
      return updatedFields.map((field, index) => ({ ...field, id: index + 1 }));
    });
  };

  // change value
  const handleValueChange = (id, newValue) => {
    setValueFields((prev) =>
      prev.map((field) =>
        field.id === id ? { ...field, value: newValue } : field
      )
    );
  };

  const handleClickSubmit = (data) => {
    handleSubmit((data) => {
      onSubmit(data, editFlag, is_new_version,valueFields);
      onClose(); // Close the dialog after submission
    })();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {editFlag === true
          ? "Edit Credit Criteria Value"
          : "Create Credit Criteria Value"}
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
          {!editFlag && (
            <>
              <Button
                variant="outlined"
                onClick={handleAddValue}
                sx={{ alignSelf: "flex-start" }}
                size="small"
              >
                <AddIcon />
                Add Value
              </Button>
              {valueFields.map((field) => (
                <div key={field.id} style={{ display: "flex", gap: "10px" }}>
                  <TextField
                    label={`Value ${field.id}`}
                    variant="outlined"
                    value={field.value}
                    onChange={(e) =>
                      handleValueChange(field.id, e.target.value)
                    }
                    sx={{ flexGrow: 1 }}
                    size="small"
                  />
                  {valueFields.length > 1 && (
                    <Button
                      variant="outlined"
                      onClick={() => handleRemoveValue(field.id)}
                      sx={{
                        color: "red",
                        borderColor: "red",
                        "&:hover": {
                          backgroundColor: "rgba(255, 0, 0, 0.04)",
                          borderColor: "red",
                        },
                      }}
                      size="small"
                    >
                      <DeleteOutlineIcon />
                    </Button>
                  )}
                </div>
              ))}
            </>
          )}
          {editFlag && (
            <FormInputText
              control={control}
              label={<span className="required">Value</span>}
              name="value"
              rules={{
                required: true,
              }}
            />
          )}
          <FormInputText
            control={control}
            label="Remark"
            name="remark"
            multiline
            sx={{
              pt: 1,
              mb: 1,
              textarea: {
                minHeight: "100px",
                maxHeight: "100px",
                overflow: "auto !important",
              },
            }}
          />
          <FormInputDatePicker
            control={control}
            label="Version Start Date"
            name="version_start_date"
          />
          <FormInputDatePicker
            control={control}
            label="Version End Date"
            name="version_end_date"
            disabled={is_new_version}
          />
          {editFlag && (
            <FormInputCheckbox
              control={control}
              label="Add New Version"
              name="is_new_version"
            />
          )}
          {editFlag && is_new_version && (
            <>
              <FormLabel sx={{ fontWeight: "bold" }}>
                New Version Data
              </FormLabel>
              <FormInputText
                control={control}
                label={<span className="required">Value</span>}
                name="new_value"
                rules={{
                  required: true,
                }}
              />
              <FormInputText
                control={control}
                label="Remark"
                name="new_remark"
                multiline
                sx={{
                  pt: 1,
                  mb: 1,
                  textarea: {
                    minHeight: "100px",
                    maxHeight: "100px",
                    overflow: "auto !important",
                  },
                }}
              />
              <FormInputDatePicker
                control={control}
                label="Version Start Date"
                name="new_version_start_date"
              />
              <FormInputDatePicker
                control={control}
                label="Version End Date"
                name="new_version_end_date"
              />
            </>
          )}
          <DialogActions sx={{ p: "1.25rem" }}>
            <Button
              onClick={() => {
                reset();
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleClickSubmit}
              variant="contained"
            >
              {editFlag === true && is_new_version
                ? "Upgrade"
                : editFlag === true
                ? "Update"
                : "Save"}
            </Button>
          </DialogActions>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditCreditCriteriaModal;
