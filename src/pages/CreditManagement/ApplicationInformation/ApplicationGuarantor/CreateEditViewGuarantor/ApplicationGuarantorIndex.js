import React, { useEffect } from "react";
import { Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { Helmet } from "react-helmet";
import ApplicationGuarantorGeneral from "./ApplicationGuarantorGeneral";
import useApplicationGuarantorForm from "./hooks/useApplicationGuarantorForm";
import ApplicationGuarantorToolbar from "./ApplicationGuarantorToolbar";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import ApplicationGuarantorOccupation from "./ApplicationGuarantorOccupation";
import { getAddressStates } from "features/address/State/addressStateSlice";
import ApplicationAddress from "./ApplicationAddress";

const CreateApplicationGuarantor = () => {
  const dispatch = useDispatch();

  const { applicationId, applicationUUId, mode } = useParams();
  const { control, onSubmit, handleSubmit, setValue, category, isLoading, isSubmitting, handleCheckExistingCustomer } =
    useApplicationGuarantorForm();

  const { addressStates, isLoading: addressStateLoading } = useSelector(
    (state) => state.addressStates
  );

  useEffect(() => {
    dispatch(getAddressStates());
  }, [dispatch]);

  if (addressStateLoading || isLoading  || isSubmitting) {
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
        {mode === "ViewApplicationGuarantor" && (
          <title>View - Application Guarantor</title>
        )}
        {mode === "CreateApplicationGuarantor" && (
          <title>Create - Application Guarantor</title>
        )}
        {mode === "EditApplicationGuarantor" && (
          <title>Edit - Application Guarantor</title>
        )}
      </Helmet>
      <ApplicationGuarantorToolbar id={applicationId} uuid={applicationUUId} />
      <Box
        sx={{
          px: 1,
        }}
      ></Box>
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
          <ApplicationGuarantorGeneral control={control} category={category}  handleCheckExistingCustomer={handleCheckExistingCustomer} />
          <ApplicationAddress
            control={control}
            setValue={setValue}
            addressStates={addressStates}
            category={category}
          />
          <ApplicationGuarantorOccupation
            control={control}
            setValue={setValue}
            category={category}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          px: 1,
          pb: 2,
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit(onSubmit)}
        >
          OK
        </Button>
      </Box>
    </>
  );
};

export default CreateApplicationGuarantor;
