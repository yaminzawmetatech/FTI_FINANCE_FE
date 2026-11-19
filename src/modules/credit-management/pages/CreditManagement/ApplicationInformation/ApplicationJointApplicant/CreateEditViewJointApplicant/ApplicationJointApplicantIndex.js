import React, { useEffect } from "react";
import { Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { Helmet } from "react-helmet";
import ApplicationJointApplicantGeneral from "./ApplicationJointApplicantGeneral";
import useApplicationJointApplicantForm from "./hooks/useApplicationJointApplicantForm";
import ApplicationJointApplicantToolbar from "./ApplicationJointApplicantToolbar";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import ApplicationJointApplicantOccupation from "./ApplicationJointApplicantOccupation";
import { getAddressStates } from "modules/administration/slices/addressStateSlice";
import ApplicationAddress from "./ApplicationAddress";

const CreateApplicationJointApplicant = () => {
  const dispatch = useDispatch();

  const { applicationId, applicationUUId, mode } = useParams();
  const { control, onSubmit, handleSubmit, setValue, isLoading, isSubmitting } =
    useApplicationJointApplicantForm(applicationId);

  const { addressStates, isLoading: addressStateLoading } = useSelector(
    (state) => state.addressStates
  );

  useEffect(() => {
    dispatch(getAddressStates());
  }, [dispatch]);


  if (addressStateLoading || isLoading || isSubmitting) {
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
        {mode === "ViewApplicationJointApplicant" && (
          <title>View - Application Joint Applicant</title>
        )}
        {mode === "CreateApplicationJointApplicant" && (
          <title>Create - Application Joint Applicant</title>
        )}
        {mode === "EditApplicationJointApplicant" && (
          <title>Edit - Application Joint Applicant</title>
        )}
      </Helmet>
      <ApplicationJointApplicantToolbar
        id={applicationId}
        uuid={applicationUUId}
      />
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
          <ApplicationJointApplicantGeneral control={control} />
          <ApplicationAddress
            control={control}
            setValue={setValue}
            addressStates={addressStates}
          / >
          <ApplicationJointApplicantOccupation
            control={control}
            setValue={setValue}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", px: 1, pb: 2, justifyContent: "flex-end" }}>
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

export default React.memo(CreateApplicationJointApplicant);
