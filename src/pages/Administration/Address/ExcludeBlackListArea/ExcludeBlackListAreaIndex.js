import * as React from "react";
import { Box, Paper, Breadcrumbs, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo, useState, useEffect } from "react";
import AdvancedSearch from "components/form/AdvancedSearch";
import ExcludeBlackListAreaAppBar from "./ExcludeBlackListAreaAppBar";
import Table from "components/Table";
import { useSearchParams } from "react-router-dom";
import VillageTableRowMenu from "./ExcludeBlackListAreaTableRowMenu";
import { getExcludeBlackListAreaList } from "features/address/ExcludeBlackListArea/excludeBlackListAreaSlice";
import { EXCLUDE_BLACKLIST_AREA_OPTIONS } from "constants/searchOptions/excludeBlackListAreaOptions";

const ExcludeBlackListAreaIndex = () => {
  const dispatch = useDispatch();

  const [selectedRows, setSelectedRows] = useState([]);
  const [filterBy, setFilterBy] = useState();

  const handleSelectionChanged = useCallback(
    (rows) => {
      setSelectedRows(rows);
    },
    [selectedRows]
  );

  const [params, setParams] = useSearchParams();

  const { excludeBlackListArea, isLoading, next_page_param } = useSelector(
    (state) => state.excludeBlackListArea
  );

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
        width: 130,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "sub_category.name",
        headerName: "Sub Category",
        width: 130,
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
        cellRenderer: VillageTableRowMenu,
        cellRendererParams: {},
        lockPinned: true,
      },
      {
        field: "address_state.name",
        headerName: "State",
        width: 130,
        resizable: true,
      },
      {
        field: "address_district.name",
        headerName: "District",
        width: 130,
        resizable: true,
      },
      {
        field: "address_township.name",
        headerName: "Township",
        width: 130,
        resizable: true,
      },
      {
        field: "address_city.name",
        headerName: "City",
        width: 130,
        resizable: true,
      },
      {
        field: "address_ward.name",
        headerName: "Ward",
        width: 130,
        resizable: true,
      },
      {
        field: "address_village_tract.name",
        headerName: "Village Tract",
        width: 130,
        resizable: true,
      },
      {
        field: "address_village.name",
        headerName: "Village",
        width: 130,
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
      getExcludeBlackListAreaList({
        firstFetch: true,
      })
    );
  }, [dispatch]);

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_param) {
        dispatch(
          getExcludeBlackListAreaList({
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

    setFilterBy(transformedSearchData);

    dispatch(
      getExcludeBlackListAreaList({
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
        <Typography color="text.primary">Administration</Typography>
        <Typography color="text.primary">
          Address / Exclude BlackList Area
        </Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={EXCLUDE_BLACKLIST_AREA_OPTIONS}
        onSearch={handleSearch}
      />
      <ExcludeBlackListAreaAppBar
        fetchApi={fetchApi}
        selectedRows={selectedRows}
        selectedIds={excludeBlackListArea.map((item) => item.id)}
      />
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={excludeBlackListArea ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="ExcludeBlackListAreaTable"
          rowKey="id"
          agThemeStyle={{
            height: "calc(100vh - 170px)",
          }}
          onScrollBottomEnd={handleBodyScroll}
          loading={isLoading}
          rowSelection={"multiple"}
          rowMultiSelectWithClickFlag={"true"}
          onSelectionChanged={handleSelectionChanged}
        />
      </Paper>
    </Box>
  );
};

export default ExcludeBlackListAreaIndex;
