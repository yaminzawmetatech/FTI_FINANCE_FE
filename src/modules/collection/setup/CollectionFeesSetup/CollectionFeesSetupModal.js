import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
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
import FormInputNumber from "components/form/FormInputNumber";
import { useWatch } from "react-hook-form";
import CommonMessage from "common/CommonMessage";
import FormInputRadio from "components/form/FormInputRadio";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormInputCheckbox from "components/form/FormInputCheckbox";
import FormInputDateTimePicker from "components/form/FormInputDateTimePicker";

export const CreateCollectionFeesSetupModal = ({
  open,
  onClose,
  editValues,
  editFlag,
  control,
  handleSubmit,
  onSubmit,
  reset,
  setEditValues,
  setValue,
}) => {
  const [isFixedAmt, setIsFixedAmt] = useState(false);
  const [isPercentage, setIsPercentage] = useState(false);

  const { projectCategories } = useSelector((state) => state.projectCategories);

  const { subCategories } = useSelector((state) => state.subCategories);

  const { collectionFeesPercentageTypes } = useSelector(
    (state) => state.collectionFeesPercentageTypes
  );

  useEffect(() => {
    if (editFlag === false) {
      reset();
    }
    if (open) {
      setIsFixedAmt(false);
      setIsPercentage(false);
    }
  }, [editFlag, editValues, open, reset]);

  const category_id = useWatch({
    control,
    name: "category_id",
  });

  const penalty_amount_type = useWatch({
    control,
    name: "penalty_amount_type",
  });

  const collection_fee_max_amount = useWatch({
    control,
    name: "collection_fee_max_amount",
  });

  const collection_fee_max_days = useWatch({
    control,
    name: "collection_fee_max_days",
  });

  const subCategoriesByCategory = useMemo(
    () => subCategories.filter((item) => item?.category_id === category_id),
    [subCategories, category_id]
  );

  const PENALTY_AMT_TYPE = [
    { id: "Fixed Amount", key: "Fixed Amount" },
    { id: "Percentage", key: "Percentage" },
  ];

  const COLLECTION_FEE_CAL_TYPE = [
    { id: "Exclude Due Date", key: "Exclude Due Date" },
    { id: "Include Due Date", key: "Include Due Date" },
    // {id: "After Grace Period", key: "After Grace Period"},
  ];

  const BASIC_TYPE = [
    { id: "Monthly Basic", key: "Monthly Basic" },
    { id: "Daily Basic", key: "Daily Basic" },
  ];

  useEffect(() => {
    if(collection_fee_max_amount){
      setValue("collection_fee_max_days","");
    }else if(collection_fee_max_days){
      setValue("collection_fee_max_amount","");
    }
  }, [collection_fee_max_amount,collection_fee_max_days])

  useEffect(() => {
    if (penalty_amount_type === "Fixed Amount") {
      setIsFixedAmt(true);
      setIsPercentage(false);
      setValue("collection_fee_percentage", "");
      setValue("collection_fee_percentage_type", "");
    } else if (penalty_amount_type === "Percentage") {
      setIsFixedAmt(false);
      setIsPercentage(true);
      setValue("collection_fee_fixed_amount", "");
    }
  }, [penalty_amount_type]);

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {editFlag === true
          ? "Edit Collection Fees Setup"
          : "Create New Collection Fees Setup"}
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
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Penalty Amount Type
            </FormLabel>
            <FormInputRadio
              control={control}
              options={PENALTY_AMT_TYPE}
              id="id"
              name="penalty_amount_type"
            />
          </FormControl>
        </Stack>
        {isFixedAmt && (
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
              name="collection_fee_fixed_amount"
              label={
                <span className="required">Collection Fee Fixed Amount</span>
              }
              rules={{
                required: true,
              }}
            />
          </Stack>
        )}
        {isPercentage && (
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
              name="collection_fee_percentage"
              label={
                <span className="required">Collection Fee Percentage</span>
              }
              rules={{
                required: true,
              }}
            />
            <FormInputSelect
              control={control}
              id="key"
              name="collection_fee_percentage_type"
              options={collectionFeesPercentageTypes}
              getOptionLabel={(option) => option?.value || ""}
              label="Collection Fee Percentage Type"
            />
          </Stack>
        )}
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
            label="Maximum Amount"
            name="collection_fee_max_amount"
            disabled={collection_fee_max_days}
          />
          <FormInputNumber
            control={control}
            label="Maximum Day"
            name="collection_fee_max_days"
            disabled={collection_fee_max_amount}
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
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Collection Fee Calculation Type
            </FormLabel>
            <FormInputRadio
              control={control}
              options={COLLECTION_FEE_CAL_TYPE}
              id="id"
              name="collection_fee_calculation_type"
              rules={{ required: true }}
            />
          </FormControl>
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
            name="grace_period_days"
            rules={{ required: true }}
          />
          <FormInputNumber
            control={control}
            label={<span className="required">Penalty Period Days</span>}
            name="penalty_period_days"
            rules={{ required: true }}
          />
          <FormInputCheckbox
            control={control}
            name="grace_period_adjustment"
            label="Grace Period Adjustment"
          />
        </Stack>
        {/* <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300px", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
            marginTop: "20px",
          }}
        >
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Basic Type
            </FormLabel>
            <FormInputRadio
              control={control}
              options={BASIC_TYPE}
              id="id"
              name="basic_type"
            />
          </FormControl>
        </Stack> */}
        {/* <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300px", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
            marginTop: "20px",
          }}
        >
          <FormInputText control={control} label="Version" name="version" />
          <FormInputDateTimePicker
            control={control}
            label="Version Start Date"
            name="version_start_date"
            rules={{ required: true }}
          />
        </Stack> */}
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
        {/* <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
          }}
        >
          <FormInputCheckbox
            control={control}
            label="Published"
            name="version_published"
          />
        </Stack> */}
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

export default CreateCollectionFeesSetupModal;
