import { useEffect } from "react";
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
  applicationSignatures
}) => {

  useEffect(() => {
    if (applicationSignatures?.length > 0) {
      const foundSignature = applicationSignatures?.flatMap(sig => sig.guarantor_signature)
        ?.find(item => item.guarantor_id === guarantor.id);
      
      if (foundSignature && sigCanvas.current) {
        sigCanvas.current.fromDataURL(foundSignature.signature);
      }
    }
  }, [applicationSignatures, guarantor.id, sigCanvas]);
  

  useEffect(() => {
    if (guarantor) {
      setValue(`guarantor_id_${guarantor.id}`, guarantor.id); // Auto-select guarantor
    }
  }, [guarantor, setValue]);

  const handleClear = () => {
    if (sigCanvas && sigCanvas.current) {
      sigCanvas.current.clear();
    }
  };
  
  return (
    <Accordion
      title={`Guarantor - ${guarantor?.full_name || "Unknown"} Signature`}
    >
      <Box sx={{ mt: 1 }}>
        <Grid
          container
          spacing={2}
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={12} sm={6}>
            {isGuarantorLoading ? (
              <Skeleton variant="rectangular" height={37.13} />
            ) : (
              <FormInputSelect
                control={control}
                options={[guarantor]} // Single guarantor
                getOptionLabel={(option) => option?.full_name}
                id="id"
                name={`guarantor_id_${guarantor.id}`}
                label="Guarantor Name"
                disabled // Prevent user selection
              />
            )}
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
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Accordion>
  );
};

export default GuarantorSignature;
