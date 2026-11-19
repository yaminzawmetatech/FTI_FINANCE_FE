import React, { useState, useEffect, useRef } from "react";
import { Box, Grid, Skeleton } from "@mui/material";
import Accordion from "components/Accordion";
import FormInputSelect from "components/form/FormInputSelect";
import SignatureCanvas from "react-signature-canvas";

const Signature = ({ sigCanvas, writeOffSignature, updateAvailableFlag, auth }) => {
  const [signatureUrl, setSignatureUrl] = useState(""); // State to hold the signature image URL
  const fileInputRef = useRef(null); // For triggering file input


  useEffect(() => {
    if (writeOffSignature?.length > 0) {
      const foundSignature = writeOffSignature?.find(sig => sig.signature !== "");
      if (foundSignature && sigCanvas.current) {
        sigCanvas.current.fromDataURL(foundSignature.signature);
      }
    }
  }, [writeOffSignature]);

  const handleClear = () => {
    sigCanvas.current.clear(); // Clears the canvas
    setSignatureUrl(""); // Reset the image URL
  };

  const showUrl = () => {
    const dataUrl = sigCanvas.current.toDataURL(); // Get the signature image URL
    setSignatureUrl(dataUrl); // Set the URL as state
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
    <Accordion title="Signature Confirmation">
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
              <button onClick={handleClear} disabled={
                auth.is_super === false &&
                Array.isArray(writeOffSignature) &&
                writeOffSignature[0]?.status === "completed"
              }>Clear</button>
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
