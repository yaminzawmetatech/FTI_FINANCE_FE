import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../features/category/categorySlice";
import { getApplication } from "../../../features/application/applicationSlice";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router";

const useSetDisbursementForm = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const { control, reset, setValue } = useForm({});
  const { projectCategories } = useSelector((state) => state.projectCategories);
  const { application, isLoading } = useSelector((state) => state.application);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(
      getApplication({
        firstFetch: true,
        params: {
          status: "Approved",
          is_disbursed: 0,
          //mob_status: 0,
          mob_or_is_loan_operation_skipped: 1,
          category_id: categoryId,
        },
      })
    );
  }, [dispatch, categoryId]);

  useEffect(() => {
    if (categoryId) {
      setValue("category_id", parseInt(categoryId));
    }
  }, [setValue, categoryId]);

  return useMemo(
    () => ({
      categoryId,
      isLoading,
      control,
      reset,
      setValue,
      projectCategories,
      application,
    }),
    [
      categoryId,
      application,
      control,
      reset,
      setValue,
      projectCategories,
      isLoading,
    ]
  );
};

export default useSetDisbursementForm;
