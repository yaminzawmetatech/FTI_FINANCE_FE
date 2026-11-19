import React, { useCallback } from "react";
import ConfirmationDialog from "components/ConfirmationDialog";
import { useDispatch, useSelector } from "react-redux";
import { createAssessment } from "modules/credit-management/slices/assessmentSlice";
import { Backdrop, CircularProgress } from "@mui/material";
import { useParams } from "react-router";
import openNewWindow from "utils/windowUtils";

const ApplicationAssessmentListToolbarMakeAssessment = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { applicationId: application_id } = useParams();

  const { isSubmitting } = useSelector(
    (state) => state.assessments.createAssessment
  );
  const onOk = useCallback(async () => {
    try {
      const res = await dispatch(
        createAssessment({ body: { application_id } })
      ).unwrap();
      openNewWindow(
        `/CreditManagement/ApplicationAssessment/EditApplicationAssessment/${res.data.id}`
      );
    } catch (e) {}
  }, [application_id, dispatch]);

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
        title="Confirm Make Assessment"
        content="Are you sure you want to make assement?"
      />
    </>
  );
};

export default React.memo(ApplicationAssessmentListToolbarMakeAssessment);
