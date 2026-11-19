import React, { useEffect } from "react";
import { Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { Helmet } from "react-helmet";
import useApplicationCollateralForm from "./hooks/useApplicationCollateralForm";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import ApplicationGuarantorOccupation from "./ApplicationGuarantorOccupation";
import { getAddressStates } from "modules/administration/slices/addressStateSlice";
import ApplicationAddress from "./ApplicationAddress";
import ApplicationCollateralGeneral from "./ApplicationCollateralGeneral";
import ApplicationCollateralManagementProcess from "./ApplicationCollateralManagementProcess";
import { getAllVehicles } from "modules/loan-operation/slices/vehicleSlice";
import ApplicationCollateralToolbar from "./ApplicationCollateralToolbar";
import ApplicationCollateralLicenseRenewalProcess from "./ApplicationCollateralLicenseRenewalProcess";
import ApplicationCollateralInsuranceRenewalProcess from "./ApplicationCollateralInsuranceRenewalProcess";
import ProcessFullAfterRepayment from "./ProcessFullAfterRepayment";

const CreateApplicationGuarantor = () => {
  const dispatch = useDispatch();

  const { applicationId, applicationUUId, mode } = useParams();
  const { control, onSubmit, handleSubmit, setValue, category, isLoading, isSubmitting, collateralTypes, isCollateralTypesLoading, selectedCollateral, watch, CMCO, auth } =
    useApplicationCollateralForm();

  const brand_id = watch("brand_id");

  const { vehicles, isLoading: vehicleLoading } = useSelector(
    (state) => state.vehicles
  );

  const { addressStates, isLoading: addressStateLoading } = useSelector(
    (state) => state.addressStates
  );

  useEffect(() => {
    dispatch(getAddressStates());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getAllVehicles({
        params: {
          category_id: selectedCollateral?.data?.application?.category_id,
          sub_category_id: selectedCollateral?.data?.application?.sub_category_id,
          brand_id: brand_id,
        },
      })
    );
  }, [dispatch, selectedCollateral, brand_id]);

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
        {mode === "view" && (
          <title>View - Application Collateral</title>
        )}
        {mode === "CreateApplicationGuarantor" && (
          <title>Create - Application Collateral</title>
        )}
        {mode === "edit" && (
          <title>Edit - Application Collateral</title>
        )}
      </Helmet>
      <ApplicationCollateralToolbar id={selectedCollateral?.data?.id} uuid={selectedCollateral?.data?.uuid} status={selectedCollateral?.data?.status} applicationUUId={selectedCollateral?.data?.application?.uuid} contract={selectedCollateral?.data?.contract} application={selectedCollateral?.data?.application} mode={mode} auth={auth}/>
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
          <ApplicationCollateralGeneral control={control} />
          <ApplicationCollateralManagementProcess control={control} collateralTypes={collateralTypes} vehicles={vehicles} auth={auth} isCollateralTypesLoading={isCollateralTypesLoading} />
          <ApplicationCollateralLicenseRenewalProcess control={control} collateralTypes={collateralTypes} vehicles={vehicles} CMCO={CMCO} auth={auth}/>
          <ApplicationCollateralInsuranceRenewalProcess control={control} collateralTypes={collateralTypes} vehicles={vehicles} auth={auth}/>
          <ProcessFullAfterRepayment control={control} collateralTypes={collateralTypes} vehicles={vehicles} auth={auth}/>
          {/* <ApplicationAddress
            control={control}
            setValue={setValue}
            addressStates={addressStates}
            category={category}
          />
          <ApplicationGuarantorOccupation
            control={control}
            setValue={setValue}
            category={category}
          /> */}
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
