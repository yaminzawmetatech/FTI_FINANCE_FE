import React, { useEffect, useState } from "react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Table from "components/Table";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import AllocatedreminderTableRowMenu from "./AllocatedReminderTableRowMenu";
import AllocatedReminderAppBar from "./AllocatedReminderAppBar";
import { Breadcrumbs, Typography, Box, Paper, Chip, Grid } from "@mui/material";
import AdvancedSearch from "components/form/AdvancedSearch";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import {
  getAllocatedReminderCounts,
  getReminderAllocations,
} from "features/reminderAllocation/reminderAllocationSlice";
import { getAllocateActivities } from "features/AllocateActivities/allocateActivitiesSlice";
import { getUsers } from "features/users/usersSlice";
import { getFollowUpResults } from "features/FollowUpResult/followUpResultSlice";
import { ALLOCATED_REMINDER_SEARCH_OPTIONS } from "constants/searchOptions/allocatedReminderSearchOptions";

const ReminderAllocationTable = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();
  const [selectedRows, setSelectedRows] = useState([]);
  const mode = "divide_mode";

  const CONTRACT_STATUS = [
    {id: "Normal", name: "Normal"},
    {id: "Overdue", name: "Overdue"},
    {id: "Write Off", name: "Write Off"},
  ];

  const [transformedSearchDataResponse, setTransformedSearchDataResponse] =
    useState();

  const { reminderAllocations, next_page_param, isLoading } = useSelector(
    (state) => state.reminderAllocations
  );

  const { allocatedReminderCounts } = useSelector(
    (state) => state.allocatedReminderCounts
  );

  const reminderParam = {
    reminder_status: ["success", "pending"],
  };

  const searchValueDate = dayjs(Date.now());
  const todayDate = dayjs(Date.now());

  const fetchApi = useCallback(() => {
    dispatch(
      getReminderAllocations({
        firstFetch: true,
        params: {
          ...reminderParam,
          is_terminated_assign: 0,
          due_month: searchValueDate ? searchValueDate.format("YYYY-MM") : "",
        },
      })
    );
    dispatch(
      getAllocatedReminderCounts({
        params: {
          ...reminderParam,
        },
      })
    );
    dispatch(getAllocateActivities());
    dispatch(getUsers());
    dispatch(getFollowUpResults());
  }, [dispatch]);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  const defaultColDef = useMemo(
    () => ({
      valueSetter: (params) => {},
    }),
    []
  );

  // to show data in chips
  const ChipRenderer = (props) => {
    const guarantor_reference_arr =
      props?.data?.contract?.application?.application_guarantors;

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
    const contractStatus = params?.data?.contract?.contract_status;
    return contractStatus === "Write Off" ? {background: "rgba(255, 0, 0, 0.1)"} : { };
  };

  const isRowSelectable = (rowNode) => {
    return rowNode?.data?.is_terminated_assign === 0 ? true : false;
  };

  // link to contract
  const LinkCellRenderer = ({ value, data }) => {
    const uuid = data?.contract?.uuid;
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
        width: 30,
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
        width: 40,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "pic.user_name",
        headerName: "Allocated PIC",
        width: 100,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "allocate_activity.name",
        headerName: "Allocated Activity",
        width: 100,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "assigned_date",
        headerName: "Assigned Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        width: 100,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "latest_promised_date",
        headerName: "Promise Date",
        width: 100,
        sortable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      // {
      //   field: "contract.generated_application_id",
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
        field: "contract.partner_application_id",
        headerName: "Partner Application ID",
        width: 80,
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
        cellRenderer: AllocatedreminderTableRowMenu,
        cellRendererParams: (params) => ({
          data: params.data,
          transformedSearchDataResponse,
          searchValueDate,
        }),
        lockPinned: true,
      },
      {
        field: "remark",
        headerName: "Remark(Reminder Allocation)",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "latest_contact_date",
        headerName: "Contact Date",
        width: 180,
        sortable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
        resizable: true,
      },
      {
        field: "latest_follow_up_result",
        headerName: "Follow Up Result",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "latest_remark",
        headerName: "Remark(Collection Response)",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "contract.customer_name",
        headerName: "Applicant Name",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "contract.due_date",
        headerName: "Due Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        width: 100,
        sortable: true,
        resizable: true,
      },
      {
        field: "contract.finance_term",
        headerName: "Finance Term",
        width: 120,
        sortable: true,
        resizable: true,
      },
      {
        field: "contract.tenor",
        headerName: "Tenor",
        width: 70,
        sortable: true,
        resizable: true,
      },
      {
        field: "contract.monthly_installment_amount",
        headerName: "Monthly Installment",
        width: 130,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "contract.total_outstanding_amount",
        headerName: "Total Outstanding Amount",
        width: 150,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "contract.collection_fees",
        headerName: "Collection Fees",
        width: 130,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "contract.collected_collection_fees",
        headerName: "Collected Collection Fees",
        width: 150,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "contract.last_payment_day",
        headerName: "Last Payment Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "contract.last_payment_amount",
        headerName: "Last Payment Amount",
        width: 150,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "contract.due_amount",
        headerName: "Due Amount",
        width: 150,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "contract.overdue_amount",
        headerName: "Overdue Amount",
        width: 150,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "contract.overdue_days",
        headerName: "Overdue Days",
        width: 120,
        sortable: true,
        resizable: true,
      },
      {
        field: "contract.contract_status",
        headerName: "Contract Status",
        width: 100,
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
        field: "contract.application.occupation",
        headerName: "Customer Occupation",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "contract.living_phone_number",
        headerName: "Primary Ph(Customer)",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "contract.viber_number",
        headerName: "Viber Ph(Customer)",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "contract.application.address_full_address",
        headerName: "Customer Address",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "contract.application.residence_status",
        headerName: "Residence Status",
        width: 120,
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
        field: "contract.nrc_or_csc",
        headerName: "Applicant NRC",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "contract.application.date_of_birth",
        headerName: "Date of Birth",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        width: 100,
        sortable: true,
        resizable: true,
      },
      {
        field: "contract.ihco_name",
        headerName: "PIC",
        width: 120,
        sortable: true,
        resizable: true,
      },
      {
        field: "contract.category.name",
        headerName: "Category",
        width: 100,
        sortable: true,
        resizable: true,
      },
      {
        field: "contract.sub_category.name",
        headerName: "Sub Category",
        width: 100,
        sortable: true,
        resizable: true,
      },
      {
        field: "contract.application.application_info.mnet_customer_category",
        headerName: "Customer Category",
        width: 100,
        resizable: true,
      },
      {
        field: "contract.loan_amount",
        headerName: "Loan Amount",
        width: 120,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "contract.application.application_info.mnet_township", // or address township
        headerName: "Partner Township(Current)",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "contract.application.address_state.name",
        headerName: "Region",
        width: 100,
        sortable: true,
        resizable: true,
      },
      {
        field: "contract.disbursement_date",
        headerName: "Disbursed Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
        width: 180,
        sortable: true,
        resizable: true,
      },
      {
        field: "contract.first_due_date",
        headerName: "First Payment Due Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        width: 180,
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
    [reminderAllocations]
  );

  const handleBodyScroll = useCallback(async () => {
    if (next_page_param) {
      dispatch(
        getReminderAllocations({
          params: next_page_param,
          firstFetch: false,
        })
      );
    }
  }, [dispatch, next_page_param]);

  const [autoSearchByClick, setAutoSearchByClick] = useState(null);

  const handleClick = (count_type) => {
    let handleClickParam = {};

    if (count_type === "promised_count") {
      handleClickParam = {
        assigned_date_from_date: todayDate.format("YYYY-MM-DD"),
        assigned_date_to_date: todayDate.format("YYYY-MM-DD"),
        promise: 1,
      };
      setAutoSearchByClick("promised_count");
    } else if (count_type === "with_response_count") {
      handleClickParam = {
        assigned_date_from_date: todayDate.format("YYYY-MM-DD"),
        assigned_date_to_date: todayDate.format("YYYY-MM-DD"),
        no_promise: 1,
      };
      setAutoSearchByClick("with_response_count");
    } else if (count_type === "without_response_count") {
      handleClickParam = {
        assigned_date_from_date: todayDate.format("YYYY-MM-DD"),
        assigned_date_to_date: todayDate.format("YYYY-MM-DD"),
        no_activities: 1,
      };
      setAutoSearchByClick("without_response_count");
    } else {
      handleClickParam = {
        assigned_date_from_date: todayDate.format("YYYY-MM-DD"),
        assigned_date_to_date: todayDate.format("YYYY-MM-DD"),
      };
      setAutoSearchByClick("total_allocated");
    }

    dispatch(
      getReminderAllocations({
        firstFetch: true,
        params: {
          ...reminderParam,
          ...handleClickParam,
          is_terminated_assign: 0,
          due_month: searchValueDate ? searchValueDate.format("YYYY-MM") : "",
        },
      })
    );
  };

  const handleSearch = (searchData) => {
    const transformedSearchData = {};

    searchData.forEach((item) => {
      if (item.type === "date") {
        transformedSearchData[`${item.filtered_by}_from_date`] = item.value1;
        transformedSearchData[`${item.filtered_by}_to_date`] = item.value2;
      } else if (item.type === "autocomplete_status") {
        transformedSearchData[item.filtered_by] = JSON.stringify(item.value1);
      } else if (item.type === "autocomplete_is_true") {
        transformedSearchData[item.filtered_by] = item.value1;
        transformedSearchData["assigned_date_from_date"] =
          todayDate.format("YYYY-MM-DD");
        transformedSearchData["assigned_date_to_date"] =
          todayDate.format("YYYY-MM-DD");
      } else {
        transformedSearchData[item.filtered_by] = item.value1;
      }
    });

    setTransformedSearchDataResponse(transformedSearchData);

    dispatch(
      getReminderAllocations({
        params: {
          ...reminderParam,
          is_terminated_assign: 0,
          ...transformedSearchData,
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

  // if (isLoading) {
  //   return (
  //     <Backdrop
  //       sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
  //       open={true}
  //     >
  //       <CircularProgress color="inherit" />
  //     </Backdrop>
  //   );
  // }

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" className="margin-top-8">
        <Typography color="text.primary">Collection Module</Typography>
        <Typography color="text.primary">Allocated Reminder</Typography>
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
            options={ALLOCATED_REMINDER_SEARCH_OPTIONS}
            status={CONTRACT_STATUS}
            onSearch={handleSearch}
            searchValueDate={searchValueDate}
            mode={mode}
            autoSearchByClick={autoSearchByClick}
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
              <Grid item xs={9} sm={9} md={9} lg={9}>
                <p style={{ fontWeight: "bold", margin: 0 }}>
                  Today Total Allocated Accounts
                </p>
              </Grid>
              <Grid item xs={1} sm={1} md={1} lg={1}>
                <p style={{ fontWeight: "bold", margin: 0 }}>:</p>
              </Grid>
              <Grid item xs={2} sm={2} md={2} lg={2}>
                <p
                  style={{
                    fontWeight: "bold",
                    margin: 0,
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                  onClick={() => handleClick("total_allocated")}
                >
                  {allocatedReminderCounts?.total_reminder_count}
                </p>
              </Grid>
            </Grid>

            <Grid container alignItems="center">
              <Grid item xs={9} sm={9} md={9} lg={9}>
                <p style={{ fontWeight: "bold", margin: 0 }}>
                  Today Promised Date Accounts
                </p>
              </Grid>
              <Grid item xs={1} sm={1} md={1} lg={1}>
                <p style={{ fontWeight: "bold", margin: 0 }}>:</p>
              </Grid>
              <Grid item xs={2} sm={2} md={2} lg={2}>
                <p
                  style={{
                    fontWeight: "bold",
                    margin: 0,
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                  onClick={() => handleClick("promised_count")}
                >
                  {allocatedReminderCounts?.promised_count}
                </p>
              </Grid>
            </Grid>
            <Grid container alignItems="center">
              <Grid item xs={9} sm={9} md={9} lg={9}>
                <p style={{ fontWeight: "bold", margin: 0 }}>
                  Today No Promised Accounts
                </p>
              </Grid>
              <Grid item xs={1} sm={1} md={1} lg={1}>
                <p style={{ fontWeight: "bold", margin: 0 }}>:</p>
              </Grid>
              <Grid item xs={2} sm={2} md={2} lg={2}>
                <p
                  style={{
                    fontWeight: "bold",
                    margin: 0,
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                  onClick={() => handleClick("with_response_count")}
                >
                  {allocatedReminderCounts?.with_response_count}
                </p>
              </Grid>
            </Grid>
            <Grid container alignItems="center">
              <Grid item xs={9} sm={9} md={9} lg={9}>
                <p style={{ fontWeight: "bold", margin: 0 }}>
                  Today No Activities Accounts
                </p>
              </Grid>
              <Grid item xs={1} sm={1} md={1} lg={1}>
                <p style={{ fontWeight: "bold", margin: 0 }}>:</p>
              </Grid>
              <Grid item xs={2} sm={2} md={2} lg={2}>
                <p
                  style={{
                    fontWeight: "bold",
                    margin: 0,
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                  onClick={() => handleClick("without_response_count")}
                >
                  {allocatedReminderCounts?.without_response_count}
                </p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <AllocatedReminderAppBar
        reminderAllocationIds={reminderAllocations.map(
          (reminderAllocation) => reminderAllocation?.id
        )}
        selectedRows={selectedRows}
        fetchApi={fetchApi}
        transformedSearchDataResponse={transformedSearchDataResponse}
      />
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={reminderAllocations ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="AlloatedReminderListTableIndexs"
          rowKey="id"
          agThemeStyle={{
            height: "calc(100vh - 210px)",
          }}
          onScrollBottomEnd={handleBodyScroll}
          loading={isLoading}
          onSelectionChanged={handleSelectionChanged}
          rowSelection="multiple"
          rowMultiSelectWithClickFlag={"true"}
          ChipRenderer={ChipRenderer}
          isRowSelectable={isRowSelectable}
          getRowStyle={getRowStyle}
        />
      </Paper>
    </Box>
  );
};

export default React.memo(ReminderAllocationTable);
