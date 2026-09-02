import React, { useEffect } from "react";
import FormInputSelect from "components/form/FormInputSelect";
import useSetDisbursementForm from "./SetDisbursementHook";
import { useWatch } from "react-hook-form";

const ApprovedApplicationAppBarCategories = ({ setCategory }) => {
  const { control, projectCategories, setValue } = useSetDisbursementForm();

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

export default React.memo(ApprovedApplicationAppBarCategories);
