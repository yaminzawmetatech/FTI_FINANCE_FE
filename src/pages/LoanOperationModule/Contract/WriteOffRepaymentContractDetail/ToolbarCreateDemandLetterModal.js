import React, { useState, useCallback, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Portal,
  Backdrop,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid } from "@mui/material";
import FormInputText from "../../../../components/form/FormInputText";
import FormInputDatePicker from "components/form/FormInputDatePicker";
import FormInputSelect from "components/form/FormInputSelect";
import { DEMAND_LETTER_TYPES } from "constants/demandLetterTypes";
import { createDemandLetter } from "features/demandLetter/demandLetterSlice";
import axiosInstance from "features/api/axiosInstance";
import { saveAs } from "file-saver";
import { showErrorToast } from "common/ToastMessage";
import { useWatch } from "react-hook-form";
import { useForm } from "react-hook-form";

const ToolbarCreateDemandLetterModal = ({ open, handleClose, control, setValue }) => {
  const dispatch = useDispatch();
  const [exporting, setExporting] = useState(false);

  const { contract } = useSelector((state) => state.contractDetail);

  const letter_no = useWatch({
    control,
    name: "letter_no",
  });

  const demand_letter_type = useWatch({
    control,
    name: "demand_letter_type",
  });

  const date = useWatch({
    control,
    name: "date",
  });

  const description = useWatch({
    control,
    name: "description",
  });

  useEffect(() => {
    if(open){
      handleClearForm();
    }
  }, [open]);

  const handleClearForm = () => {
    setValue("letter_no", "");
    setValue("demand_letter_type", "");
    setValue("date", null);
    setValue("description", "");
  }

  const handleSubmit = useCallback(async () => {
    try {
      setExporting(true);

      const response = await dispatch(
        createDemandLetter({
          params: {
            contract_id: contract?.id,
            category_id: contract?.category_id,
            sub_category_id: contract?.sub_category_id,
            letter_no,
            demand_letter_type,
            date: date.format("YYYY-MM-DD") || null,
            description,
          },
        })
      );

      if (response.payload.success === true) {
        const responseDoc = await axiosInstance.get(
          `/export-contract-demand-letter/${response.payload?.data?.uuid}`,
          {
            responseType: "arraybuffer",
          }
        );


        const blob = new Blob([responseDoc.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(
          blob,
          contract?.application?.application_id +  "_" +  demand_letter_type +  "_" +  letter_no + ".doc"
        );
        handleClose();
      }
      // else{
      //   console.error("This is error:", response);
      // }
    } catch (error) {
      console.error("Error exporting data:", error);
      showErrorToast("Please Check Demand Letter Template Setup");
    } finally {
      setExporting(false);
    }
  }, [letter_no, demand_letter_type, date, description, contract]);

  return (
    <>
      <Dialog
        //sx={{ "& .MuiDialog-paper": { width: "70%" }}}
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: "400px !important",
          },
        }}
        fullWidth
        maxWidth="md"
        open={open}
      >
        <Portal container={document.body}>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={exporting}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Portal>
        <DialogTitle
          id="scroll-dialog-title"
          variant="h5"
          sx={{ color: "#1890ff" }}
        >
          Create Demand Letter
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ mt: 1 }}>
            <Grid
              container
              spacing={2}
              justifyContent="flex-start"
              alignItems="flex-start"
              mb={2}
            >
              <Grid item xs={12}>
                <FormInputText
                  control={control}
                  label="Letter No"
                  name="letter_no"
                />
              </Grid>
              <Grid item xs={12}>
                <FormInputDatePicker
                  control={control}
                  label="Date"
                  name="date"
                />
              </Grid>
              <Grid item xs={12}>
                <FormInputSelect
                  control={control}
                  options={DEMAND_LETTER_TYPES}
                  getOptionLabel={(option) => option?.value}
                  id="id"
                  name="demand_letter_type"
                  label="Demand Letter Type"
                />
              </Grid>
              <Grid item xs={12}>
                <FormInputText
                  control={control}
                  label="Description"
                  name="description"
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ marginBottom: "10px", marginTop: "10px" }}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default React.memo(ToolbarCreateDemandLetterModal);
