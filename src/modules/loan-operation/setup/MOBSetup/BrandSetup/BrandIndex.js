import * as React from "react";
import { Box, Paper, Breadcrumbs, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo, useState, useEffect } from "react";
import AdvancedSearch from "components/form/AdvancedSearch";
import { BRAND_SEARCH_OPTIONS } from "constants/searchOptions/BrandSearchOptions";
import Table from "components/Table";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import { getAllBrands, getBrands } from "modules/loan-operation/slices/BrandSlice";
import BrandTableRowMenu from "./BrandTableRowMenu";
import BrandAppBar from "./BrandAppBar";

const BrandIndex = () => {
  const dispatch = useDispatch();

  const [params, setParams] = useSearchParams();

  //need to add to the store first 
  const { brands, isLoading, next_page_param } = useSelector(
    (state) => state.brands
  );
  useEffect(() => {
    dispatch(getAllBrands());
    
  }, [dispatch]);

  
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
        field: "brand_name",
        headerName: "Brand Name",
        width: 200,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "brand_code",
        headerName: "Brand Code",
        width: 200,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "description",
        headerName: "Description",
        width: 300,
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
        cellRenderer: BrandTableRowMenu,
        cellRendererParams: {},
        lockPinned: true,
      },
      {
        field: "created_by",
        headerName: "Created By",
        width: 200,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "modified_by",
        headerName: "Modified By",
        width: 200,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "created_at",
        headerName: "Created At",
        width: 200,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
      },
      {
        field: "updated_at",
        headerName: "Modified At",
        width: 200,
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

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = useCallback(() => {
    dispatch(
      getBrands({
        firstFetch: true,
      })
    );
  }, [dispatch]);

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_param) {
        dispatch(
          getBrands({
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
      getBrands({
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

  const getRowStyle = (params) => {
    const status = params?.data?.in_active;
    return status === 0 ? {background: "rgba(128, 128, 128, 0.1)"} : { };
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ mb: 1 }}
        className="margin-top-8"
      >
        <Typography color="text.primary">MOB Setup</Typography>
        <Typography color="text.primary">Brand</Typography>
      </Breadcrumbs>
      <AdvancedSearch options={BRAND_SEARCH_OPTIONS} onSearch={handleSearch} />
      <BrandAppBar fetchApi={fetchApi}/>
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={brands ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="BrandsTable"
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

export default BrandIndex;
