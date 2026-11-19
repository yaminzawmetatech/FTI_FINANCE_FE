import * as React from "react";
import { Box, Paper, Breadcrumbs, Typography } from "@mui/material";
import AdvancedSearch from "components/form/AdvancedSearch";
import { CREDIT_SCHEME_SEARCH_OPTIONS } from "constants/searchOptions/CreditSchemeSearchOptions";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getCreditSchemes } from "modules/loan-operation/slices/creditSchemeSlice";
import { useMemo, useEffect, useCallback } from "react";
import Table from "components/Table";
import CreditSchemeAppBar from "./CreditSchemeAppBar";
import CreditSchemeTableRowMenu from "./CreditSchemeTableRowMenu";
import { getProjectCategory } from "modules/administration/slices/projectcategorySlice";
import dayjs from "dayjs";
import { YesNoRenderer } from "common/YesNoRenderer";

const CreditSchemeIndex = () => {
  const dispatch = useDispatch();

  const [params, setParams] = useSearchParams();

  const { creditSchemes, isLoading, next_page_param } = useSelector(
    (state) => state.creditSchemes
  );

  useEffect(() => {
    dispatch(getProjectCategory());
  }, [dispatch]);

  const fetchApi = useCallback(() => {
    dispatch(
      getCreditSchemes({
        firstFetch: true,
      })
    );
  }, [dispatch]);

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_param) {
        dispatch(
          getCreditSchemes({
            params: next_page_param,
            firstFetch: false,
          })
        );
      }
    },
    [dispatch, next_page_param]
  );

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
        field: "name",
        headerName: "Scheme Name",
        width: 200,
        pinned: "left",
        resizable: true,
        lockPosition: true,
      },
      {
        field: "category_name",
        headerName: "Category Name",
        width: 110,
        pinned: "left",
        resizable: true,
        lockPosition: true,
      },
      {
        field: "skip_survey",
        headerName: "Skip Survey",
        // headerName: "Skip Field Servey",
        width: 90,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
        cellRenderer: YesNoRenderer,
      },
      {
        field: "dealer_guarantee",
        headerName: "Dealer Guarantee",
        width: 120,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
        cellRenderer: YesNoRenderer,
      },
      {
        field: "description",
        headerName: "Description",
        width: 280,
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
        cellRenderer: CreditSchemeTableRowMenu,
        cellRendererParams: {},
        lockPinned: true,
      },
      {
        field: "created_by",
        headerName: "Created By",
        width: 180,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "modified_by",
        headerName: "Modified By",
        width: 180,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "created_at",
        headerName: "Created At",
        width: 180,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
      },
      {
        field: "last_modified",
        headerName: "Modified At",
        width: 180,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A")
      },
    ],
    []
  );

  const defaultColDef = useMemo(
    () => ({
      valueSetter: (params) => {},
    }),
    []
  );

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

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
      getCreditSchemes({
        params: {
          ...transformedSearchData,
        },
      })
    );
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ mb: 1 }}
        className="margin-top-8"
      >
        <Typography color="text.primary">PDSD</Typography>
        <Typography color="text.primary">Credit Scheme</Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={CREDIT_SCHEME_SEARCH_OPTIONS}
        onSearch={handleSearch}
      />
      <CreditSchemeAppBar />

      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={creditSchemes ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="CreditSchemeTable"
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

export default CreditSchemeIndex;
