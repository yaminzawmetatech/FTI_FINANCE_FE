import * as React from "react";
import { Box, Paper, Breadcrumbs, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo, useEffect } from "react";
import AdvancedSearch from "components/form/AdvancedSearch";
import Table from "components/Table";
import { useSearchParams } from "react-router-dom";
import DealerContactPersonTableRowMenu from "./DealerContactPersonTableRowMenu";
import DealerContactPersonAppBar from "./DealerContactPersonAppBar";
import dayjs from "dayjs";
import { getAllDealers } from "features/dealer/dealerSlice";
import { getAddressStates } from "features/address/State/addressStateSlice";
import { getDealerContactPeople } from "features/dealerContactPerson/dealerContactPersonSlice";
import { DEALER_CONTACT_PERSON_SEARCH_OPTIONS } from "constants/searchOptions/dealerContactPersonSearchOptions";
import { getAddressCities } from "features/address/City/addressCitySlice";
import { YesNoRenderer } from "common/YesNoRenderer";

const DealerContactPersonIndex = () => {
  const dispatch = useDispatch();

  const [params, setParams] = useSearchParams();

  const { dealerContactPeople, isLoading, next_page_param } = useSelector(
    (state) => state.dealerContactPeople
  );

  useEffect(() => {
    dispatch(getAllDealers());
    dispatch(getAddressStates());
    dispatch(getAddressCities());
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
        width: 200,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "ph_no",
        headerName: "Ph No",
        width: 130,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "email",
        headerName: "Email",
        width: 130,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "nrc",
        headerName: "Nrc",
        width: 120,
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
        cellRenderer: DealerContactPersonTableRowMenu,
        cellRendererParams: {},
        lockPinned: true,
      },
      {
        field: "dealer.name",
        headerName: "Dealer",
        width: 200,
        resizable: true,
      },
      {
        field: "type",
        headerName: "Type",
        width: 150,
        resizable: true,
      },
      {
        field: "address",
        headerName: "Address",
        width: 200,
        resizable: true,
      },
      {
        field: "title_position",
        headerName: "Title Position",
        width: 100,
        resizable: true,
      },
      {
        field: "in_active",
        headerName: "Is Active?",
        width: 100,
        sortable: true,
        resizable: true,
        cellRenderer: YesNoRenderer
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

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = useCallback(() => {
    dispatch(
      getDealerContactPeople({
        firstFetch: true,
      })
    );
  }, [dispatch]);

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_param) {
        dispatch(
          getDealerContactPeople({
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
      getDealerContactPeople({
        params: {
          ...transformedSearchData,
        },
      })
    );
  };

  const getRowStyle = (params) => {
    const status = params?.data?.in_active;
    return status === 0 ? { background: "rgba(128, 128, 128, 0.1)" } : {};
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
        <Typography color="text.primary">MOB Setup</Typography>
        <Typography color="text.primary">
          Dealer / Dealer Contact Person
        </Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={DEALER_CONTACT_PERSON_SEARCH_OPTIONS}
        onSearch={handleSearch}
      />
      <DealerContactPersonAppBar ids={dealerContactPeople?.map((item)=>item.id)} />
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={dealerContactPeople ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="DealerContactPersonsTable"
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

export default DealerContactPersonIndex;
