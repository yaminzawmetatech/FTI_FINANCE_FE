import * as React from "react";
import { Box, Paper, Breadcrumbs, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo, useEffect } from "react";
import AdvancedSearch from "components/form/AdvancedSearch";
import DealerAppBar from "./DealerAppBar";
import Table from "components/Table";
import { useSearchParams } from "react-router-dom";
import { getAllDealerGroups } from "modules/loan-operation/slices/dealerGroupSlice";
import DealerTableRowMenu from "./DealerTableRowMenu";
import { getDealerByUuid, getDealers } from "modules/loan-operation/slices/dealerSlice";
import { DEALER_SEARCH_OPTIONS } from "constants/searchOptions/dealerSearchOptions";
import dayjs from "dayjs";
import { getAddressStates } from "modules/administration/slices/addressStateSlice";
import { YesNoRenderer } from "common/YesNoRenderer";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from "@mui/icons-material/Edit";
import CreateEditDealerModal from "./CreateEditDealerModal";
import Tooltip from "@mui/material/Tooltip";

const ActionButtons = ({ rowData, onCopy, onEdit }) => (
  <Box display="flex" justifyContent="space-around" alignItems="center">
    <Tooltip title="Copy" placement="top-start">
      <ContentCopyIcon
        fontSize="small"
        onClick={() => onCopy(rowData)}
        style={{ cursor: "pointer", color: "gray" }}
      />
    </Tooltip>
    <Tooltip title="Edit" placement="top-start">
      <EditIcon
        fontSize="small"
        onClick={() => onEdit(rowData)}
        style={{ cursor: "pointer", color: "gray" }}
      />
    </Tooltip>
  </Box>
);

const DealerIndex = () => {
  const dispatch = useDispatch();

  const [params, setParams] = useSearchParams();

  const { dealers, isLoading, next_page_param } = useSelector(
    (state) => state.dealers
  );

  useEffect(() => {
    dispatch(getAllDealerGroups({
      params: {
        in_active : 1,
      },
    }));
    dispatch(getAddressStates());
  }, [dispatch]);

  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [editData, setEditData] = React.useState(null);
  const [copyData, setCopyData] = React.useState(null);
  const [copyModalOpen, setCopyModalOpen] = React.useState(false);

  const handleCopy = async (rowData) => {
    const response = await dispatch(getDealerByUuid({ uuid: rowData?.uuid }));
    if (response.payload.success) {
      setCopyData(response.payload.data);
      setCopyModalOpen(true);
    }
  };

  const handleEdit = (rowData) => {
    setEditData(rowData);
    setEditModalOpen(true);
  };

  const actionButtonRenderer = (params) => (
    <ActionButtons
      rowData={params.data}
      onCopy={handleCopy}
      onEdit={handleEdit}
    />
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
        field: "name",
        headerName: "Name",
        width: 150,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "owner_name",
        headerName: "Owner Name",
        width: 150,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "dealer_type",
        headerName: "Dealer Type",
        width: 100,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "dealer_group.name",
        headerName: "Dealer Group",
        width: 150,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        headerName: "Actions",
        field: "actions",
        width: 100,
        sortable: false,
        resizable: true,
        lockPosition: "left",
        pinned: "left",
        cellRenderer: actionButtonRenderer,
      },
      {
        headerName: "",
        field: "menu",
        width: 50,
        lockPosition: "left",
        pinned: "left",
        cellRenderer: DealerTableRowMenu,
        cellRendererParams: {},
        lockPinned: true,
      },
      {
        field: "state.name",
        headerName: "State",
        width: 200,
        resizable: true,
      },
      {
        field: "district.name",
        headerName: "District",
        width: 200,
        resizable: true,
      },
      {
        field: "township.name",
        headerName: "Township",
        width: 200,
        resizable: true,
      },
      {
        field: "description",
        headerName: "Description",
        width: 200,
        resizable: true,
      },
      {
        field: "showroom_address",
        headerName: "Showroom Address",
        width: 200,
        resizable: true,
      },
      {
        field: "showroom_ph_no",
        headerName: "Showroom Ph No",
        width: 200,
        resizable: true,
      },
      {
        field: "dealer_contract_signed_date",
        headerName: "Dealer Contract Signed Date",
        width: 200,
        resizable: true,
      },
      {
        field: "selling_product_type",
        headerName: "Selling Product Type",
        width: 200,
        resizable: true,
      },
      {
        field: "commission_percentage",
        headerName: "Commission Percentage",
        width: 100,
        resizable: true,
      },
      {
        field: "dealer_discount_percentage",
        headerName: "Dealer Discount Percentage",
        width: 100,
        resizable: true,
      },
      {
        field: "direct_marketing_commission_percentage",
        headerName: "Direct Marketing Commission Percentage",
        width: 100,
        resizable: true,
      },
      {
        field: "operating_starting_date",
        headerName: "Operating Starting Date",
        width: 100,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
      },
      {
        field: "printer",
        headerName: "Printer",
        width: 100,
        resizable: true,
      },
      {
        field: "printer_fixed_asset",
        headerName: "Fixed Asset No",
        width: 100,
        resizable: true,
      },
      {
        field: "printer_available",
        headerName: "Printer Available?",
        width: 100,
        sortable: true,
        resizable: true,
        cellRenderer: YesNoRenderer,
      },
      {
        field: "guarantee_amount",
        headerName: "Guarantee Amount",
        width: 120,
        resizable: true,
        // sortable: true,
        valueGetter: (params) =>
          params.data.dealer_guarantees?.[0]?.guarantee_amount || null,
        cellRenderer: CurrencyFormatter,
      },
      {
        field: "no_of_vehicles",
        headerName: "No of Vehicles",
        width: 100,
        resizable: true,
        valueGetter: (params) =>
          params.data.dealer_guarantees?.[0]?.no_of_vehicles || null,
        sortable: true,
      },
      {
        field: "start_date",
        headerName: "Start Date",
        width: 200,
        sortable: true,
        valueGetter: (params) =>
          params.data.dealer_guarantees?.[0]?.start_date || null,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        resizable: true,
      },
      {
        field: "end_date",
        headerName: "End Date",
        width: 200,
        sortable: true,
        valueGetter: (params) =>
          params.data.dealer_guarantees?.[0]?.end_date || null,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        resizable: true,
      },
      {
        field: "in_active",
        headerName: "Is Active?",
        width: 100,
        sortable: true,
        resizable: true,
        cellRenderer: YesNoRenderer,
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
      getDealers({
        firstFetch: true,
      })
    );
  }, [dispatch]);

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_param) {
        dispatch(
          getDealers({
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
      getDealers({
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
        <Typography color="text.primary">Dealer</Typography>
      </Breadcrumbs>
      <AdvancedSearch options={DEALER_SEARCH_OPTIONS} onSearch={handleSearch} />
      <DealerAppBar ids={dealers?.map((item) => item?.id)} />
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={dealers ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="DealerTableIndex"
          rowKey="id"
          agThemeStyle={{
            height: "calc(100vh - 170px)",
          }}
          onScrollBottomEnd={handleBodyScroll}
          loading={isLoading}
          getRowStyle={getRowStyle}
        />
         <CreateEditDealerModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        editFlag={true}
        editValues={editData}
      />
      <CreateEditDealerModal
        open={copyModalOpen}
        onClose={() => setCopyModalOpen(false)}
        editFlag={false}
        copyFlag={true}
        editValues={copyData}
      />
      </Paper>
    </Box>
  );
};

export default DealerIndex;
