import { useCallback, useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getBookingByUuid,
  updateBookings,
} from "modules/loan-operation/slices/bookingProcessSlice";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import dayjs from "dayjs";
import {
  getDealerByDealerType,
  getDealers,
  getDealersByUserRole,
} from "modules/loan-operation/slices/dealerSlice";

const useBookingForm = (defaultValues) => {
  const { control, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      disabled: false,
    },
  });

  const dispatch = useDispatch();
  const { category, uuid, mode } = useParams();

  const { isLoading, isError, message } = useSelector(
    (state) => state.bookings
  );
  const { selectedBooking } = useSelector((state) => state.bookings);

  useEffect(() => {
    // Fetch the booking details based on the UUID
    dispatch(getBookingByUuid(uuid));
  }, [dispatch, uuid]);

  const editAbleForm = useMemo(() => {
    if (mode && mode === "view") {
      return false;
    } else {
      return true;
    }
  }, [mode]);

  useEffect(() => {
    if (selectedBooking) {
      reset({
        ...selectedBooking,
        ...selectedBooking?.data,
        application_id: selectedBooking?.data?.contract?.generated_application_id || "",
        applicant_name: selectedBooking?.data?.contract?.customer_name || "",
        category: selectedBooking?.data?.contract?.category?.name || "",
        sub_category: selectedBooking?.data?.contract?.sub_category?.name || "",
        dealer_name: selectedBooking?.data?.dealer?.name || "",
        owner_name: selectedBooking?.data?.dealer?.owner_name || "",
        contract_id: selectedBooking?.data?.contract_id || "",
        booking_status: selectedBooking?.data?.booking_status || "",
        commission: selectedBooking?.data?.commission || "",
        commission_amount: selectedBooking?.data?.commission_amount || "",
        created_by: selectedBooking?.data.created_by ?? null,
        modified_by: selectedBooking?.data.modified_by ?? "",
        approved_date:
          selectedBooking?.data?.approved_date &&
          dayjs(selectedBooking?.data?.approved_date),
        total_amount:
          selectedBooking?.data?.contract?.application?.application_info
            ?.total_amount > 0 ? selectedBooking?.data?.contract?.application?.application_info
            ?.total_amount : selectedBooking?.data?.contract?.loan_amount,
        vehicle_down_payment_amount:
          selectedBooking?.data?.contract?.vehicle_down_payment_amount,
        loan_amount:
          selectedBooking?.data?.contract?.loan_amount,
        // customer_disbursed_amount:
        //   selectedBooking?.data?.contract?.customer_disbursed_amount,
        disabled: !editAbleForm,
      });
    }
  }, [
    selectedBooking,
    reset,
    editAbleForm,
    selectedBooking?.data?.contract?.application,
  ]);

  useEffect(() => {
    // When selectedBooking is available, set form values
    if (selectedBooking) {
      // Dynamically set the form values from selectedBooking
      setValue("contract_id", selectedBooking?.data.contract_id);
      setValue("booking_status", selectedBooking?.data.booking_status);
      setValue("commission", selectedBooking?.data.commission);
      setValue("commission_amount", selectedBooking?.data.commission_amount);
      // setValue("approved_date", selectedBooking?.data.approved_date);
      setValue("approved_by", selectedBooking?.data.approved_by);
      setValue(
        "dealer_id",
        selectedBooking?.data?.contract?.application?.dealer_id
      );
      setValue(
        "current_approval_sequence",
        selectedBooking?.data.current_approval_sequence
      );
      setValue("created_by", selectedBooking?.data.created_by);
      setValue("modified_by", selectedBooking?.data.modified_by);
    }
  }, [selectedBooking, setValue]);

  const handleChangeStatus = useCallback(
    async (status) => {
      try {
        const responseData = await dispatch(
          updateBookings([
            {
              booking_status: status,
              uuid: uuid,
              category_id: category,
            },
          ])
        );

        if (responseData.payload.success === true) {
          showSuccessToast(CommonMessage.MFS00006);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [dispatch, uuid]
  );

  const onSubmit = async (data) => {
    if (!data) {
      console.error("Data is undefined or null");
      return;
    }

    try {
      const updatedData = [
        {
          uuid: uuid,
          commission: data?.commission,
          commission_amount: data?.commission_amount,
        },
      ];
      await dispatch(updateBookings(updatedData)).unwrap(); // Update the booking
      await dispatch(getBookingByUuid(uuid)).unwrap(); // Refresh the booking data
      showSuccessToast("Booking Process Update Success");
      setTimeout(() => {
        window.close();
      }, 5000);
      reset(); // Reset the form
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

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
    handleChangeStatus,
    editAbleForm,
  };
};

export default useBookingForm;
