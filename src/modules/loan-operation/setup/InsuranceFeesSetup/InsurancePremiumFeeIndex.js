import * as React from "react";
import { Box, Paper, Breadcrumbs, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo, useEffect } from "react";
import AdvancedSearch from "components/form/AdvancedSearch";
import Table from "components/Table";
import { useSearchParams } from "react-router-dom";
import InsurancePremiumFeeTableRowMenu from "./InsurancePremiumFeeTableRowMenu";
import InsurancePremiumFeeAppBar from "./InsurancePremiumFeeAppBar";
import dayjs from "dayjs";
import { getInsuranceCompaines } from "modules/loan-operation/slices/insuranceCompanySlice";
import { INSURANCE_COMPANY_SEARCH_OPTIONS } from "constants/searchOptions/insuranceCompanySearchOptions";
import { getInsurancePremiumFees } from "modules/loan-operation/slices/insurancePremiumFeeSlice";
import { CurrencyFormatter } from "common/CurrencyFormatter";

const InsurancePremiumFeeIndex = () => {
  const dispatch = useDispatch();

  const [params, setParams] = useSearchParams();

  const { insurancePremiumFees, isLoading, next_page_param } = useSelector(
    (state) => state.insurancePremiumFees
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
        field: "insurance_company.name",
        headerName: "Insurance Company",
        width: 200,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "amount",
        headerName: "Amount",
        width: 200,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        headerName: "",
        field: "menu",
        width: 50,
        lockPosition: "left",
        pinned: "left",
        cellRenderer: InsurancePremiumFeeTableRowMenu,
        cellRendererParams: {},
        lockPinned: true,
      },
      {
        field: "vehicle.brand_info.brand_name",
        headerName: "Brand",
        width: 150,
        resizable: true,
      },
      {
        field: "vehicle.model_info.model_name",
        headerName: "Model",
        width: 150,
        resizable: true,
      },
      {
        field: "vehicle.category_info.name",
        headerName: "Category",
        width: 150,
        resizable: true,
      },
      {
        field: "vehicle.sub_category_info.name",
        headerName: "Sub Category",
        width: 150,
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
      getInsuranceCompaines({
        allFlag: true,
      })
    );
    dispatch(getInsurancePremiumFees({firstFetch: true}))
  }, [dispatch]);

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_param) {
        dispatch(
          getInsurancePremiumFees({
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
      getInsurancePremiumFees({
        params: {
          ...transformedSearchData,
        },
      })
    );
  };

  const getRowStyle = (params) => {
    const status = params?.data?.in_active;
    return status === 0 ? {background: "rgba(128, 128, 128, 0.1)"} : { };
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
        <Typography color="text.primary">Insurance</Typography>
        <Typography color="text.primary">Insurance / Insurance Premium Fee Setup</Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={INSURANCE_COMPANY_SEARCH_OPTIONS}
        onSearch={handleSearch}
      />
      <InsurancePremiumFeeAppBar  ids={insurancePremiumFees?.map((item)=>item.id)} />
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={insurancePremiumFees ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="InsurancePremiumFeeTable"
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

export default InsurancePremiumFeeIndex;
