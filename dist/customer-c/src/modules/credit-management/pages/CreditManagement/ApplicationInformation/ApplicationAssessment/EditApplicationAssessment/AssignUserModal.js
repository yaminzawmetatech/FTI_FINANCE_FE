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
import { getUsers } from "modules/administration/slices/usersSlice";
import {
  assignAssessmentUser,
  updateAssessmentByUuid,
  updateAssessmentStatusByUuid,
} from "modules/credit-management/slices/assessmentSlice";
import { useParams } from "react-router-dom";

const AssignUserModal = ({
  open,
  onClose,
  assessment,
  handleSubmit,
  control,
}) => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    if (open) {
      dispatch(getUsers("Credit Manager"));
    }
  }, [open]);

  const onSubmit = useCallback(
    () => async (body) => {
      onClose();
      try {
        await dispatch(
          updateAssessmentStatusByUuid({
            id: assessment.id,
            status: "reconsideration",
            body: {
              ...body,
              user_id: body.user_id,
              commencement_date:
                body.commencement_date?.format("YYYY-MM-DD HH:mm:ss") || null,
              first_due_date:
                body.first_due_date?.format("YYYY-MM-DD HH:mm:ss") || null,
            },
          })
        ).unwrap();

        showSuccessToast(CommonMessage.MFS00009);
      } catch (error) {
        console.error("Error", error);
      }
    },
    [id]
  );

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Assign to Credit Manager</DialogTitle>
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
            label="Credit Manager"
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
            // onClick={handleOk}
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
