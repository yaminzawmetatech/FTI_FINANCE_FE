import * as React from "react";
import { useEffect, useMemo } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Grid,
} from "@mui/material";
import FormInputText from "components/form/FormInputText";
import FormInputSelect from "components/form/FormInputSelect";
import CommonMessage from "common/CommonMessage";
import { getProjectCategory } from "features/projectcategory/projectcategorySlice";
import { getSubCategory } from "features/subcategory/subcategorySlice";
import { useDispatch, useSelector } from "react-redux";
import { useWatch } from "react-hook-form";
import FormInputRadio from "components/form/FormInputRadio";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import { DUE_DATE_TYPES } from "constants/dueDateTypes";
import FormInputNumber from "components/form/FormInputNumber";
import FormInputCheckbox from "components/form/FormInputCheckbox";

export const CreateDueDateModal = ({
  open,
  onClose,
  editValues,
  editFlag,
  control,
  handleSubmit,
  onSubmit,
  reset,
  setEditValues,
}) => {
  const dispatch = useDispatch();

  const projectCategories = useSelector(
    (state) => state.projectCategories.projectCategories
  );

  const subCategories = useSelector(
    (state) => state.subCategories.subCategories
  );

  useEffect(() => {
    dispatch(getProjectCategory());
    dispatch(getSubCategory());
  }, [dispatch]);

  const category_id = useWatch({
    control,
    name: "category_id",
  });

  const due_date_types = useWatch({
    control,
    name: "due_date_types",
  });

  const end_of_month = useWatch({
    control,
    name: "end_of_month",
  });

  const subCategoriesByCategory = useMemo(
    () => subCategories.filter((item) => item?.category_id === category_id),
    [subCategories, category_id]
  );

  useEffect(() => {
    if (editFlag === false) {
      reset();
    }
  }, [editFlag, editValues, open]);

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {editFlag === true ? "Edit Due Date" : "Create New Due Date"}
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
            label={<span className="required">{"Category"}</span>}
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
            options={subCategoriesByCategory}
            getOptionLabel={(option) => option?.name}
            id="id"
            label={<span className="required">{"Sub Category"}</span>}
            name="sub_category_id"
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
            options={Array.from({ length: 12 }, (_, index) => ({
              value: (index + 1).toString(),
              label: (index + 1).toString(),
            }))}
            getOptionLabel={(option) => option?.value || ""}
            id="value"
            label={<span className="required">Due Month</span>}
            name="due_month"
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
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Due Date Type
            </FormLabel>
            <FormInputRadio
              control={control}
              options={DUE_DATE_TYPES}
              id="key"
              name="due_date_types"
            />
          </FormControl>
        </Stack>
        {(due_date_types === "Static" || due_date_types === "Dynamic") && (
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
              mt: 1,
              marginTop: "30px",
            }}
          >
            {due_date_types === "Static" && (
              <Grid container>
                <Grid item xs={5}>
                  <FormInputCheckbox
                    control={control}
                    label="End of Month?"
                    name="end_of_month"
                  />
                </Grid>
                <Grid item xs={7}>
                  <FormInputNumber
                    control={control}
                    label="Static Date"
                    name="static_day"
                    disabled={end_of_month}
                    rules={{ min: 1, max: 28 }}
                  />
                </Grid>
              </Grid>
            )}
            {due_date_types === "Dynamic" && (
              <FormInputNumber
                control={control}
                label="Dynamic Date"
                name="dynamic_day"
              />
            )}
          </Stack>
        )}
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

export default CreateDueDateModal;
