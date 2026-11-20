import { useCallback, useEffect, useMemo, useState } from "react";

import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { checkExistingGuarantor } from "modules/credit-management/slices/guarantorCheckNrcSlice";
import { getCollateralByUuid, updateCollateral } from "modules/loan-operation/slices/collateralSlice";
import { getAllCollateralTypes } from "modules/administration/slices/collateralTypesSetupSlice";
import { getCMCO } from "modules/administration/slices/usersSlice";


const useApplicationCollateralForm = () => {
  const { uuid, applicationId, mode, contractId } = useParams();

  const [category, setCategory] = useState();

  const { selectedCollateral, isLoading } = useSelector(
    (state) => state.collaterals
  );

  const { collateralTypes, isLoading: isCollateralTypesLoading } = useSelector(
    (state) => state.collateralTypes
  );

  const { CMCO = [] } = useSelector((state) => state.users);  // Default to an empty array if CMCO is undefined
  const  auth  = useSelector((state) => state.auth.user);



  const dispatch = useDispatch();

  const { control, reset, watch, handleSubmit, setValue } = useForm({
    defaultValues: {
      disabled: false,
    },
  });

  useEffect(() => {
    if (mode !== "CreateApplicationGuarantor" && uuid) {
      dispatch(getCollateralByUuid({ uuid }));
    }
  }, [dispatch, uuid]);

  useEffect(() => {
    if (selectedCollateral?.data?.application?.category_id) {
      const subCategoryId =
        !selectedCollateral?.data?.collateral_type ||
          selectedCollateral?.data?.collateral_type?.sub_category_id === null
          ? "null"
          : selectedCollateral.data.collateral_type.sub_category_id;



      dispatch(
        getAllCollateralTypes({
          params: {
            category_id: selectedCollateral.data.application.category_id,
            sub_category_id: subCategoryId,
          },
        })
      );
    }
    dispatch(getCMCO("CMCO"));
  }, [dispatch, selectedCollateral]);


  useEffect(() => {
    reset({
      ...selectedCollateral,
      ...selectedCollateral?.data,
      application_id: selectedCollateral?.data?.application?.application_id ?? '',
      collateral_type_id: selectedCollateral?.data?.collateral_type?.id ?? '',
      name: selectedCollateral?.data?.application?.applicant_name ?? '',
      cmco_to_loan_date: selectedCollateral?.data?.cmco_to_loan_date && dayjs(selectedCollateral?.data?.cmco_to_loan_date),
      sm_to_loan_date: selectedCollateral?.data?.sm_to_loan_date && dayjs(selectedCollateral?.data?.sm_to_loan_date),
      grd_informed_date: selectedCollateral?.data?.grd_informed_date && dayjs(selectedCollateral?.data?.grd_informed_date),
      grd_received_date: selectedCollateral?.data?.grd_received_date && dayjs(selectedCollateral?.data?.grd_received_date),
      collected_date: selectedCollateral?.data?.collected_date && dayjs(selectedCollateral?.data?.collected_date),
      delivered_date: selectedCollateral?.data?.delivered_date && dayjs(selectedCollateral?.data?.delivered_date),
      received_date: selectedCollateral?.data?.received_date && dayjs(selectedCollateral?.data?.received_date),
      filing_date: selectedCollateral?.data?.filing_date && dayjs(selectedCollateral?.data?.filing_date),
      license_renewal_date: selectedCollateral?.data?.latest_license?.license_renewal_date && dayjs(selectedCollateral?.data?.latest_license?.license_renewal_date),
      license_notice_date: selectedCollateral?.data?.latest_license?.license_notice_date && dayjs(selectedCollateral?.data?.latest_license?.license_notice_date),
      license_appointment_date: selectedCollateral?.data?.latest_license?.license_appointment_date && dayjs(selectedCollateral?.data?.latest_license?.license_appointment_date),
      license_released_date: selectedCollateral?.data?.latest_license?.license_released_date && dayjs(selectedCollateral?.data?.latest_license?.license_released_date),
      license_received_date: selectedCollateral?.data?.latest_license?.license_received_date && dayjs(selectedCollateral?.data?.latest_license?.license_received_date),
      license_loan_to_GRD_CMCE_delivered_date: selectedCollateral?.data?.latest_license?.license_loan_to_GRD_CMCE_delivered_date && dayjs(selectedCollateral?.data?.latest_license?.license_loan_to_GRD_CMCE_delivered_date),
      insurance_renewal_date: selectedCollateral?.data?.latest_insurance?.insurance_renewal_date && dayjs(selectedCollateral?.data?.latest_insurance?.insurance_renewal_date),
      insurance_notice_date: selectedCollateral?.data?.latest_insurance?.insurance_notice_date && dayjs(selectedCollateral?.data?.latest_insurance?.insurance_notice_date),
      insurance_appointment_date: selectedCollateral?.data?.latest_insurance?.insurance_appointment_date && dayjs(selectedCollateral?.data?.latest_insurance?.insurance_appointment_date),
      return_document_date: selectedCollateral?.data?.return_document_date && dayjs(selectedCollateral?.data?.return_document_date),
      repayment_grd_informed_date: selectedCollateral?.data?.repayment_grd_informed_date && dayjs(selectedCollateral?.data?.repayment_grd_informed_date),
      repayment_grd_received_date: selectedCollateral?.data?.repayment_grd_received_date && dayjs(selectedCollateral?.data?.repayment_grd_received_date),
      renewal_owner_book: selectedCollateral?.data?.latest_license?.renewal_owner_book ?? '',
      renewal_insurance_premium_book: selectedCollateral?.data?.latest_license?.renewal_insurance_premium_book ?? '',
      is_license_informed_to_customer: selectedCollateral?.data?.latest_license?.is_license_informed_to_customer ?? '',
      license_renewal_assign_user_id: selectedCollateral?.data?.latest_license?.license_renewal_assign_user_id ?? '',
      is_insurance_informed_to_customer: selectedCollateral?.data?.latest_insurance?.is_insurance_informed_to_customer ?? '',
      full_repayment_date: selectedCollateral?.data?.full_repayment_date && dayjs(selectedCollateral?.data?.full_repayment_date),
      disabled: mode && mode === "view",
    });
  }, [selectedCollateral, reset, collateralTypes]);



  const onSubmit = useCallback(
    async (body) => {
      try {
        if (mode === "edit" && selectedCollateral) {
          await dispatch(
            updateCollateral({
              data: {
                ...body,
                application_id: applicationId,
                contract_id: contractId,
                cmco_to_loan_date: body?.cmco_to_loan_date?.format("YYYY-MM-DD") || null,
                loan_to_cmco_date: body?.loan_to_cmco_date?.format("YYYY-MM-DD") || null,
                sm_to_loan_date: body?.sm_to_loan_date?.format("YYYY-MM-DD") || null,
                grd_informed_date: body?.grd_informed_date?.format("YYYY-MM-DD") || null,
                grd_received_date: body?.grd_received_date?.format("YYYY-MM-DD") || null,
                collected_date: body?.collected_date?.format("YYYY-MM-DD") || null,
                delivered_date: body?.delivered_date?.format("YYYY-MM-DD") || null,
                received_date: body?.received_date?.format("YYYY-MM-DD") || null,
                filing_date: body?.filing_date?.format("YYYY-MM-DD") || null,
                license_renewal_date: body?.license_renewal_date?.format("YYYY-MM-DD") || null,
                license_notice_date: body?.license_notice_date?.format("YYYY-MM-DD") || null,
                license_appointment_date: body?.license_appointment_date?.format("YYYY-MM-DD") || null,
                license_released_date: body?.license_released_date?.format("YYYY-MM-DD") || null,
                license_received_date: body?.license_received_date?.format("YYYY-MM-DD") || null,
                license_loan_to_GRD_CMCE_delivered_date: body?.license_loan_to_GRD_CMCE_delivered_date?.format("YYYY-MM-DD") || null,
                insurance_renewal_date: body?.insurance_renewal_date?.format("YYYY-MM-DD") || null,
                insurance_notice_date: body?.insurance_notice_date?.format("YYYY-MM-DD") || null,
                insurance_appointment_date: body?.insurance_appointment_date?.format("YYYY-MM-DD") || null,
                return_document_date: body?.return_document_date?.format("YYYY-MM-DD") || null,
                repayment_grd_informed_date: body?.repayment_grd_informed_date?.format("YYYY-MM-DD") || null,
                repayment_grd_received_date: body?.repayment_grd_received_date?.format("YYYY-MM-DD") || null,
                renewal_owner_book: body?.renewal_owner_book || null,
                renewal_insurance_premium_book: body?.renewal_insurance_premium_book || null,
                is_license_informed_to_customer:body?.is_license_informed_to_customer || null,
                license_renewal_assign_user_id:body?.license_renewal_assign_user_id || null,
                is_insurance_informed_to_customer: body?.is_insurance_informed_to_customer || null,
                repayment_owner_book: body?.repayment_owner_book || null,
                repayment_insurance_premium_book: body?.repayment_insurance_premium_book || null,
                serial_no: body?.serial_no || null,
                full_repayment_date: body?.full_repayment_date?.format("YYYY-MM-DD") || null,
              },
              uuid: uuid
            })
          ).unwrap();

          showSuccessToast("Collateral updated successfully");
          await dispatch(getCollateralByUuid({ uuid })).unwrap();
          // onClose();
        } else if (mode === "view") {
          window.close();
        }
      } catch (error) {
        console.error("Error updating collateral:", error);
        showErrorToast("Failed to update collateral. Please try again.");
      }
    },
    [dispatch, mode, uuid, selectedCollateral, applicationId, contractId]
  );


  return useMemo(
    () => ({
      onSubmit,
      handleSubmit,
      control,
      setValue,
      category,
      isLoading,
      collateralTypes,
      selectedCollateral,
      watch,
      CMCO,
      auth,
      isCollateralTypesLoading
    }),
    [control, handleSubmit, isLoading, onSubmit, setValue, category, selectedCollateral, watch, CMCO, auth, isCollateralTypesLoading]
  );
};

export default useApplicationCollateralForm;
