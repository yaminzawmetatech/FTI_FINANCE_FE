import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Backdrop, CircularProgress } from "@mui/material";
import { useParams } from "react-router";
import { createApplicationDownPayment, getApplicationDownPayments } from "modules/loan-operation/slices/applicationDownPaymentSlice";
import ConfirmationDialog from "components/ConfirmationDialog";
import openNewWindow from "utils/windowUtils";

const DownPaymentListToolbarMakeDP = ({
  open,
  onClose,
  initialPaymentCalculations,
}) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { isSubmitting } = useSelector(
    (state) => state.applicationDownPayments.createApplicationDownPayment
  );

  const { applicationDownPayments } = useSelector(
    (state) => state.applicationDownPayments
  );
  
  // const onOk = useCallback(async () => {
  //   try { 
  //     await dispatch(
  //       getApplicationDownPayments({
  //         params: {
  //           application_id: id,
  //         },
  //       })
  //     ); 
  //     const downpaymentAmount =
  //       applicationDownPayments.length > 0
  //         ? applicationDownPayments[applicationDownPayments.length - 1]?.outstanding_amount
  //         : initialPaymentCalculations[0]?.down_payment_amount;
  
  //     const res = await dispatch(
  //       createApplicationDownPayment({
  //         body: {
  //           application_id: id,
  //           downpayment_amount: downpaymentAmount,
  //         },
  //       })
  //     ).unwrap();
  
  //     openNewWindow(`/loan-module/application-downpayment/edit/${res.data.uuid}`);
  //   } catch (e) {
  //     console.error("Error processing downpayment:", e);
  //   }
  // }, [id, dispatch, initialPaymentCalculations, applicationDownPayments]);
  

  const onOk = useCallback(async () => {
    try {
      const fetchedData = await dispatch(
        getApplicationDownPayments({
          params: { application_id: id },
        })
      ).unwrap(); // Get the latest response
  

      const downpaymentAmount =
        fetchedData?.data?.length > 0
          ? fetchedData?.data[fetchedData?.data?.length - 1]?.outstanding_amount
          : initialPaymentCalculations[0]?.down_payment_amount;
  
      const res = await dispatch(
        createApplicationDownPayment({
          body: {
            application_id: id,
            downpayment_amount: downpaymentAmount,
          },
        })
      ).unwrap();
  
      openNewWindow(`/loan-module/application-downpayment/edit/${res.data.uuid}`);
    } catch (e) {
      console.error("Error processing downpayment:", e);
    }
  }, [id, dispatch, initialPaymentCalculations]);
  
  if (isSubmitting) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <>
      <ConfirmationDialog
        open={open}
        onClose={onClose}
        onOk={onOk}
        title="Confirm Make DownPayment"
        content="Are you sure you want to make DownPayment?"
      />
    </>
  );
};

export default React.memo(DownPaymentListToolbarMakeDP);
