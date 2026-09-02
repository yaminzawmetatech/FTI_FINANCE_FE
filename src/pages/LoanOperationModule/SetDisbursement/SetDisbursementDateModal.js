import React, { useState, useEffect } from "react";
import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { showErrorToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createPrepareForContracts } from "features/prepareForContract/prepareForContractSlice";

const SetDibursementDateModal = ({ selectedRows, open, onClose }) => {
  const [values, setValues] = useState();

  const dispatch = useDispatch();

  let navigate = useNavigate();

  const { isLoading } = useSelector((state) => state.prepareForContracts);

  useEffect(() => {
    const uuidArray = selectedRows.map((row) => {
      return row.uuid;
    });

    setValues({ ...values, uuids: uuidArray });
  }, [selectedRows]);

  const handleDateChange = (date) => {
    const formattedDate = date ? dayjs(date).format("YYYY-MM-DD HH:mm:ss") : "";

    setValues({ ...values, disbursement_date: formattedDate });
  };

  const handleSubmit = async () => {
    // if (selectedRows.length > 20) {
    //   toast.warning("At most 20 records can be disbursed at one time!");
    //   onClose();
    // } else {
      
      onClose();
      try {
        const responseData = await dispatch(createPrepareForContracts(values));

        if (responseData) {
          if (responseData.payload.success === true) {
            let path = `/LoanOperationModule/preparation-for-contract?${responseData.payload.data
              .map((data) => `uuids=${data.uuid}`)
              .join("&")}`;
            navigate(path);
          } else {
            toast.error(responseData.payload, {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        }
      } catch (error) {
        showErrorToast(
          CommonMessage.MFE00009.replace("%s", "setting Disbursement Date")
        );
      }
    // }
  };

  if (isLoading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Set Disbursement Date</DialogTitle>
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
