import * as React from "react";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreditCriteriaAppBar from "./CreditCriteriaAppBar";
import AdvancedSearch from "components/form/AdvancedSearch";
import { Breadcrumbs, Typography, Box, Paper } from "@mui/material";
import Table from "components/Table";
import dayjs from "dayjs";
import { getCreditCriteria } from "modules/credit-management/slices/creditCriteriaSlice";
import { getAllCreditCriteriaHistory } from "modules/credit-management/slices/allCreditCriteriaSlice";
import { ALL_CREDIT_CRITERIA_OPTIONS } from "constants/searchOptions/allCreditCriteriaOptions";

const CreditCriteriaListIndex = () => {
  const dispatch = useDispatch();

  const { allCreditCriteriaHistory, next_page_param, isLoading } = useSelector(
    (state) => state.allCreditCriteriaHistory
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(
      getAllCreditCriteriaHistory({
        firstFetch: true,
      })
    );
  }, [dispatch]);

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_param) {
        dispatch(
          getAllCreditCriteriaHistory({
            params: next_page_param,
            firstFetch: false,
          })
        );
      }
    },
    [dispatch, next_page_param]
  );

  useEffect(() => {
    // has credit criteria values array
    const formattedData = allCreditCriteriaHistory?.flatMap((item) => {
      if (
        item?.credit_criteria_values &&
        item?.credit_criteria_values.length > 0
      ) {
        return item.credit_criteria_values.map((value) => ({
          ...item,
          id: value.uuid,
          value_id: value.id,
          history_id: value.history_id,
          value: value.value,
          required_key_id: value.required_key_id,
          remark: value.remark,
          created_at: value.created_at ? value.created_at : item.created_at,
          created_user: value?.created_user,
          updated_at: value?.updated_at ? value.updated_at : item.updated_at,
          modified_user: value?.modified_user,
          start_date: value?.start_date,
          end_date: value?.end_date,
        }));
      } else {
        // If no credit_criteria_values
        return { ...item, value: null };
      }
    });

    setData(formattedData);
  }, [allCreditCriteriaHistory]);

  const defaultColDef = useMemo(
    () => ({
      valueSetter: (params) => {},
    }),
    []
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
        width: 90,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "subcategory.name",
        headerName: "Sub Category",
        width: 130,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "type",
        headerName: "Type",
        width: 150,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "required_category",
        headerName: "Requirement Category",
        width: 200,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "parent.required_category",
        headerName: "Parent",
        width: 150,
        resizable: true,
      },
      {
        field: "value",
        headerName: "Value",
        width: 300,
        resizable: true,
      },
      {
        field: "remark",
        headerName: "Remark",
        width: 150,
        resizable: true,
      },
      {
        field: "start_date",
        headerName: "Version Start Date",
        width: 150,
        sortable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        resizable: true,
      },
      {
        field: "end_date",
        headerName: "Version End Date",
        width: 150,
        sortable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
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
      getAllCreditCriteriaHistory({
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
        <Typography color="text.primary">Credit Criteria History List</Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={ALL_CREDIT_CRITERIA_OPTIONS}
        onSearch={handleSearch}
      />
      <CreditCriteriaAppBar ids={allCreditCriteriaHistory?.map((item) => item?.id)} />
      <Paper sx={{ width: "100%" }}>
        <Table
          rowData={data ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="CreditCriteriaAllHistoryTable"
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
