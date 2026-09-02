import React, { useCallback } from "react";
import ConfirmationDialog from "../../../../../components/ConfirmationDialog";
import { useDispatch, useSelector } from "react-redux";
import { Backdrop, CircularProgress } from "@mui/material";
import { deleteAssessmentByUuid } from "../../../../../features/assessment/assessmentSlice";
import { getAssessments } from "../../../../../features/assessment/assessmentSlice";
import { useParams } from "react-router";
import { toast } from "react-toastify";

const ApplicationAssessmentListToolbarDeleteAssessment = ({
  open,
  onClose,
  selectedAssessment,
}) => {
  const dispatch = useDispatch();
  const { applicationId: application_id} = useParams();

  const { isLoading } = useSelector(
    (state) => state.assessments.deleteAssessment
  );
  const onOk = useCallback(async () => {
    try {
      await dispatch(
        deleteAssessmentByUuid({ id: selectedAssessment?.id })
      ).unwrap();
      toast.success("Delete Success", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      await dispatch(
        getAssessments({
          params: {
            application_id,
          },
        })
      );
    } catch (e) {}
  }, [dispatch, selectedAssessment?.id]);

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
      title="Confirm Delete Assessment"
      content="Are you sure you want to delete this assement?"
    />
  );
};

export default React.memo(ApplicationAssessmentListToolbarDeleteAssessment);
