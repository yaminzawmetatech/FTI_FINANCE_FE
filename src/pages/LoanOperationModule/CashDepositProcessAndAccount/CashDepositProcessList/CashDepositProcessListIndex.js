import React, { useEffect } from "react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Table from "components/Table";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import CashDepositAppBar from "./CashDepositAppBar";
import CashDepositTableRowMenu from "./CashDepositTableRowMenu";
import Tooltip from "@mui/material/Tooltip";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import {
  changeStatusCashDepositByTable,
  getAllCashDeposits,
} from "features/cashDepositProcess/cashDepositSlice";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { Breadcrumbs, Typography, Box, Paper } from "@mui/material";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import AdvancedSearch from "components/form/AdvancedSearch";
import { CASH_DEPOSIT_OPTIONS } from "constants/searchOptions/cashDepositOptions";
import { CASH_DEPOSIT_STATUS } from "constants/cashDepositStatus";

const CashDepositProcessTable = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();

  const { cashDeposits, next_page_param, isError, isLoading } = useSelector(
    (state) => state.cashDeposits
  );

  useEffect(() => {
    dispatch(
      getAllCashDeposits({
        firstFetch: true,
      })
    );
  }, [dispatch]);

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_param) {
        dispatch(
          getAllCashDeposits({
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

  const buttonRenderer = (params) => {
    const rowData = params.data;
    return (
      rowData &&
      rowData.status !== "Approved" &&
      rowData.status !== "Rejected" && (
        <Tooltip title="Request For Approval" placement="top-start">
          <MarkEmailReadIcon
            onClick={() => handleRequestBtnClick(rowData)}
            style={{ cursor: "pointer", color: "gray" }}
          />
        </Tooltip>
      )
    );
  };

  const handleRequestBtnClick = useCallback(
    async (rowData) => {
      try {
        const responseData = await dispatch(
          changeStatusCashDepositByTable({
            status: "Request For Approval",
            uuid: rowData?.uuid,
            id: rowData?.id,
          })
        );

        if (responseData.payload.success === true) {
          showSuccessToast(CommonMessage.MFS00006);
          await dispatch(
            dispatch(
              getAllCashDeposits({
                firstFetch: true,
              })
            )
          );
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [dispatch, cashDeposits]
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
        field: "category_name",
        headerName: "Category",
        width: 100,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "status",
        headerName: "Status",
        width: 100,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        headerName: "Actions",
        field: "actions",
        width: 100,
        sortable: false,
        resizable: true,
        cellRenderer: buttonRenderer,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        headerName: "",
        field: "menu",
        width: 50,
        cellRenderer: CashDepositTableRowMenu,
        cellRendererParams: {
          selectedData: (data) => {},
        },
        lockPinned: true,
        lockPosition: "left",
        pinned: "left",
      },
      {
        field: "deposit_amount",
        headerName: "Deposit Amount",
        width: 150,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "balance",
        headerName: "Balance",
        width: 150,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "updated_balance",
        headerName: "Updated Balance",
        width: 150,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "account_code_name",
        headerName: "Account Code",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "posted_date",
        headerName: "Posted Date",
        width: 200,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
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
        field: "created_by",
        headerName: "Created By",
        width: 200,
        resizable: true,
      },
      {
        field: "approved_date",
        headerName: "Approved Date",
        width: 200,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
      },
      {
        field: "approved_by",
        headerName: "Approved By",
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
      getAllCashDeposits({
        params: {
          ...transformedSearchData,
        },
      })
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" className="margin-top-8">
        <Typography color="text.primary">Loan Operation</Typography>
        <Typography color="text.primary">Cash Deposit Process</Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={CASH_DEPOSIT_OPTIONS}
        status={CASH_DEPOSIT_STATUS}
        onSearch={handleSearch}
      />
      <CashDepositAppBar />
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={cashDeposits ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="CashDepositProcess"
          rowKey="id"
          agThemeStyle={{
            height: "calc(100vh - 210px)",
          }}
          onScrollBottomEnd={handleBodyScroll}
          loading={isLoading}
          buttonRenderer={buttonRenderer}
        />
      </Paper>
    </Box>
  );
};

export default React.memo(CashDepositProcessTable);
