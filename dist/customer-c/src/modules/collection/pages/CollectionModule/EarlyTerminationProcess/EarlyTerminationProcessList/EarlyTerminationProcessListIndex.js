import React, { useEffect } from "react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Table from "components/Table";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import EarlyTerminationProcessListAppBar from "./EarlyTerminationProcessListAppBar";
import EarlyTerminationTableRowMenu from "./EarlyTerminationTableRowMenu";
import { getAllEarlyTerminationProcesses } from "modules/collection/slices/earlyTerminationProcessSlice";
import AdvancedSearch from "components/form/AdvancedSearch";
import { Breadcrumbs, Typography, Box, Paper } from "@mui/material";
import { EARLY_TERMINATION_PROCESS_SEARCH_OPTIONS } from "constants/searchOptions/earlyTerminationProcessSearchOptions";
import { EARLY_TERMINATION_STATUS } from "constants/earlyTerminationStatus";

const EarlyTerminationProcessListIndex = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();

  const { earlyTerminationProcesses, next_page_param,  isLoading } = useSelector(
    (state) => state.earlyTerminationProcesses
  );

  useEffect(() => {
    dispatch(
      getAllEarlyTerminationProcesses({
        firstFetch: true,
      })
    );
  }, [dispatch]);

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_param) {
        dispatch(
          getAllEarlyTerminationProcesses({
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
        field: "contract.generated_application_id",
        headerName: "Application ID",
        width: 120,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "customer_inform_date",
        headerName: "Customer Inform Date",
        width: 120,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
        params.value && dayjs(params.value).format("YYYY-MM-DD"),
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "promise_date",
        headerName: "Promise Date",
        width: 120,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
        params.value && dayjs(params.value).format("YYYY-MM-DD"),
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "due_date",
        headerName: "Due Date",
        width: 120,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
        params.value && dayjs(params.value).format("YYYY-MM-DD"),
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        headerName: "",
        field: "menu",
        width: 50,
        lockPosition: "left",
        pinned: "left",
        cellRenderer: EarlyTerminationTableRowMenu,
        cellRendererParams: {
          selectedData: (data) => {},
        },
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "current_step",
        headerName: "Current Step",
        width: 130,
        sortable: true,
        resizable: true,
      },
      {
        field: "et_type",
        headerName: "ET Type",
        width: 130,
        sortable: true,
        resizable: true,
      },
      {
        field: "status",
        headerName: "ET Status",
        width: 130,
        sortable: true,
        resizable: true,
      },
      {
        field: "contract.category.name",
        headerName: "Category",
        width: 130,
        sortable: true,
        resizable: true,
      },
      {
        field: "contract.sub_category.name",
        headerName: "Sub Category",
        width: 130,
        sortable: true,
        resizable: true,
      },
      // {
      //   field: "updated_balance",
      //   headerName: "Updated Balance",
      //   width: 100,
      //   sortable: true,
      //   resizable: true,
      // },
      // {
      //   field: "finance_amount",
      //   headerName: "Finance Amount",
      //   width: 100,
      //   sortable: true,
      //   resizable: true,
      // },
      // {
      //   field: "minimum_principal",
      //   headerName: "Minimum Principal",
      //   width: 100,
      //   sortable: true,
      //   resizable: true,
      // },
      // {
      //   field: "received_amount",
      //   headerName: "Received Amount",
      //   width: 100,
      //   sortable: true,
      //   resizable: true,
      // },
      {
        field: "et_percent",
        headerName: "Fees %",
        width: 100,
        sortable: true,
        resizable: true,
      },
      {
        field: "et_value",
        headerName: "ET Fees Amount",
        width: 100,
        sortable: true,
        resizable: true,
      },
      {
        field: "user_group_approval",
        headerName: "User Group Approval",
        width: 100,
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
      getAllEarlyTerminationProcesses({
        params: {
          ...transformedSearchData,
        },
      })
    );
  };


  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" className="margin-top-8">
        <Typography color="text.primary">Collection Module</Typography>
        <Typography color="text.primary">Early Termination Process</Typography>
      </Breadcrumbs>
     <AdvancedSearch
        options={EARLY_TERMINATION_PROCESS_SEARCH_OPTIONS}
        onSearch={handleSearch}
        status={EARLY_TERMINATION_STATUS}
      />
      <EarlyTerminationProcessListAppBar />
      <Paper sx={{ width: "100%" }}>
      <Table
        searchParams={params}
        setSearchParams={setParams}
        rowData={earlyTerminationProcesses ?? []}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        name="EarlyTerminationProcessList"
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

export default React.memo(EarlyTerminationProcessListIndex);
