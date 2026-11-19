import React, { useCallback, useEffect } from "react";
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
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import FormInputSelect from "components/form/FormInputSelect";
import FormInputText from "components/form/FormInputText";
import FormInputDateTimePicker from "components/form/FormInputDateTimePicker";
import { createCollectionResponse } from "modules/collection/slices/collectionResponseSlice";
import {
  getAllocatedReminderCounts,
  getReminderAllocations,
} from "modules/collection/slices/reminderAllocationSlice";
import { useForm, useWatch } from "react-hook-form";

const AddResponseModal = ({
  selectedContractId,
  selectedReminderAllocationId,
  open,
  onClose,
  transformedSearchDataResponse,
  searchValueDate
}) => {
  const dispatch = useDispatch();

  const { control, handleSubmit, reset, setValue } = useForm({});

  const { followUpResults } = useSelector((state) => state.followUpResults);

  // auto select current date time in contact date
  useEffect(() => {
    const currentDate = dayjs(Date.now());

    reset({
      contact_date: currentDate,
    });
  }, [reset]);

  const reminderParam = {
    reminder_status: ["success", "pending"],
  };

  const promisedDate = useWatch({
    control,
    name: "promised_date",
  });

  // Automatically select "Promise" when a promised date is selected
  useEffect(() => {
    if (promisedDate) {
      const promiseOption = followUpResults?.find(
        (option) => option.name === "Promise"
      );
      if (promiseOption) {
        setValue("follow_up_result_id", promiseOption.id);
      }
    }else{
      setValue("follow_up_result_id", "");
    }
  }, [promisedDate, followUpResults, setValue]);

  const onSubmit = useCallback(
    () => async (body) => {
      onClose();
      try {
        await dispatch(
          createCollectionResponse({
            ...body,
            reminder_allocation_id: selectedReminderAllocationId,
            contract_id: selectedContractId,
            contact_date:
              (body?.contact_date &&
                body?.contact_date.format("YYYY-MM-DD hh:mm:ss")) ||
              null,
            promised_date:
              (body?.promised_date &&
                body?.promised_date.format("YYYY-MM-DD hh:mm:ss")) ||
              null,
          })
        ).unwrap();

        showSuccessToast(CommonMessage.MFS00007);
        await dispatch(
          getReminderAllocations({
            firstFetch: true,
            params: {
              is_terminated_assign: 0,
              ...transformedSearchDataResponse,
              ...reminderParam,
              due_month: transformedSearchDataResponse?.due_month ?? searchValueDate.format("YYYY-MM"),
            },
          })
        );

        await dispatch(
          getAllocatedReminderCounts({
            params: {
              ...reminderParam,
            },
          })
        );
      } catch (error) {
        console.error("Error", error);
      }
    },
    [
      selectedContractId,
      selectedReminderAllocationId,
      transformedSearchDataResponse,
    ]
  );

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Add Response</DialogTitle>
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
          <FormInputDateTimePicker
            control={control}
            label="Contact Date"
            name="contact_date"
            disabled
          />
          <FormInputDateTimePicker
            control={control}
            label="Promise Date"
            name="promised_date"
            minDate={dayjs()}
          />
          <FormInputSelect
            control={control}
            options={followUpResults || []}
            getOptionLabel={(option) => option?.name || ""}
            id="id"
            name="follow_up_result_id"
            label={<span className="required">Follow Up Result</span>}
            rules={{
              required: true,
            }}
          />
          <FormInputText
            multiline
            control={control}
            name="remark"
            label="Remark"
            sx={{
              pt: 1,
              textarea: {
                minHeight: "100px",
                maxHeight: "100px",
                overflow: "auto !important",
              },
            }}
          />
        </Stack>
        <DialogActions sx={{ p: "1.25rem" }}>
          <Button
            onClick={() => {
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit())}
            variant="contained"
          >
            OK
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default AddResponseModal;
