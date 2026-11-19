// import { useCallback, useEffect, useMemo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useForm } from "react-hook-form";
// import { useParams } from "react-router-dom";
// import CommonMessage from "common/CommonMessage";
// import {
//   createGeneralLedgerEntrySetup,
//   getGeneralLedgerEntrySetupByUuid,
//   updateGeneralLedgerEntrySetup,
//   getRepaymentAmountTypes,
//   getRepaymentDateTypes,
//   getAccountTypes,
//   getAmountTypes,
//   getTransactionTypes,
// } from "modules/finance/slices/generalLedgerEntrySetupSlice";
// import { showSuccessToast } from "common/ToastMessage";
// import { get } from "lodash";
// import { getAccountCodes } from "modules/finance/slices/accountCodeSlice";

// const useGeneralLedgerEntrySetupForm = () => {
//   const { mode, uuid } = useParams();
//   const dispatch = useDispatch();

//   const { control, reset, watch, setValue, handleSubmit } = useForm({
//     defaultValues: {
//       disabled: false,
//     },
//   });

//   const {
//     generalLedgerEntrySetups,
//     isError,
//     isLoading: isSubmitting,
//   } = useSelector((state) => state.generalLedgerEntrySetups);


//   const {
//     getGeneralRepaymentAmountTypes,
//     getGeneralRepaymentDateTypes,
//     accountTypes,
//     amountTypes,
//     transactionTypes,
//   } = useSelector((state) => state.generalLedgerEntrySetups);

//   const {accountCodes} = useSelector((state) => state.accountCodes);



//   const [tableData, setTableData] = useState([]);



//   const fetchData = useCallback(async () => {
//     try {
//       if (mode === "edit" || mode === "view") {
//         await dispatch(getGeneralLedgerEntrySetupByUuid({ uuid }));
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   }, [mode, uuid, dispatch]);

//   // Fetch General Ledger Entry Setup by UUID for edit/view mode
//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);


//   // Fetch dropdown types on component mount
//   useEffect(() => {
//     dispatch(getRepaymentAmountTypes());
//     dispatch(getRepaymentDateTypes());
//     dispatch(getAccountTypes());
//     dispatch(getAmountTypes());
//     dispatch(getTransactionTypes());
//     dispatch(getAccountCodes());
//   }, [dispatch]);

//   // Determine if the form should be editable
//   const editAbleForm = useMemo(() => {
//     return mode !== "view";
//   }, [mode]);

//   // Reset form with fetched data for edit/view mode
//   useEffect(() => {
//     if (mode === "edit" || mode === "view") {
//       if (generalLedgerEntrySetups) {

//         // Map the data for the table
//         const mappedTableData = generalLedgerEntrySetups[0]?.gle_acct_setups?.map((item) => ({
//           id: item.id,
//           uuid: item.uuid,
//           account_code_id: item.account_code_id,
//           accountCode: item?.accountCode?.name,
//           amount_type: item.amount_types?.key || "", // Safely get amount type key  
//           transaction_type: item?.transaction_types?.key || "", // Safely get transaction type key
//           name: item.accountCode?.name || "", // Safely get account code name
//           created_by: item.created_by,
//           created_at: item.created_at,
//           modified_by: item.modified_by,
//           last_modified: item.last_modified,
//         }));

//         // Update the table data state
//         setTableData(mappedTableData);

//         // Reset the form with the fetched data
//         reset({
//           name: generalLedgerEntrySetups[0]?.name || "",
//           category_id: generalLedgerEntrySetups[0]?.category_id || "",
//           category_name: generalLedgerEntrySetups[0]?.category?.name || "",
//           sub_category_id: generalLedgerEntrySetups[0]?.sub_category_id || "",
//           sub_category_name: generalLedgerEntrySetups[0]?.sub_category?.name || "",
//           account_type: generalLedgerEntrySetups[0]?.account_types.key || "",
//           repayment_amount_type: generalLedgerEntrySetups[0]?.repayment_amount_types.key || "",
//           repayment_date_type: generalLedgerEntrySetups[0]?.repayment_date_types.key || "",
//           disabled: !editAbleForm,
//         });
//       }
//     }
//   }, [generalLedgerEntrySetups, reset, editAbleForm, mode]);

//   // Handle form submission
//   const onSubmit = useCallback(
//     async (body) => {
//       const updatedTableData = tableData.map((item) => ({
//         ...item,
//         account_code_id: get(item, "account_code_id", ""),
//         amount_type: get(item, "amount_type", ""),
//         transaction_type: get(item, "transaction_type", ""),
//       }));

//       try {
//         if (mode === "view") {
//           window.close();
//         } else if (mode === "edit") {
//           await dispatch(
//             updateGeneralLedgerEntrySetup({
//               body: { ...body, gle_acct_setups: updatedTableData },
//               uuid: uuid,
//             })
//           ).unwrap();
//           showSuccessToast(CommonMessage.MFS00008);
//           reset();
//           fetchData();
//         } else {
//           await dispatch(
//             createGeneralLedgerEntrySetup({
//               ...body,
//               gle_acct_setups: updatedTableData,
//             })
//           ).unwrap();
//           showSuccessToast(CommonMessage.MFS00007);
//           reset();
//           fetchData();
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     },
//     [dispatch, uuid, tableData, mode]
//   );

//   return useMemo(
//     () => ({
//       watch,
//       isSubmitting,
//       onSubmit,
//       handleSubmit,
//       control,
//       editAbleForm,
//       generalLedgerEntrySetups,
//       tableData,
//       setTableData,
//       setValue,
//       getGeneralRepaymentAmountTypes,
//       getGeneralRepaymentDateTypes,
//       accountTypes,
//       amountTypes,
//       transactionTypes,
//       accountCodes,
//     }),
//     [
//       watch,
//       control,
//       handleSubmit,
//       isSubmitting,
//       onSubmit,
//       editAbleForm,
//       generalLedgerEntrySetups,
//       tableData,
//       setTableData,
//       setValue,
//       getGeneralRepaymentAmountTypes,
//       getGeneralRepaymentDateTypes,
//       accountTypes,
//       amountTypes,
//       transactionTypes,
//       accountCodes,
//     ]
//   );
// };

// export default useGeneralLedgerEntrySetupForm;



import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import CommonMessage from "common/CommonMessage";
import {
  createGeneralLedgerEntrySetup,
  getGeneralLedgerEntrySetupByUuid,
  updateGeneralLedgerEntrySetup,
  getRepaymentAmountTypes,
  getRepaymentDateTypes,
  getAccountTypes,
  getAmountTypes,
  getTransactionTypes,
} from "modules/finance/slices/generalLedgerEntrySetupSlice";
import { showSuccessToast } from "common/ToastMessage";
import { get } from "lodash";
import { getAccountCodes } from "modules/finance/slices/accountCodeSlice";

const useGeneralLedgerEntrySetupForm = () => {
  const { mode, uuid } = useParams();
  const dispatch = useDispatch();

  const { control, reset, watch, setValue, handleSubmit } = useForm({
    defaultValues: {
      disabled: false,
    },
  });

  const {
    generalLedgerEntrySetups,
    isError,
    isLoading: isSubmitting,
  } = useSelector((state) => state.generalLedgerEntrySetups);

  const {
    getGeneralRepaymentAmountTypes,
    getGeneralRepaymentDateTypes,
    accountTypes,
    amountTypes,
    transactionTypes,
  } = useSelector((state) => state.generalLedgerEntrySetups);

  const { accountCodes } = useSelector((state) => state.accountCodes);

  const [tableData, setTableData] = useState([]);

  // Fetch entry setup by UUID for edit/view mode
  const fetchData = useCallback(async () => {
    try {
      if (mode === "edit" || mode === "view") {
        await dispatch(getGeneralLedgerEntrySetupByUuid({ uuid }));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [mode, uuid, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    dispatch(getRepaymentAmountTypes());
    dispatch(getRepaymentDateTypes());
    dispatch(getAccountTypes());
    dispatch(getAmountTypes());
    dispatch(getTransactionTypes());
    //dispatch(getAccountCodes());
  }, [dispatch]);

  const categoryId = watch("category_id");
  const subCategoryId = watch("sub_category_id");

  useEffect(() => {
    if(categoryId && subCategoryId){
      dispatch(getAccountCodes({params:{
        category_id: categoryId,
        sub_category_id: subCategoryId
      }}));
    }
  
  }, [dispatch, categoryId, subCategoryId ]);

  const editAbleForm = useMemo(() => mode !== "view", [mode]);

  useEffect(() => {
    if ((mode === "edit" || mode === "view") && generalLedgerEntrySetups?.length) {
      const mappedTableData = generalLedgerEntrySetups[0]?.gle_acct_setups?.map((item) => ({
        id: item.id,
        uuid: item.uuid,
        account_code_id: item.account_code_id,
        account_no: item?.accountCode?.code || "",
        accountCode: item?.accountCode?.name || "",
        amount_type: item.amount_types?.key || "",
        transaction_type: item.transaction_types?.key || "",
        name: item.accountCode?.name || "",
        created_by: item.created_by,
        created_at: item.created_at,
        modified_by: item.modified_by,
        last_modified: item.last_modified,
      }));

      setTableData(mappedTableData);

      reset({
        name: generalLedgerEntrySetups[0]?.name || "",
        category_id: generalLedgerEntrySetups[0]?.category_id || "",
        category_name: generalLedgerEntrySetups[0]?.category?.name || "",
        sub_category_id: generalLedgerEntrySetups[0]?.sub_category_id || "",
        sub_category_name: generalLedgerEntrySetups[0]?.sub_category?.name || "",
        account_type: generalLedgerEntrySetups[0]?.account_types?.key || "",
        repayment_amount_type: generalLedgerEntrySetups[0]?.repayment_amount_types?.key || "",
        repayment_date_type: generalLedgerEntrySetups[0]?.repayment_date_types?.key || "",
        disabled: !editAbleForm,
      });
    }
  }, [generalLedgerEntrySetups, reset, editAbleForm, mode]);

  const onSubmit = useCallback(
    async (body) => {
      const updatedTableData = tableData.map((item) => ({
        ...item,
        account_code_id: get(item, "account_code_id", ""),
        amount_type: get(item, "amount_type", ""),
        transaction_type: get(item, "transaction_type", ""),
      }));

      try {
        if (mode === "view") {
          window.close();
        } else if (mode === "edit") {
          await dispatch(
            updateGeneralLedgerEntrySetup({
              body: { ...body, gle_acct_setups: updatedTableData },
              uuid,
            })
          ).unwrap();
          showSuccessToast(CommonMessage.MFS00008);
          fetchData(); // Refetch to get updated data
        } else {
          await dispatch(
            createGeneralLedgerEntrySetup({
              ...body, gle_acct_setups: updatedTableData
            })
          ).unwrap();
          showSuccessToast(CommonMessage.MFS00007);
          reset(); // Reset form after creation
          setTableData([]); // Clear table data
        }
      } catch (error) {
        console.error("Submit error:", error);
      }
    },
    [dispatch, tableData, mode, uuid, reset, fetchData]
  );

  return {
    control,
    reset,
    watch,
    setValue,
    handleSubmit,
    onSubmit,
    editAbleForm,
    tableData,
    setTableData,
    isSubmitting,
    accountTypes,
    amountTypes,
    transactionTypes,
    getGeneralRepaymentAmountTypes,
    getGeneralRepaymentDateTypes,
    accountCodes,
  };
};

export default useGeneralLedgerEntrySetupForm;
