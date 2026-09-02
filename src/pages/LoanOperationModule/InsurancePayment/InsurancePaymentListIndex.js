import React, { useEffect, useState } from "react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Table from "components/Table";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { getContracts } from "features/contract/contractSlice";
import { Breadcrumbs, Typography, Box, Paper } from "@mui/material";
import { useParams } from "react-router";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import AdvancedSearch from "components/form/AdvancedSearch";
import InsurancePaymentAppBar from "./InsurancePaymentAppBar";
import { INSURANCE_PAYMENT_OPTIONS } from "constants/searchOptions/insurancePaymentOptions";

const ReportTable = () => {
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const [params, setParams] = useSearchParams();

  const { contracts, next_page_param, isLoading } = useSelector(
    (state) => state.contracts
  );

  useEffect(() => {
    dispatch(
      getContracts({
        firstFetch: true,
        params: {
          category_id: categoryId,
          insurance_status: "open",
          is_generated_gl: true,
          mob_status: 1,
          // Changed approach - use explicit filter
          filters: JSON.stringify({
            insurance_amount: { $gt: 0 }
          })
        },
      })
    );
  }, [dispatch, categoryId]);

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_param) {
        dispatch(
          getContracts({
            params: next_page_param,
            firstFetch: false,
            mob_status:1,
            filters: JSON.stringify({
              insurance_amount: { $gt: 0 }
            })
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

  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectionChanged = useCallback((rows) => {
    setSelectedRows(rows);
  }, []);

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
        width: 150,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      // {
      //   field: "mnet_application_id",
      //   headerName: "MNet ID",
      //   width: 100,
      //   sortable: true,
      //   resizable: true,
      //   pinned: "left",
      //   lockPosition: "left",
      //   lockPinned: true,
      // },
      // {
      //   field: "customer_loan_id",
      //   headerName: "Customer Loan ID",
      //   width: 100,
      //   sortable: true,
      //   resizable: true,
      //   pinned: "left",
      //   lockPosition: "left",
      //   lockPinned: true,
      // },
      // {
      //   field: "kpay_id",
      //   headerName: "Kpay ID",
      //   width: 100,
      //   sortable: true,
      //   resizable: true,
      //   pinned: "left",
      //   lockPosition: "left",
      //   lockPinned: true,
      // },
      {
        field: "disbursement_date",
        headerName: "Disbursed Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "loan_amount",
        headerName: "Approved Amount",
        width: 150,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
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
        field: "ihco_name",
        headerName: "IHCO",
        width: 200,
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
        field: "application.nrc",
        headerName: "NRC Number",
        width: 200,
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
        field: "application.created_at",
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
        field: "application.updated_at",
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

  const uniqueCategoryIds = [
    ...new Set(contracts.map((app) => app.category_id)),
  ];

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
      getContracts({
        params: {
          insurance_status: "open",
          is_generated_gl: true,
          ...transformedSearchData,
          mob_status:1,
          filters: JSON.stringify({
            insurance_amount: { $gt: 0 }
          })
        },
      })
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" className="margin-top-8">
        <Typography color="text.primary">Loan Operation</Typography>
        <Typography color="text.primary">Insurance Payment</Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={INSURANCE_PAYMENT_OPTIONS}
        onSearch={handleSearch}
      />
      <InsurancePaymentAppBar
        applicationIds={contracts.map((app) => app.id)}
        categoryId={uniqueCategoryIds}
        selectedRows={selectedRows}
      />
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={contracts ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="InsurancePaymentList"
          rowKey="id"
          agThemeStyle={{
            height: "calc(100vh - 210px)",
          }}
          onScrollBottomEnd={handleBodyScroll}
          loading={isLoading}
          onSelectionChanged={handleSelectionChanged}
          rowSelection={"multiple"}
          rowMultiSelectWithClickFlag={"true"}
        />
      </Paper>
    </Box>
  );
};

export default React.memo(ReportTable);
