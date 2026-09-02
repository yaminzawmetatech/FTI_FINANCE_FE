import React, { useEffect, useMemo, useCallback } from "react";
import { Box, Paper, Breadcrumbs, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import Table from "components/Table";
import AdvancedSearch from "components/form/AdvancedSearch";
import { YesNoRenderer } from "common/YesNoRenderer";
import { DEALER_PACKAGE_SEARCH_OPTIONS } from "constants/searchOptions/dealerPackageSearchOptions";
import DealerPackageTableRowMenu from "./DealerPackageTableRowMenu";
import DealerPackageAppBar from "./DealerPackageAppBar";
import { getDealerPackages } from "features/dealerPackage/dealerPackageSlice";
import { getDealerByDealerType } from "features/dealer/dealerSlice";

const DealerPackageIndex = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();

  // Redux State
  const { dealerPackages, isLoading, next_page_param } = useSelector(
    (state) => state.dealerPackages || {}
  );

  // Column Definitions
  const columnDefs = useMemo(
    () => [
      {
        headerName: "No.",
        width: 50,
        valueGetter: "node.rowIndex + 1",
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "dealer.name",
        headerName: "Dealer Name",
        width: 100,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "grade",
        headerName: "Grade",
        width: 150,
        resizable: true,
      },
      {
        field: "fees",
        headerName: "Fees",
        width: 200,
        resizable: true,
      },
      {
        headerName: "",
        field: "menu",
        width: 50,
        cellRenderer: DealerPackageTableRowMenu,
        cellRendererParams: {},
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
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
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
        resizable: true,
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

  // Fetch Dealers by Type
  useEffect(() => {
    dispatch(getDealerByDealerType(["School","Travel"]));
  }, [dispatch]);

  // Fetch Dealer Packages
  const fetchApi = useCallback(() => {
    dispatch(
      getDealerPackages({
        firstFetch: true,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  // Handle Scroll for Pagination
  const handleBodyScroll = useCallback(() => {
    if (next_page_param) {
      dispatch(
        getDealerPackages({
          params: next_page_param,
          firstFetch: false,
        })
      );
    }
  }, [dispatch, next_page_param]);

  // Handle Advanced Search
  const handleSearch = useCallback(
    (searchData) => {
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
        getDealerPackages({
          params: transformedSearchData,
        })
      );
    },
    [dispatch]
  );

  // Row Style
  const getRowStyle = (params) => {
    const status = params?.data?.is_active;
    return status === false ? { background: "rgba(128, 128, 128, 0.1)" } : {};
  };

  const defaultColDef = useMemo(() => ({}), []);

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
        <Typography color="text.primary">MOB Setup</Typography>
        <Typography color="text.primary">Dealer / Dealer Package</Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={DEALER_PACKAGE_SEARCH_OPTIONS}
        onSearch={handleSearch}
      />
      <DealerPackageAppBar ids={dealerPackages?.map((item) => item.id)} />
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={dealerPackages ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="DealerPackageTable"
          rowKey="id"
          agThemeStyle={{
            height: "calc(100vh - 170px)",
          }}
          onScrollBottomEnd={handleBodyScroll}
          loading={isLoading}
          getRowStyle={getRowStyle}
        />
      </Paper>
    </Box>
  );
};

export default DealerPackageIndex;
