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
import FormInputSelect from "components/form/FormInputSelect";
import useCreditSchemeForm from "./CreditSchemeHook";
import { useSelector } from "react-redux";
import { useState } from "react";

export const CreateEditCreditScheme = ({
  open,
  onClose,
  editValues,
  editFlag,
}) => {
  const { control, onSubmit, handleSubmit, reset } = useCreditSchemeForm();

  const { projectCategories } = useSelector((state) => state.projectCategories);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editFlag === false) {
      reset();
    }
  }, [editFlag, editValues, open, reset]);

  const handleClickSubmit = (data) => {
    setLoading(true);
    handleSubmit(async (data) => {
      const isSuccess = await onSubmit(data, editFlag);
      if (isSuccess) {
        setLoading(false);
        onClose();
      }
    })();
  };

  const yesOrNoOptions = [
    { key: "YES", value: "YES" },
    { key: "NO", value: "NO" },
  ];

  useEffect(() => {
    if (open && editFlag) {
      reset(editValues);
    }
  }, [open, editFlag, editValues, reset]);

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {editFlag === true ? "Edit Credit Scheme" : "Create New Credit Scheme"}
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
            options={projectCategories ?? []} // admin need to have access on all categories 
            getOptionLabel={(option) => option?.name || ""}
            id="id"
            name="category_id"
            label={<span className="required">Category</span>}
            rules={{
              required: true,
            }}
          />
          <FormInputText
            control={control}
            label={<span className="required">Scheme Name</span>}
            name="name"
            rules={{
              required: true,
            }}
          />
          <FormInputSelect
            control={control}
            options={yesOrNoOptions}
            getOptionLabel={(option) => option?.value || ""}
            id="key"
            name="skip_survey"
            label={<span className="required">Skip Survey</span>}
            rules={{
              required: true,
            }}
          />
          <FormInputSelect
            control={control}
            options={yesOrNoOptions}
            getOptionLabel={(option) => option?.value || ""}
            id="key"
            name="dealer_guarantee"
            label={<span className="required">Dealer Guarantee</span>}
            rules={{
              required: true,
            }}
          />
          <FormInputText
            control={control}
            label={<span>Description</span>}
            name="description"
            rules={{
              required: false,
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
          <Button type="submit" onClick={handleClickSubmit} variant="contained" disabled={loading} >
            {editFlag === true ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditCreditScheme;
