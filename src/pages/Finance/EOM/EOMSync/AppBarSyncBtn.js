import React, { useState, useCallback, useEffect } from "react";
import CustomAppBar from "components/CustomAppBar";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { showSuccessToast } from "common/ToastMessage";
import { AppBar } from "@mui/material";
import { getAllSyncEOM, syncEOM } from "features/eomSync/eomSyncSlice";
import { useParams } from "react-router";

const AppBarSyncBtn = () => {
  const dispatch = useDispatch();

  const { id } = useParams();


  const handleSyncClick = useCallback(async () => {
    try {
      const responseData = await dispatch(syncEOM({id})).unwrap();

      if (responseData.payload.success === true) {
        await dispatch(
          getAllSyncEOM({
            firstFetch: true,
          })
        );
        showSuccessToast("Sync Success");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, [dispatch]);

  return (
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#fafafb",
          color: "black",
          boxShadow: "none",
          mb: 1,
          mt: -1,
        }}>
        <div style={{ marginLeft: "auto" }}>
          <Button
            style={{ marginRight: "4px" }}
            variant="contained"
            onClick={handleSyncClick}
          >
            Sync
          </Button>
        </div>
      </AppBar>
  );
};

export default React.memo(AppBarSyncBtn);
