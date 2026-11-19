import React, { useEffect, useCallback } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import FormInputSelect from "components/form/FormInputSelect";
import { useForm } from "react-hook-form";
import FormInputDatePicker from "components/form/FormInputDatePicker";
import { createReminderAllocation } from "modules/collection/slices/reminderAllocationSlice";
import FormInputCheckbox from "components/form/FormInputCheckbox";
import FormInputText from "components/form/FormInputText";
import dayjs from "dayjs";
import { getContractsForReminderAllocation, getReminderAllocationCounts } from "modules/loan-operation/slices/contractReminderAllocationSlice";

const AssignUserModal = ({ open, onClose, selectedRows, searchValueDate, transformedSearchDataResponse }) => {
  const dispatch = useDispatch();

  const { control, reset, handleSubmit } = useForm({});

  const { users } = useSelector((state) => state.users);

  const { allocateActivities } = useSelector(
    (state) => state.allocateActivities
  );

  const contractsParam = {
    exclude_status: ["Terminated", "Fully Paid"],
    is_generated_gl: 1,
  };

  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit = useCallback(
    () => async (body) => {
      const contractIds = selectedRows.map((row) => {
        return row.id;
      });

      onClose();
      try {
        await dispatch(
          createReminderAllocation({
            ...body,
            contract_ids: contractIds,
            is_mnet_assigned: body.is_mnet_assigned === true ? 1 : 0,
            assigned_date:
              (body?.assigned_date &&
                body?.assigned_date.format("YYYY-MM-DD")) ||
              null,
          })
        ).unwrap();
        showSuccessToast(CommonMessage.MFS00007);
        await dispatch(
          getContractsForReminderAllocation({
            firstFetch: true,
            params: {
              ...contractsParam,
              ...transformedSearchDataResponse,
              // due_month: searchValueDate ? searchValueDate.format("YYYY-MM") : "",
              due_month: transformedSearchDataResponse?.due_month ?? searchValueDate.format("YYYY-MM"),
            },
          })
        );

        await dispatch(
          getReminderAllocationCounts({
            params: {
              is_count: 1,
              // due_month: searchValueDate
              //   ? searchValueDate.format("YYYY-MM")
              //   : "",
              due_month: transformedSearchDataResponse?.due_month ?? searchValueDate.format("YYYY-MM"),
            },
          })
        );
      } catch (error) {
        console.error("Error", error);
      }
    },
    [selectedRows]
  );

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Assign User</DialogTitle>
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
          <FormInputSelect
            control={control}
            options={users ?? []}
            getOptionLabel={(option) => option?.user_name || ""}
            id="id"
            name="pic_id"
            label={<span className="required">User</span>}
            rules={{
              required: true,
            }}
          />
          <FormInputSelect
            control={control}
            options={allocateActivities || []}
            getOptionLabel={(option) => option?.name || ""}
            id="id"
            name="allocate_activity_id"
            label={<span className="required">Allocate Activity</span>}
            rules={{
              required: true,
            }}
          />
          <FormInputDatePicker
            control={control}
            label={<span className="required">Assigned Date</span>}
            name="assigned_date"
            rules={{
              required: true,
            }}
            minDate={dayjs()}
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
          <FormInputCheckbox
            control={control}
            label="Is Mnet User?"
            name="is_mnet_assigned"
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

export default AssignUserModal;
