import React, { useCallback } from "react";
import ConfirmationDialog from "../../../../../components/ConfirmationDialog";
import { useDispatch, useSelector } from "react-redux";
import { Backdrop, CircularProgress } from "@mui/material";
import { deleteGuarantorByUuid } from "features/guarantor/guarantorSlice";
import { toast } from "react-toastify";
import { getGuarantors } from "features/guarantor/guarantorSlice";

const ApplicationAssessmentListToolbarDeleteAssessment = ({
  open,
  onClose,
  selectedGuarantor,
  applicationId
}) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => state.assessments.deleteAssessment
  );
  const onOk = useCallback(async () => {
    try {
      await dispatch(
        deleteGuarantorByUuid({ id: selectedGuarantor?.uuid, applicationId })
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
        getGuarantors({
          params: {
            application_id:applicationId,
          },
        })
      );
    } catch (e) {}
  }, [dispatch, selectedGuarantor?.id]);

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
      title="Confirm Delete Guarantor"
      content="Are you sure you want to delete this guarantor?"
    />
  );
};

export default React.memo(ApplicationAssessmentListToolbarDeleteAssessment);
