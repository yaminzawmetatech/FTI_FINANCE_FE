import React, { useEffect } from "react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Table from "components/Table";
import { useDispatch, useSelector } from "react-redux";
import { getApplication } from "modules/credit-management/slices/applicationSlice";
import dayjs from "dayjs";
import ReportAppBar from "./WaveMoneyReportAppBar";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import AdvancedSearch from "components/form/AdvancedSearch";
import { Breadcrumbs, Typography, Box, Paper, Chip } from "@mui/material";
import { WAVE_MONEY_REPORT_SEARCH_OPTIONS } from "constants/searchOptions/waveMoneyReportSearchOptions";

const ReportTable = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();

  const { applications, next_page_param, isLoading } = useSelector(
    (state) => state.application
  );

  const  APPLICATION_STATUS = [
    {id: "Approved", name: "Approved"},
    {id: "Rejected", name: "Rejected"},
    {id: "Application Cancel", name: "Application Cancel"},
  ];

  useEffect(() => {
    dispatch(
      getApplication({
        firstFetch: false,
        params: {
          extra: 1,
        },
      })
    );
  }, [dispatch]);

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_param) {
        dispatch(
          getApplication({
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

  const ChipRenderer = (props) => {
    if (props?.data?.application_guarantors?.length === 0) {
      return null;
    }

    const data_arr = props?.data?.application_guarantors;

    return (
      <Box
        display="flex"
        flexDirection="column"
        gap={1}
        sx={{ marginBottom: "5px", marginTop: "3px" }}
      >
        {data_arr?.map((value, index) => {
          if (
            props.colDef.field === "reference_name" &&
            value.type === "reference"
          ) {
            return <Chip key={index} label={value?.guarantor?.full_name} />;
          }
          if (
            props.colDef.field === "reference_number" &&
            value.type === "reference"
          ) {
            return (
              <Chip key={index} label={value?.guarantor?.primary_phone_no} />
            );
          }
          return null;
        })}
      </Box>
    );
  };

  // link to application or contract
  const LinkCellRenderer = ({ value, data }) => {
    const url = data?.contract ? `/contracts/${data?.contract.uuid}/view` : `/CreditManagement/CreateApplicationInformation/${data?.category.name}/${data?.category_id}/${data?.uuid}/${data?.id}/view`;
    return (
      <a href={url} target="_blank" style={{ textDecoration: "underline" }}>
        {value}
      </a>
    );
  };

  // link to facebook amount
  const LinkCellRendererFacebook = ({ value, data }) => {
    const url = value;
    return (
      <a href={url} target="_blank" style={{ textDecoration: "underline" }}>
        {value}
      </a>
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
      // {
      //   field: "application_id",
      //   headerName: "Application ID",
      //   width: 120,
      //   sortable: true,
      //   resizable: true,
      //   pinned: "left",
      //   lockPosition: "left",
      //   lockPinned: true,
      //   cellRenderer: LinkCellRenderer,
      // },
      {
        field: "application_info.customer_loan_id",
        headerName: "Customer Loan ID",
        width: 110,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
        cellRenderer: LinkCellRenderer,
      },
      {
        field: "applied_date",
        headerName: "Application Date",
        width: 120,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
        sortable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
      },
      {
        field: "application_info.wave_pay_id_mobile",
        headerName: "WavePay ID Mobile",
        width: 120,
        resizable: true,
        sortable: true,
      },
      {
        field: "application_info.wave_pay_account_name",
        headerName: "WavePay Account Name",
        width: 110,
        resizable: true,
        sortable: true,
      },
      {
        field: "application_info.mobile_operator_type",
        headerName: "Mobile Operator Type",
        width: 100,
        resizable: true,
        sortable: true,
      },
      {
        field: "application_info.length_of_wave_amount_mth",
        headerName: "Length of Wave Account (Mth)",
        width: 100,
        resizable: true,
        sortable: true,
      },
      {
        field: "application_info.length_of_kyc2_mth",
        headerName: "Length of KYC2(Mth)",
        width: 110,
        resizable: true,
        sortable: true,
      },
      {
        field: "applicant_name",
        headerName: "Name",
        width: 150,
        resizable: true,
        sortable: true,
      },
      {
        field: "application_info.mnet_applicant_nrc",
        headerName: "Wave NRC",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "date_of_birth",
        headerName: "DOB",
        width: 100,
        sortable: true,
        resizable: true,
      },
      {
        field: "father_name",
        headerName: "Father's Name",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "secondary_phone_number",
        headerName: "Second Phone Number",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "viber_number",
        headerName: "Viber Number",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "facebook_account",
        headerName: "Facebook",
        width: 150,
        sortable: true,
        resizable: true,
        cellRenderer: LinkCellRendererFacebook,
      },
      {
        field: "address_full_address",
        headerName: "Current Address",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "type_of_employment",
        headerName: "Type of Employment",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "name_of_emp_or_business",
        headerName: "Name of Business/Company",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "main_business_category.bc1_name",
        headerName: "Business Category",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "reference_name",
        headerName: "Reference Name",
        width: 160,
        sortable: true,
        resizable: true,
        autoHeight: true,
        cellRenderer: ChipRenderer,
      },
      {
        field: "reference_number",
        headerName: "Reference Number",
        width: 130,
        sortable: true,
        resizable: true,
        autoHeight: true,
        cellRenderer: ChipRenderer,
      },
      {
        field: "loan_amount",
        headerName: "Loan Amount",
        width: 130,
        sortable: true,
        resizable: true,
        valueGetter: (params) => {
          return params.data?.contract?.loan_amount ?? params.data.loan_amount;
        },
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "tenor",
        headerName: "Tenor",
        width: 80,
        sortable: true,
        resizable: true,
        valueGetter: (params) => {
          return params.data?.contract?.tenor ?? params.data.loan_term_duration;
        },
      },
      {
        field: "processing_amount",
        headerName: "Application Fees",
        width: 110,
        sortable: true,
        resizable: true,
        valueGetter: (params) => {
          return (
            params.data?.contract?.processing_amount ??
            params.data.processing_fees
          );
        },
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "stamp_duty_amount",
        headerName: "Stamp Duty Amount",
        width: 130,
        sortable: true,
        resizable: true,
        valueGetter: (params) => {
          return (
            params.data?.contract?.stamp_duty_amount ??
            params.data.stamp_duty_fees
          );
        },
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "interest_first_installment_prorata_interest",
        headerName: "First Interest Amount",
        width: 150,
        sortable: true,
        resizable: true,
        valueGetter: (params) => {
          return (
            params.data?.contract
              ?.interest_first_installment_prorata_interest ??
            params.data.prorata_interest
          );
        },
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "first_due_date",
        headerName: "Repayment Date",
        width: 130,
        sortable: true,
        resizable: true,
        valueGetter: (params) => {
          return (
            params.data?.contract?.first_due_date ?? params.data.first_due_date
          );
        },
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
      },
      {
        field: "net_disbursed_amount",
        headerName: "Net Disbursement Amount",
        width: 150,
        sortable: true,
        resizable: true,
        valueGetter: (params) => {
          return (
            params.data?.contract?.net_disbursed_amount ??
            params.data.net_disbursement_amount
          );
        },
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "loan_repayment_amount",
        headerName: "Loan Repayment Amount",
        width: 150,
        sortable: true,
        resizable: true,
        valueGetter: (params) => {
          return (
            params.data?.contract?.monthly_installment_amount ??
            params.data.monthly_installment
          );
        },
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "purpose_of_loan",
        headerName: "Purpose of Loan",
        width: 150,
        sortable: true,
        resizable: true,
      },
    ],
    []
  );

  const handleSearch = (searchData) => {
    const transformedSearchData = {};

    searchData.forEach((item) => {
      if (item.type === "date" || item.type === "date_time") {
        transformedSearchData[`${item.filtered_by}_from_date`] = item.value1;
        transformedSearchData[`${item.filtered_by}_to_date`] = item.value2;
      } else if (item.type === "autocomplete_status") {
        transformedSearchData[item.filtered_by] = JSON.stringify(item.value1);
      } else {
        transformedSearchData[item.filtered_by] = item.value1;
      }
    });

    dispatch(
      getApplication({
        params: {
          extra: 1,
          ...transformedSearchData,
        },
      })
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" className="margin-top-8">
        <Typography color="text.primary">Loan Operation Module</Typography>
        <Typography color="text.primary">Wave Money Report</Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={WAVE_MONEY_REPORT_SEARCH_OPTIONS}
        onSearch={handleSearch}
        status={APPLICATION_STATUS}
      />
      <ReportAppBar applicationIds={applications?.map((app) => app.id)} />
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={applications ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="WMReportTableIndex"
          rowKey="id"
          agThemeStyle={{
            height: "calc(100vh - 170px)",
          }}
          onScrollBottomEnd={handleBodyScroll}
          ChipRenderer={ChipRenderer}
          loading={isLoading}
          LinkCellRenderer={LinkCellRenderer}
        />
      </Paper>
    </Box>
  );
};

export default React.memo(ReportTable);
