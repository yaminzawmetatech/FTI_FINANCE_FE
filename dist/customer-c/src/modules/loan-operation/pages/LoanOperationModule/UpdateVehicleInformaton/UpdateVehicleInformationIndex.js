import React, { useState, useEffect } from "react";
import { Backdrop, Box, Button, CircularProgress, Typography } from "@mui/material";
import { Helmet } from "react-helmet";

import VehicleInfoFinancedVehicleInfo from "./contractVehicleInfoFinancedVehicleInfo";
import useVehicleInfoForm from "./hooks/useContractVehicleInfoForms";
import AdvancedSearch from "components/form/AdvancedSearch";
import { UPDATE_VEHICLE_INFORMATION } from "./updateVehicleInformationSearchOption";

const UpdateVehicleInformationIndex = () => {
  const [searchData, setSearchData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(false);

  const {
    control,
    onSubmit,
    handleSubmit,
    isLoading,
    vehicles,
    vehicleLoading,
    setValue,
    formApplicationId,
    setSearchData: setFormSearchData,
    latestVehicleInformation,
    isSuccess,
    reset: resetForm
  } = useVehicleInfoForm(searchData);

  const handleSearch = (newSearchData) => {
    setHasSearched(true);
    setSearchData(newSearchData);
    const transformedSearchData = {};
    let applicationId = formApplicationId;

    newSearchData.forEach(item => {
      if (item.filtered_by === "application_id") {
        applicationId = item.value1;
      } else if (item.type === "date") {
        transformedSearchData[`${item.filtered_by}_from_date`] = item.value1;
        transformedSearchData[`${item.filtered_by}_to_date`] = item.value2;
      } else if (item.type === "autocomplete_status") {
        transformedSearchData[item.filtered_by] = JSON.stringify(item.value1);
      } else {
        transformedSearchData[item.filtered_by] = item.value1;
      }
    });

    setFormSearchData(newSearchData);
    setShowForm(true);
    // setResetTrigger(false);
  };

  const handleReset = () => {
    setSearchData([]);
    setHasSearched(false);
    setShowForm(false);
    resetForm();
    setResetTrigger(true);
  };

  useEffect(() => {
    if (isSuccess) {
      setShowForm(true);
    }
  }, [isSuccess]);

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
      {/* <Helmet>
        <title>Vehicle Info</title>
      </Helmet> */}
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
          <AdvancedSearch 
            options={UPDATE_VEHICLE_INFORMATION}  
            onSearch={handleSearch} 
            // resetTrigger={resetTrigger}
          />
          
          {showForm && (
            <>
              
              
              <VehicleInfoFinancedVehicleInfo
                vehicles={vehicles}
                vehicleLoading={vehicleLoading}
                control={control}
                setValue={setValue}
              />
              
              <Box sx={{ display: "flex", px: 1, mb: 2, justifyContent: "flex-end", mt: 2 }}>

                <Button 
                  variant="contained" 
                  color="secondary"
                  onClick={handleReset}
                  sx={{ mr: 2 }}
                >
                  Close
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit(onSubmit)}
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress size={24} /> : "Save"}
                </Button>
              </Box>
            </>
          )}

          {hasSearched && !latestVehicleInformation && (
            <Box sx={{ 
              mt: 3, 
              p: 3, 
              border: '1px dashed #ccc',
              borderRadius: 1,
              textAlign: 'center'
            }}>
              <Typography variant="body1">
                No vehicle information found for the selected application.
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default React.memo(UpdateVehicleInformationIndex);