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
import { getExternalResponses } from "modules/credit-management/slices/applicationResponseSlice";
import { useDispatch, useSelector } from "react-redux";
import FormInputCheckbox from "components/form/FormInputCheckbox";


export const CreateEditApplicationResponseModal = ({
  open,
  onClose,
  editValues,
  editFlag,
  control,
  handleSubmit,
  onSubmit,
  reset,
  setEditValues,
  setValue
}) => {

  const dispatch = useDispatch();

  const status = useWatch({
    control,
    name: "status",
  });

  const application_status = useWatch({
    control,
    name: "application_status",
  });
  

  const response_type = useWatch({
    control,
    name: "response_type",
  });
  
  const type = useWatch({
    control,
    name: "type",
  });

  const TYPE = [
    { id: "Application", key: "Application" },
    { id: "Assessment", key: "Assessment" },
    //{id: "none", key: "none"},
  ];

  const RESPONSE_TYPE = [
    { id: "internal", key: "internal" },
    { id: "external", key: "external" },
    //{id: "none", key: "none"},
  ];

  const STATUS = [
    { id: "Approved", key: "Approved" },
    { id: "Rejected", key: "Rejected" },
    { id: "Canceled", key: "Canceled" },
  ];

  const { externalResponses } = useSelector(
    (state) => state.externalResponses
  );


  useEffect(() => {
    if (editFlag === false) {
      reset();
    }
  }, [editFlag, editValues, open]);

  useEffect(() => {
    if(application_status === true){
      setValue("status","Canceled")
    }else if(application_status === false){
      setValue("status","");
      setValue("response_type","");
      setValue("external_response_id","");
    }
  }, [application_status]);

  useEffect(() => {
    if(type === "Application"){
      setValue("status","");
    }else if(type === "Assessment"){
      setValue("application_status","");
      setValue("status","");
    }
  }, [type])

  useEffect(() => {
    if(status === "Rejected" || status === "Canceled"){
      dispatch(getExternalResponses({type : type,status : status}));
    }
  }, [type,status, dispatch]);

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {editFlag === true
          ? "Edit Application and Assessment Response"
          : "Create New Application Response"}
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
           <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Type</FormLabel>
              <FormInputRadio
                control={control}
                options={TYPE}
                id="id"
                name="type"
              />
            </FormControl>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              // gap: "1.5rem",
              // mt: 1,
            }}
          >
            {type && type === "Application" && (
              <>
               <FormLabel id="demo-checkbox-group-label">
                Status
             </FormLabel>
                <FormInputCheckbox
                control={control}
                label="Canceled"
                name="application_status"
                />
                </>
            )}
            {type && type === "Assessment" && (
            <FormInputSelect
              control={control}
              options={STATUS}
              getOptionLabel={(option) => option?.id}
              id="id"
              label="Status"
              name="status"
            />
            )}
          </Stack>
          {status && status !== "Approved" && (
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Response Type</FormLabel>
              <FormInputRadio
                control={control}
                options={RESPONSE_TYPE}
                id="id"
                name="response_type"
              />
            </FormControl>
          )}
          {status && status !== "Approved" && response_type && response_type !== "external" && (
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
                options={externalResponses}
                getOptionLabel={(option) => option?.text}
                id="id"
                label="External Response"
                name="external_response_id"
              />
            </Stack>
          )}

          <FormInputText control={control} label="Text" name="text" />

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

export default CreateEditApplicationResponseModal;
