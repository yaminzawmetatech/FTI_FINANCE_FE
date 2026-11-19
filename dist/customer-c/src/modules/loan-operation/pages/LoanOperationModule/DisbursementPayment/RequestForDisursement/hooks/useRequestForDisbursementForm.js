import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBookingByUuid, updateBookings } from "modules/loan-operation/slices/bookingProcessSlice";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import dayjs from "dayjs";
import { updateContractByUuid } from "modules/loan-operation/slices/contractSlice";
import { getCustomerBanks } from "modules/administration/slices/customerBankSlice";

const useRequestForDisbursementFrom = (defaultValues) => {
  const { control, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues,
  });

  const dispatch = useDispatch();
  const { uuid, mode } = useParams();

  const { isLoading, isError, message } = useSelector((state) => state.bookings);
  const { selectedBooking } = useSelector((state) => state.bookings);
  const {customerBanks} = useSelector((state) => state.customerBanks);



  useEffect(() => {
    // Fetch the booking details based on the UUID
    dispatch(getBookingByUuid(uuid));
    dispatch(getCustomerBanks({}));
  }, [dispatch, uuid]);

  useEffect(() => {
    if (selectedBooking) {
      reset({
        ...selectedBooking,
        ...selectedBooking?.data,
        ...selectedBooking?.data?.contract,
        // application_id: selectedBooking?.data?.application_id || "",
        // contract_id: selectedBooking?.data?.contract_id || "",
        // booking_status: selectedBooking?.data?.booking_status || "",
        // commission: selectedBooking?.data?.commission || "",
        // commission_amount: selectedBooking?.data?.commission_amount || "",
        dealer_name: selectedBooking?.data?.dealer?.name ?? "",
        created_by: selectedBooking?.data.created_by ?? null,
        modified_by: selectedBooking?.data.modified_by ?? "",
        approved_date: selectedBooking?.data?.approved_date && dayjs(selectedBooking?.data?.approved_date),
        first_due_date: selectedBooking?.data?.contract?.first_due_date && dayjs(selectedBooking?.data?.contract?.first_due_date),
        commencement_date: selectedBooking?.data?.contract?.commencement_date && dayjs(selectedBooking?.data?.contract?.commencement_date),
        disbursement_date: selectedBooking?.data?.contract?.disbursement_date && dayjs(selectedBooking?.data?.contract?.disbursement_date),
        applied_date: selectedBooking?.data?.contract?.applied_date && dayjs(selectedBooking?.data?.contract?.applied_date),
        total_amount: selectedBooking?.data?.contract?.application?.application_info?.total_amount ?? null,
      });
    }
  }, [selectedBooking, reset]);

  // useEffect(() => {
  //   // // When selectedBooking is available, set form values
  //   // if (selectedBooking) {
  //   //   // Dynamically set the form values from selectedBooking
  //   //   setValue("application_id", selectedBooking?.data.application_id);
  //   //   setValue("contract_id", selectedBooking?.data.contract_id);
  //   //   setValue("booking_status", selectedBooking?.data.booking_status);
  //   //   setValue("commission", selectedBooking?.data.commission);
  //   //   setValue("commission_amount", selectedBooking?.data.commission_amount);
  //   //   setValue("approved_date", selectedBooking?.data.approved_date);
  //   //   setValue("approved_by", selectedBooking?.data.approved_by);
  //   //   setValue("current_approval_sequence", selectedBooking?.data.current_approval_sequence);
  //   //   setValue("created_by", selectedBooking?.data.created_by);
  //   //   setValue("modified_by", selectedBooking?.data.modified_by);
  //   // }
  // }, [selectedBooking, setValue]);

  const onSubmit = useCallback(
    async (body) => {

      if (mode === "view") {
        window.close();
        return;
      }

      const contractUuid = selectedBooking?.data?.contract?.uuid;
      if (!contractUuid) {
        console.error("Contract UUID is undefined");
        return;
      }

      try {
        await dispatch(
          updateContractByUuid({
            id: contractUuid,
            newData: {
              ...body,
              request_for_disbursement: 0,
              dob: body?.dob ? body.dob.format("YYYY-MM-DD HH:mm:ss") : null,
            },
          })
        );

        showSuccessToast(CommonMessage.MFS00008);
        setTimeout(() => {
          window.close();
        }, 5000);
      } catch (error) {
        console.error("Failed to update contract:", error);
      }
    },
    [dispatch, selectedBooking, mode] // ✅ Added dependencies
  );


  return {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
    isError,
    message,
    watch,
    setValue,
    selectedBooking,
    customerBanks,
  };
};

export default useRequestForDisbursementFrom;