import * as React from "react";
import { Box, Paper, Breadcrumbs, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo, useState, useEffect } from "react";
import AdvancedSearch from "components/form/AdvancedSearch";
import VehicleAppBar from "./VehicleAppBar";
import Table from "components/Table";
import { useSearchParams } from "react-router-dom";
import { getAllVehicles, getVehicles } from "features/vehicleSetup/vehicleSlice";
import dayjs from "dayjs";
import VehicleTableRowMenu from "./VehicleTableRowMenu";
import { VEHICLE_SEARCH_OPTIONS } from "constants/searchOptions/VehicleSearchOptions";
import { getProjectCategory, getMobCategory } from "features/projectcategory/projectcategorySlice";
import { getSubCategory } from "features/subcategory/subcategorySlice";
import { getAllModels, getModels } from "features/modelSetup/ModelSlice";
import { getAllBrands, getBrands } from "features/brandSetup/BrandSlice";

const VehicleIndex = () => {
  const dispatch = useDispatch();

  const [params, setParams] = useSearchParams();

  const { vehicles, isLoading, next_page_param } = useSelector(
    (state) => state.vehicles
  );

  const [transformedSearchDataResponse, setTransformedSearchDataResponse] =
    useState();


  useEffect(() => {
    //dispatch(getAllVehicles());
    // dispatch(getProjectCategory());
    dispatch(getMobCategory());
    dispatch(getSubCategory());
    dispatch(getAllModels());
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
        width: 160,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "model_name",
        headerName: "Model Name",
        width: 210,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "category_name",
        headerName: "Category Name",
        width: 120,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "category_code",
        headerName: "Category Code",
        width: 100,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "sub_category_name",
        headerName: "Sub Category Name",
        width: 120,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "sub_category_code",
        headerName: "Sub Category Code",
        width: 160,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "type",
        headerName: "Type",
        width: 160,
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
        cellRenderer: VehicleTableRowMenu,
        cellRendererParams: {},
        lockPinned: true,
      },
      {
        field: "created_by",
        headerName: "Created By",
        width: 160,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "modified_by",
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
        field: "modified_at",
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
      getVehicles({
        firstFetch: true,
      })
    );
  }, [dispatch]);

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_param) {
        dispatch(
          getVehicles({
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
      getVehicles({
        params: {
          ...transformedSearchData,
        },
      })
    );
  };

  const defaultColDef = useMemo(
    () => ({
      valueSetter: (params) => { },
    }),
    []
  );

  const getRowStyle = (params) => {
    const status = params?.data?.in_active;
    return status === 0 ? { background: "rgba(128, 128, 128, 0.1)" } : {};
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ mb: 1 }}
        className="margin-top-8"
      >
        <Typography color="text.primary">MOB Setup</Typography>
        <Typography color="text.primary">Vehicle</Typography>
      </Breadcrumbs>
      <AdvancedSearch options={VEHICLE_SEARCH_OPTIONS} onSearch={handleSearch} />
      <VehicleAppBar
        fetchApi={fetchApi}
        transformedSearchDataResponse={transformedSearchDataResponse}
      />
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={vehicles ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="VehicleTable"
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

export default VehicleIndex;
