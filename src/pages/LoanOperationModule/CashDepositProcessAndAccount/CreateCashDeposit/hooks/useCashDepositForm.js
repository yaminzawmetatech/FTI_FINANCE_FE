import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import {
  postCashDeposit,
  getCashDepositByUuid,
  getCashDepositBalance,
} from "features/cashDepositProcess/cashDepositSlice";
import {
  createCashDeposit,
  updateCashDeposit,
  changeStatusCashDeposit,
} from "features/cashDepositProcess/cashDepositSlice";

const useCashDepositForm = () => {
  const [params, setParams] = useSearchParams();
  const { uuid, mode, route } = useParams();

  const dispatch = useDispatch();

  const [isShowToolbar, setIsShowToolBar] = useState(true);
  const [isShowRemove, setIsShowRemove] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [ isAfterSubmit, setIsAfterSubmit ] = useState(false);

  const { control, reset, watch, setValue, handleSubmit } = useForm({
    defaultValues: {
      disabled: false,
    },
  });

  const depositAmount = parseFloat(watch("deposit_amount"));
  const balance = parseFloat(watch("balance"));
  const categoryId = watch("category_id");

  const {
    cashDeposits,
    isError,
    isLoading: isSubmitting,
  } = useSelector((state) => state.cashDeposits);

  const { cashDepositBalance } = useSelector(
    (state) => state.cashDepositBalance
  );

  useEffect(() => {
    if (mode === "view" || mode === "edit") {
      dispatch(getCashDepositByUuid({ uuid: uuid }));
    }
  }, [mode, uuid, dispatch]);

  useEffect(() => {
    if (cashDeposits.uuid) {
      setIsDisable(true);
    }
  }, [cashDeposits]);

  const editAbleForm = useMemo(() => {
    if (mode && mode === "view") {
      return false;
    } else if (
      cashDeposits?.status === "Approved" ||
      cashDeposits?.status === "Rejected"
    ) {
      return false;
    } else {
      return true;
    }
  }, [mode, route, cashDeposits]);

  useEffect(() => {
    reset({
      ...cashDeposits,
      posted_date:
        cashDeposits?.posted_date && dayjs(cashDeposits?.posted_date),
      created_at: cashDeposits?.created_at && dayjs(cashDeposits?.created_at),
      approved_date:
        cashDeposits?.approved_date && dayjs(cashDeposits?.approved_date),
      disabled: !editAbleForm,
    });
  }, [cashDeposits, mode, reset, editAbleForm]);

  useEffect(() => {
    if (mode === "create") {
      const currentDate = dayjs(Date.now());

      setValue("posted_date", currentDate);
    }
  }, [mode]);

  useEffect(() => {
    if (mode === "create") {
      const updatedBalance = depositAmount + balance;
      setValue("updated_balance", updatedBalance);
    } else if (
      (mode === "edit" || mode === "view") &&
      depositAmount !== cashDeposits.deposit_amount
    ) {
      const updatedBalance = depositAmount + balance;
      setValue("updated_balance", updatedBalance);
    }
  }, [depositAmount, balance, mode, cashDeposits]);

  useEffect(() => {
    const cashDepositUuid = cashDeposits?.uuid;
    if (isAfterSubmit !== true && categoryId && mode === "create") {
      dispatch(getCashDepositBalance({ categoryId, cashDepositUuid}))
        .then((response) => {
          const receivedBalance = response.payload.data.balance;
          setValue("balance", receivedBalance);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [dispatch, categoryId, cashDeposits, isAfterSubmit, mode]);



  const onSubmit = useCallback(
    () => async (body) => {
      setIsAfterSubmit(true);
      const currentDate = dayjs(Date.now());
      try{
        if (mode === "edit") {
          await dispatch(
            updateCashDeposit({
              body: {
                ...body,
                posted_date:
                  (body?.posted_date &&
                    body?.posted_date.format("YYYY-MM-DD HH:mm:ss")) ||
                  currentDate.format("YYYY-MM-DD HH:mm:ss"),
              },
              uuid: cashDeposits?.uuid,
            })
          ).unwrap();
          showSuccessToast(CommonMessage.MFS00008);
          setTimeout(() => {
            window.close();
          }, 5000);
        } else {
          await dispatch(
            createCashDeposit({
              body: {
                ...body,
                posted_date:
                  (body?.posted_date &&
                    body?.posted_date.format("YYYY-MM-DD HH:mm:ss")) ||
                  currentDate.format("YYYY-MM-DD HH:mm:ss"),
              },
            })
          ).unwrap();
          showSuccessToast(CommonMessage.MFS00007);
          setTimeout(() => {
            window.close();
          }, 5000);
        }
      }catch(error){
        console.error("Error:", error);
        setIsAfterSubmit(false);
      }
    },
    [dispatch, cashDeposits, isAfterSubmit ]
  );

  const handleChangeStatus = useCallback(
    async (status) => {
      try {
        await dispatch(
          changeStatusCashDeposit({ status: status, uuid: cashDeposits?.uuid, id: cashDeposits?.id })
        ).unwrap();

        showSuccessToast(CommonMessage.MFS00006);
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [dispatch, cashDeposits]
  );

  const handlePostCashDeposit = useCallback(
      async () => {
        try {
          await dispatch(
              postCashDeposit({ uuid: cashDeposits?.uuid, id: cashDeposits?.id })
          ).unwrap();

          showSuccessToast(CommonMessage.MFS00006);
        } catch (error) {
          console.error("Error:", error);
        }
      },
      [dispatch, cashDeposits]
  );


  return useMemo(
    () => ({
      watch,
      isSubmitting,
      onSubmit,
      handleSubmit,
      control,
      editAbleForm,
      isShowToolbar,
      isShowRemove,
      isDisable,
      cashDeposits,
      handleChangeStatus,
      handlePostCashDeposit,
      setValue,
    }),
    [
      watch,
      control,
      handleSubmit,
      isSubmitting,
      onSubmit,
      editAbleForm,
      isShowToolbar,
      isShowRemove,
      isDisable,
      cashDeposits,
      handleChangeStatus,
      handlePostCashDeposit,
      setValue,
    ]
  );
};

export default useCashDepositForm;
