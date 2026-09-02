import React,{  useEffect, useCallback } from "react";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import { Helmet } from "react-helmet";
import ToolbarAppliedSettlementData from "./AppliedSettlementDataToolbar";
import AppliedSettlementDataList from "./AppliedSettlementDataList";
import { getAppliedSettlementData, getAppliedSettlementInsufficientData, postAppliedSettlementData, postAppliedSettlementinsufficientData } from "features/appliedSettlementData/appliedSettlementSlice";
import { useDispatch, useSelector } from "react-redux";
import { showSuccessToast } from "common/ToastMessage";
import { useParams } from 'react-router-dom';

const AppliedSettlementDataIndex = () => {

  const dispatch = useDispatch();
  const {uuid,mode} = useParams();
 
  const { appliedSettlementData, next_page_param, isLoading } = useSelector(
    (state) => state.appliedSettlementData
  );

  useEffect(() => {
    if(!mode){
      dispatch(
        getAppliedSettlementData({
          uuid,
          firstFetch: true,
        })
      );
    }else if(mode === "et"){
      dispatch(
        getAppliedSettlementData({
          uuid,
          params : {is_et: true},
          firstFetch: true,
        })
      );
    }else if(mode === "insufficient-payments"){
      dispatch(
        getAppliedSettlementInsufficientData({
          uuid,
          firstFetch: true,
        })
      );
    }
  }, [dispatch,mode]);

  const handlePosted = useCallback(async () => {
    try {
      if(!mode){
        await dispatch(
          postAppliedSettlementData({
            uuid: uuid,
          })
        ).unwrap();
      }else if(mode === "et"){
        await dispatch(
          postAppliedSettlementData({
            uuid: uuid,
            params: {is_et: true}
          })
        ).unwrap();
      }
      else if(mode === "insufficient-payments"){
        await dispatch(
          postAppliedSettlementinsufficientData({
            batch_id: appliedSettlementData[0]?.batch_id
          })
        ).unwrap();
      }

      showSuccessToast("Posted Success");
    } catch (error) {
      console.error("Error:", error);
    }
  }, [dispatch, appliedSettlementData,mode]);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Helmet>
        <title>Applied Settlement Data</title>
      </Helmet>
        <ToolbarAppliedSettlementData
          appliedSettlementData={appliedSettlementData}
          handlePosted={handlePosted}
        />
      <Box
        sx={{
          px: 1,
          pb: 1,
          display: "flex",
          gap: 2,
          "@media (max-width: 600px)": {
            flexDirection: "column",
          },
          marginTop: "20px",
        }}
      >
        <Box sx={{ width: "100%", flex: 1 }}>
          <AppliedSettlementDataList
            isLoading={isLoading}
            appliedSettlementData={appliedSettlementData}
            next_page_param={next_page_param}
          />
        </Box>
      </Box>
    </>
  );
};

export default AppliedSettlementDataIndex;
