import * as React from "react";
import { useEffect, useMemo } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Skeleton
} from "@mui/material";
import FormInputText from "components/form/FormInputText";
import FormInputSelect from "components/form/FormInputSelect";
import { useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import FormInputCheckbox from "components/form/FormInputCheckbox";
import useCreditCriteriaSetupForm from "./CreditCriteriaHook";
import { getProjectCategory } from "features/projectcategory/projectcategorySlice";
import { getSubCategory } from "features/subcategory/subcategorySlice";
import { getCreditCriteriaTypes } from "features/creditCriteria/creditCriteriaTypeSlice";
import {
  getCreditCriteria,
  getCreditCriteriaParent,
} from "features/creditCriteria/creditCriteriaSlice";

export const CreateEditCreditCriteriaKeyModal = ({
  open,
  onClose,
  editFlag,
  selectedId,
  editValues,
}) => {
  const dispatch = useDispatch();

  const { control, onSubmit, handleSubmit, reset, setValue } =
    useCreditCriteriaSetupForm();

  const { projectCategories, isLoading: categoryLoading } = useSelector(
    (state) => state.projectCategories
  );

  const { subCategories, isLoading: subCategoryLoading } = useSelector(
    (state) => state.subCategories
  );

  const { creditCriteriaTypes, isLoading: typeLoading } = useSelector(
    (state) => state.creditCriteriaTypes
  );

  const { creditCriteriaParentData, isCreditCriteriaParentDataLoading: parentLoading } = useSelector(
    (state) => state.creditCriteriaParentData
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

  const parent_id = useWatch({
    control,
    name: "parent_id",
  });

  const is_existing = useWatch({
    control,
    name: "is_existing",
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
    if (is_existing === true && category_id && type) {
      dispatch(
        getCreditCriteriaParent({
          category_id: category_id,
          sub_category_id: sub_category_id,
          type: type,
        })
      );
    }
  }, [dispatch, category_id, sub_category_id, type, is_existing]);

  useEffect(() => {
    if (editFlag === false) {
      reset();
    }
  }, [editFlag, editValues, open]);

  useEffect(() => {
    if (open && editFlag && selectedId) {
      reset(editValues);
      if (editValues?.parent_id) {
        setValue("is_existing", true);
      }
    }
  }, [open, editFlag, selectedId, editValues, reset]);

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {editFlag === true ? "Edit Credit Criteria" : "Create Credit Criteria"}
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
          {(editFlag && categoryLoading) ? (
            <Skeleton variant="rectangular" height={37.13} />
          ) : (
            <FormInputSelect
              control={control}
              options={projectCategories}
              getOptionLabel={(option) => option?.name}
              id="id"
              label={<span className="required">Category</span>}
              name="category_id"
              rules={{
                required: true,
              }}
            />
          )}
          {(editFlag && subCategoryLoading) ? (
            <Skeleton variant="rectangular" height={37.13} />
          ) : (
            <FormInputSelect
              control={control}
              options={subCategoriesArr}
              getOptionLabel={(option) => option?.name}
              id="id"
              label="Sub Category"
              name="sub_category_id"
              // rules={{
              //   required: true,
              // }}
            />
          )}
          {(editFlag && typeLoading) ? (
            <Skeleton variant="rectangular" height={37.13} />
          ) : (
            <FormInputSelect
              control={control}
              options={creditCriteriaTypes}
              getOptionLabel={(option) => option?.value}
              id="value"
              label={<span className="required">Criteria Type</span>}
              name="type"
              rules={{
                required: true,
              }}
            />
          )}
          <FormInputText
            control={control}
            name="required_category"
            label={<span className="required">Requirement Category</span>}
            rules={{
              required: true,
            }}
          />
          <FormInputCheckbox
            control={control}
            label="Has a Parent Requirement Category?"
            name="is_existing"
          />
          {is_existing &&
            ((editFlag && parentLoading) ? (
              <Skeleton variant="rectangular" height={37.13} />
            ) : (
              <FormInputSelect
                control={control}
                options={creditCriteriaParentData}
                getOptionLabel={(option) => option?.required_category}
                id="id"
                label="Parent Requirement Category"
                name="parent_id"
              />
            ))}

          <DialogActions sx={{ p: "1.25rem" }}>
            <Button
              onClick={() => {
                reset();
                //setEditValues("");
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={() => {
                handleSubmit((data) => onSubmit(data, editFlag))();
                onClose();
                //reset();
              }}
              variant="contained"
            >
              {editFlag === true ? "Update" : "Save"}
            </Button>
          </DialogActions>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditCreditCriteriaKeyModal;
