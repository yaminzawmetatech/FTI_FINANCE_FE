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
import { getProjectCategory } from "../../../features/projectcategory/projectcategorySlice";
import { useSelector, useDispatch } from "react-redux";
import FormInputRadio from "components/form/FormInputRadio";
import CommonMessage from "common/CommonMessage";

export const CreateEditDisbursementModal = ({
  open,
  onClose,
  editValues,
  setEditValues,
  editFlag,
  control,
  handleSubmit,
  onSubmit,
  reset,
}) => {
  const dispatch = useDispatch();

  const { projectCategories, isLoading, isSuccess, isError, message } =
    useSelector((state) => state.projectCategories);

  useEffect(() => {
    dispatch(getProjectCategory());
  }, []);

  const disbursementTo = [
    { key: "Customer" },
    { key: "B2B" },
    { key: "Dealer" },
  ];

  const disbursementTypes = [
    { key: "Bank" },
    { key: "Account " },
    { key: "Cash" },
    { key: "Wallet" },
  ];

  const waysToCalculate = [
    { key: "Add On Loan" },
    { key: "Deduct From Loan" },
    { key: "Advanced Payment by Customer" },
  ];

  useEffect(() => {
    if (editFlag === false) {
      reset();
    }
  }, [editFlag, editValues, open]);

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {editFlag === true ? "Edit Disbursement" : "Create New Disbursement"}
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
            options={projectCategories}
            getOptionLabel={(option) => option?.name}
            id="id"
            label={<span className="required">Product Category</span>}
            name="category_id"
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
            marginTop: "30px",
          }}
        >
          <FormInputSelect
            control={control}
            options={disbursementTo}
            getOptionLabel={(option) => option?.key}
            id="key"
            label={<span className="required">Disbursement To</span>}
            name="disbursement_to"
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
            marginTop: "30px",
          }}
        >
          <FormInputSelect
            control={control}
            options={disbursementTypes}
            getOptionLabel={(option) => option?.key}
            id="key"
            label={<span className="required">Disbursement Type</span>}
            name="disbursement_type"
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
            marginTop: "30px",
          }}
        >
          <FormInputText
            control={control}
            label="Description"
            name="description"
            rules={{
              maxLength: {
                value: 255,
                message: CommonMessage.MFE00003.replace(
                  "%s",
                  "Description"
                ).replace("%s", "255"),
              },
            }}
          />
        </Stack>
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300px", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
            marginTop: "30px",
          }}
        >
          <label>Ways To Calculate</label>
        </Stack>
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300px", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
          }}
        >
          <FormInputRadio
            control={control}
            options={waysToCalculate}
            id="key"
            name="way_to_calculate"
            rules={{
              required: true,
            }}
          />
        </Stack>

        <DialogActions sx={{ p: "1.25rem" }}>
          <Button
            onClick={() => {
              reset();
              setEditValues("");
              onClose();
            }}
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={() => {
              handleSubmit((data) => onSubmit(data, editFlag))();
            }}
            variant="contained"
          >
            {editFlag === true ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditDisbursementModal;
