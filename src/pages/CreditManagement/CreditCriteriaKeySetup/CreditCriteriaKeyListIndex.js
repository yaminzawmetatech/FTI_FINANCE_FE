import * as React from "react";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreditCriteriaAppBar from "./CreditCriteriaAppBar";
import AdvancedSearch from "components/form/AdvancedSearch";
import { Breadcrumbs, Typography, Box, Paper } from "@mui/material";
import Table from "components/Table";
import dayjs from "dayjs";
import { APPLICATION_PROJECTF_SEARCH_OPTIONS } from "constants/searchOptions/applicationProjectFSearchOptions";
import { getCreditCriteria } from "features/creditCriteria/creditCriteriaSlice";
import CreditCriteriaTableRowMenu from "./CreditCriteriaTableRowMenu";

const CreditCriteriaListIndex = () => {
  const dispatch = useDispatch();  

  const { creditCriteria, next_page_param, isLoading } = useSelector(
    (state) => state.creditCriteria
  );

  useEffect(() => {
    dispatch(
      getCreditCriteria({
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

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_param) {
        dispatch(
          getCreditCriteria({
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
        field: "category.name",
        headerName: "Category",
        width: 150,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "subcategory.name",
        headerName: "Sub Category",
        width: 150,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "type",
        headerName: "Type",
        width: 200,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "required_category",
        headerName: "Requirement Category",
        width: 300,
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
        cellRenderer: CreditCriteriaTableRowMenu,
        cellRendererParams: {},
        lockPinned: true,
      },
      {
        field: "parent.required_category",
        headerName: "Parent",
        width: 200,
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
      getCreditCriteria({
        params: {
          ...transformedSearchData,
        },
      })
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" className="margin-top-8">
        <Typography color="text.primary">Credit Management</Typography>
        <Typography color="text.primary">Credit Criteria Key List</Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={APPLICATION_PROJECTF_SEARCH_OPTIONS}
        onSearch={handleSearch}
      />
      <CreditCriteriaAppBar />
      <Paper sx={{ width: "100%" }}>
        <Table
          rowData={creditCriteria ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="CreditCriteriaKeyTable"
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

export default React.memo(CreditCriteriaListIndex);
