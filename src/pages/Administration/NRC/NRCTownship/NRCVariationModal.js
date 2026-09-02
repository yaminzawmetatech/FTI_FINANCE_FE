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
import { useDispatch } from "react-redux";
import { showSuccessToast } from "common/ToastMessage";

export const NRCVariationModal = ({
  open,
  onClose,
  editFlag,
  control,
  reset,
  nrcTownshipId,
  nrcStateId
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open]);

  const name = useWatch({
    control,
    name: "name",
  });

  const handleSubmit = async () => {
    try {
      await dispatch(
        createNRCTownshipVariation({
          n_r_c_township_id: nrcTownshipId,
          n_r_c_state_id: nrcStateId, // add nrc state
          name: name,
        })
      ).unwrap();
      showSuccessToast(
        CommonMessage.MFS00001.replace("%s", "NRC Township Varation")
      );
      onClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Variation NRC Township</DialogTitle>
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
            label="Name"
            name="name"
            //rules={required}
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

export default NRCVariationModal;
