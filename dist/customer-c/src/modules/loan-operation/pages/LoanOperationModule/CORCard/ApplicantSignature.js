import React, { useState, useEffect, useRef } from "react";
import { Box, Grid } from "@mui/material";
import Accordion from "components/Accordion";
import FormInputText from "components/form/FormInputText";
import SignatureCanvas from "react-signature-canvas";
import { useSelector } from "react-redux";

const Signature = ({
  control,
  sigCanvas,
  applicationSignatures,
  updateAvailableFlag,
}) => {
  const [signatureUrl, setSignatureUrl] = useState("");
  const fileInputRef = useRef(null); // For triggering file input

  useEffect(() => {
    if (applicationSignatures?.length > 0) {
      const foundSignature = applicationSignatures?.find(
        (sig) => sig.applicant_signature !== ""
      );
      if (foundSignature && sigCanvas.current) {
        sigCanvas.current.fromDataURL(foundSignature.applicant_signature);
        setSignatureUrl(foundSignature.applicant_signature);
      }
    }
  }, [applicationSignatures]);

  const handleClear = () => {
    sigCanvas.current.clear();
    setSignatureUrl("");
  };

  const showUrl = () => {
    const dataUrl = sigCanvas.current.toDataURL();
    setSignatureUrl(dataUrl);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result;
        sigCanvas.current.clear();
        sigCanvas.current.fromDataURL(dataUrl);
        setSignatureUrl(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Accordion title="Applicant Signature">
      <Box sx={{ mt: 1 }}>
        <Grid
          container
          spacing={2}
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid
            container
            item
            spacing={2}
            xs={12}
            sm={6}
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Applicant Name"
                name="applicant_name"
                disabled
              />
            </Grid>
          </Grid>
          <Grid
            container
            item
            spacing={2}
            xs={12}
            sm={6}
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Box sx={{ border: 1, ml: 8, mt: 2 }}>
              <SignatureCanvas
                ref={sigCanvas}
                penColor="black"
                backgroundColor="white"
                canvasProps={{
                  width: 500,
                  height: 200,
                  className: "signature-canvas",
                  style: { border: "1px solid black" },
                }}
              />
              <br />
              <button onClick={handleClear}>Clear</button>
              {updateAvailableFlag && (
                <>
                  <button
                    onClick={() => fileInputRef.current.click()}
                    style={{ marginLeft: "10px" }}
                  >
                    Browse
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    ref={fileInputRef}
                    style={{ display: "none" }}
                  />
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Accordion>
  );
};

export default React.memo(Signature);