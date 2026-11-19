import * as React from "react";
import { Box, Paper, Breadcrumbs, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo, useEffect } from "react";
import AdvancedSearch from "components/form/AdvancedSearch";
import Table from "components/Table";
import { useSearchParams } from "react-router-dom";
import DealerBankTableRowMenu from "./DealerBankTableRowMenu";
import dayjs from "dayjs";
import { getDealerBanks } from "modules/loan-operation/slices/dealerBankSlice";
import { DEALER_BANK_SEARCH_OPTIONS } from "constants/searchOptions/dealerBankSearchOptions";
import { YesNoRenderer } from "common/YesNoRenderer";
import DealerBankAppBar from "./DealerBankAppBar";

const DealerBankIndex = () => {
  const dispatch = useDispatch();

  const [params, setParams] = useSearchParams();

  const { dealerBanks, isLoading, next_page_param } = useSelector(
    (state) => state.dealerBanks
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
        field: "bank_account_no",
        headerName: "Bank Account No",
        width: 200,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "beneficiary_id",
        headerName: "Beneficiary Id",
        width: 200,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "beneficiary_name",
        headerName: "Beneficiary Name",
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
        cellRenderer: DealerBankTableRowMenu,
        cellRendererParams: {},
        lockPinned: true,
      },
      {
        field: "contact_no",
        headerName: "Contact No",
        width: 200,
        resizable: true,
      },
      {
        field: "name",
        headerName: "Name",
        width: 200,
        resizable: true,
        valueGetter: (params) =>
          params.data?.dealer_contact_person?.name || params.data?.dealer?.owner_name,
      },
      {
        field: "dealer.name",
        headerName: "Dealer",
        width: 100,
        sortable: true,
        resizable: true,
      },
      {
        field: "dealer_contact_person.name",
        headerName: "Dealer Contact Person",
        width: 100,
        resizable: true,
      },
      {
        field: "company_name",
        headerName: "Company Name",
        width: 200,
        resizable: true,
      },
      {
        field: "address",
        headerName: "Address",
        width: 200,
        resizable: true,
      },
      {
        field: "email",
        headerName: "Email",
        width: 200,
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
        field: "remark",
        headerName: "Remark",
        width: 200,
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

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = useCallback(() => {
    dispatch(
      getDealerBanks({
        firstFetch: true,
      })
    );
  }, [dispatch]);

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_param) {
        dispatch(
          getDealerBanks({
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
      getDealerBanks({
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
        <Typography color="text.primary">Dealer / Dealer Bank</Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={DEALER_BANK_SEARCH_OPTIONS}
        onSearch={handleSearch}
      />
      <DealerBankAppBar ids={dealerBanks?.map((item)=> item.id)} />
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={dealerBanks ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="DealerBankList"
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

export default DealerBankIndex;
