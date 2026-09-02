import React, { useCallback } from "react";
import ConfirmationDialog from "../../../../../components/ConfirmationDialog";
import { useDispatch, useSelector } from "react-redux";
import { Backdrop, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { deleteReferenceByUuid } from "features/reference/referenceSlice";
import { getReferences } from "features/reference/referenceSlice";

const ApplicationReferenceDeleteToolbar = ({
  open,
  onClose,
  selectedReference,
  applicationId
}) => {
  const dispatch = useDispatch();

  const { isLoading } = useSelector(
    (state) => state.references.deleteReference
  );
  const onOk = useCallback(async () => {
    try {
      await dispatch(
        deleteReferenceByUuid({ id: selectedReference?.uuid, applicationId })
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
        getReferences({
          params: {
            application_id:applicationId,
          },
        })
      );
    } catch (e) {}
  }, [dispatch, selectedReference?.id]);

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
      title="Confirm Delete Reference"
      content="Are you sure you want to delete this reference?"
    />
  );
};

export default React.memo(ApplicationReferenceDeleteToolbar);
