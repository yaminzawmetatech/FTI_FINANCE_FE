import * as React from "react";
import { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import FormInputText from "components/form/FormInputText";
import CommonMessage from "common/CommonMessage";
import FormInputRadio from "components/form/FormInputRadio";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormInputSelect from "components/form/FormInputSelect";
import { useController, useWatch } from "react-hook-form";
import { getExternalResponses } from "modules/credit-management/slices/assessmentResponseSlice";
import { useDispatch, useSelector } from "react-redux";


export const CreateEditAssessmentResponseModal = ({
  open,
  onClose,
  columns,
  editValues,
  editFlag,
  control,
  handleSubmit,
  onSubmit,
  reset,
  setEditValues,
}) => {
  const dispatch = useDispatch();

  const { externalAssessmentResponses } = useSelector(
    (state) => state.externalAssessmentResponses
  );
  
  const status = useWatch({
    control,
    name: "assessment_status",
  });

  const type = useWatch({
    control,
    name: "type",
  });

  const TYPE = [
    { id: "internal", key: "internal" },
    { id: "external", key: "external" },
    //{id: "none", key: "none"},
  ];

  const STATUS = [
    { id: "Approved", key: "Approved" },
    { id: "Rejected", key: "Rejected" },
    { id: "Canceled", key: "Canceled" },
  ];

  useEffect(() => {
    if(status === "Rejected" || status === "Canceled"){
      dispatch(getExternalResponses(status));
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (editFlag === false) {
      reset();
    }
  }, [editFlag, editValues, open]);

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {editFlag === true
          ? "Edit Assessment Response"
          : "Create New Assessment Response"}
      </DialogTitle>
      <DialogContent>
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300px", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
          }}
        >
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
              mt: 1,
            }}
          >
            <FormInputSelect
              control={control}
              options={STATUS}
              getOptionLabel={(option) => option?.id}
              id="id"
              label="Status"
              name="assessment_status"
            />
          </Stack>
          {status && status !== "Approved" && (
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Type</FormLabel>
              <FormInputRadio
                control={control}
                options={TYPE}
                id="id"
                name="type"
              />
            </FormControl>
          )}
          {type && type !== "external" && (
            <Stack
              sx={{
                width: "100%",
                minWidth: { xs: "300px", sm: "360px", md: "400px" },
                gap: "1.5rem",
                mt: 1,
              }}
            >
              <FormInputSelect
                control={control}
                options={externalAssessmentResponses}
                getOptionLabel={(option) => option?.text}
                id="id"
                label="External Response"
                name="external_response_id"
              />
            </Stack>
          )}

          <FormInputText control={control} label="Name" name="text" />

          <DialogActions sx={{ p: "1.25rem" }}>
            <Button
              onClick={() => {
                reset();
                setEditValues("");
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={() => {
                handleSubmit((data) => onSubmit(data, editFlag))();
              }}
              variant="contained"
            >
              {editFlag === true ? "Update" : "Save"}
            </Button>
          </DialogActions>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditAssessmentResponseModal;
