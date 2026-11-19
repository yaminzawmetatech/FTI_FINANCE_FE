import * as React from "react";
import { Box, Paper, Breadcrumbs, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo, useEffect } from "react";
import AdvancedSearch from "components/form/AdvancedSearch";
import Table from "components/Table";
import { useSearchParams } from "react-router-dom";
import InsuranceCompanyTableRowMenu from "./InsuranceCompanyTableRowMenu";
import InsuranceCompanyAppBar from "./InsuranceCompanyAppBar";
import dayjs from "dayjs";
import { YesNoRenderer } from "common/YesNoRenderer";
import { getInsuranceCompaines } from "modules/loan-operation/slices/insuranceCompanySlice";
import { INSURANCE_COMPANY_SEARCH_OPTIONS } from "constants/searchOptions/insuranceCompanySearchOptions";

const InsuranceCompanyIndex = () => {
  const dispatch = useDispatch();

  const [params, setParams] = useSearchParams();

  const { insuranceCompanies, isLoading, next_page_param } = useSelector(
    (state) => state.insuranceCompanies
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
        width: 200,
        sortable: true,
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
        cellRenderer: InsuranceCompanyTableRowMenu,
        cellRendererParams: {},
        lockPinned: true,
      },
      {
        field: "address",
        headerName: "Address",
        width: 200,
        resizable: true,
      },
      {
        field: "contact_person",
        headerName: "Contact Person",
        width: 150,
        resizable: true,
      },
      {
        field: "pic_ph_no",
        headerName: "PIC Mobile Number",
        width: 150,
        resizable: true,
      },
      {
        field: "email",
        headerName: "Email",
        width: 200,
        resizable: true,
        valueGetter: (params) => {
          try {
            return JSON.parse(params.data.email).join(", ");
          } catch (error) {
            return params.data.email; 
          }
        }
      },
      
      {
        field: "email_code",
        headerName: "Email Coed",
        width: 100,
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
        firstFetch: true,
      })
    );
  }, [dispatch]);

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_param) {
        dispatch(
          getInsuranceCompaines({
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
      getInsuranceCompaines({
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
        <Typography color="text.primary">Insurance / Insurance Company Setup</Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={INSURANCE_COMPANY_SEARCH_OPTIONS}
        onSearch={handleSearch}
      />
      <InsuranceCompanyAppBar  ids={insuranceCompanies?.map((item)=>item.id)} />
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={insuranceCompanies ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="InsuranceCompanyTable"
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

export default InsuranceCompanyIndex;
