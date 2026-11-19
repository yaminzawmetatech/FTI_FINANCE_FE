import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Backdrop, CircularProgress } from "@mui/material";
import { useParams } from "react-router";
import { deleteApplicationDownPayment, getApplicationDownPayments } from "modules/loan-operation/slices/applicationDownPaymentSlice";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import ConfirmationDialog from "components/ConfirmationDialog";
import { getInitialPaymentCalculation } from "modules/loan-operation/slices/initialPaymentCalSlice";

const DownPaymentListToolbarDeleteDP = ({
  open,
  onClose,
  selectedDownPayment,
}) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { isLoading } = useSelector(
    (state) => state.applicationDownPayments.deleteApplicationDownPayment
  );
  const onOk = useCallback(async () => {
    if (!selectedDownPayment) return;
    try {
      await dispatch(
        deleteApplicationDownPayment({ uuid: selectedDownPayment?.uuid })
      ).unwrap();
      showSuccessToast(CommonMessage.MFS00011);
      await dispatch(
        getApplicationDownPayments({
          params: {
            application_id: id,
          },
        })
      );
      await dispatch(getInitialPaymentCalculation({
        params: {
          application_id: id,
        },
      }));
    } catch (e) {}
  }, [dispatch, selectedDownPayment, id]);

  if (isLoading) {
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
    <ConfirmationDialog
      open={open}
      onClose={onClose}
      onOk={onOk}
      title="Confirm Delete DownPayment"
      content="Are you sure you want to delete this DownPayment?"
    />
  );
};

export default React.memo(DownPaymentListToolbarDeleteDP);
