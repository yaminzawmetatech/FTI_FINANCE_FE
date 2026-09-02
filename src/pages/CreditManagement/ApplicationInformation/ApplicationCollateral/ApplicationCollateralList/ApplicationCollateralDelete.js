import React, { useCallback } from "react";
import ConfirmationDialog from "../../../../../components/ConfirmationDialog";
import { useDispatch, useSelector } from "react-redux";
import { createAssessment } from "../../../../../features/assessment/assessmentSlice";
import { Backdrop, CircularProgress } from "@mui/material";
import { useParams } from "react-router";
import openNewWindow from "../../../../../utils/windowUtils";
import { deleteCollateral } from "features/collateral/collateralSlice";

const ApplicationCollateralDelete = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { uuid } = useParams();

  const onOk = useCallback(async () => {
    try {
      const res = await dispatch(
        deleteCollateral(uuid)
      ).unwrap();
      // openNewWindow(
      //   `/CreditManagement/ApplicationAssessment/EditApplicationAssessment/${res.data.id}`
      // );
    } catch (e) { }
  }, [uuid, dispatch]);

  // if (isSubmitting) {
  //   return (
  //     <Backdrop
  //       sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
  //       open={true}
  //     >
  //       <CircularProgress color="inherit" />
  //     </Backdrop>
  //   );
  // }

  return (
    <>
      <ConfirmationDialog
        open={open}
        onClose={onClose}
        onOk={onOk}
        title="Confirm ForDelete"
        content="Are you sure you want to make delete?"
      />
    </>
  );
};

export default React.memo(ApplicationCollateralDelete);
