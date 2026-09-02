import React, { useEffect, useState } from "react";
import { getProjectCategory } from "features/projectcategory/projectcategorySlice";
import { useDispatch, useSelector } from "react-redux";
import FormInputSelect from "components/form/FormInputSelect";
import { useForm, useWatch } from "react-hook-form";
import { useParams } from "react-router";

const ContractAppBarCategories = ({ setCategory }) => {
  const { control, reset, setValue } = useForm({});
  const dispatch = useDispatch();
  const { categoryId } = useParams();

  const { projectCategories, isError, isSuccess, isLoading, message } =
    useSelector((state) => state.projectCategories);

  useEffect(() => {
    if (categoryId) {
      setValue("category_id", parseInt(categoryId));
    }
  }, [setValue, categoryId]);

  useEffect(() => {
    dispatch(getProjectCategory());
  }, [dispatch]);

  const watchedCategoryId = useWatch({ control, name: "category_id" });
  useEffect(() => {
    setCategory(watchedCategoryId);
  }, [setCategory, watchedCategoryId]);

  return (
    <FormInputSelect
      control={control}
      options={projectCategories}
      getOptionLabel={(option) => option?.name}
      id="id"
      name="category_id"
      label="Category"
      sx={{ width: "120px", marginLeft: "2px", marginRight: "2px" }}
    />
  );
};

export default React.memo(ContractAppBarCategories);
