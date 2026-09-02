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
import { showErrorToast, showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useDispatch, useSelector } from "react-redux";
import {
  getPrepareForContracts,
  updatePrepareForContracts,
} from "features/prepareForContract/prepareForContractSlice";
import { useSearchParams } from "react-router-dom";


const ChangeDibursementDateModal = ({ selectedRows, open, onClose }) => {
  const [values, setValues] = useState();
  const [params, setParams] = useSearchParams();
  const uuids = params.getAll("uuids");

  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.prepareForContracts);

  useEffect(() => {
    const uuidArray = selectedRows.map((row) => {
      return row.uuid;
    });

    setValues({ ...values, uuids: JSON.stringify(uuidArray) });
  }, [selectedRows]);

  const handleDateChange = (date) => {
    const formattedDate = date ? dayjs(date).format("YYYY-MM-DD HH:mm:ss") : "";

    setValues({ ...values, disbursement_date: formattedDate });
  };

  const handleSubmit = async () => {
    onClose();
    try {
      await dispatch(updatePrepareForContracts(values)).unwrap();
      showSuccessToast(CommonMessage.MFS00008);
      await dispatch(
        getPrepareForContracts({
          params:
            uuids.length > 0
              ? {
                  is_submitted: 0, uuids: JSON.stringify(uuids)
                }
              : { is_submitted: 0 },
        })
      ).unwrap();
    } catch (error) {
      showErrorToast(
        CommonMessage.MFE00009.replace("%s", "updating Disbursement Date")
      );
    }
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
          <Button type="submit" onClick={handleSubmit} variant="contained">
            OK
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeDibursementDateModal;
