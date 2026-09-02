import React, { useEffect, useCallback } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { useDispatch, useSelector } from "react-redux";
import FormInputSelect from "components/form/FormInputSelect";
import { useForm } from "react-hook-form";

const AssignUserModal = ({ open, onClose, selectedRows }) => {
  const dispatch = useDispatch();
  const { control, reset, handleSubmit } = useForm({});
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit = useCallback(
    async (body) => {
      let isSuccess = false;
      try {
        // Ensure refs are checked before calling methods
        const loanSignatureDataUrl = sigCanvasLoan?.current?.isEmpty()
          ? null
          : sigCanvasLoan?.current?.toDataURL() ?? null;

        const finalBody = {
          ...body,
          application_collateral_id: id,
          loan_manager_signature: loanSignatureDataUrl,
          signature_type: type,
        };
  
        await dispatch(createCollateralSignature({ body: finalBody })).unwrap();
  
        // Fetch updated collateral signature data
        await dispatch(
          getCollateralSignature({
            params: {
              application_collateral_id: id,
              signature_type: type,
            },
          })
        ).unwrap();
        
        isSuccess = true;
      } catch (error) {
        console.error("Error submitting signature:", error);
        // You might want to show an error toast here as well
        // showErrorToast(error.message || "Failed to submit signature");
      } finally {
        if (isSuccess) {
          showSuccessToast(CommonMessage.MFS00008);
        }
        // Any cleanup code can go here
      }
    },
    [dispatch, id, type]
  );  

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle textAlign="center">Assign User</DialogTitle>
      <DialogContent>
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300px", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
            marginTop: "30px",
          }}
        >
          <FormInputSelect
            control={control}
            options={users ?? []}
            getOptionLabel={(option) => option?.user_name || ""}
            id="id"
            name="pic_id"
            label={<span className="required">User</span>}
            rules={{
              required: true,
            }}
          />
        </Stack>
        <DialogActions sx={{ p: "1.25rem" }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit())}
            variant="contained"
          >
            Assign
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default AssignUserModal;