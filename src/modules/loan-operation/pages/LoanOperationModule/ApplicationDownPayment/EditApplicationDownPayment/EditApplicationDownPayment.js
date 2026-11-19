import React, { useMemo } from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Helmet } from "react-helmet";
import ApplicationDownPaymentGeneral from "./ApplicationDownPaymentGeneral";
import useApplicationDownPaymentForm from "./hooks/useApplicationDownPaymentForm";
import EditApplicationDownPaymentToolbar from "./EditApplicationDownPaymentToolbar";

const EditApplicationDownPaymentIndex = () => {
  const {
    control,
    downPayment,
    handleOnOk,
    isLoading,
    getValues,
    setValue,
    handleSubmit,
    handleStatusChange,
    reset,
  } = useApplicationDownPaymentForm();

  const editAbleForm = useMemo(() => {
    if (downPayment?.status === "completed") {
      return false;
    }
    return true;
  }, [downPayment?.status]);

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
    <>
      <Helmet>
        <title>Edit - Application downPayment</title>
      </Helmet>
      <EditApplicationDownPaymentToolbar
        downPayment={downPayment}
        editAbleForm={editAbleForm}
        handleStatusChange={handleStatusChange}
        handleSubmit={handleSubmit}
        control={control}
        getValues={getValues}
        setValue={setValue}
        reset={reset}
      />
      <Box
        sx={{
          px: 1,
          pb: 1,
          display: "flex",
          gap: 2,
          "@media (max-width: 600px)": {
            flexDirection: "column",
          },
        }}
      >
        <Box sx={{ width: "100%", flex: 1 }}>
          <fieldset
            disabled={!editAbleForm}
            style={{
              border: 0,
              padding: 0,
              margin: 0,
              minWidth: 0,
              minHeight: 0,
            }}
          >
            <ApplicationDownPaymentGeneral
              control={control}
              getValues={getValues}
              setValue={setValue}
              downPayment={downPayment}
            />
          </fieldset>
        </Box>
      </Box>
      {editAbleForm ? (
        <Box sx={{ display: "flex", px: 1, pb: 2, justifyContent: "flex-end" }}>
          <Button variant="contained" color="primary" onClick={handleOnOk}>
            OK
          </Button>
        </Box>
      ) : null}
    </>
  );
};

export default React.memo(EditApplicationDownPaymentIndex);
