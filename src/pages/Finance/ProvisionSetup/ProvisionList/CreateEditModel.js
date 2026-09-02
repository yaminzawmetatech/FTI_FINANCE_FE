import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import FormInputNumber from "components/form/FormInputNumber";
import FormInputSelect from "components/form/FormInputSelect";
import { Backdrop, CircularProgress } from "../../../../../node_modules/@mui/material/index";
import { useDispatch, useSelector } from "react-redux";
import { getProvisionSetupByUuid, resetProvisionSetupDetails } from "features/provisionSetup/provisionSetupSlice";

export const CreateEditModel = ({ createEditFormOpen, setCreateEditFormOpen, control, onSubmit, handleSubmit, isLoading, reset, getValues,
  editFlag, selectedData }) => {

  const dispatch = useDispatch();
  const { provisionSetupDetails } = useSelector(state => state.provisionSetup)

  useEffect(() => {
    if (editFlag) {
      if (createEditFormOpen) {
        const uuid = selectedData?.data?.uuid;
        dispatch(getProvisionSetupByUuid(uuid));
      }
    }
    reset();
  }, [createEditFormOpen]);         //model start working , thats why you need to add dependency


  useEffect(() => {
    if(createEditFormOpen){
      if(editFlag){
        reset(provisionSetupDetails);
      }
    }
  }, [provisionSetupDetails])

  const options = [
    {
      id: 1,
      name: 'General Provision',
    },
    {
      id: 2,
      name: 'Specific Provision',
    },
    {
      id: 3,
      name: 'Deem Write Off',
    }
  ]

  const handleClickOk = () => {
    handleSubmit((data) => {
      // console.log(data);
      // const uuid = selectedData?.data?.uuid;
      // data = { uuid, ...data };
      onSubmit(data, editFlag);
    })();
  }


  return (
    <Dialog open={createEditFormOpen}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <DialogTitle textAlign="center">
        {editFlag ? 'Edit Provision' : 'Create New Provision'}
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

          <FormInputNumber
            control={control}
            label="Classification"
            name="classification"
            rules={{ required: true }}
          />
          <FormInputNumber
            control={control}
            label="Reverse Ratio Proposed"
            name="reverse_ratio"
            rules={{ required: true }}
          />
          <FormInputNumber
            control={control}
            label="Overdue From Days"
            name="overdue_from_days"
            rules={{ required: true }}
          />
          <FormInputNumber
            control={control}
            label="Overdue To Days"
            name="overdue_to_days"
            rules={{
              required: true,
              // validate: (value) => {
              //   const fromDays = getValues('overdue_from_days');
              //   const toDays = value;
              //   return toDays >= fromDays || 'Overdue To Days cannot be less than Overdue From Days';
              // }
            }}
          />
          <FormInputNumber
            control={control}
            label="Version"
            name="version"
            rules={{ required: true }}
          />
          <FormInputSelect
            control={control}
            name="remark"
            label="Remark"
            options={options}
            getOptionLabel={(option) => option?.name || ""}
            id="name"
            rules={{ required: true }}
          ></FormInputSelect>

          <DialogActions sx={{ p: "1.25rem" }}>
            <Button
              onClick={() => {
                reset();
                setCreateEditFormOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              // onClick={() => {
              //   handleSubmit((data) => onSubmit(data))();
              // }}
              onClick={() => {
                handleClickOk();
              }}
              variant="contained"
            >

              {editFlag ? 'Update' : 'Save'}
            </Button>
          </DialogActions>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditModel;
