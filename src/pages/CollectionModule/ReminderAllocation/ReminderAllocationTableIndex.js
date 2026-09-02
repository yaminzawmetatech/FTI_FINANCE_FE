import React, { useEffect, useState } from "react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Table from "components/Table";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import ReminderAllocationAppBar from "./ReminderAllocationAppBar";
import { Breadcrumbs, Typography, Box, Paper, Chip, Grid } from "@mui/material";
import AdvancedSearch from "components/form/AdvancedSearch";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import { getUsers } from "features/users/usersSlice";
import { getAllocateActivities } from "features/AllocateActivities/allocateActivitiesSlice";
import {
  getContractsForReminderAllocation,
  getReminderAllocationCounts,
} from "features/contract/contractReminderAllocationSlice";
import { REMINDER_ALLOCATION_SEARCH_OPTIONS } from "constants/searchOptions/reminderAllocationSearchOptions";
import ReminderAllocationTableRowMenu from "./ReminderAllocationTableRowMenu";

const ReminderAllocationTable = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();
  const [selectedRows, setSelectedRows] = useState([]);
  const mode = "divide_mode";

  const { contractsReminderAllocation, next_page_param, isLoading } =
    useSelector((state) => state.contractsReminderAllocation);

  const { reminderAllocationCounts } = useSelector(
    (state) => state.reminderAllocationCounts
  );

  const [transformedSearchDataResponse, setTransformedSearchDataResponse] =
    useState();

  const searchValueDate = dayjs(Date.now());

  const contractsParam = {
    exclude_status: ["Terminated", "Fully Paid"],
    is_generated_gl: 1,
  };

  const rowData = contractsReminderAllocation || [];

  const CONTRACT_STATUS = [
    { id: "Normal", name: "Normal" },
    { id: "Overdue", name: "Overdue" },
    { id: "Write Off", name: "Write Off" },
  ];

  const fetchApi = useCallback(() => {
    dispatch(
      getContractsForReminderAllocation({
        firstFetch: true,
        params: {
          ...contractsParam,
          due_month: searchValueDate ? searchValueDate.format("YYYY-MM") : "",
        },
      })
    );
  }, [dispatch]);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  useEffect(() => {
    dispatch(
      getReminderAllocationCounts({
        params: {
          is_count: 1,
          due_month: searchValueDate ? searchValueDate.format("YYYY-MM") : "",
        },
      })
    );
    dispatch(getUsers());
    dispatch(getAllocateActivities());
  }, [dispatch]);

  const defaultColDef = useMemo(
    () => ({
      valueSetter: (params) => {},
    }),
    []
  );

  // to show data in chips
  const ChipRenderer = (props) => {
    const guarantor_reference_arr =
      props?.data?.application?.application_guarantors;

    return (
      <Box
        display="flex"
        flexDirection="column"
        gap={1}
        sx={{ marginBottom: "5px", marginTop: "3px" }}
      >
        {guarantor_reference_arr?.map((value, index) => {
          if (
            props.colDef.field === "reference_name" &&
            value.type === "reference"
          ) {
            return <Chip key={index} label={value.guarantor.full_name} />;
          }
          if (
            props.colDef.field === "reference_phone" &&
            value.type === "reference"
          ) {
            return (
              <Chip key={index} label={value.guarantor.primary_phone_no} />
            );
          }
          if (
            props.colDef.field === "reference_relation_with_customer" &&
            value.type === "reference"
          ) {
            return (
              <Chip
                key={index}
                label={value.guarantor.relation_with_customer}
              />
            );
          }
          if (
            props.colDef.field === "guarantor_name" &&
            value.type === "guarantor"
          ) {
            return <Chip key={index} label={value.guarantor.full_name} />;
          }
          if (
            props.colDef.field === "guarantor_primary_ph" &&
            value.type === "guarantor"
          ) {
            return (
              <Chip key={index} label={value.guarantor.primary_phone_no} />
            );
          }
          if (
            props.colDef.field === "guarantor_relation_with_customer" &&
            value.type === "guarantor"
          ) {
            return (
              <Chip
                key={index}
                label={value.guarantor.relation_with_customer}
              />
            );
          }
          return null;
        })}
      </Box>
    );
  };

  const getRowStyle = (params) => {
    const contractStatus = params?.data?.contract_status;
    return contractStatus === "Write Off"
      ? { background: "rgba(255, 0, 0, 0.1)" }
      : {};
  };

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
        headerCheckboxSelection: true,
        checkboxSelection: true,
        field: "checkbox",
        width: 50,
        headerName: "",
        suppressMenu: true,
        sortable: false,
        resizable: false,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
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
      // {
      //   field: "generated_application_id",
      //   headerName: "Application ID",
      //   width: 130,
      //   sortable: true,
      //   resizable: true,
      //   pinned: "left",
      //   lockPosition: "left",
      //   lockPinned: true,
      //   cellRenderer: LinkCellRenderer,
      // },
      {
        field: "partner_application_id",
        headerName: "Partner Application ID",
        width: 140,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
        cellRenderer: LinkCellRenderer,
      },
      {
        headerName: "",
        field: "menu",
        width: 50,
        lockPosition: "left",
        pinned: "left",
        cellRenderer: ReminderAllocationTableRowMenu,
        cellRendererParams: (params) => ({
          data: params.data,
        }),
        lockPinned: true,
      },
      {
        field: "latest_pic",
        headerName: "Latest Allocated PIC",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "latest_follow_up_result",
        headerName: "Latest Follow Up Result",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "latest_promised_date",
        headerName: "Latest Promised Date",
        width: 150,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
      },
      {
        field: "ihco_name",
        headerName: "PIC",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "customer_name",
        headerName: "Applicant Name",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "nrc_or_csc",
        headerName: "Applicant NRC",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "application.date_of_birth",
        headerName: "Date of Birth",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        width: 130,
        sortable: true,
        resizable: true,
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
        field: "application.application_info.mnet_customer_category",
        headerName: "Customer Category",
        width: 100,
        resizable: true,
      },
      {
        field: "customer_id",
        headerName: "Customer ID",
        width: 100,
        resizable: true,
      },
      {
        field: "loan_amount",
        headerName: "Loan Amount",
        width: 100,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "address_township.name",
        headerName: "MMF Township",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "application.application_info.mnet_township",
        headerName: "Partner Township(Current)",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "application.address_state.name",
        headerName: "Region",
        width: 100,
        sortable: true,
        resizable: true,
      },
      {
        field: "disbursement_date",
        headerName: "Disbursed Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "first_due_date",
        headerName: "First Payment Due Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        width: 130,
        sortable: true,
        resizable: true,
      },
      {
        field: "due_date",
        headerName: "Due Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        width: 130,
        sortable: true,
        resizable: true,
      },
      {
        field: "finance_term",
        headerName: "Finance Term",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "tenor",
        headerName: "Tenor",
        width: 80,
        sortable: true,
        resizable: true,
      },
      {
        field: "monthly_installment_amount",
        headerName: "Monthly Installment",
        width: 150,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "total_outstanding_amount",
        headerName: "Total Outstanding Amount",
        width: 150,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "collection_fees",
        headerName: "Collection Fees",
        width: 150,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "collected_collection_fees",
        headerName: "Collected Collection Fees",
        width: 150,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "last_payment_day",
        headerName: "Last Payment Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "last_payment_amount",
        headerName: "Last Payment Amount",
        width: 150,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "due_amount",
        headerName: "Due Amount",
        width: 150,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "overdue_amount",
        headerName: "Overdue Amount",
        width: 150,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "overdue_days",
        headerName: "Overdue Day",
        width: 80,
        sortable: true,
        resizable: true,
      },
      {
        field: "contract_status",
        headerName: "Contract Status",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "overdue_status",
        headerName: "Overdue Status",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "application.occupation",
        headerName: "Customer Occupation",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "living_phone_number",
        headerName: "Primary Ph(Customer)",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "viber_number",
        headerName: "Viber Ph(Customer)",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "application.address_full_address",
        headerName: "Customer Address",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "application.residence_status",
        headerName: "Residence Status",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "reference_name",
        headerName: "Reference Name",
        width: 150,
        sortable: true,
        resizable: true,
        autoHeight: true,
        cellRenderer: ChipRenderer,
      },
      {
        field: "reference_relation_with_customer",
        headerName: "Relation with Customer(Reference)",
        width: 150,
        sortable: true,
        resizable: true,
        autoHeight: true,
        cellRenderer: ChipRenderer,
      },
      {
        field: "reference_phone",
        headerName: "Reference Phone",
        width: 150,
        sortable: true,
        resizable: true,
        autoHeight: true,
        cellRenderer: ChipRenderer,
      },
      {
        field: "guarantor_name",
        headerName: "Guarantor Name",
        width: 150,
        sortable: true,
        resizable: true,
        autoHeight: true,
        cellRenderer: ChipRenderer,
      },
      {
        field: "guarantor_relation_with_customer",
        headerName: "Relation with Customer(Guarantor)",
        width: 150,
        sortable: true,
        resizable: true,
        autoHeight: true,
        cellRenderer: ChipRenderer,
      },
      {
        field: "guarantor_primary_ph",
        headerName: "Guarantor Primary Ph",
        width: 150,
        sortable: true,
        resizable: true,
        autoHeight: true,
        cellRenderer: ChipRenderer,
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

  const handleBodyScroll = useCallback(async () => {
    if (next_page_param) {
      dispatch(
        getContractsForReminderAllocation({
          params: next_page_param,
          firstFetch: false,
        })
      );
    }
  }, [dispatch, next_page_param]);

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
      getContractsForReminderAllocation({
        params: {
          ...contractsParam,
          ...transformedSearchData,
        },
      })
    );

    dispatch(
      getReminderAllocationCounts({
        params: {
          is_count: 1,
          due_month: transformedSearchData?.due_month
            ? transformedSearchData?.due_month
            : searchValueDate.format("YYYY-MM"),
        },
      })
    );
  };

  const handleSelectionChanged = useCallback(
    (rows) => {
      setSelectedRows(rows);
    },
    [selectedRows]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" className="margin-top-8">
        <Typography color="text.primary">Collection Module</Typography>
        <Typography color="text.primary">Reminder Allocation</Typography>
      </Breadcrumbs>
      <Grid container spacing={1} sx={{ paddingBottom: "15px" }}>
        <Grid
          item
          xs={8}
          sm={8}
          md={8}
          lg={8}
          sx={{ borderBottom: "1px solid rgb(167, 173, 182)" }}
        >
          <AdvancedSearch
            options={REMINDER_ALLOCATION_SEARCH_OPTIONS}
            status={CONTRACT_STATUS}
            searchValueDate={searchValueDate}
            onSearch={handleSearch}
            mode={mode}
          />
        </Grid>
        <Grid
          item
          xs={1}
          sm={1}
          md={1}
          lg={1}
          sx={{ borderBottom: "1px solid rgb(167, 173, 182)" }}
        ></Grid>
        <Grid
          item
          xs={3}
          sm={3}
          md={3}
          lg={3}
          sx={{ borderBottom: "1px solid rgb(167, 173, 182)" }}
        >
          <Grid container direction="column">
            <Grid container alignItems="center">
              <Grid item xs={8} sm={8} md={8} lg={8}>
                <p style={{ fontWeight: "bold", margin: 0 }}>
                  Reminder Eligible Accounts
                </p>
              </Grid>
              <Grid item xs={1} sm={1} md={1} lg={1}>
                <p style={{ fontWeight: "bold", margin: 0 }}>:</p>
              </Grid>
              <Grid item xs={3} sm={3} md={3} lg={3}>
                <p style={{ fontWeight: "bold", margin: 0 }}>
                  {reminderAllocationCounts?.total_eligible_contracts}
                </p>
              </Grid>
            </Grid>
            <Grid container alignItems="center">
              <Grid item xs={8} sm={8} md={8} lg={8}>
                <p style={{ fontWeight: "bold", margin: 0 }}>
                  Total WriteOff Accounts
                </p>
              </Grid>
              <Grid item xs={1} sm={1} md={1} lg={1}>
                <p style={{ fontWeight: "bold", margin: 0 }}>:</p>
              </Grid>
              <Grid item xs={3} sm={3} md={3} lg={3}>
                <p style={{ fontWeight: "bold", margin: 0 }}>
                  {reminderAllocationCounts?.total_write_off_contracts}
                </p>
              </Grid>
            </Grid>
            <Grid container alignItems="center">
              <Grid item xs={8} sm={8} md={8} lg={8}>
                <p style={{ fontWeight: "bold", margin: 0 }}>
                  Assigned WriteOff Accounts
                </p>
              </Grid>
              <Grid item xs={1} sm={1} md={1} lg={1}>
                <p style={{ fontWeight: "bold", margin: 0 }}>:</p>
              </Grid>
              <Grid item xs={3} sm={3} md={3} lg={3}>
                <p style={{ fontWeight: "bold", margin: 0 }}>
                  {reminderAllocationCounts?.assigned_write_off_contracts}
                </p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <ReminderAllocationAppBar
        contractIds={contractsReminderAllocation.map(
          (contract) => contract?.id
        )}
        selectedRows={selectedRows}
        fetchApi={fetchApi}
        searchValueDate={searchValueDate}
        transformedSearchDataResponse={transformedSearchDataResponse}
      />
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="ReminderAllocationList"
          rowKey="id"
          agThemeStyle={{
            height: "calc(100vh - 210px)",
          }}
          onScrollBottomEnd={handleBodyScroll}
          loading={isLoading}
          onSelectionChanged={handleSelectionChanged}
          rowSelection={"multiple"}
          rowMultiSelectWithClickFlag={"true"}
          ChipRenderer={ChipRenderer}
          getRowStyle={getRowStyle}
        />
      </Paper>
    </Box>
  );
};

export default React.memo(ReminderAllocationTable);
