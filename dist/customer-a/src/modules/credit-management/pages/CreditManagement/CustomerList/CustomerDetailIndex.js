import React, {useState} from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Helmet } from "react-helmet";
import dayjs from "dayjs";
import CustomerDetailInfo from "./CustomerDetailInfo";
import useApplicationAssessmentForm from "./hooks/useApplicationAssessmentForm";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import CustomerDetailTable from "./CustomerDetailTable";
import ApplicationDetailTable from "./ApplicationDetailTable";

const CustomerDetailIndex = () => {
  const { control, assessment, onSubmit, handleSubmit, isLoading } =
    useApplicationAssessmentForm();
  
    const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


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
      <Box
        sx={{
          px: 1,
        }}
      >
        <Typography sx={{ color: "#1890ff", margin:"15px" }} variant="h5" gutterBottom>
          {/* {assessment?.application_id} . {assessment?.assessment_type} */}
          Customer Detail Information
        </Typography>
      </Box>

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
          <CustomerDetailInfo control={control} />
          <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: '#F0F0F0' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Customer Information Table" value="1" />
            <Tab label="Application Table" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1"> <CustomerDetailTable /></TabPanel>
        <TabPanel value="2"><ApplicationDetailTable /></TabPanel>
      </TabContext>
    </Box>
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

export default React.memo(CustomerDetailIndex);
