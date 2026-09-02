import React, { useCallback } from "react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { showSuccessToast } from "common/ToastMessage";
import { AppBar } from "@mui/material";
import {
  getKpaySyncAccounts,
  syncKpayAccounts,
} from "features/kpaySynAccount/kpaySyncAccountSlice";

const AppBarSyncBtn = () => {
  const dispatch = useDispatch();

  const handleSyncClick = useCallback(async () => {
    try {
      const responseData = await dispatch(syncKpayAccounts());

      if (responseData.payload.success === true) {
        await dispatch(
          getKpaySyncAccounts({
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
      }}
    >
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
