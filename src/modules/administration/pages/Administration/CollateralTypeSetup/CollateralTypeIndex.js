import * as React from "react";
import { Box, Paper, Breadcrumbs, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo, useState, useEffect } from "react";
import AdvancedSearch from "components/form/AdvancedSearch";
import Table from "components/Table";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import { VEHICLE_SEARCH_OPTIONS } from "constants/searchOptions/VehicleSearchOptions";
import { getAllCollateralTypes } from "modules/administration/slices/collateralTypesSetupSlice";
import CollateralTypeTableRowMenu from "./CollateralTypeTableRowMenu";
import CollateralTypeAppBar from "./CollateralTypeAppBar";
import { getProjectCategory } from "modules/administration/slices/projectcategorySlice";
import { getSubCategory } from "modules/administration/slices/subcategorySlice";
import { COLLATERAL_TYPE_SEARCH_OPTIONS } from "constants/searchOptions/collateralTypeSearchOption";

const CollateralTypeIndex = () => {
  const dispatch = useDispatch();

  const [params, setParams] = useSearchParams();

  const { collateralTypes = [], isLoading, next_page_param } = useSelector(
    (state) => state.collateralTypes
  );

  const [transformedSearchDataResponse, setTransformedSearchDataResponse] =
  useState();


  useEffect(() => {
    //dispatch(getAllVehicles());
    dispatch(getProjectCategory());
    // dispatch(getMobCategory());
    dispatch(getSubCategory());
    // dispatch(getAllModels());
    // dispatch(getAllBrands());
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
        field: "name",
        headerName: "Name",
        width: 160,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "category.name",
        headerName: "Category Name",
        width: 120,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "sub_category.name",
        headerName: "Sub Category Name",
        width: 120,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      // {
      //   field: "sub_category_code",
      //   headerName: "Sub Category Code",
      //   width: 160,
      //   resizable: true,
      //   pinned: "left",
      //   lockPosition: "left",
      //   lockPinned: true,
      // },
      {
        headerName: "",
        field: "menu",
        width: 50,
        lockPosition: "left",
        pinned: "left",
        cellRenderer: CollateralTypeTableRowMenu,
        cellRendererParams: {},
        lockPinned: true,
      },
      {
        field: "created_user.user_name",
        headerName: "Created By",
        width: 160,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "modified_user.user_name",
        headerName: "Modified By",
        width: 160,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "created_at",
        headerName: "Created At",
        width: 160,
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
        width: 160,
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
      getAllCollateralTypes({
        firstFetch: true,
      })
    );
  }, [dispatch]);

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_param) {
        dispatch(
          getAllCollateralTypes({
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
  
    setTransformedSearchDataResponse(transformedSearchData);
  
    dispatch(
      getAllCollateralTypes({
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
        <Typography color="text.primary">Administration</Typography>
        <Typography color="text.primary">Collateral Type Setup List</Typography>
      </Breadcrumbs>
      <AdvancedSearch options={COLLATERAL_TYPE_SEARCH_OPTIONS} onSearch={handleSearch} />
      <CollateralTypeAppBar 
      fetchApi={fetchApi}
      transformedSearchDataResponse={transformedSearchDataResponse}
      />
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={collateralTypes ?? []} // Ensure this is an array
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="CollateralTypeTable"
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

export default CollateralTypeIndex;
