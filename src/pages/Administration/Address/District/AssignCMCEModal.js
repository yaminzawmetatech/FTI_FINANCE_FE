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
import CommonMessage from "common/CommonMessage";
import { createNRCTownshipVariation } from "features/nrc/NRCVariationTownship/nrcTownshipVarationSlice";
import { useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { showSuccessToast } from "common/ToastMessage";
import FormInputSelect from "components/form/FormInputSelect";
import { assignCMCOUser, getUsers } from "features/users/usersSlice";

export const AssignCMCEModal = ({
  open,
  onClose,
  editFlag,
  control,
  reset,
  data
}) => {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    if (open) {
      reset();
      dispatch(getUsers("CMCE"));
    }
  }, [open, dispatch]);

  const user_id = useWatch({
    control,
    name: "user_id",
  });

  const handleSubmit = async () => {
    try {
      await dispatch(
        assignCMCOUser({
          state_id: data.address_state_id,
          district_id: data.id,
          user_id: user_id
        })
      ).unwrap();
      showSuccessToast(
        CommonMessage.MFS00001.replace("%s", "Assign CMCE")
      );
      onClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Assign CMCE</DialogTitle>
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
            options={users}
            getOptionLabel={(option) => option?.user_name || ""}
            id="id"
            name="user_id"
            label={<span className="required">CMCE User</span>}
            rules={{
              required: true,
            }}
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
          <Button type="submit" onClick={handleSubmit} variant="contained">
            {editFlag === true ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default AssignCMCEModal;
