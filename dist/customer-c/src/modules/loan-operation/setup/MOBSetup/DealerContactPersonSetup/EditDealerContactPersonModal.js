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
import useDealerContactPersonForm from "./DealerContactPersonHook";
import FormInputCheckbox from "components/form/FormInputCheckbox";
import FormInputSelect from "components/form/FormInputSelect";
import { useWatch } from "react-hook-form";
import { useSelector } from "react-redux";

export const EditDealerContactPersonModal = ({
  open,
  onClose,
  editValues,
  editFlag,
  selectedDealer,
  dealerMenuFlag,
}) => {
  const { control, onSubmit, handleSubmit, reset, setValue } =
    useDealerContactPersonForm();

  const { dealers } = useSelector((state) => state.dealers);

  const { addressStates } = useSelector((state) => state.addressStates);

  const type = useWatch({
    control,
    name: "type",
  });

  useEffect(() => {
    if (editFlag === false) {
      reset();
      setValue("in_active", true);
    }
  }, [editFlag, editValues, open, reset]);

  const createDealerFlag = true;
  const handleClickSubmit = (data) => {
    handleSubmit(async (data) => {
      const isSuccess = await onSubmit(
        data,
        editFlag,
        selectedDealer,
        dealerMenuFlag,
        createDealerFlag
      );
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
        {editFlag === true
          ? "Edit Dealer Contact Person"
          : "Create New Dealer Contact Person"}
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
          <FormInputText
            control={control}
            label={<span className="required">Name</span>}
            name="name"
            rules={{
              required: true,
            }}
          />
          <FormInputText
            control={control}
            label={<span className="required">Ph No</span>}
            name="ph_no"
            rules={{
              required: true,
            }}
          />
          <FormInputText
            control={control}
            label="Email"
            name="email"
            rules={{
              required: type === "Agent",
            }}
          />
          <FormInputText control={control} label="Nrc" name="nrc" />
          <FormInputText
            control={control}
            label="Address"
            name="address"
            // rules={{
            //   required: true,
            // }}
          />
          <FormInputText
            control={control}
            label="Title Position"
            name="title_position"
          />

          <FormInputSelect
            control={control}
            options={[
              { id: "Authorized Signer", name: "Authorized Signer" },
              { id: "Main Contact", name: "Main Contact" },
              { id: "Disbursement", name: "Disbursement" },
              { id: "Main Person for Credit", name: "Main Person for Credit" },
            ]}
            getOptionLabel={(option) => option?.name || ""}
            id="id"
            name="type"
            label={<span className="required">Type</span>}
            rules={{
              required: true,
            }}
          />
          {(type === "Agent" && !editFlag ) && (
            <>
              {/* <FormInputSelect
                control={control}
                options={addressStates ?? []}
                getOptionLabel={(option) => option?.name || ""}
                id="id"
                name="state_id"
                label={<span className="required">Address State</span>}
                rules={{
                  required: true,
                }}
              /> */}
              <FormInputText
                type="password"
                control={control}
                label={<span className="required">Password</span>}
                name="password"
                rules={{
                  required: true,
                }}
              />
            </>
          )}
          {editFlag && (
            <FormInputCheckbox
              control={control}
              label="Is Active?"
              name="in_active"
            />
          )}
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

export default EditDealerContactPersonModal;
