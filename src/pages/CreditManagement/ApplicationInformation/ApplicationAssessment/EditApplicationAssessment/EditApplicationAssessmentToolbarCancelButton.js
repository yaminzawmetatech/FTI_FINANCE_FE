import * as React from "react";
import { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
// import { useForm } from "react-hook-form";
import FormInputText from "../../../../../components/form/FormInputText";
import { updateAssessmentStatusByUuid } from "../../../../../features/assessment/assessmentSlice";
import { useDispatch, useSelector } from "react-redux";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import {
  getAssessmentApprovedResponses,
  getExternalResponses,
  getInternalResponses,
} from "features/applicationResponseSetup/applicationResponseSlice";
import FormInputMultiSelect from "components/form/FormInputMultiSelect";
import { useWatch } from "react-hook-form";
import dayjs from "dayjs";
import { getApplicationReasonsByStatus } from "features/applicationReason/applicationReasonSlice";
import FormInputSelect from "components/form/FormInputSelect";

const EditApplicationAssessmentToolbarCancelButton = ({
  open,
  handleClose,
  assessment,
  status,
  handleSubmit,
  control,
  getValues,
  reset,
  setValue,
}) => {
  const dispatch = useDispatch();

  const internalRemark = useWatch({
    control,
    name: "internal_remark_select",
  });

  const externalRemark = useWatch({
    control,
    name: "external_remark_select",
  });

  const { externalResponses } = useSelector((state) => state.externalResponses);

  const { internalResponses } = useSelector((state) => state.internalResponses);

  const { applicationReasonsByStatus } = useSelector(
    (state) => state.applicationReasonsByStatus
  );

  useEffect(() => {
    if (open) {
      if (status === "Canceled" || status === "Rejected") {
        dispatch(getApplicationReasonsByStatus({ status: status }));
        dispatch(getExternalResponses({ type: "Assessment", status: status }));
        dispatch(getInternalResponses({ type: "Assessment", status: status }));
      } else if (status === "Approved") {
        dispatch(getAssessmentApprovedResponses());
      }
    }
  }, [open, dispatch, status]);

  useEffect(() => {
    if (open) {
      reset({
        ...assessment,
        conduct_at: assessment?.conduct_at && dayjs(assessment?.conduct_at),
        commencement_date:
          assessment?.commencement_date && dayjs(assessment?.commencement_date),
        first_due_date:
          assessment?.first_due_date && dayjs(assessment?.first_due_date),
        created_at: assessment?.created_at && dayjs(assessment?.created_at),
        updated_at: assessment?.updated_at && dayjs(assessment?.updated_at),
        internal_remark: "",
        internal_remark_select: [],
        external_remark: "",
        external_remark_select: [],
      });
    }
  }, [open, assessment]);

  useEffect(() => {
    // Automatically select external options based on internal options
    if (internalRemark) {
      const internalIds = internalRemark.map(
        (option) => option.external_response_id
      );
      const autoSelectExternal = externalResponses.filter((option) =>
        internalIds.includes(option.id)
      );
      setValue("external_remark_select", autoSelectExternal);
      handleSelectExternalChange(autoSelectExternal);
    }
  }, [internalRemark, externalResponses, setValue]);

  // for internal_remark concatenation
  const handleSelectInternalChange = (selectedOptions) => {
    const existingRemark = getValues("internal_remark") || "";

    // Split existing remarks into individual lines, trim spaces, and remove any bullet points
    const existingNames = existingRemark
      .split("\n")
      .map((name) => name.trim().replace(/^•\s*/, "")) // Remove any existing bullet points
      .filter(Boolean);

    // Get the text of the newly selected options
    const newSelectedNames =
      selectedOptions?.map((option) => option.text) || [];

    // Identify manually added remarks (those that are not in the select box options)
    const manuallyAddedNames = existingNames.filter(
      (existingName) =>
        !internalResponses.some((option) => existingName.includes(option.text))
    );

    // Remove any existing names that are no longer selected
    const updatedNames = existingNames.filter((existingName) => {
      return (
        newSelectedNames.some((newName) => existingName.includes(newName)) ||
        manuallyAddedNames.includes(existingName)
      );
    });

    // Add only new selections that are not already in the updated list
    const combinedNames = Array.from(
      new Set([
        ...newSelectedNames.filter(
          (newName) =>
            !updatedNames.some((existingName) => existingName.includes(newName))
        ),
        ...updatedNames, // Include manually modified or existing names
        ...manuallyAddedNames, // Preserve truly manually added names
      ])
    );

    // Concatenate with bullet points and new lines, with new selections at the top
    const newRemark = combinedNames.map((name) => `• ${name}`).join("\n");

    // Update the form field with the new value
    setValue("internal_remark", newRemark);
  };

  // for external_remark concatenation
  const handleSelectExternalChange = (selectedOptions) => {
    const existingRemark = getValues("external_remark") || "";

    // Split existing remarks into individual lines, trim spaces, and remove any bullet points
    const existingNames = existingRemark
      .split("\n")
      .map((name) => name.trim().replace(/^•\s*/, "")) // Remove any existing bullet points
      .filter(Boolean);

    // Get the text of the newly selected options
    const newSelectedNames =
      selectedOptions?.map((option) => option.text) || [];

    // Identify manually added remarks (those that are not in the select box options)
    const manuallyAddedNames = existingNames.filter(
      (existingName) =>
        !externalResponses.some((option) => existingName.includes(option.text))
    );

    // Remove any existing names that are no longer selected
    const updatedNames = existingNames.filter((existingName) => {
      return (
        newSelectedNames.some((newName) => existingName.includes(newName)) ||
        manuallyAddedNames.includes(existingName)
      );
    });

    // Add only new selections that are not already in the updated list
    const combinedNames = Array.from(
      new Set([
        ...newSelectedNames.filter(
          (newName) =>
            !updatedNames.some((existingName) => existingName.includes(newName))
        ),
        ...updatedNames, // Include manually modified or existing names
        ...manuallyAddedNames, // Preserve truly manually added names
      ])
    );

    // Concatenate with bullet points and new lines, with new selections at the top
    const newRemark = combinedNames.map((name) => `• ${name}`).join("\n");

    // Update the form field with the new value
    setValue("external_remark", newRemark);
  };

  const handleOk = handleSubmit(async (formData) => {
    const selectedInternalOptionsArr =
      internalRemark?.map((remark) => remark.id) || [];
    const selectedExternalOptionsArr =
      externalRemark?.map((remark) => remark.id) || [];
    const remarkIdsArr = [
      ...selectedInternalOptionsArr,
      ...selectedExternalOptionsArr,
    ];

    try {
      await dispatch(
        updateAssessmentStatusByUuid({
          id: assessment.id,
          status:
            status === "Approved"
              ? "approved"
              : status === "Rejected"
              ? "rejected"
              : "canceled",
          body: {
            ...formData,
            remark_ids: remarkIdsArr,
            commencement_date:
              formData.commencement_date?.format("YYYY-MM-DD HH:mm:ss") || null,
            first_due_date:
              formData.first_due_date?.format("YYYY-MM-DD HH:mm:ss") || null,
          },
        })
      ).unwrap();
      showSuccessToast(CommonMessage.MFS00008);
      handleClose();
    } catch (error) {
      console.error("Submission Error:", error);
    }
  });

  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": { width: status === "Approved" ? "36%" : "100%" },
      }}
      maxWidth="md"
      open={open}
    >
      <DialogTitle
        id="scroll-dialog-title"
        variant="h5"
        sx={{ color: "#1890ff" }}
      >
        {status === "Canceled"
          ? "Cancel Application Assessment"
          : status === "Approved"
          ? "Approve Application Assessment"
          : "Reject Application Assessment"}
      </DialogTitle>
      <DialogContent dividers>
        {status === "Approved" && (
          <>
            <Grid item xs={12}>
              <FormInputMultiSelect
                name="internal_remark_select"
                control={control}
                limitTags={2}
                options={internalResponses ?? []}
                label="Select Remark"
                rules={{ required: false }}
                onSelect={handleSelectInternalChange}
                id="id"
                getOptionLabel={(option) => option?.id}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                multiline
                control={control}
                rules={{ required: false }}
                label="Remark"
                name="internal_remark"
                sx={{
                  pt: 1,
                  mb: 1,
                  textarea: {
                    minHeight: "130px",
                    maxHeight: "130px",
                    overflow: "auto !important",
                  },
                }}
              />
            </Grid>
          </>
        )}
        {status !== "Approved" && (
          <Grid
            container
            spacing={2}
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid
              container
              item
              spacing={2}
              xs={12}
              sm={6}
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Grid item xs={12}>
                <FormInputMultiSelect
                  name="internal_remark_select"
                  control={control}
                  limitTags={2}
                  options={internalResponses ?? []}
                  label="Selet Internal Remark"
                  rules={{ required: false }}
                  onSelect={handleSelectInternalChange}
                  id="id"
                  getOptionLabel={(option) => option?.id}
                />
              </Grid>
              <Grid item xs={12}>
                <FormInputText
                  multiline
                  control={control}
                  rules={{ required: true }}
                  label="Internal Remark"
                  name="internal_remark"
                  sx={{
                    pt: 1,
                    mb: 1,
                    textarea: {
                      minHeight: "130px",
                      maxHeight: "130px",
                      overflow: "auto !important",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormInputSelect
                  name="reason"
                  control={control}
                  options={applicationReasonsByStatus ?? []}
                  label={
                    status === "Canceled"
                      ? "Select Cancel Reason"
                      : "Select Reject Reason"
                  }
                  rules={{ required: true }}
                  id="id"
                  getOptionLabel={(option) => option?.reason}
                />
              </Grid>
            </Grid>
            <Grid
              container
              item
              spacing={2}
              xs={12}
              sm={6}
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Grid item xs={12}>
                <FormInputMultiSelect
                  name="external_remark_select"
                  control={control}
                  limitTags={2}
                  options={externalResponses ?? []}
                  label="Select External Remark"
                  rules={{ required: false }}
                  onSelect={handleSelectExternalChange}
                  id="id"
                  getOptionLabel={(option) => option?.id}
                />
              </Grid>

              <Grid item xs={12}>
                <FormInputText
                  multiline
                  control={control}
                  rules={{ required: false }}
                  label="External Remark"
                  name="external_remark"
                  sx={{
                    pt: 1,
                    textarea: {
                      minHeight: "130px",
                      maxHeight: "130px",
                      overflow: "auto !important",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        )}
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
