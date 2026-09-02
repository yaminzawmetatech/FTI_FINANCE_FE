import React, { useEffect } from "react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Table from "components/Table";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { getGeneralLedgerEnteriesSyncPost } from "features/stampDutyPayment/stampDutyPaymentSlice";
import { Breadcrumbs, Typography, Box, Paper } from "@mui/material";
import AdvancedSearch from "components/form/AdvancedSearch";
import { SUBMITTED_STAMP_DUTY_PAYMENT_OPTIONS } from "constants/searchOptions/submittedStampDutyPaymentOptions";
import { STAMP_DUTY_PAYMENT_STATUS } from "constants/stampDutyPaymentStatus";
import { CurrencyFormatter } from "common/CurrencyFormatter";

const GeneralLedgerEnteriesSyncPostTable = ({ id }) => {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();

  const { generalLedgerEnteriesSyncPost, next_page_param, isLoading } = useSelector(
    (state) => state.generalLedgerEnteriesSyncPost
  );

  useEffect(() => {
    dispatch(
      getGeneralLedgerEnteriesSyncPost({
        firstFetch: true,
        params: {
          disbursement_payment_id: id,
        },
      })
    );
  }, [dispatch, id]);

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_param) {
        dispatch(
          getGeneralLedgerEnteriesSyncPost({
            params: {
              ...params,
              ...next_page_param,
              disbursement_payment_id: id,
            },
            firstFetch: false,
          })
        );
      }
    },
    [dispatch, next_page_param, id]
  );

  const defaultColDef = useMemo(
    () => ({
      valueSetter: (params) => { },
    }),
    []
  );

  const DisabledCheckboxRenderer = ({ value }) => (
    <input
      type="checkbox"
      style={{ width: "20px", height: "15px" }}
      disabled
      checked={value}
    />
  );

  const columnDefs = useMemo(
    () => [
      {
        field: "journal_template_name",
        headerName: "Journal Template Name",
        width: 100,
        sortable: true,
        resizable: true,
      },
      {
        field: "journal_batch_name",
        headerName: "Journal Batch Name",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "posting_date",
        headerName: "Posting Date",
        width: 100,
        sortable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
        resizable: true,
      },
      {
        field: "document_date",
        headerName: "Document Date",
        width: 100,
        sortable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
        resizable: true,
      },
      {
        field: "document_type",
        headerName: "Document Type",
        width: 100,
        sortable: true,
        resizable: true,
      },
      {
        field: "document_no",
        headerName: "Document No",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "external_document_no",
        headerName: "External Document No",
        width: 100,
        sortable: true,
        resizable: true,
      },
      {
        field: "account_type",
        headerName: "Account Type",
        width: 100,
        sortable: true,
        resizable: true,
      },
      {
        field: "account_no",
        headerName: "Account No",
        width: 100,
        resizable: true,
      },
      {
        field: "description",
        headerName: "Description",
        width: 200,
        resizable: true,
      },
      {
        field: "amount",
        headerName: "Amount",
        width: 100,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter
      },
      {
        field: "debit_amount",
        headerName: "Debit Amount",
        width: 100,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter
      },
      {
        field: "credit_amount",
        headerName: "Credit Amount",
        width: 100,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter
      },
    ],
    []
  );

  const handleSearch = (searchData) => {

    const transformedSearchData = {};

    searchData.forEach(item => {
      if (item.type === "date") {
        transformedSearchData[`${item.filtered_by}_from_date`] = item.value1;
        transformedSearchData[`${item.filtered_by}_to_date`] = item.value2;
      } else if (item.type === "autocomplete_status") {
        transformedSearchData[item.filtered_by] = JSON.stringify(item.value1);
      } else {
        transformedSearchData[item.filtered_by] = item.value1;
      }
    });

    dispatch(
      getGeneralLedgerEnteriesSyncPost({
        params: {
          ...transformedSearchData,
          disbursement_payment_id: id,
        },
      })
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" className="margin-top-8">
        <Typography color="text.primary">Loan Operation</Typography>
        <Typography color="text.primary">
          General Ledger Entries
        </Typography>
      </Breadcrumbs>
      {/* <AdvancedSearch
        options={SUBMITTED_STAMP_DUTY_PAYMENT_OPTIONS}
        status={STAMP_DUTY_PAYMENT_STATUS}
        onSearch={handleSearch}
      /> */}
      {/* <StampDutyBatchAppBar /> */}
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={generalLedgerEnteriesSyncPost ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="SubmittedStampDutypayment"
          rowKey="id"
          agThemeStyle={{
            height: "calc(100vh - 210px)",
          }}
          onScrollBottomEnd={handleBodyScroll}
          loading={isLoading}
        />
      </Paper>
    </Box>
  );
};

export default React.memo(GeneralLedgerEnteriesSyncPostTable);
