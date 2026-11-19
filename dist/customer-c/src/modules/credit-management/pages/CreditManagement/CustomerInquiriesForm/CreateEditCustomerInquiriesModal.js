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
import useCustomerInquiriesForm from "./CustomerInquiriesHook";
import FormInputSelect from "components/form/FormInputSelect";
import FormInputDateTimePicker from "components/form/FormInputDateTimePicker";
import FormInputCheckbox from "components/form/FormInputCheckbox";
import { useDispatch, useSelector } from "react-redux";
import { useWatch } from "react-hook-form";
import { getDealers, getDealersByUserRole } from "modules/loan-operation/slices/dealerSlice";
import dayjs from "dayjs";

export const CreateEditCustomerInquiriesModal = ({
  open,
  onClose,
  editValues,
  editFlag,
  actionFlag,
}) => {
  const dispatch = useDispatch();

  const { control, onSubmit, handleSubmit, reset, setValue } =
    useCustomerInquiriesForm();

  const { dealers } = useSelector((state) => state.dealers);

  useEffect(() => {
    if (open) {
      dispatch(getDealersByUserRole());
    }
  }, [dispatch, open]);

  useEffect(() => {
    if (editFlag === false) {
      reset();
      setValue("action", true);
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
        inquiry_datetime:
          editValues?.inquiry_datetime && dayjs(editValues?.inquiry_datetime),
        action: editValues?.action === 1 ? true : false,
      });
    }
  }, [open, editFlag, editValues, reset]);

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {editFlag === true ? "Edit Customer Inquiry" : actionFlag === true ? "Take Action" : "Create New Customer Inquiry"}
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
          <FormInputText
            control={control}
            label={<span className="required">Name</span>}
            name="name"
            rules={{
              required: true,
            }}
            disabled={actionFlag}
          />
          <FormInputText
            control={control}
            label={<span className="required">Ph No</span>}
            name="ph_no"
            rules={{
              required: true,
            }}
            disabled={actionFlag}
          />
          {/* <FormInputSelect
            control={control}
            options={addressStates ?? []}
            getOptionLabel={(option) => option?.name || ""}
            id="id"
            name="state_id"
            label={<span className="required">State</span>}
            rules={{
              required: true,
            }}
            disabled={actionFlag}
          /> */}
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
            disabled={actionFlag}
          />
          <FormInputText
            control={control}
            label={<span className="required">Product Name</span>}
            name="product_name"
            rules={{
              required: true,
            }}
            disabled={actionFlag}
          />
          <FormInputDateTimePicker
            control={control}
            label={<span className="required">Inquiry Date</span>}
            name="inquiry_datetime"
            rules={{
              required: true,
            }}
            disabled={editFlag}
          />
          <FormInputText
            control={control}
            label="CMCO Remark"
            name="remark"
            disabled={actionFlag}
            multiline
            sx={{
              pt: 1,
              textarea: {
                minHeight: "80px",
                maxHeight: "80px",
                overflow: "auto !important",
              },
            }}
          />
          {actionFlag === true && (
            <>
              <FormInputCheckbox
                control={control}
                label="Action Taken?"
                name="action"
              />
              <FormInputText
                control={control}
                label="PDSD Remark"
                name="pdsd_remark"
                // disabled={actionFlag}
                multiline
                sx={{
                  pt: 1,
                  textarea: {
                    minHeight: "80px",
                    maxHeight: "80px",
                    overflow: "auto !important",
                  },
                }}
              />
            </>
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

export default CreateEditCustomerInquiriesModal;
