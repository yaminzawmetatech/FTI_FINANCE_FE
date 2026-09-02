import React, { useEffect, useState } from "react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Table from "components/Table";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import ReportAppBar from "./CollectionReportAppBar";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import AdvancedSearch from "components/form/AdvancedSearch";
import { Breadcrumbs, Typography, Box, Paper } from "@mui/material";
import { getContracts } from "features/contract/contractSlice";
import { COLLECTION_REPORT_OPTIONS } from "constants/searchOptions/collectionReportOptions";
import { CONTRACT_STATUS } from "constants/contractStatus";

const ReportTable = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();
  
  const [filterBy,setFilterBy] = useState();

  const { contracts, next_page_param, isLoading } = useSelector(
    (state) => state.contracts
  );

  useEffect(() => {
    dispatch(
      getContracts({
        firstFetch: true,
        params: {
          is_generated_gl: 1,
        },
      })
    );
  }, [dispatch]);

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_param) {
        dispatch(
          getContracts({
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
      valueSetter: (params) => {},
    }),
    []
  );

    // link to contract
    const LinkCellRenderer = ({ value, data }) => {
      const uuid = data?.uuid;
      const url = `/contracts/${uuid}/view`;
      return (
        <a href={url} target="_blank" style={{ textDecoration: "underline" }}>
          {value}
        </a>
      );
    };

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
        field: "application.application_id",
        headerName: "Contract ID",
        width: 130,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
        cellRenderer: LinkCellRenderer,
      },
      {
        field: "partner_id",
        headerName: "Partner ID",
        width: 100,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
        sortable: true,
      },
      {
        field: "customer_name",
        headerName: "Customer Name",
        width: 130,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
        sortable: true,
      },
      {
        field: "loan_amount",
        headerName: "Loan Amount",
        width: 100,
        resizable: true,
        sortable: true,
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
        width: 120,
        sortable: true,
        resizable: true,
      },
      {
        field: "finance_term",
        headerName: "Finance Term",
        width: 100,
        sortable: true,
        resizable: true,
      },
      {
        field: "disbursement_date",
        headerName: "Contract Date",
        width: 180,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
      },
      {
        field: "due_date",
        headerName: "Due Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        width: 120,
        sortable: true,
        resizable: true,
      },
      {
        field: "remaining_month",
        headerName: "Remaining Month",
        width: 120,
        resizable: true,
      },
      {
        field: "contract_status",
        headerName: "Contract Status",
        width: 100,
        resizable: true,
      },
      {
        field: "overdue_status",
        headerName: "Overdue Status",
        width: 100,
        resizable: true,
      },
      {
        field: "monthly_installment_amount",
        headerName: "MI Amount",
        width: 100,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "due_amount",
        headerName: "Due Amount",
        width: 100,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "paid_amount",
        headerName: "Paid Amount",
        width: 100,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "balance",
        headerName: "Balance",
        width: 100,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "paid_date",
        headerName: "Paid Date",
        width: 120,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
      },
      // {
      //   field: "payment_status",
      //   headerName: "Payment Status",
      //   width: 100,
      //   sortable: true,
      //   resizable: true,
      // },
      {
        field: "overdue_days",
        headerName: "Day Late",
        width: 100,
        sortable: true,
        resizable: true,
      },
      {
        field: "collection_fees",
        headerName: "Collection Fees",
        width: 120,
        sortable: true,
        resizable: true,
      },
      {
        field: "collected_collection_fees",
        headerName: "Collected Collection Fees",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "application.address_state.name",
        headerName: "Area",
        width: 100,
        sortable: true,
        resizable: true,
      },
      {
        field: "application.address_full_address",
        headerName: "Full Address",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "application.title_position",
        headerName: "Occupation",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "application.application_info.mnet_customer_category",
        headerName: "Customer Type",
        width: 100,
        sortable: true,
        resizable: true,
      },
      {
        field: "latest_follow_up_result",
        headerName: "Reminder Allocation Latest Result",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "write_off_date",
        headerName: "Write Off Date",
        width: 120,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
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

    setFilterBy(transformedSearchData);
    dispatch(
      getContracts({
        params: {
          is_generated_gl: 1,
          ...transformedSearchData,
        },
      })
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" className="margin-top-8">
        <Typography color="text.primary">Collection Module</Typography>
        <Typography color="text.primary">Report</Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={COLLECTION_REPORT_OPTIONS}
        onSearch={handleSearch}
        status={CONTRACT_STATUS}
      />
      <ReportAppBar
        transformedSearchData={filterBy}
        contractIds={contracts?.map((contract) => contract.id)} 
      />
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={contracts ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="CollectionReportTable"
          rowKey="id"
          agThemeStyle={{
            height: "calc(100vh - 170px)",
          }}
          onScrollBottomEnd={handleBodyScroll}
          loading={isLoading}
        />
      </Paper>
    </Box>
  );
};

export default React.memo(ReportTable);
