import * as React from "react";
import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { getProjectCategory } from "modules/administration/slices/projectcategorySlice";
import FormInputSelect from "components/form/FormInputSelect";
import FormInputText from "components/form/FormInputText";
import { getSubCategory } from "modules/administration/slices/subcategorySlice";
import FormInputNumber from "components/form/FormInputNumber";
import FormInputDecimal from "components/form/FormInputDecimal";
import { useWatch } from "react-hook-form";
import CommonMessage from "common/CommonMessage";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormInputRadio from "components/form/FormInputRadio";

export const CreateEarlyTerminationFeesSetupModal = ({
  open,
  onClose,
  columns,
  editValues,
  editFlag,
  control,
  handleSubmit,
  onSubmit,
  reset,
  setEditValues,
}) => {
  const dispatch = useDispatch();

  const { projectCategories, isError, isSuccess, isLoading, message } =
    useSelector((state) => state.projectCategories);

  const { subCategories } = useSelector((state) => state.subCategories);

    const EARLY_TERMINATION_CAL_TYPE = [
        {id: "Exclude Due Date", key: "Exclude Due Date"},
        {id: "Include Due Date", key: "Include Due Date"},
        {id: "After Grace Period", key: "After Grace Period"},
    ];

  useEffect(() => {
    if (open) {
      dispatch(getProjectCategory());
      dispatch(getSubCategory());
    }
  }, [dispatch, open]);

  useEffect(() => {
    if (editFlag === false) {
      reset();
    }
  }, [editFlag, editValues, open, reset]);

  const category_id = useWatch({
    control,
    name: "category_id",
  });

  const subCategoriesByCategory = useMemo(
    () => subCategories.filter((item) => item?.category_id === category_id),
    [subCategories, category_id]
  );

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {editFlag === true
          ? "Edit Early Termination Fees Setup"
          : "Create New Early Termination Fees Setup"}
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
            id="id"
            name="category_id"
            options={projectCategories}
            getOptionLabel={(option) => option?.name || ""}
            label={<span className="required">Category</span>}
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
          <FormInputSelect
            control={control}
            id="id"
            name="sub_category_id"
            options={subCategoriesByCategory}
            getOptionLabel={(option) => option?.name || ""}
            label="Sub Category"
            // rules={{
            //   required: true,
            // }}
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
          <FormInputNumber
            control={control}
            label={<span className="required">Grace Period</span>}
            name="grace_period"
            rules={{ required: true }}
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
            <FormInputDecimal
            control={control}
            label={<span className="required">ET Fees %</span>}
            name="et_fees"
            rules={{ required: true }}
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
              <FormInputNumber
                  control={control}
                  label={<span className="required">Minimum Month</span>}
                  name="min_month"
                  rules={{ required: true }}
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

export default CreateEarlyTerminationFeesSetupModal;
