import * as React from "react";
import { Box, Paper, Breadcrumbs, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo, useState, useEffect } from "react";
import Table from "components/Table";
import { useSearchParams } from "react-router-dom";
import AdvancedSearch from "components/form/AdvancedSearch";
import NameOfBusinessAppBar from "./NameOfBusinessAppBar";
import NameOfBusinessTableRowMenu from "./NameOfBusinesTableRowMenu";
import { getNameOfBusinesses } from "features/nameOfBusiness/nameOfBusinessSlice";
import dayjs from "dayjs";
import { NAME_OF_BUSINESS_SEARCH_OPTIONS } from "constants/searchOptions/nameOfBusinessSearchOptions";

const NameOfBusinessIndex = () => {
  const dispatch = useDispatch();

  const [params, setParams] = useSearchParams();

  const { nameOfBusinesses, isLoading, next_page_param } = useSelector(
    (state) => state.nameOfBusinesses
  );

  // useEffect(() => {
  //   dispatch(getNameOfBusinesses());
  // }, [dispatch]);

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
        headerName: "Name",
        width: 250,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "description",
        headerName: "Description",
        width: 250,
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
        cellRenderer: NameOfBusinessTableRowMenu,
        cellRendererParams: {},
        lockPinned: true,
      },
      {
        field: "created_at",
        headerName: "Created Date",
        width: 200,
        sortable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
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
        width: 160,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD")
      },
      {
        field: "modified_user.user_name",
        headerName: "Modified By",
        width: 160,
        resizable: true,
      },
    ],
    []
  );

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = useCallback(() => {
    dispatch(
      getNameOfBusinesses({
        firstFetch: true,
      })
    );
  }, [dispatch]);

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_param) {
        dispatch(
          getNameOfBusinesses({
            params: next_page_param,
            firstFetch: false,
          })
        );
      }
    },
    [dispatch, next_page_param]
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
      getNameOfBusinesses({
        params: {
          ...transformedSearchData,
        },
      })
    );
  };

  const defaultColDef = useMemo(
    () => ({
      valueSetter: (params) => {},
    }),
    []
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ mb: 1 }}
        className="margin-top-8"
      >
        <Typography color="text.primary">PDSD</Typography>
        <Typography color="text.primary">Name Of Business</Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={NAME_OF_BUSINESS_SEARCH_OPTIONS}
        onSearch={handleSearch}
      />
      <NameOfBusinessAppBar fetchApi={fetchApi} />
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={nameOfBusinesses ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="NameOfBusinessTable"
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

export default NameOfBusinessIndex;
