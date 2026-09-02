// WriteOffSignatureIndex.js
import React, { useMemo } from "react";
import { Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { Helmet } from "react-helmet";
import WriteOffSignatureToolbar from "./writeOffSignatureToolbar";
import WriteOffSignature from "./writeOffSignature";
import useWriteOffSignatureForm from "./hooks/useWriteOffSignatureForm";

const WriteOffSignatureIndex = () => {
  const {
    onSubmit,
    handleSubmit,
    writeOffSignature,
    isLoading,
    sigCanvas,
    type,
    auth,
  } = useWriteOffSignatureForm();

  const updateAvailableFlag = useMemo(() => {
    if (
      auth?.is_super === true &&
      Array.isArray(writeOffSignature) &&
      writeOffSignature[0]?.status === "completed"
    ) {
      return true;
    }
    return false;
  }, [auth, writeOffSignature]);




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
        <title>Sign For Write Off</title>
      </Helmet>
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
          <WriteOffSignatureToolbar writeOffSignature={writeOffSignature} auth={auth} />
          <WriteOffSignature
            sigCanvas={sigCanvas}
            writeOffSignature={writeOffSignature}
            updateAvailableFlag={updateAvailableFlag}
            auth={auth}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", px: 1, mb: 10, justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit(onSubmit)}
          disabled={
            auth.is_super === false &&
            Array.isArray(writeOffSignature) &&
            writeOffSignature[0]?.status === "completed"
          }
        >
          Submit Signatures
        </Button>
      </Box>
    </>
  );
};

export default React.memo(WriteOffSignatureIndex);