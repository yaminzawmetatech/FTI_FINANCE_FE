import React, { useEffect, useState } from "react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Table from "components/Table";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { Breadcrumbs, Typography, Box, Paper } from "@mui/material";
import AdvancedSearch from "components/form/AdvancedSearch";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import WriteOffPreparationAppBar from "./WriteOffPreparationAppBar";
import { getWriteOffs } from "modules/collection/slices/writeOffSlice";
import { WRITE_OFF_PREPARE_SEARCH_OPTIONS } from "constants/searchOptions/writeOffPrepareSearchOptions";

const WriteOffPreparationTable = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();

  const { writeOffs, next_page_param, isLoading } = useSelector(
    (state) => state.writeOffs
  );

  useEffect(() => {
    dispatch(
      getWriteOffs({
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
      {
        field: "application_id",
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
        field: "partner_id",
        headerName: "Partner ID",
        width: 100,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "customer_name",
        headerName: "Customer Name",
        width: 150,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "overdue_status",
        headerName: "Overdue Status",
        width: 100,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "repayment_terms",
        headerName: "Repayment Terms",
        width: 100,
        sortable: true,
        resizable: true,
      },
      {
        field: "contract_date",
        headerName: "Disbursed Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
        width: 180,
        sortable: true,
        resizable: true,
      },
      {
        field: "due_date",
        headerName: "Due Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        width: 100,
        sortable: true,
        resizable: true,
      },
      {
        field: "days_late",
        headerName: "Days Late",
        width: 80,
        sortable: true,
        resizable: true,
      },
      {
        field: "last_paid_date",
        headerName: "Last Paid Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        width: 100,
        sortable: true,
        resizable: true,
      },
      {
        field: "area",
        headerName: "Area",
        width: 100,
        sortable: true,
        resizable: true,
      },
      {
        field: "pic",
        headerName: "PIC",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "loan_amount",
        headerName: "Loan Amount",
        width: 150,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "category_name",
        headerName: "Category",
        width: 100,
        resizable: true,
      },
      {
        field: "sub_category_name",
        headerName: "Sub Category",
        width: 150,
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
        field: "created_user",
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
        field: "modified_user",
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
        getWriteOffs({
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

    dispatch(
      getWriteOffs({
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
        <Typography color="text.primary">Write Off Preparation</Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={WRITE_OFF_PREPARE_SEARCH_OPTIONS}
        onSearch={handleSearch}
      />
      <WriteOffPreparationAppBar
        selectedRows={selectedRows}
        writeOffIds={writeOffs.map((writeoff) => writeoff.contract_id)}
      />
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={writeOffs ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="WriteOffPreparationListIndex"
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

export default React.memo(WriteOffPreparationTable);
