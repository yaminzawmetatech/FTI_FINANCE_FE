import React, { useEffect } from "react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Table from "components/Table";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import ContractAppBar from "./AllocatedReminderHistoryAppBar";
import {
  Breadcrumbs,
  Typography,
  Box,
  Paper,
  Chip,
  Tooltip,
} from "@mui/material";
import AdvancedSearch from "components/form/AdvancedSearch";
import { CONTRACT_STATUS } from "constants/contractStatus";
import { getReminderAllocations } from "modules/collection/slices/reminderAllocationSlice";
import { REMINDER_ALLOCATION_HISTORY_SEARCH_OPTIONS } from "constants/searchOptions/reminderAllocationHistorySearchOptions";

const HistoryTable = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();

  const { reminderAllocations, next_page_param, isLoading } = useSelector(
    (state) => state.reminderAllocations
  );

  const rowData = reminderAllocations || [];

  const fetchApi = useCallback(() => {
    dispatch(
      getReminderAllocations({
        firstFetch: true,
        params: {
          is_history: 1,
        },
      })
    );
  }, [dispatch]);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  const defaultColDef = useMemo(
    () => ({
      valueSetter: (params) => {},
    }),
    []
  );

  // link to contract
  const LinkCellRenderer = ({ value, data }) => {
    const uuid = data?.contract?.uuid;
    const url = `/contracts/${uuid}/view`;
    return (
      <a href={url} target="_blank" style={{ textDecoration: "underline" }}>
        {value}
      </a>
    );
  };

  const ChipRenderer = (props) => {
    if (props?.data?.collection_responses?.length === 0) {
      return null;
    }

    const data_arr = props.data.collection_responses;

    return (
      <Box
        display="flex"
        flexDirection="column"
        gap={1}
        sx={{ marginBottom: "5px", marginTop: "3px" }}
      >
        {data_arr?.map((value, index) => {
          if (props.colDef.field === "concatenated_remarks" && value?.remark) {
            return (
              <Tooltip key={index} title={value?.remark}>
                <Chip
                  label={
                    value?.remark?.length > 30
                      ? value?.remark?.slice(0, 30) + "..."
                      : value?.remark
                  }
                />
              </Tooltip>
            );
          }
          if (
            props.colDef.field === "concatenated_contact_dates" &&
            value?.contact_date
          ) {
            return <Chip key={index} label={value?.contact_date} />;
          }
          if (
            props.colDef.field === "concatenated_promise_dates" &&
            value?.promised_date
          ) {
            return <Chip key={index} label={value?.promised_date} />;
          }
          if (
            props.colDef.field === "concatenated_follow_up_results" &&
            value?.follow_up_result?.name
          ) {
            return <Chip key={index} label={value?.follow_up_result.name} />;
          }
          return null;
        })}
      </Box>
    );
  };

  const columnDefs = useMemo(
    () => [
      {
        field: "row",
        headerName: "No",
        valueGetter: "node.rowIndex + 1",
        width: 50,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "pic.user_name",
        headerName: "Allocated PIC",
        width: 130,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "allocate_activity.name",
        headerName: "Allocated Activity",
        width: 150,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "assigned_date",
        headerName: "Assigned Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        width: 110,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "contract.partner_application_id",
        headerName: "Partner Application ID",
        width: 100,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
        cellRenderer: LinkCellRenderer,
      },
      {
        field: "latest_contact_date",
        headerName: "Contact Date",
        width: 200,
        sortable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
        resizable: true,
      },
      {
        field: "latest_promised_date",
        headerName: "Promise Date",
        width: 200,
        sortable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
        resizable: true,
      },
      {
        field: "latest_follow_up_result",
        headerName: "Follow Up Result",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "latest_remark",
        headerName: "Remark",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "concatenated_contact_dates",
        headerName: "Contact Date(Concatenate)",
        width: 200,
        sortable: true,
        resizable: true,
        autoHeight: true,
        cellRenderer: ChipRenderer,
      },
      {
        field: "concatenated_promise_dates",
        headerName: "Promise Date(Concatenate)",
        width: 200,
        sortable: true,
        resizable: true,
        autoHeight: true,
        cellRenderer: ChipRenderer,
      },
      {
        field: "concatenated_follow_up_results",
        headerName: "Follow Up Result(Concatenate)",
        width: 200,
        sortable: true,
        resizable: true,
        autoHeight: true,
        cellRenderer: ChipRenderer,
      },
      {
        field: "concatenated_remarks",
        headerName: "Remarks(Concatenate)",
        width: 200,
        sortable: true,
        resizable: true,
        autoHeight: true,
        cellRenderer: ChipRenderer,
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

  const handleBodyScroll = useCallback(async () => {
    if (next_page_param) {
      dispatch(
        getReminderAllocations({
          params: next_page_param,
          firstFetch: false,
        })
      );
    }
  }, [dispatch, next_page_param]);

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
      getReminderAllocations({
        params: {
          is_history: 1,
          ...transformedSearchData,
        },
      })
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" className="margin-top-8">
        <Typography color="text.primary">Collection Module</Typography>
        <Typography color="text.primary">Allocated Reminder History</Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={REMINDER_ALLOCATION_HISTORY_SEARCH_OPTIONS}
        status={CONTRACT_STATUS}
        onSearch={handleSearch}
      />
      <ContractAppBar
        selectedRows={reminderAllocations?.map((reminder) => reminder?.id)}
        fetchApi={fetchApi}
      />
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="ReminderAllocationHistory"
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

export default React.memo(HistoryTable);
