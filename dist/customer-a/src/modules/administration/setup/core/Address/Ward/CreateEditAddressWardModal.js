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
import FormInputCheckbox from "components/form/FormInputCheckbox";
import useAddressWardForm from "./AddressWardHook";
import { useSelector } from "react-redux";

export const CreateEditAddressWardModal = ({
  open,
  onClose,
  editValues,
  editFlag,
  selectedId,
}) => {
  const { addressCities } = useSelector((state) => state.addressCities);

  const { control, onSubmit, handleSubmit, reset } =
    useAddressWardForm();

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
        {editFlag === true ? "Edit Address Ward" : "Create New Address Ward"}
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
            options={addressCities}
            getOptionLabel={(option) => option?.name || ""}
            id="id"
            name="address_city_id"
            label={<span className="required">City</span>}
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
            label={<span className="required">Ward Code</span>}
            name="ward_pcode"
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
            label="Ward Myanmar"
            name="ward_mya_mm3"
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
          <Button type="submit" onClick={handleClickSubmit} variant="contained">
            {editFlag === true ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditAddressWardModal;
