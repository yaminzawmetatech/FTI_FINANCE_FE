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
import FormInputSelect from "components/form/FormInputSelect";
import FormInputText from "components/form/FormInputText";
import CommonMessage from "common/CommonMessage";
import FormInputCheckbox from "components/form/FormInputCheckbox";
import useAddressVillageTractForm from "./AddressVillageTractHook";
import { useSelector } from "react-redux";

export const CreateEditAddressVillageTractModal = ({
  open,
  onClose,
  editValues,
  editFlag,
  selectedId,
}) => {
  const { addressTownships } = useSelector(
    (state) => state.addressTownships
  );

  const { control, onSubmit, handleSubmit, reset } =
    useAddressVillageTractForm();

  useEffect(() => {
    if (editFlag === false) {
      reset();
    }
  }, [editFlag, editValues, open, reset]);

  const handleClickSubmit = (data) => {
    handleSubmit((data) => {
      onSubmit(data, editFlag);
      onClose(); // Close the dialog after submission
    })();
  };

  useEffect(() => {
    if (open && editFlag && selectedId) {
      reset(editValues);
    }
  }, [open, editFlag, selectedId, editValues, reset]);

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {editFlag === true
          ? "Edit Address Village Tract"
          : "Create New Address Village Tract"}
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
            options={addressTownships}
            getOptionLabel={(option) => option?.name || ""}
            id="id"
            name="address_township_id"
            label={<span className="required">Address Township</span>}
            rules={{
              required: true,
            }}
          />
        </Stack>
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
            label={<span className="required">Village Tract Code</span>}
            name="vt_pcode"
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
            label="Village Myanmar"
            name="village_tract_mya_mm3"
          />
          <FormInputText
            control={control}
            label="Description"
            name="description"
          />
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
            label="Is BlackList Area"
            name="is_blacklisted"
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
          <Button
            type="submit"
            onClick={handleClickSubmit}
            variant="contained"
          >
            {editFlag === true ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditAddressVillageTractModal;
