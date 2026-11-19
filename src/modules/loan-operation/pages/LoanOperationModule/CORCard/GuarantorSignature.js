import React, { useEffect, useRef, useState } from "react";
import { Box, Grid, Skeleton } from "@mui/material";
import Accordion from "components/Accordion";
import FormInputSelect from "components/form/FormInputSelect";
import SignatureCanvas from "react-signature-canvas";

const GuarantorSignature = ({
  control,
  guarantor,
  isGuarantorLoading,
  sigCanvas,
  setValue,
  applicationSignatures,
  updateAvailableFlag
}) => {
  const [signatureUrl, setSignatureUrl] = useState("");
  const fileInputRef = useRef(null);

  // useEffect(() => {
  //   if (applicationSignatures?.length > 0) {
  //     const foundSignature = applicationSignatures
  //       ?.flatMap(sig => sig.guarantor_signature)
  //       ?.find(item => item.guarantor_id === guarantor.id);

  //     if (foundSignature && sigCanvas.current) {
  //       sigCanvas.current.fromDataURL(foundSignature.signature);
  //       setSignatureUrl(foundSignature.signature);
  //     }
  //   }
  // }, [applicationSignatures, guarantor.id]);

    useEffect(() => {
    if (applicationSignatures?.length > 0) {
      const foundSignature = applicationSignatures?.flatMap(sig => sig.guarantor_signature)
        ?.find(item => item.guarantor_id === guarantor.id);
      
      if (foundSignature && sigCanvas.current) {
        sigCanvas.current.fromDataURL(foundSignature.signature);
      }
    }
  }, [applicationSignatures, guarantor.id, sigCanvas]);

  const guarantorOptions = [guarantor];

  const [ guarantorId, setGuarantorId ] = useState("");
  useEffect(() => {
    setValue(`guarantor_id_${guarantor.id}`, guarantor.id);
    setGuarantorId(guarantor.id)
  }, [isGuarantorLoading, guarantorOptions, guarantor]);

  const handleClear = () => {
    if (sigCanvas && sigCanvas.current) {
      sigCanvas.current.clear();
      setSignatureUrl("");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result;
        if (sigCanvas.current) {
          sigCanvas.current.clear();
          sigCanvas.current.fromDataURL(dataUrl);
          setSignatureUrl(dataUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (!guarantor) return null;

  return (
    <Accordion title={`Guarantor - ${guarantor?.full_name || "Unknown"} Signature`}>
      <Box sx={{ mt: 1 }}>
        <Grid container spacing={2} justifyContent="flex-start" alignItems="flex-start">
          
          {/* Left side - Guarantor Name */}
          <Grid item xs={12} sm={6}>
            {isGuarantorLoading || guarantorId === "" ? (
              <Skeleton variant="rectangular" height={37.13} />
            ) : (
              <FormInputSelect
                control={control}
                options={guarantorOptions}
                getOptionLabel={(option) => option?.full_name}
                id="id"
                name={`guarantor_id_${guarantor.id}`}
                label="Guarantor Name"
              />
            )}
          </Grid>

          {/* Right side - Signature */}
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
              <button onClick={handleClear}>
                Clear
              </button>
              {updateAvailableFlag && 
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
              
              }
             
            </Box>
          </Grid>
      </Box>
    </Accordion>
  );
};

export default React.memo(GuarantorSignature);
