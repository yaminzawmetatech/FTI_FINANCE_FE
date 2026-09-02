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
import { assignCMCOUser, getUsers } from "features/users/usersSlice";
import { lockApplication } from "features/application/applicationSlice";

const AssignUserModal = ({ open, onClose, selectedId }) => {
  const dispatch = useDispatch();

  const { control, handleSubmit, reset } = useForm({});

  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    if (open) {
      dispatch(getUsers("Agent"));
      reset();
    }
  }, [open, reset]);

  const onSubmit = useCallback(
    () => async (body) => {
      onClose();
      try {
        await dispatch(
          assignCMCOUser({
            dealer_id: selectedId,
            user_id: body.user_id,
          })
        ).unwrap();
        showSuccessToast(CommonMessage.MFS00016);
      } catch (error) {
        console.error("Error", error);
      }
    },
    [selectedId]
  );

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Assign Agent</DialogTitle>
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
            name="user_id"
            label={<span className="required">Agent</span>}
            rules={{
              required: true,
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

export default AssignUserModal;
