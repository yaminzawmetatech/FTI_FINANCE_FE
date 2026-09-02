import * as React from "react";
import {
  Box,
  Paper,
  Breadcrumbs,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo, useState, useEffect } from "react";
import {
  getAddressVillageTractList,
} from "../../../../features/address/VillageTract/addressVillageTractSlice";
import { getAddressTownships } from "features/address/Township/addressTownshipSlice";
import AdvancedSearch from "components/form/AdvancedSearch";
import VillageTractAppBar from "./VillageTractAppBar";
import Table from "components/Table";
import { useSearchParams } from "react-router-dom";
import VillageTractTableRowMenu from "./VillageTractTableRowMenu";
import { VILLAGE_TRACT_SEARCH_OPTIONS } from "constants/searchOptions/villagesTractSearchOptions";
import { YesNoRenderer } from "common/YesNoRenderer";

const AddressVillageTractIndex = () => {
  const dispatch = useDispatch();

  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectionChanged = useCallback(
    (rows) => {
      setSelectedRows(rows);
    },
    [selectedRows]
  );

  const [params, setParams] = useSearchParams();

  const { addressVillageTractData, isLoading, next_page_param } = useSelector(
    (state) => state.addressVillageTractData
  );

  useEffect(() => {
    dispatch(getAddressTownships());
  }, [dispatch]);

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
        field: "vt_pcode",
        headerName: "Village Tract Code",
        width: 200,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "name",
        headerName: "Name",
        width: 200,
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
        cellRenderer: VillageTractTableRowMenu,
        cellRendererParams: {},
        lockPinned: true,
      },
      {
        field: "village_tract_mya_mm3",
        headerName: "Village Tract Myanmar",
        width: 200,
        resizable: true,
      },
      {
        field: "township",
        headerName: "Township",
        width: 200,
        resizable: true,
      },
      {
        field: "is_blacklisted",
        headerName: "Is Blacklist",
        width: 100,
        sortable: true,
        resizable: true,
        cellRenderer: YesNoRenderer
      },

      {
        field: "description",
        headerName: "Description",
        width: 250,
        sortable: true,
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
      getAddressVillageTractList({
        firstFetch: true,
      })
    );
  }, [dispatch]);

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_param) {
        dispatch(
          getAddressVillageTractList({
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
      getAddressVillageTractList({
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
        <Typography color="text.primary">Address / Village Tract</Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={VILLAGE_TRACT_SEARCH_OPTIONS}
        onSearch={handleSearch}
      />
      <VillageTractAppBar fetchApi={fetchApi} selectedRows={selectedRows} />
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={addressVillageTractData ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="AddressVillageTractListTable"
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

export default AddressVillageTractIndex;
