import React, { useEffect } from "react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Table from "components/Table";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import Tooltip from "@mui/material/Tooltip";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import RepaymentAppBar from "./RepaymentAppBar";
import { getRepayments } from "modules/collection/slices/repaymentSlice";
import RepaymentTableRowMenu from "./RepaymentTableRowMenu";
import AdvancedSearch from "components/form/AdvancedSearch";
import { REPAYMENT_SEARCH_OPTIONS } from "constants/searchOptions/repaymentSearchOptions";
import { REPAYMENT_STATUS } from "constants/repaymentStatus";
import { Breadcrumbs, Typography, Box, Paper } from "@mui/material";

const RepaymentListTable = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();

  const { repayments, next_page_param, isLoading } = useSelector(
    (state) => state.repayments
  );

  const rowData = repayments || [];

  useEffect(() => {
    dispatch(
      getRepayments({
        firstFetch: true,
        params: {
          is_api: 0,
        }
      })
    );
  }, [dispatch]);

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_param) {
        dispatch(
          getRepayments({
            firstFetch: false,
            params: {
              ...next_page_param,
              is_api: 0,
            }
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

  const buttonRenderer = (params) => {
    const rowData = params.data;
    return (
      <Tooltip title="View Contract" placement="top-start">
        <VisibilityOutlinedIcon
          //onClick={() => handleButtonClick(rowData)}
          style={{ cursor: "pointer", color: "gray" }}
        />
      </Tooltip>
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
        field: "status",
        headerName: "Status",
        width: 200,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
        valueFormatter: (params) => params.value && params.value.toUpperCase(),
      },

      {
        field: "current_step",
        headerName: "Current Step",
        width: 200,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
        valueFormatter: (params) => params.value && params.value.toUpperCase(),
      },
      {
        field: "description",
        headerName: "Description",
        width: 200,
        sortable: true,
        resizable: true,
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
        cellRenderer: RepaymentTableRowMenu,
        cellRendererParams: {
          selectedData: (data) => {},
        },
        lockPinned: true,
      },
      {
        field: "posting_date",
        headerName: "Posting Date",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "account_code.name",
        headerName: "Bank Account Code",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "category.name",
        headerName: "Category",
        width: 100,
        resizable: true,
      },
      {
        field: "created_at",
        headerName: "Created At",
        width: 200,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
      },
      {
        field: "created_user.user_name",
        headerName: "Created By",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "updated_at",
        headerName: "Modified At",
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
        sortable: true,
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
      getRepayments({
        params: {
          ...transformedSearchData,
          is_api: 0,
        },
      })
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" className="margin-top-8">
        <Typography color="text.primary">Collection Module</Typography>
        <Typography color="text.primary">Repayment List</Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={REPAYMENT_SEARCH_OPTIONS}
        status={REPAYMENT_STATUS}
        onSearch={handleSearch}
      />
      <RepaymentAppBar />
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={rowData ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="Repayment List"
          rowKey="id"
          agThemeStyle={{
            height: "calc(100vh - 190px)",
          }}
          onScrollBottomEnd={handleBodyScroll}
          loading={isLoading}
          buttonRenderer={buttonRenderer}
        />
      </Paper>
    </Box>
  );
};

export default React.memo(RepaymentListTable);
