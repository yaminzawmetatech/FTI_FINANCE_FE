import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import { useForm } from "react-hook-form";
import FormInputText from "components/form/FormInputText";
import { updateAssessmentStatusByUuid } from "modules/credit-management/slices/assessmentSlice";
import { useDispatch } from "react-redux";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";

const EditApplicationAssessmentToolbarCancelButton = ({
  open,
  handleClose,
  assessment,
}) => {
  const dispatch = useDispatch();

  const { control, handleSubmit } = useForm({
    defaultValues: {},
  });

  const handleOk = handleSubmit(async ({ remark }) => {
    try {
      const body = {
        application_id: assessment.application_id,
        remark: `Cancel for Reason : ${remark}`,
      };
      await dispatch(
        updateAssessmentStatusByUuid({
          id: assessment.id,
          status: "canceled",
          body,
        })
      ).unwrap();

      showSuccessToast(CommonMessage.MFS00008);
      setTimeout(() => {
        window.close();
      }, 5000);
    } catch (e) {}
  });

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%" } }}
      maxWidth="xs"
      open={open}
    >
      <DialogTitle
        id="scroll-dialog-title"
        variant="h5"
        sx={{ color: "#1890ff" }}
      >
        Cancel
      </DialogTitle>
      <DialogContent dividers>
        <Grid item xs={12}>
          <FormInputText
            multiline
            control={control}
            rules={{ required: true }}
            label="Cancel For Reason"
            name="remark"
            sx={{
              pt: 1,
              textarea: {
                minHeight: "200px",
                maxHeight: "200px",
                overflow: "auto !important",
              },
            }}
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(EditApplicationAssessmentToolbarCancelButton);
