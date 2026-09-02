import React, {useMemo} from "react";
import {Box} from "@mui/material";
import Accordion from "components/Accordion";
import Table from "components/Table";
import dayjs from "dayjs";
import {useSearchParams} from "react-router-dom";
import ActualPaymentSubPageExportButton from "./ActualPaymentSubPageExportButton";
import ActualPaymentLinesRowMenu from "./ActualPaymentLinesRowMenu";
import {CurrencyFormatter} from "common/CurrencyFormatter";
import { YesNoRenderer } from "common/YesNoRenderer";

const ActualPaymentLines = ({isLoading, contract}) => {
    const [params, setParams] = useSearchParams();

    const defaultColDef = useMemo(
        () => ({
            valueSetter: (params) => {
            },
        }),
        []
    );

    const DisabledCheckboxRenderer = ({value}) => (
        <input
            type="checkbox"
            style={{width: "20px", height: "15px"}}
            disabled
            checked={value === 'paid'}
        />
    );

    const applicationId = contract?.application?.application_id;

    const modifiedRowData = contract?.actual_payment_lines?.map((row) => ({
        ...row,
        application_id: applicationId,
        category_name: contract?.category?.name,
        sub_category_name: contract?.sub_category?.name,
    }));

    const columnDefs = useMemo(
        () => [
          {
            field: "row",
            headerName: "Line No",
            valueGetter: "node.rowIndex + 1",
            width: 50,
            sortable: true,
            resizable: true,
          },
          {
            field: "eom",
            width: 80,
            headerName: "EOM",
            suppressMenu: true,
            sortable: false,
            resizable: false,
            cellRenderer: DisabledCheckboxRenderer,
          },
          {
            field: "rev_eom",
            width: 80,
            headerName: "Rev EOM",
            suppressMenu: true,
            sortable: false,
            resizable: false,
            cellRenderer: DisabledCheckboxRenderer,
          },
          {
            field: "application_id",
            width: 100,
            headerName: "Applicant ID",
            sortable: false,
            resizable: true,
            lockPosition: "left",
            pinned: "left",
          },
          {
            field: "status",
            width: 80,
            headerName: "Paid",
            suppressMenu: true,
            sortable: false,
            resizable: false,
            lockPosition: "left",
            pinned: "left",
            lockPinned: true,
            cellRenderer: DisabledCheckboxRenderer,
          },
          {
            field: "status",
            width: 100,
            headerName: "Status",
            sortable: false,
            resizable: true,
            lockPosition: "left",
            pinned: "left",
            valueFormatter: (params) =>
              params.value && params.value.toString().toUpperCase(),
          },
          {
            headerName: "",
            field: "menu",
            width: 50,
            lockPosition: "left",
            pinned: "left",
            cellRenderer: ActualPaymentLinesRowMenu,
            cellRendererParams: {},
            lockPinned: true,
          },
          {
            field: "tenor",
            headerName: "Tenor",
            width: 70,
            sortable: false,
            resizable: true,
          },
          {
            field: "monthly_installment",
            headerName: "Monthly Installment",
            width: 100,
            sortable: false,
            resizable: true,
            valueFormatter: CurrencyFormatter,
          },
          {
            field: "due_date",
            headerName: "Due Date",
            valueFormatter: (params) =>
              params.value && dayjs(params.value).format("YYYY-MM-DD"),
            width: 120,
            sortable: true,
            resizable: true,
          },
          {
            field: "principal",
            headerName: "Principal",
            width: 100,
            sortable: false,
            resizable: true,
            valueFormatter: CurrencyFormatter,
          },
          {
            field: "interest",
            headerName: "Interest",
            width: 100,
            sortable: false,
            resizable: true,
            valueFormatter: CurrencyFormatter,
          },
          {
            field: "prorata_interest",
            headerName: "Prorata Interest",
            width: 100,
            sortable: false,
            resizable: true,
            valueFormatter: CurrencyFormatter,
          },
    
          {
            field: "prorata_for_disbursed_date_to_eom",
            headerName: "Prorata Interest (Disbursed to EOM)",
            width: 100,
            sortable: false,
            resizable: true,
            valueFormatter: CurrencyFormatter,
          },
          {
            field: "prorata_for_bom_to_due",
            headerName: "Prorata Interest (BOM to Tenor-0 DUE)",
            width: 100,
            sortable: false,
            resizable: true,
            valueFormatter: CurrencyFormatter,
          },
          {
            field: "prorata_for_same_month",
            headerName: "Prorata Interest (For Same Month)",
            width: 100,
            sortable: false,
            resizable: true,
            valueFormatter: CurrencyFormatter,
          },
          {
            field: "daily_interest",
            width: 100,
            headerName: "Daily Interest",
            sortable: false,
            resizable: true,
            valueFormatter: CurrencyFormatter,
          },
          {
            field: "accrued_interest",
            width: 100,
            headerName: "Accrued Interest",
            sortable: false,
            resizable: true,
            valueFormatter: CurrencyFormatter,
          },
    
          {
            field: "interest_income",
            width: 100,
            headerName: "Interest Income",
            sortable: false,
            resizable: true,
            valueFormatter: CurrencyFormatter,
          },
          {
            field: "total_interest",
            width: 100,
            headerName: "Total Interest",
            sortable: false,
            resizable: true,
            valueFormatter: CurrencyFormatter,
          },
          {
            field: "outstanding_principal",
            headerName: "Outstanding Principal",
            width: 150,
            sortable: false,
            resizable: true,
            valueFormatter: CurrencyFormatter,
          },
          {
            field: "accrued_interest_for_prorata_interest_for_amortization",
            headerName: "Accrued Interest with Prorata Interest",
            width: 100,
            sortable: false,
            resizable: true,
            valueFormatter: CurrencyFormatter,
          },
          {
            field: "accrued_interest_from_due_to_eom_for_amortization",
            headerName: "Accrued Interest Due to End",
            width: 100,
            sortable: false,
            resizable: true,
            valueFormatter: CurrencyFormatter,
          },
          {
            field: "accrued_interest_from_som_to_due_for_amortization",
            headerName: "Accrued Interest Start to Due",
            width: 100,
            sortable: false,
            resizable: true,
            valueFormatter: CurrencyFormatter,
          },
          {
            field: "amortization_origination_income",
            headerName: "Amortization Origination Income",
            width: 100,
            sortable: false,
            resizable: true,
            valueFormatter: CurrencyFormatter,
          },
          {
            field: "amortization_origination_income_for_before_tenor_zero_month",
            headerName: "Amortization Origination Income For Before Tenor Zero Due",
            width: 100,
            sortable: false,
            resizable: true,
            valueFormatter: CurrencyFormatter,
          },
          {
            field: "total_interest_for_origination_fee",
            headerName: "Total Interest For Origination (Amortization)",
            width: 100,
            sortable: false,
            resizable: true,
            valueFormatter: CurrencyFormatter,
          },
          {
            field: "outstanding_ttl_amount",
            headerName: "Outstanding TTL",
            width: 150,
            sortable: false,
            resizable: true,
            valueFormatter: CurrencyFormatter,
          },
          // {
          //   field: "remaining_amount",
          //   headerName: "Remaining Amount",
          //   width: 200,
          //   sortable: false,
          //   resizable: true,
          //   valueFormatter: CurrencyFormatter,
          // },
          {
            field: "total_penalty_fee",
            width: 120,
            headerName: "Total Penalty",
            sortable: false,
            resizable: false,
            valueFormatter: CurrencyFormatter,
          },
          {
            field: "penalty_fee",
            width: 120,
            headerName: "Cumulative Penalty",
            sortable: false,
            resizable: false,
            valueFormatter: CurrencyFormatter,
          },
          {
            field: "overdue_day",
            width: 120,
            headerName: "Total Overdue Days",
            sortable: false,
            resizable: true,
          },
          {
            field: "overdue_day_by_tenor",
            width: 120,
            headerName: "Cumulative Penalty Days",
            sortable: false,
            resizable: true,
          },
          {
            field: "received_penalty",
            headerName: "Received Penalty",
            width: 150,
            sortable: false,
            resizable: true,
            valueFormatter: CurrencyFormatter,
          },
          {
            field: "all_waived",
            headerName: "All Waived",
            width: 110,
            sortable: false,
            resizable: true,
          },
          {
            field: "remaining_waived",
            headerName: "Remaining Waived",
            width: 150,
            sortable: false,
            resizable: true,
          },
          {
            field: "is_all_waived",
            headerName: "Is All Waived?",
            width: 130,
            sortable: true,
            resizable: true,
            cellRenderer: YesNoRenderer,
          },
          {
            field: "days",
            width: 100,
            headerName: "Days",
            sortable: false,
            resizable: true,
          },
        //   {
        //     field: "created_at",
        //     headerName: "Created Date",
        //     width: 200,
        //     sortable: true,
        //     valueFormatter: (params) =>
        //       params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
        //     resizable: true,
        //   },
        //   {
        //     field: "created_user.user_name",
        //     headerName: "Created By",
        //     width: 200,
        //     resizable: true,
        //   },
        //   {
        //     field: "updated_at",
        //     headerName: "Modified Date",
        //     width: 200,
        //     sortable: true,
        //     resizable: true,
    
        //     valueFormatter: (params) =>
        //       params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
        //   },
        //   {
        //     field: "modified_user.user_name",
        //     headerName: "Modified By",
        //     width: 200,
        //     resizable: true,
        //   },
          {
            field: "category_name",
            width: 100,
            headerName: "Category Code",
            sortable: false,
            resizable: true,
          },
          {
            field: "sub_category_name",
            width: 100,
            headerName: "Sub Category Code",
            sortable: false,
            resizable: true,
          },
        ],
        []
      );

    return (
        <Accordion title="Actual Payment Sub. Page">
            <ActualPaymentSubPageExportButton contract={contract}/>
            <Box sx={{mt: 1}}>
                <Table
                    searchParams={params}
                    setSearchParams={setParams}
                    rowData={modifiedRowData ?? []}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    name="ActualPaymentLinesTableList"
                    rowKey="id"
                    agThemeStyle={{
                        height: "calc(100vh - 400px)",
                    }}
                    suppressCopyRowsToClipboard={true}
                    enableRangeSelection={true}
                    copyHeadersToClipboard={true}
                    loading={isLoading}
                />
            </Box>
        </Accordion>
    );
};

export default ActualPaymentLines;
