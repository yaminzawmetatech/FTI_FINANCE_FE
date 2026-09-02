import React, { useEffect, useState } from "react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Table from "components/Table";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { Breadcrumbs, Typography, Box, Paper } from "@mui/material";
import AdvancedSearch from "../../../components/form/AdvancedSearch";
import { getAllKpayNotifications } from "features/kpayNotification/kpayNotificationSlice";
import { KPAY_NOTIFICATION_SEARCH_OPTIONS } from "constants/searchOptions/kpayNotificationSearchOptions";

const KpayNotificationTable = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();
  const [transformedSearchDataResponse, setTransformedSearchDataResponse] =
    useState();

  const { kpayNotifications, next_page_param, isLoading } = useSelector(
    (state) => state.kpayNotifications
  );

  useEffect(() => {
    dispatch(
      getAllKpayNotifications({
        firstFetch: true,
      })
    );
  }, [dispatch]);

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_param) {
        dispatch(
          getAllKpayNotifications({
            params: next_page_param,
            firstFetch: false,
          })
        );
      }
    },
    [dispatch, next_page_param]
  );

  const defaultColDef = useMemo(
    () => ({
      valueSetter: (params) => {},
    }),
    []
  );


  const columnDefs = useMemo(
    () => [
      {
        field: "row",
        headerName: "No",
        valueGetter: "node.rowIndex + 1",
        width: 80,
        sortable: true,
        resizable: true,
      },
      {
        field: "partner_id",
        headerName: "Partner ID",
        width: 100,
        sortable: true,
        resizable: true,
      },
      {
        field: "title",
        headerName: "Title",
        width: 250,
        sortable: true,
        resizable: true,
      },
      {
        field: "description",
        headerName: "Description",
        width: 500,
        sortable: true,
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

    setTransformedSearchDataResponse(transformedSearchData);

    dispatch(
      getAllKpayNotifications({
        params: {
          ...transformedSearchData,
        },
      })
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" className="margin-top-8">
        <Typography color="text.primary">Administration</Typography>
        <Typography color="text.primary">Kpay Notification</Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={KPAY_NOTIFICATION_SEARCH_OPTIONS}
        onSearch={handleSearch}
      />
      {/* <KpayNotificationAppBar /> */}
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={kpayNotifications ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="KpayNotifications"
          rowKey="id"
          agThemeStyle={{
            height: "calc(100vh - 210px)",
          }}
          onScrollBottomEnd={handleBodyScroll}
          loading={isLoading}
        />
      </Paper>
    </Box>
  );
};

export default React.memo(KpayNotificationTable);
