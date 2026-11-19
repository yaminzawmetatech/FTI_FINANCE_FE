import React, { useState, useEffect } from "react";
import { Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack, } from "@mui/material";
import { showErrorToast, showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { createContracts } from "modules/loan-operation/slices/contractSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import openNewWindow from "utils/windowUtils";

const SetDibursementDateModal = ({ selectedRows, open,
  onClose, }) => {
    const [values, setValues] = useState();

    const dispatch = useDispatch();

    let navigate = useNavigate();

    useEffect(() => {
      const uuidArray = selectedRows.map((row)=>{
        return row.uuid;
      })

      setValues({ ...values,uuids: uuidArray });

    }, [selectedRows]);

    const handleDateChange = (date) => {
  
      // Format the date using dayjs
      const formattedDate = date ? dayjs(date).format("YYYY-MM-DD HH:mm:ss") : "";
  
      setValues({ ...values,disbursement_date: formattedDate });
    };

    const handleSubmit = async () => {
      
      try {
        const responseData = await dispatch(createContracts(values));
        if (responseData) {
          if (responseData.payload.success === true) {
            onClose();
            let path = `/LoanOperationModule/GLListing?${responseData.payload.data.map(uuid => `uuids=${uuid}`).join('&')}`;
            navigate(path);
          } else {
              onClose();
              showErrorToast(CommonMessage.MFE00009.replace("%s", "setting Disbursement Date"));
              // let path = `/LoanOperationModule/GLListing?${uuidArray.map(uuid => `uuids=${uuid}`).join('&')}&page=1`;
              // navigate(path);
          }
        }
       
      } catch (error) {
        showErrorToast(CommonMessage.MFE00009.replace("%s", "setting Disbursement Date"));
      }
    };
 
  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        Set Disbursement Date
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Disbursement Date"
            onChange={handleDateChange}
          />
        </LocalizationProvider>
        </Stack>
        <DialogActions sx={{ p: "1.25rem" }}>
          <Button
            onClick={() => {
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            // onClick={() => {
            //   handleSubmit
            //   // handleSubmit((data) => onSubmit(data, editFlag, signerUuid))();
            // }}
            onClick={handleSubmit}
            variant="contained"
          >
            OK
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default SetDibursementDateModal;
