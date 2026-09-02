import React, { useCallback } from "react";
import ConfirmationDialog from "../../../../../components/ConfirmationDialog";
import { useDispatch, useSelector } from "react-redux";
import { Backdrop, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { deleteJointApplicantByUuid } from "features/jointApplicant/jointApplicantSlice";
import { getJointApplicants } from "features/jointApplicant/jointApplicantSlice";

const JointApplicantListToolbarDelete = ({
  open,
  onClose,
  selectedJointApplicant,
  applicationId
}) => {
  const dispatch = useDispatch();

  const { isLoading } = useSelector(
    (state) => state.jointApplicants.deleteJointApplicant
  );
  const onOk = useCallback(async () => {
    try {
      await dispatch(
        deleteJointApplicantByUuid({ id: selectedJointApplicant?.uuid, applicationId })
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
        getJointApplicants({
          params: {
            application_id:applicationId,
          },
        })
      );
    } catch (e) {}
  }, [dispatch, selectedJointApplicant?.id]);

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
      title="Confirm Delete Joint Applicant"
      content="Are you sure you want to delete this joint applicant?"
    />
  );
};

export default React.memo(JointApplicantListToolbarDelete);
