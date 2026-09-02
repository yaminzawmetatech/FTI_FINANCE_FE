import * as React from "react";
import { Box, Paper, Breadcrumbs, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo, useState, useEffect } from "react";
import { getAddressWardList } from "../../../../features/address/Ward/addressWardSlice";
import Table from "components/Table";
import { useSearchParams } from "react-router-dom";
import AdvancedSearch from "components/form/AdvancedSearch";
import WardAppBar from "./WardAppBar";
import WardTableRowMenu from "./WardTableRowMenu";
import { getAddressCities } from "features/address/City/addressCitySlice";
import { WARDS_SEARCH_OPTIONS } from "constants/searchOptions/wardsSearchOptions";

const AddressWardIndex = () => {
  const dispatch = useDispatch();
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectionChanged = useCallback(
    (rows) => {
      setSelectedRows(rows);
    },
    [selectedRows]
  );

  const [params, setParams] = useSearchParams();

  const { addressWardData, isLoading, next_page_param } = useSelector(
    (state) => state.addressWardData
  );

  useEffect(() => {
    dispatch(getAddressCities());
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
        field: "ward_pcode",
        headerName: "Ward Code",
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
        cellRenderer: WardTableRowMenu,
        cellRendererParams: {},
        lockPinned: true,
      },
      {
        field: "ward_mya_mm3",
        headerName: "Ward Myanmar",
        width: 200,
        resizable: true,
      },
      {
        field: "address_city",
        headerName: "City",
        width: 200,
        resizable: true,
      },
      {
        field: "is_blacklisted",
        headerName: "Is Blacklist",
        width: 100,
        sortable: true,
        resizable: true,
        cellRenderer: (params) => {
          const isBlacklisted = params.value;
          if (isBlacklisted === true) {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    color: "green",
                  }}
                >
                  YES
                </span>
              </div>
            );
          } else {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    color: "red",
                  }}
                >
                  NO
                </span>
              </div>
            );
          }
        },
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
      getAddressWardList({
        firstFetch: true,
      })
    );
  }, [dispatch]);

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_param) {
        dispatch(
          getAddressWardList({
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
      getAddressWardList({
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
        <Typography color="text.primary">Address / Ward</Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={WARDS_SEARCH_OPTIONS}
        onSearch={handleSearch}
      />
      <WardAppBar fetchApi={fetchApi} selectedRows={selectedRows} />
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={addressWardData ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="AddressWardTable"
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

export default AddressWardIndex;
