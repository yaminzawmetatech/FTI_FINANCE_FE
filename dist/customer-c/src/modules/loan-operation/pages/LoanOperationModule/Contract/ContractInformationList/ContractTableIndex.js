import React, { useEffect, useState } from "react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Table from "components/Table";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { getContractList } from "modules/loan-operation/slices/contractSlice";
import ContractTableRowMenu from "./ContractTableRowMenu";
import ContractAppBar from "./ContractAppBar";
import { Breadcrumbs, Typography, Box, Paper } from "@mui/material";
import AdvancedSearch from "components/form/AdvancedSearch";
import { CONTRACT_SEARCH_OPTIONS } from "constants/searchOptions/contractSearchOptions";
import { CONTRACT_STATUS } from "constants/contractStatus";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import { useParams } from "react-router";

const ContractTable = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();
  const { mode } = useParams();

  const auth = useSelector((state) => state.auth.user);

  const { contracts, next_page_param, isLoading } = useSelector(
    (state) => state.contracts
  );

  const contractsParam = {
    is_generated_gl: 1,
  };

  const rowData = contracts || [];



  useEffect(() => {
    const queryParams = {
      ...contractsParam,
      ...(auth?.user_group === "CMCO" && { application_created_by: auth?.id }), // conditionally add created_by
      ...(mode === "mob-contract" && {mob_status : 1})
    };

    dispatch(
      getContractList({
        firstFetch: true,
        params: queryParams,
      })
    );
  }, [dispatch, auth]);


  const defaultColDef = useMemo(
    () => ({
      valueSetter: (params) => { },
    }),
    []
  );

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
        field: "generated_application_id",
        headerName: "ApplicationID",
        width: 130,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "application.application_info.mnet_application_id",
        headerName: "MNET ApplicationID",
        width: 130,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "application.application_info.customer_loan_id",
        headerName: "Customer Loan ID",
        width: 130,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "application.application_info.kpay_id",
        headerName: "Kpay ID",
        width: 130,
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
        cellRenderer: ContractTableRowMenu,
        cellRendererParams: {},
        lockPinned: true,
      },
      {
        field: "disbursement_date",
        headerName: "Disbursed Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
        width: 180,
        sortable: true,
        resizable: true,
      },
      {
        field: "application.name_of_emp_or_business",
        headerName: "Name Of Business",
        width: 120,
        sortable: true,
        resizable: true,
      },
      {
        field: "interest_first_installment_prorata_interest",
        headerName: "Prorata Interest",
        valueFormatter: CurrencyFormatter,
        width: 120,
        sortable: true,
        resizable: true,
      },
      {
        field: "first_due_date",
        headerName: "First Due Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        width: 100,
        sortable: true,
        resizable: true,
      },
      {
        field: "monthly_installment_amount",
        headerName: "Monthly Installment",
        valueFormatter: CurrencyFormatter,
        width: 120,
        sortable: true,
        resizable: true,
      },
      {
        field: "category.name",
        headerName: "Category",
        width: 100,
        resizable: true,
      },
      {
        field: "sub_category.name",
        headerName: "Sub Category",
        width: 100,
        resizable: true,
      },
      {
        field: "application.applicant_name",
        headerName: "Applicant Name",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "application.credit_scheme.name",
        headerName: "Credit Scheme",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "application.nrc",
        headerName: "NRC Number",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "living_phone_number",
        headerName: "Living Phone Number",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "application.loan_amount",
        headerName: "Loan Amount",
        width: 100,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "loan_amount",
        headerName: "Approved Amount",
        width: 100,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "application.application_info.mnet_township",
        headerName: "MNET Township",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "application.address_township.name",
        headerName: "Customer Current Township",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "application.address_ward.name",
        headerName: "Customer Current Ward",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "contract_status",
        headerName: "Contract Status",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "overdue_status",
        headerName: "Overdue Status",
        width: 150,
        sortable: true,
        resizable: true,
        valueFormatter: (params) => {
          if (params.value == null || params.value === "") {
            return "";
          }
          return `Overdue ${params.value}`;
        },
      },     
      {
        field: "applied_date",
        headerName: "Applied Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
        width: 200,
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
        getContractList({
          params: next_page_param,
          firstFetch: false,
          is_generated_gl: 1,
          ...(auth?.user_group === "CMCO" && { created_by: auth?.id }), // conditionally add created_by
        })
      );
    }
  }, [dispatch, next_page_param, auth]);

  const [filterBy, setFilterBy] = useState();

  const handleSearch = (searchData) => {
    const transformedSearchData = {};

    searchData.forEach((item) => {
      if (item.filtered_by === "disbursed_date"){
        const startOfDay = `${item.value1}T00:00:00`;
        const endOfDay = `${item.value2}T23:59:59`;
        transformedSearchData[`${item.filtered_by}_from_date`] = startOfDay;
        transformedSearchData[`${item.filtered_by}_to_date`] = endOfDay;
      }
      else if (item.type === "date") {
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
      getContractList({
        params: {
          is_generated_gl: 1,
          ...transformedSearchData,
          ...(auth?.user_group === "CMCO" && { created_by: auth?.id }), // conditionally add created_by
        },
      })
    );
  };


  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" className="margin-top-8">
        <Typography color="text.primary">Loan Operation</Typography>
        <Typography color="text.primary">Contract</Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={CONTRACT_SEARCH_OPTIONS}
        status={CONTRACT_STATUS}
        onSearch={handleSearch}
      />
      <ContractAppBar contractIds={contracts.map((contract) => contract.id)} transformedSearchData={filterBy} auth={auth} />
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={rowData ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="ContractTable"
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

export default React.memo(ContractTable);
