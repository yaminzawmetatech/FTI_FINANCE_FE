import React, { useEffect, useState } from "react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Table from "components/Table";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { Breadcrumbs, Typography, Box, Paper } from "@mui/material";
import AdvancedSearch from "components/form/AdvancedSearch";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import { getWriteOffs } from "features/writeOff/writeOffSlice";
import { getAllWriteOffRecoveryIncomes } from "features/writeOffRecoveryIncome/writeOffRecoveryIncomeSlice";
import { WRITE_OFF_RECOVERY_SEARCH_OPTIONS } from "constants/searchOptions/writeOffRecoverySearchOptions";
import ExcelExportButton from "./WriteOffRepaymentExcelExportButton";

const WriteOffListTable = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();

  const [transformedSearchDataResponse, setTransformedSearchDataResponse] =
    useState();

  const { writeOffRecoveryIncomes, next_page_param, isLoading } = useSelector(
    (state) => state.writeOffRecoveryIncomes
  );

  const STATUS = [
    { id: "Write Off Fully Paid", name: "Write Off Fully Paid" },
    { id: "Recovery Fully Paid", name: "Recovery Fully Paid" },
  ];

  useEffect(() => {
    dispatch(
      getAllWriteOffRecoveryIncomes({
        firstFetch: true,
      })
    );
  }, [dispatch]);

  const defaultColDef = useMemo(
    () => ({
      valueSetter: (params) => {},
    }),
    []
  );

  const [selectedRows, setSelectedRows] = useState([]);

  // link to contract
  const LinkCellRenderer = ({ value, data }) => {
    const uuid = data?.uuid;
    const url = `/write-off-repayment-detail/${uuid}/view`;
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
      {
        field: "contract.generated_application_id",
        headerName: "Application ID",
        width: 130,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
        cellRenderer: LinkCellRenderer,
      },
      {
        headerName: "Partner ID",
        field: "partner_id",
        width: 130,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
        sortable: true,
        resizable: true,
        valueGetter: (params) =>
          params.data.contract?.mnet_application_id ||
          params.data.contract?.customer_loan_id ||
          params.data.contract?.kpay_id ||
          "",
      },
      {
        field: "contract.customer_name",
        headerName: "Applicant Name",
        width: 150,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "contract.nrc_or_csc",
        headerName: "NRC",
        width: 150,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "contract.recovery_status",
        headerName: "Status",
        width: 100,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "contract.disbursement_date",
        headerName: "Disbursed Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        width: 100,
        sortable: true,
        resizable: true,
      },
      {
        field: "write_off_date",
        headerName: "Write Off Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        width: 100,
        sortable: true,
        resizable: true,
      },
      {
        field: "total_write_off_amount",
        headerName: "Total Write Off Amount",
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
        field: "paid_amount",
        headerName: "Total Paid Amount",
        width: 150,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "paid_date",
        headerName: "Last Paid Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        width: 100,
        sortable: true,
        resizable: true,
      },
      {
        field: "remaining_write_off_amount",
        headerName: "Remaining Write Off Amount",
        width: 150,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "remaining_outstanding_amount",
        headerName: "Remaining Outstanding Amount",
        width: 150,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "area",
        headerName: "Area",
        width: 100,
        resizable: true,
        valueGetter: (params) => {
          const address = params.data?.contract?.address_township?.name;
          return address || "";
        },
      },
      {
        field: "pic",
        headerName: "PIC",
        width: 150,
        resizable: true,
        valueGetter: (params) => {
          const ihcoUserName = params.data?.contract?.ihco_name;
          return ihcoUserName || "";
        },
      },
      {
        field: "contract.category.name",
        headerName: "Category",
        width: 100,
        resizable: true,
      },
      {
        field: "contract.sub_category.name",
        headerName: "Sub Category",
        width: 150,
        resizable: true,
      },
    ],
    []
  );

  const handleBodyScroll = useCallback(async () => {
    if (next_page_param) {
      dispatch(
        getAllWriteOffRecoveryIncomes({
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
      } else if (item.filtered_by === "contract_ids") {
        const tempData = item.value1.split(",");
        transformedSearchData[item.filtered_by] = JSON.stringify(tempData);
      } else {
        transformedSearchData[item.filtered_by] = item.value1;
      }
    });

    setTransformedSearchDataResponse(transformedSearchData);

    dispatch(
      getAllWriteOffRecoveryIncomes({
        params: {
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

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" className="margin-top-8">
        <Typography color="text.primary">Collection Module</Typography>
        <Typography color="text.primary">Write Off Repayment List</Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={WRITE_OFF_RECOVERY_SEARCH_OPTIONS}
        status={STATUS}
        onSearch={handleSearch}
      />
      <ExcelExportButton
        transformedSearchDataResponse={transformedSearchDataResponse}
      />
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={writeOffRecoveryIncomes ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="PaymentAfterWOTable"
          rowKey="contract_id"
          agThemeStyle={{
            height: "calc(100vh - 210px)",
          }}
          onScrollBottomEnd={handleBodyScroll}
          loading={isLoading}
          onSelectionChanged={handleSelectionChanged}
          rowSelection={"multiple"}
          rowMultiSelectWithClickFlag={"true"}
        />
      </Paper>
    </Box>
  );
};

export default React.memo(WriteOffListTable);
