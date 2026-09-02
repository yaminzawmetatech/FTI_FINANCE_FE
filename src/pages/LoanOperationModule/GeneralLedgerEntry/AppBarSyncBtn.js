import React, { useState, useCallback, useEffect } from "react";
import CustomAppBar from "components/CustomAppBar";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import {
  getAllGeneralLedgerEntries,
  syncGeneralLedgerEntries,
} from "features/generalLedgerEntry/generalLedgerEntrySlice";
import { showSuccessToast } from "common/ToastMessage";
import AppBarSearchInput from "./AppBarSearchInput";
import GeneralLedgerEntryExcelExportButton from "./GeneralLedgerEntryExcelExportButton";
import { AppBar } from "@mui/material";

const AppBarSyncBtn = () => {
  const dispatch = useDispatch();

  const [documentNumber, setDocumentNumber] = useState("");

  const handleSearchClick = useCallback(() => {
    const newParams = {};

    if (documentNumber !== "") {
      newParams.document_no = documentNumber;
    }

    const entries = Object.entries(newParams);

    dispatch(
      getAllGeneralLedgerEntries({
        params: {
          ...Object.fromEntries(entries),
        },
      })
    );
  }, [documentNumber, dispatch]);

  const handleSyncClick = useCallback(async () => {
    try {
      const responseData = await dispatch(syncGeneralLedgerEntries());

      if (responseData.payload.success === true) {
        await dispatch(
          getAllGeneralLedgerEntries({
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
        {/* <AppBarSearchInput onNoChange={setDocumentNumber} />
        <Button variant="outlined" onClick={handleSearchClick}>
          Search
        </Button> */}
        <div style={{ marginLeft: "auto" }}>
          <Button
            style={{ marginRight: "4px" }}
            variant="contained"
            onClick={handleSyncClick}
          >
            Sync
          </Button>
          <GeneralLedgerEntryExcelExportButton
            documentNumber={documentNumber}
          />
        </div>
      </AppBar>
  );
};

export default React.memo(AppBarSyncBtn);
