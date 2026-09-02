import React, { useEffect, useState } from "react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Table from "components/Table";
import { useDispatch, useSelector } from "react-redux";
import { getApplication } from "features/application/applicationSlice";
import dayjs from "dayjs";
import { Breadcrumbs, Typography, Box, Paper } from "@mui/material";
import AdvancedSearch from "components/form/AdvancedSearch";
import { DISBURSED_SEARCH_OPTIONS } from "constants/searchOptions/disbursementSearchOptions";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import { createSMSLoanSkipped } from "features/smsGenerate/smsGenerateSlice";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import SmsIcon from "@mui/icons-material/Sms";
import { IconButton, Tooltip } from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

const SMSGenerateForLoanSkipTableIndex = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const { applications, next_page_param, isLoading } = useSelector(
    (state) => state.application
  );

  useEffect(() => {
    dispatch(
      getApplication({
        firstFetch: true,
        params: {
          status_array: JSON.stringify(["Approved", "Rejected"]),
          mob_status: 1,
          is_loan_operation_skipped: 1,
          category_is_sms_generated: 1,
          is_sms_generated: 0,
        },
      })
    );
  }, [dispatch]);

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_param) {
        dispatch(
          getApplication({
            params: next_page_param,
            firstFetch: false,
          })
        );
      }
    },
    [dispatch, next_page_param]
  );

  const defaultColDef = useMemo(
    () => ({
      valueSetter: (params) => { },
    }),
    []
  );


  const handleOpenConfirm = (applicationId) => {
    setSelectedApplicationId(applicationId);
    setConfirmOpen(true);
  };

  const handleCloseConfirm = () => {
    if (isGenerating) return;

    setConfirmOpen(false);
    setSelectedApplicationId(null);
  };

  const handleConfirmGenerate = async () => {
    if (!selectedApplicationId) return;

    try {
      setIsGenerating(true);

      await handleGenerateSMS(selectedApplicationId);

      handleCloseConfirm();
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateSMS = useCallback(
    async (applicationId) => {
      try {
        // Example using Redux thunk
        await dispatch(
          createSMSLoanSkipped({
            application_id: applicationId,
          })
        ).unwrap();
        // Refresh the table after success
        showSuccessToast("SMS Generation Successes");
        dispatch(
          getApplication({
            firstFetch: true,
            params: {
              status_array: JSON.stringify(["Approved", "Rejected"]),
              mob_status: 1,
              is_loan_operation_skipped: 1,
              category_is_sms_generated: 1,
              is_sms_generated: 0,
            },
          })
        );
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch]
  );

  const columnDefs = useMemo(
    () => [
      {
        field: "row",
        headerName: "No",
        valueGetter: "node.rowIndex + 1",
        width: 50,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "application_id",
        headerName: "ApplicationID",
        width: 150,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "action",
        headerName: "Action",
        width: 80,
        sortable: false,
        filter: false,
        resizable: false,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
        cellRenderer: (params) => (
          <Tooltip title="Generate SMS">
            <span>
              <IconButton
                color="primary"
                size="small"
                disabled={params.data.is_sms_generated}
                // onClick={() => handleGenerateSMS(params.data.id)}
                onClick={() => handleOpenConfirm(params.data.id)}
              >
                <SmsIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
        ),
      },
      {
        field: "status",
        headerName: "Status",
        width: 100,
        sortable: true,
        resizable: true,
      },
      {
        field: "assessment_prorata_interest",
        headerName: "Prorata Interest",
        width: 120,
        resizable: true,
      },
      {
        field: "assessment_commencement_date",
        headerName: "Commencement Date",
        width: 150,
        resizable: true,
      },
      {
        field: "assessment_first_due_date",
        headerName: "First Due Date",
        width: 150,
        resizable: true,
      },

      {
        field: "assessment_approved_amount",
        headerName: "Approved Amount",
        width: 150,
        sortable: true,
        resizable: true,
        valueGetter: (params) => {
          return (
            params.data.assessment_approved_amount ??
            params.data.approved_amount
          );
        },
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "category.name",
        headerName: "Category",
        width: 100,
        sortable: true,
        resizable: true,
      },
      {
        field: "sub_category.name",
        headerName: "Sub Category",
        width: 100,
        sortable: true,
        resizable: true,
      },
      {
        field: "applicant_name",
        headerName: "Applicant Name",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "living_phone_number",
        headerName: "Living Phone Number",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "nrc",
        headerName: "NRC Number",
        width: 200,
        sortable: true,
        resizable: true,
      },

      {
        field: "address_township.name",
        headerName: "Customer Current Township",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "address_ward.name",
        headerName: "Customer Current Ward",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "ihco_user.user_name",
        headerName: "IHCO",
        width: 200,
        resizable: true,
      },
      {
        field: "applied_date",
        headerName: "Applied Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "credit_assessment_date",
        headerName: "Approved Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "created_at",
        headerName: "Created Date",
        width: 200,
        sortable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
        resizable: true,
      },
      {
        field: "created_user.user_name",
        headerName: "Created By",
        width: 200,
        resizable: true,
      },
      {
        field: "updated_at",
        headerName: "Modified Date",
        width: 200,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
      },
      {
        field: "modified_user.user_name",
        headerName: "Modified By",
        width: 200,
        resizable: true,
      },
    ],
    []
  );

  const handleSearch = (searchData) => {
    const transformedSearchData = {};

    searchData.forEach((item) => {
      if (item.type === "date" || item.type === "date_time") {
        transformedSearchData[`${item.filtered_by}_from_date`] = item.value1;
        transformedSearchData[`${item.filtered_by}_to_date`] = item.value2;
      } else if (item.type === "autocomplete_status") {
        transformedSearchData[item.filtered_by] = JSON.stringify(item.value1);
      } else {
        transformedSearchData[item.filtered_by] = item.value1;
      }
    });

    dispatch(
      getApplication({
        params: {
          status_array: JSON.stringify(["Approved", "Rejected"]),
          mob_status: 1,
          is_loan_operation_skipped: 1,
          category_is_sms_generated: 1,
          is_sms_generated: 0,
          ...transformedSearchData,
        },
      })
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" className="margin-top-8">
        <Typography color="text.primary">Loan Operation</Typography>
        <Typography color="text.primary">SMS Generate For Loan Skipped Category</Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={DISBURSED_SEARCH_OPTIONS}
        onSearch={handleSearch}
      />
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={applications ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="SMSGenerateForLoanSkip"
          rowKey="id"
          agThemeStyle={{
            height: "calc(100vh - 210px)",
          }}
          onScrollBottomEnd={handleBodyScroll}
          loading={isLoading}
        // onSelectionChanged={handleSelectionChanged}
        // rowSelection={"multiple"}
        // rowMultiSelectWithClickFlag={"true"}
        />
      </Paper>
      <Dialog
        open={confirmOpen}
        onClose={handleCloseConfirm}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Generate SMS</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to generate and send this SMS?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleCloseConfirm}
            disabled={isGenerating}
          >
            Cancel
          </Button>

          <LoadingButton
            variant="contained"
            color="primary"
            onClick={handleConfirmGenerate}
            loading={isGenerating}
            loadingPosition="start"
          >
            Generate
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default React.memo(SMSGenerateForLoanSkipTableIndex);
