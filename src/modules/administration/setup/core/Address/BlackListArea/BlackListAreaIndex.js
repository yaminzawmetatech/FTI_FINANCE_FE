import * as React from "react";
import { Box, Paper, Breadcrumbs, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo, useState, useEffect } from "react";
import { VILLAGE_SEARCH_OPTIONS } from "constants/searchOptions/villagesSearchOptions";
import AdvancedSearch from "components/form/AdvancedSearch";
import BlackListAreaAppBar from "./BlackListAreaAppBar";
import Table from "components/Table";
import { useSearchParams } from "react-router-dom";
import VillageTableRowMenu from "./BlackListAreaTableRowMenu";
import { getBlackListAreaList } from "modules/administration/slices/blackListAreaSlice";
import { BLACK_LIST_SEARCH_OPTIONS } from "constants/searchOptions/blackListAreaSearchOptions";

const BlackListAreaIndex = () => {
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

  const { blackListArea, isLoading, next_page_param } = useSelector(
    (state) => state.blackListArea
  );

  // useEffect(()=>{
  //   dispatch(getAddressVillageTracts());
  // },[dispatch])

  // const data =  blackListArea.map((item) => {
  //   if(item.key === "sr_pcode"){
  //     data.state_name = item.name;
  //   }
  //   else if(item.key === "district_code"){ //if this key include
  //     data.state_name = item.state.name;
  //     data.district_name = item.name;
  //   }
  //   else if(item.key === "ts_pcode"){
  //     data.state_name = item.district.state.name;
  //     data.district_name = item.district.name;
  //     data.township_name = item.name;
  //   }
  //   else if(item.key === "town_pcode"){
  //     data.state_name = item.township.district.state.name;
  //     data.district_name = item.township.district.name;
  //     data.township_name = item.township.name;
  //     data.city_name = item.name;
  //   }
  //   else if(item.key === "ward_pcode"){
  //     data.state_name = item.city.township.district.state.name;
  //     data.district_name = item.city.township.district.name;
  //     data.township_name = item.city.township.name;
  //     data.city_name = item.city.name;
  //     data.ward_name = item.name;
  //   }
  //   else if(item.key === "vt_pcode"){
  //     data.state_name = item.township.district.state.name;
  //     data.district_name = item.township.district.name;
  //     data.township_name = item.township.name;
  //     data.village_tract_name = item.name;
  //   }
  //   else if(item.key === "village_pcode"){
  //     data.state_name = item.village_tract.township.district.state.name;
  //     data.district_name = item.village_tract.township.district.name;
  //     data.township_name = item.village_tract.township.name;
  //     data.village_name = item.name;
  //   }
  // })

  const data = blackListArea.map((item) => {
    const result = { ...item };

    // Assign the key based on existing fields
    if (item.village_tract?.township?.district?.state && item.village_tract) {
      result.key = "village_pcode";
      result.state_name = item.village_tract.township.district.state.name;
      result.district_name = item.village_tract.township.district.name;
      result.township_name = item.village_tract.township.name;
      result.village_tract_name = item.village_tract.name;
      result.village_name = item.name;
      result.address_village_id = item.id;
      result.address_village_tract_id = item.village_tract.id;
      result.address_township_id = item.village_tract.township.id;
      result.address_district_id = item.village_tract.township.district.id;
      result.address_state_id = item.village_tract.township.district.state.id;
    } else if (item.township?.district?.state && "vt_pcode" in item) {
      result.key = "vt_pcode";
      result.state_name = item.township.district.state.name;
      result.district_name = item.township.district.name;
      result.township_name = item.township.name;
      result.village_tract_name = item.name;
      result.address_village_tract_id = item.id;
      result.address_township_id = item.township.id;
      result.address_district_id = item.township.district.id;
      result.address_state_id = item.township.district.state.id;
    } else if (item.city?.township?.district?.state) {
      result.key = "ward_pcode";
      result.state_name = item.city.township.district.state.name;
      result.district_name = item.city.township.district.name;
      result.township_name = item.city.township.name;
      result.city_name = item.city.name;
      result.ward_name = item.name;
      result.address_ward_id = item.id;
      result.address_city_id = item.city.id;
      result.address_township_id = item.city.township.id;
      result.address_district_id = item.city.township.district.id;
      result.address_state_id = item.city.township.district.state.id;
    } else if (item.township?.district?.state && "town_pcode" in item) {
      result.key = "town_pcode";
      result.state_name = item.township.district.state.name;
      result.district_name = item.township.district.name;
      result.township_name = item.township.name;
      result.city_name = item.name;
      result.address_city_id = item.id;
      result.address_township_id = item.township.id;
      result.address_district_id = item.township.district.id;
      result.address_state_id = item.township.district.state.id;
    } else if (item.district?.state) {
      result.key = "ts_pcode";
      result.state_name = item.district.state.name;
      result.district_name = item.district.name;
      result.township_name = item.name;
      result.address_township_id = item.id;
      result.address_district_id = item.district.id;
      result.address_state_id = item.district.state.id;
    } else if (item.state) {
      result.key = "district_code";
      result.state_name = item.state.name;
      result.district_name = item.name;
      result.address_district_id = item.id;
      result.address_state_id = item.state.id;
    } else if (item.name) {
      result.key = "sr_pcode";
      result.state_name = item.name;
      result.address_state_id = item.id;
    }

    return result;
  });

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
        field: "state_name",
        headerName: "State",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "district_name",
        headerName: "District",
        width: 150,
        resizable: true,
      },
      {
        field: "township_name",
        headerName: "Township",
        width: 170,
        resizable: true,
      },
      {
        field: "city_name",
        headerName: "City",
        width: 170,
        resizable: true,
      },
      {
        field: "ward_name",
        headerName: "Ward",
        width: 150,
        resizable: true,
      },
      {
        field: "village_tract_name",
        headerName: "Village Tract",
        width: 170,
        resizable: true,
      },
      {
        field: "village_name",
        headerName: "Village",
        width: 170,
        resizable: true,
      },

      {
        headerName: "",
        field: "menu",
        width: 50,
        lockPosition: "right",
        pinned: "right",
        cellRenderer: VillageTableRowMenu,
        cellRendererParams: {},
        lockPinned: true,
      },
    ],
    []
  );

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = useCallback(() => {
    dispatch(
      getBlackListAreaList({
        firstFetch: true,
      })
    );
  }, [dispatch]);

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_param) {
        dispatch(
          getBlackListAreaList({
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
      getBlackListAreaList({
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
        <Typography color="text.primary">Address / BlackList Area</Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={BLACK_LIST_SEARCH_OPTIONS}
        onSearch={handleSearch}
        searchSingleField={true}
      />
      <BlackListAreaAppBar
        fetchApi={fetchApi}
        selectedRows={selectedRows}
        transformedSearchData={filterBy}
      />
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={data ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="BlackListAreaTableList"
          rowKey="uuid"
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

export default BlackListAreaIndex;
