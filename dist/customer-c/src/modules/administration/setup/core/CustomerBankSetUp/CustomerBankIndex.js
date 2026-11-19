import * as React from "react";
import { Box, Paper, Breadcrumbs, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo, useEffect } from "react";
import AdvancedSearch from "components/form/AdvancedSearch";
import Table from "components/Table";
import { useSearchParams } from "react-router-dom";
import { getCustomerBanks } from "modules/administration/slices/customerBankSlice";
import CustomerBankTableRowMenu from "./CustomerBankTableRowMenu";
import CustomerBankAppBar from "./CustomerBankAppBar";

import dayjs from "dayjs";
import { YesNoRenderer } from "common/YesNoRenderer";
import { CUSTOMER_BANK_SEARCH_OPTIONS } from "constants/searchOptions/customerBankSearchOptions";

const CustomerBankIndex = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();

  const { customerBanks, isLoading, next_page_param } = useSelector(
    (state) => state.customerBanks
  );

  const columnDefs = useMemo(
    () => [
      {
        headerName: "No.",
        width: 60,
        valueGetter: "node.rowIndex + 1",
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "code",
        headerName: "Code",
        width: 200,
        pinned: "left",
        sortable: true,
        resizable: true,
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "name",
        headerName: "Name",
        width: 200,
        pinned: "left",
        resizable: true,
        lockPosition: "left",
        lockPinned: true,
      },
      {
        headerName: "",
        field: "menu",
        width: 50,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
        cellRenderer: CustomerBankTableRowMenu,
      },
      {
        field: "created_at",
        headerName: "Created Date",
        width: 200,
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
        field: "last_modified",
        headerName: "Modified Date",
        width: 200,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
        resizable: true,
      },
      {
        field: "modified_by",
        headerName: "Modified By",
        width: 200,
        resizable: true,
      },
    ],
    []
  );

  useEffect(() => {
    fetchCustomerBanks();
  }, []);

  const fetchCustomerBanks = useCallback(() => {
    dispatch(
      getCustomerBanks({
        firstFetch: true,
      })
    );
  }, [dispatch]);

  const handleScrollBottomEnd = useCallback(() => {
    if (next_page_param) {
      dispatch(
        getCustomerBanks({
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

    dispatch(
      getCustomerBanks({
        params: {
          ...transformedSearchData,
        },
      })
    );
  };

  const getRowStyle = (params) => {
    return params?.data?.in_active === 0
      ? { background: "rgba(128, 128, 128, 0.1)" }
      : {};
  };

  const defaultColDef = useMemo(() => ({}), []);

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1, mt: 1 }}>
        <Typography color="text.primary">Administration</Typography>
        <Typography color="text.primary">Customer Bank List</Typography>
      </Breadcrumbs>

      <AdvancedSearch
        options={CUSTOMER_BANK_SEARCH_OPTIONS}
        onSearch={handleSearch}
      />

      <CustomerBankAppBar ids={customerBanks?.map((item) => item.id)} />

      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={customerBanks ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="CustomerBankTable"
          rowKey="id"
          agThemeStyle={{
            height: "calc(100vh - 170px)",
          }}
          onScrollBottomEnd={handleScrollBottomEnd}
          loading={isLoading}
          getRowStyle={getRowStyle}
        />
      </Paper>
    </Box>
  );
};

export default CustomerBankIndex;
