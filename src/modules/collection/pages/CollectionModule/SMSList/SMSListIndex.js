import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  Breadcrumbs,
  Typography,
  Box,
  Paper,
  Snackbar,
  Alert
} from "@mui/material";
import Table from "components/Table";
import AdvancedSearch from "components/form/AdvancedSearch";
import { getAllSms } from "modules/collection/slices/smsHistorySlice";
import { SMS_HISTORY_SEARCH_OPTIONS } from "constants/searchOptions/smsHistorySearchOptions";
import SMSHistoryAppBar from "./SMSHistoryAppBar";

const SMSTable = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();
  const [transformedSearchDataResponse, setTransformedSearchDataResponse] = useState();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const { smsHistories, next_page_param, isLoading } = useSelector(
    (state) => state.smsHistories
  );

  useEffect(() => {
    dispatch(
      getAllSms({
        firstFetch: true,
      })
    );
  }, [dispatch]);

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_param && !isLoading) {
        dispatch(
          getAllSms({
            params: next_page_param,
            firstFetch: false,
          })
        );
      }
    },
    [dispatch, next_page_param, isLoading]
  );

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
      filter: true,
      editable: true,
    }),
    []
  );

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setSnackbarMessage("Text copied to clipboard!");
      setSnackbarOpen(true);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setSnackbarMessage("Failed to copy text");
      setSnackbarOpen(true);
    }
  };

  const LinkAndCopyRenderer = ({ value, data }) => {
    const uuid = data?.uuid;
    const url = `/CreditManagement/CreateApplicationInformation/${data?.category.name}/${data?.category_id}/${data?.application.uuid}/${data?.application_id}/view`;
    
    return (
      <div 
        // onDoubleClick={() => handleCopy(value)}
        style={{
          cursor: 'pointer',
          width: '100%',
          height: '100%',
          padding: '10px',
          display: 'flex',
          alignItems: 'center',
        }}
        // title="Double-click to copy"
      >
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ 
            textDecoration: "underline",
            pointerEvents: 'auto' // Ensure link is clickable
          }}
          onClick={(e) => e.stopPropagation()} // Prevent double-click from triggering on the link
        >
          {value}
        </a>
      </div>
    );
  };

  const SMSRenderer = ({ value }) => {
    return (
      <div 
        onDoubleClick={() => handleCopy(value)}
        style={{
          cursor: 'pointer',
          width: '100%',
          height: '100%',
          padding: '10px',
          display: 'flex',
          alignItems: 'center',
          userSelect: 'text'
        }}
        title="Double-click to copy"
      >
        {value}
      </div>
    );
  };

  const columnDefs = useMemo(
    () => [
      {
        field: "row",
        headerName: "No",
        valueGetter: "node.rowIndex + 1",
        width: 80,
        pinned: 'left',
        lockPinned: true,
      },
      {
        field: "application.application_id",
        headerName: "Application ID",
        width: 150,
        cellRenderer: LinkAndCopyRenderer,
      },
      {
        field: "partner_id",
        headerName: "Partner ID",
        width: 150,
        // cellRenderer: SMSRenderer,
      },
      {
        field: "application.living_phone_number",
        headerName: "Phone Number",
        width: 150,
        // cellRenderer: SMSRenderer,
      },
      {
        field: "sms_text",
        headerName: "SMS Text",
        width: 800,
        // cellRenderer: SMSRenderer,
        // tooltipField: 'sms_text',
      },
      {
        field: "created_at",
        headerName: "Created Date",
        width: 200,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
      },
    ],
    []
  );

  const handleSearch = (searchData) => {
    const transformedSearchData = {};

    searchData.forEach((item) => {
      if (item.type === "date") {
        transformedSearchData[`${item.filtered_by}_from_date`] = item.value1;
        transformedSearchData[`${item.filtered_by}_to_date`] = item.value2;
      } else if (item.type === "autocomplete_status") {
        transformedSearchData[item.filtered_by] = JSON.stringify(item.value1);
      } else {
        transformedSearchData[item.filtered_by] = item.value1;
      }
    });

    setTransformedSearchDataResponse(transformedSearchData);

    dispatch(
      getAllSms({
        params: transformedSearchData,
        firstFetch: true,
      })
    );
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Typography color="text.primary">Collection Module</Typography>
        <Typography color="text.primary">SMS History</Typography>
      </Breadcrumbs>
      
      <AdvancedSearch
        options={SMS_HISTORY_SEARCH_OPTIONS}
        onSearch={handleSearch}
      />
      
      <SMSHistoryAppBar
        smsHistoryIds={smsHistories?.map((sms) => sms?.id)}
        transformedSearchDataResponse={transformedSearchDataResponse}
      />
      
      <Paper sx={{ width: "100%", mt: 2 }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={smsHistories ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="SmsHistoryList"
          rowKey="id"
          agThemeStyle={{
            height: "calc(100vh - 210px)",
            width: "100%"
          }}
          onScrollBottomEnd={handleBodyScroll}
          loading={isLoading}
          suppressRowClickSelection={true}
        />
      </Paper>
      
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default React.memo(SMSTable);