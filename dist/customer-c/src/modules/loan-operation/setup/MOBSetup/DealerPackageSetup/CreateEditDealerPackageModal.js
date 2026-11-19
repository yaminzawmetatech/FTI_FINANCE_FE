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
import useDealerPackageForm from "./DealerPackageHook";
import FormInputSelect from "components/form/FormInputSelect";
import { useSelector } from "react-redux";
import FormInputNumber from "components/form/FormInputNumber";

export const CreateEditDealerPackageModal = ({
  open,
  onClose,
  editValues,
  editFlag,
}) => {
  const { control, onSubmit, handleSubmit, reset, setValue } =
    useDealerPackageForm();

  // Dealer Selector
  const { dealersByType } = useSelector((state) => state.dealers);

  useEffect(() => {
    if (editFlag === false) {
      reset();
    } else if (open && editFlag) {
      reset({...editValues});
    }
  }, [editFlag, open, editValues, reset]);
  


  const handleClickSubmit = handleSubmit(async (data) => {
    const isSuccess = await onSubmit(data, editFlag);
    if (isSuccess) {
      reset();
      onClose();
    }
  });


  // useEffect(() => {
  //   if (open && editFlag) {
  //     reset({
  //       ...editValues,
  //     });
  //   }
  // }, [open, editFlag, editValues, reset]);

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {editFlag === true ? "Edit Dealer Package" : "Create New Dealer Package"}
      </DialogTitle>
      <DialogContent>
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300px", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
            marginTop: "20px",
          }}
        >
          <FormInputSelect
            control={control}
            options={dealersByType ?? []}
            getOptionLabel={(option) => option?.name}
            id="id"
            name="dealer_id"
            label="Dealer"
          />
          <FormInputText
            control={control}
            label="Grade"
            name="grade"
            rules={{
              required: true,
            }}
          />
          <FormInputNumber
            control={control}
            label="Fees"
            name="fees"
          />
        </Stack>
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
          }}
        >
        </Stack>
        <DialogActions sx={{ p: "1.25rem" }}>
          <Button
            onClick={() => {
              reset();
              onClose();
            }}
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
          <Button type="submit" onClick={handleClickSubmit} variant="contained">
            {editFlag === true ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditDealerPackageModal;
