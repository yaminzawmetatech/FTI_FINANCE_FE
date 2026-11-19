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
import useDealerBankForm from "./DealerBankHook";
import FormInputCheckbox from "components/form/FormInputCheckbox";
import { useSelector } from "react-redux";
import FormInputSelect from "components/form/FormInputSelect";

export const CreateEditDealerBankModal = ({
  open,
  onClose,
  editValues,
  editFlag,
}) => {
  const { control, onSubmit, handleSubmit, reset, setValue } =
    useDealerBankForm();

  const { dealers } = useSelector((state) => state.dealers);

  const { dealerContactPeople } = useSelector(
    (state) => state.dealerContactPeople
  );

  useEffect(() => {
    if (editFlag === false) {
      reset();
      setValue("in_active", true);
    }
  }, [editFlag, editValues, open, reset]);

  const handleClickSubmit = (data) => {
    handleSubmit(async (data) => {
      const isSuccess = await onSubmit(data, editFlag);
      if (isSuccess) {
        onClose(); // Close the modal if successful
      }
    })();
  };

  useEffect(() => {
    if (open && editFlag) {
      reset({
        ...editValues,
        in_active: editValues?.in_active === 1 ? true : false,
      });
    }
  }, [open, editFlag, editValues, reset]);

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {editFlag === true ? "Edit Dealer Bank" : "Create New Dealer Bank"}
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
            options={dealers ?? []}
            getOptionLabel={(option) => option?.name || ""}
            id="id"
            name="dealer_id"
            label={<span className="required">Dealer</span>}
            rules={{
              required: true,
            }}
          />
          <FormInputSelect
            control={control}
            options={dealerContactPeople ?? []}
            getOptionLabel={(option) => option?.name || ""}
            id="id"
            name="dealer_contact_person_id"
            label="Dealer Contact Person"
          />
          <FormInputText
            control={control}
            label={<span className="required">Beneficiary Id</span>}
            name="beneficiary_id"
            rules={{
              required: true,
            }}
          />
          <FormInputText
            control={control}
            label={<span className="required">Beneficiary Name</span>}
            name="beneficiary_name"
            rules={{
              required: true,
            }}
          />
          <FormInputText
            control={control}
            label={<span className="required">Company Name</span>}
            name="company_name"
            rules={{
              required: true,
            }}
          />
          <FormInputText
            control={control}
            label={<span className="required">Bank Account No</span>}
            name="bank_account_no"
            rules={{
              required: true,
            }}
          />
          <FormInputText
            control={control}
            label="Contact No"
            name="contact_no"
          />
          <FormInputText
            control={control}
            label={<span className="required">Address</span>}
            name="address"
            rules={{
              required: true,
            }}
          />
          <FormInputText control={control} label="Email" name="email" />
          <FormInputText control={control} label="Remark" name="remark" />
        </Stack>
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
          }}
        >
          <FormInputCheckbox
            control={control}
            label="Is Active?"
            name="in_active"
          />
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

export default CreateEditDealerBankModal;
