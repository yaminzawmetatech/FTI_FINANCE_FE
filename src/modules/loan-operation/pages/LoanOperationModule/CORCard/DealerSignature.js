import React, { useRef, useState, useEffect } from "react";
import { Box, Grid, Skeleton } from "@mui/material";
import Accordion from "components/Accordion";
import FormInputSelect from "components/form/FormInputSelect";
import SignatureCanvas from "react-signature-canvas";
import { useWatch } from "react-hook-form";

const Signature = ({
  control,
  dealerContactPeople,
  isContatPeopleLoading,
  sigCanvas,
  applicationSignatures,
  updateAvailableFlag,
}) => {
  const [signatureUrl, setSignatureUrl] = useState("");
  const fileInputRef = useRef(null); // For hidden file input

  const dealerSignerId = useWatch({ control, name: "dealer_signer_id" });

  useEffect(() => {
    if (applicationSignatures?.length > 0) {
      const foundSignature = applicationSignatures.find(
        (sig) => sig.dealer_signature !== ""
      );
      if (foundSignature && sigCanvas.current) {
        sigCanvas.current.fromDataURL(foundSignature.dealer_signature);
        setSignatureUrl(foundSignature.dealer_signature);
      }
    }
  }, [applicationSignatures, sigCanvas, dealerSignerId]);

  const handleClear = () => {
    sigCanvas.current.clear();
    setSignatureUrl("");
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
    <Accordion title="Dealer Signature">
      <Box sx={{ mt: 1 }}>
        <Grid
          container
          spacing={2}
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          {/* Left Side - Dealer Name */}
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
              {isContatPeopleLoading ? (
                <Skeleton variant="rectangular" height={37.13} />
              ) : (
                <FormInputSelect
                  control={control}
                  options={dealerContactPeople}
                  getOptionLabel={(option) => option?.name}
                  id="id"
                  name="dealer_signer_id"
                  label="Dealer Name"
                // rules={{
                //   required: true,
                // }}
                />
              )}
            </Grid>
          </Grid>

          {/* Right Side - Signature Area */}
          {
            dealerSignerId && (
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
                      style={{ marginLeft: "10px" }}
                      onClick={() => fileInputRef.current.click()}
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
              </Box>)
          }
        </Grid>
      </Box>
    </Accordion>
  );
};

export default React.memo(Signature);
