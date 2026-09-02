import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import {
  createBlacklistCustomer,
  getBlacklistCustomersById,
  updateBlacklistCustomer,
} from "features/blacklistCustomer/blacklistCustomerSlice";
import { useParams } from "react-router-dom";

const useBlackListCustomerSetupHookForm = () => {
  const dispatch = useDispatch();

  const { mode, uuid } = useParams();

  const { control, reset, handleSubmit, setValue } = useForm({});

  const { blacklistCustomers, isLoading, isSuccess, isError, message } =
    useSelector((state) => state.blacklistCustomers);

  useEffect(() => {
    if (mode === "edit") {
      dispatch(getBlacklistCustomersById({ uuid }));
    }
  }, [dispatch, mode]);

  useEffect(() => {
    reset({
      ...blacklistCustomers,
    });
  }, [reset, blacklistCustomers]);

  const onSubmit = useCallback(
    async (body) => {
      try {
        if (mode === "edit") {
          await dispatch(
            updateBlacklistCustomer({ id: uuid, newData: body })
          ).unwrap();

          showSuccessToast(
            CommonMessage.MFS00003.replace("%s", "Black List Customer")
          );
          setTimeout(() => {
            window.close();
          }, 5000);
        } else {
          await dispatch(createBlacklistCustomer({ ...body })).unwrap();

          showSuccessToast(
            CommonMessage.MFS00001.replace("%s", "Black List Customer")
          );
          setTimeout(() => {
            window.close();
          }, 5000);
        }
        reset();
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [dispatch, reset]
  );

  return useMemo(
    () => ({
      isLoading,
      onSubmit,
      handleSubmit,
      control,
      blacklistCustomers,
      setValue,
      reset,
      isError,
    }),
    [
      control,
      handleSubmit,
      isLoading,
      onSubmit,
      blacklistCustomers,
      setValue,
      reset,
      isError,
    ]
  );
};

export default useBlackListCustomerSetupHookForm;
