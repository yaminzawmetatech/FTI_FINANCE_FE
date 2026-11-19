import React, {  useEffect, useCallback } from "react";
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
import { useForm } from "react-hook-form";
import FormInputDatePicker from "components/form/FormInputDatePicker";
import {
  getAllocatedReminderCounts,
  getReminderAllocations,
  reAssignReminderAllocation,
  updateReminderAllocationByUuid,
} from "modules/collection/slices/reminderAllocationSlice";
import FormInputCheckbox from "components/form/FormInputCheckbox";
import FormInputText from "components/form/FormInputText";

const AssignUserModal = ({ selectedRows, open, onClose, mode, uuid, transformedSearchDataResponse, searchValueDate }) => {
  const dispatch = useDispatch();

  const { control, reset, handleSubmit } = useForm({});

  const { users } = useSelector((state) => state.users);

  const { allocateActivities } = useSelector(
    (state) => state.allocateActivities
  );

  const { reminderAllocationByUuid } = useSelector(
    (state) => state.reminderAllocationByUuid
  );

  useEffect(() => {
    if (mode === "edit") {
      reset({
        ...reminderAllocationByUuid,
        assigned_date:
          reminderAllocationByUuid?.assigned_date &&
          dayjs(reminderAllocationByUuid?.assigned_date),
      });
    }
  }, [reminderAllocationByUuid, reset, mode]);

  useEffect(() => {
    if (mode !== "edit") {
      reset();
    }
  }, [open,reset]);

  const reminderParam = {
    reminder_status: ["success", "pending"],
  };

  const onSubmit = useCallback(
    () => async (body) => {
    
      const reminderAllocationUuids = selectedRows?.map((row) => {
        return row.uuid;
      });
    
      onClose();
      try {
        if (mode === "edit") {
          await dispatch(
            updateReminderAllocationByUuid({
              uuid,
              body: {
                ...body,
                is_mnet_assigned: body.is_mnet_assigned === true ? 1 : 0,
                assigned_date:
                  (body?.assigned_date &&
                    body?.assigned_date.format("YYYY-MM-DD")) ||
                  null,
              },
            })
          ).unwrap();
          showSuccessToast(CommonMessage.MFS00008);
          await dispatch(
            getReminderAllocations({
              firstFetch: true,
              params: {
                is_terminated_assign: 0,
                ...transformedSearchDataResponse,
                ...reminderParam,
                // due_month: searchValueDate ? searchValueDate.format("YYYY-MM") : "",
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
        } else if (mode === "reassign") {
          await dispatch(
            reAssignReminderAllocation({
              ...body,
              reminder_allocation_uuids: reminderAllocationUuids,
              //contract_ids: contractIds,
              is_mnet_assigned: body.is_mnet_assigned === true ? 1 : 0,
            })
          ).unwrap();
          showSuccessToast(CommonMessage.MFS00010);
          await dispatch(
            getReminderAllocations({
              firstFetch: true,
              params: {
                is_terminated_assign: 0,
                ...transformedSearchDataResponse,
                ...reminderParam,
                // due_month: searchValueDate ? searchValueDate.format("YYYY-MM") : "",
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
        }
      } catch (error) {
        console.error("Error", error);
      }
    },
    [selectedRows, mode, uuid, transformedSearchDataResponse]
  );

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {mode === "edit" ? "Edit Allocation" : "Reassign User"}
      </DialogTitle>
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
            disabled={mode === "edit"}
          />
          {mode === "edit" && (
            <>
              <FormInputSelect
                control={control}
                options={allocateActivities ?? []}
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
            </>
          )}
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

          {mode === "reassign" && (
            <FormInputCheckbox
              control={control}
              label="Is Mnet User?"
              name="is_mnet_assigned"
            />
          )}
        </Stack>
        <DialogActions>
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
