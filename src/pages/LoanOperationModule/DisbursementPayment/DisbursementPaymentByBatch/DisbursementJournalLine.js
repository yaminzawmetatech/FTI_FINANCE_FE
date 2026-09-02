import React, { useMemo, useEffect, useState } from "react";
import { Box } from "@mui/material";
import Accordion from "components/Accordion";
import Table from "components/Table";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Tooltip from "@mui/material/Tooltip";
import { useParams } from "react-router-dom";
import DisbursementJournalLineExcelExportButton from "./DisbursementJournalLineExcelExportButton";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import { Skeleton } from "@mui/lab";
import openNewWindow from "utils/windowUtils";
import DisbursementPaymentTableRowMenu from "./DisbursementPaymentTableRowMenu";

const DisbursementJournalLine = ({
  updatedBookings,
  handleButtonClick,
  isContractsLoading,
  isShowRemove,
  stampDutyPayments,
  bookings,
  disbursementPayments,
  projectCategories
}) => {
  const [params, setParams] = useSearchParams();
  const { category } = useParams();
  const [data, setData] = useState([]);

  const defaultColDef = useMemo(
    () => ({
      valueSetter: (params) => {},
    }),
    []
  );


  useEffect(() => {
    const categoryId = disbursementPayments?.category_id ?? parseInt(category);

    const currentCategory = projectCategories.find(
      (item) => item.id === categoryId
    );

    let temp_arr = updatedBookings?.map((item, index) => ({
      ...item,
      application:
        item?.application ??
        disbursementPayments?.disbursement_payment_books[index]?.booking_process
          ?.application,
      contract:
        item?.contract ??
        disbursementPayments?.disbursement_payment_books[index]?.booking_process
          ?.contract,
      net_disbursed_amount:
        (item?.contract?.net_disbursed_amount || 0) ??
        (disbursementPayments?.disbursement_payment_books[index]
          ?.booking_process?.contract?.net_disbursed_amount ||
          0),

      customer_disbursed_amount:
        (item?.contract?.customer_disbursed_amount || 0) ??
        (disbursementPayments?.disbursement_payment_books[index]
          ?.booking_process?.contract?.customer_disbursed_amount ||
          0),

      // dealer_disbursed_amount:
      //   (item?.total_amount > 0
      //     ? item?.total_amount
      //     : item?.contract?.loan_amount) ??
      //   (disbursementPayments?.disbursement_payment_books[index]
      //     ?.booking_process?.application?.application_info?.total_amount > 0
      //     ? disbursementPayments?.disbursement_payment_books[index]
      //         ?.booking_process?.application?.application_info?.total_amount
      //     : disbursementPayments?.disbursement_payment_books[index]
      //         ?.booking_process?.contract?.loan_amount),

      dealer_disbursed_amount:
      currentCategory?.is_loan_operation_skipped === 1
        ? (
            item?.contract?.net_disbursed_amount ??
            disbursementPayments?.disbursement_payment_books[index]
              ?.booking_process?.contract?.net_disbursed_amount ??
            0
          )
        : (
            (item?.total_amount > 0
              ? item.total_amount
              : item?.contract?.loan_amount) ??
            (
              disbursementPayments?.disbursement_payment_books[index]
                ?.booking_process?.application?.application_info?.total_amount > 0
                ? disbursementPayments?.disbursement_payment_books[index]
                    ?.booking_process?.application?.application_info?.total_amount
                : disbursementPayments?.disbursement_payment_books[index]
                    ?.booking_process?.contract?.loan_amount
            )
          ),

      dealer_bank_account_no:
        (item?.contract?.dealer_bank_account_no || "") ??
        (disbursementPayments?.disbursement_payment_books[index]
          ?.booking_process?.contract?.dealer_bank_account_no ||
          ""),

      customer_bank_account_name:
        (item?.contract?.customer_bank_account_name || "") ??
        (disbursementPayments?.disbursement_payment_books[index]
          ?.booking_process?.contract?.customer_bank_account_name ||
          ""),

      dealer_bank_account_name:
        (item?.contract?.dealer_bank_account_name || "") ??
        (disbursementPayments?.disbursement_payment_books[index]
          ?.booking_process?.contract?.dealer_bank_account_name ||
          ""),

      customer_bank_payment_channel:
        (item?.contract?.customer_bank_payment_channel || "") ??
        (disbursementPayments?.disbursement_payment_books[index]
          ?.booking_process?.contract?.customer_bank_payment_channel ||
          ""),

      dealer_bank_payment_channel:
        (item?.contract?.dealer_bank_payment_channel || "") ??
        (disbursementPayments?.disbursement_payment_books[index]
          ?.booking_process?.contract?.dealer_bank_payment_channel ||
          ""),

      commission:
        item?.commission ??
        disbursementPayments?.disbursement_payment_books[index]?.booking_process
          ?.commission,
      commission_amount:
        item?.commission_amount ??
        disbursementPayments?.disbursement_payment_books[index]?.booking_process
          ?.commission_amount,
      // approved_date: item?.approved_date ??
      // disbursementPayments?.disbursement_payment_books[index]?.booking_process?.approved_date,
      approved_user:
        item?.approved_by ??
        disbursementPayments?.disbursement_payment_books[index]?.booking_process
          ?.approved_user,
      created_user:
        item?.created_user ??
        disbursementPayments?.disbursement_payment_books[index]?.booking_process
          ?.created_user,
      modified_user:
        item?.modified_user ??
        disbursementPayments?.disbursement_payment_books[index]?.booking_process
          ?.modified_user,
      booking_status:
        item?.booking_status ??
        disbursementPayments?.disbursement_payment_books[index]?.booking_process
          ?.booking_status,
      is_posted: disbursementPayments?.is_posted,
      posting_date: disbursementPayments?.posting_date,
    }));

    setData(temp_arr);
  }, [updatedBookings, disbursementPayments,projectCategories,category]);

  const buttonRenderer = (params) => {
    const rowData = params.data;

    return (
      <Tooltip title="Remove" placement="top-start">
        <DeleteOutlinedIcon
          onClick={() => handleButtonClick(rowData)}
          style={{ cursor: "pointer", color: "gray" }}
        />
      </Tooltip>
    );
  };

  const DisabledCheckboxRenderer = ({ value }) => (
    <input
      type="checkbox"
      style={{ width: "20px", height: "15px" }}
      disabled
      checked={value}
    />
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
        field: "application.application_id",
        headerName: "ApplicationID",
        width: 130,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      // {
      //   field: "application_id",
      //   headerName: "ApplicationID",
      //   width: 130,
      //   sortable: true,
      //   resizable: true,
      //   pinned: "left",
      //   lockPosition: "left",
      //   lockPinned: true,
      // },
      // {
      //   field: "contract.id",
      //   headerName: "ContractID",
      //   width: 130,
      //   sortable: true,
      //   resizable: true,
      //   pinned: "left",
      //   lockPosition: "left",
      //   lockPinned: true,
      // },
      {
        field: "application.name_of_emp_or_business",
        headerName: "Name Of Business",
        width: 180,
        sortable: true,
        resizable: true,
      },
      {
        field: "contract.net_disbursed_amount",
        headerName: "Net Disbursed Amount",
        width: 180,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      // {
      //   field: "contract.customer_disbursed_amount",
      //   headerName: "Customer Disbursed Amount",
      //   width: 180,
      //   sortable: true,
      //   resizable: true,
      //   valueFormatter: CurrencyFormatter,
      // },
      {
        field: "dealer_disbursed_amount",
        headerName: "Dealer Disbursed Amount",
        width: 180,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
        // valueGetter: (params) =>
        //   params.data?.contract?.application?.application_info?.total_amount ??
        //   params.data?.contract?.loan_amount,
      },
      {
        field: "contract.customer_bank_account_no",
        headerName: "Customer Bank Account No",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "contract.dealer_bank_account_no",
        headerName: "Dealer Bank Account No",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "contract.customer_bank_account_name",
        headerName: "Customer Bank Account Name",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "contract.dealer_bank_account_name",
        headerName: "Dealer Bank Account Name",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "contract.customer_bank_payment_channel.name",
        headerName: "Customer Bank Payment Channel",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "contract.dealer_bank_payment_channel",
        headerName: "Dealer Bank Payment Channel",
        width: 200,
        sortable: true,
        resizable: true,
      },
      // {
      //   field: "contract_id",
      //   headerName: "ContractID",
      //   width: 130,
      //   sortable: true,
      //   resizable: true,
      //   pinned: "left",
      //   lockPosition: "left",
      //   lockPinned: true,
      // },
      // {
      //   field: "commission",
      //   headerName: "Commission %",
      //   width: 130,
      //   sortable: true,
      //   resizable: true,
      //   pinned: "left",
      //   lockPosition: "left",
      //   lockPinned: true,
      // },
      // {
      //   field: "commission_amount",
      //   headerName: "Commission Amount",
      //   width: 130,
      //   sortable: true,
      //   resizable: true,
      //   pinned: "left",
      //   lockPosition: "left",
      //   lockPinned: true,
      // },
      // {
      //   field: "current_step",
      //   headerName: "Current Step",
      //   width: 130,
      //   sortable: true,
      //   resizable: true,
      //   pinned: "left",
      //   lockPosition: "left",
      //   lockPinned: true,
      // },
      // {
      //   field: "approved_date",
      //   headerName: "Approved Date",
      //   valueFormatter: (params) =>
      //     params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
      //   width: 180,
      //   sortable: true,
      //   resizable: true,
      // },
      // {
      //   field: "approved_user.user_name",
      //   headerName: "Approved By",
      //   width: 200,
      //   resizable: true,
      // },
      // {
      //   field: "booking_status",
      //   headerName: "Booking Status",
      //   width: 150,
      //   sortable: true,
      //   resizable: true,
      // },
      // {
      //   field: "created_at",
      //   headerName: "Created Date",
      //   width: 200,
      //   sortable: true,
      //   valueFormatter: (params) =>
      //     params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
      //   resizable: true,
      // },
      // {
      //   field: "created_user.user_name",
      //   headerName: "Created By",
      //   width: 200,
      //   resizable: true,
      // },
      // {
      //   field: "updated_at",
      //   headerName: "Modified Date",
      //   width: 200,
      //   sortable: true,
      //   resizable: true,
      //   valueFormatter: (params) =>
      //     params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
      // },
      // {
      //   field: "modified_user.user_name",
      //   headerName: "Modified By",
      //   width: 200,
      //   resizable: true,
      // },
      // {
      //   field: "partner_id",
      //   headerName: "Partner Id",
      //   width: 130,
      //   sortable: true,
      //   resizable: true,
      //   valueGetter: (params) => {
      //     return (
      //       params.data?.mnet_application_id ??
      //       params.data?.customer_loan_id ??
      //       params.data?.kpay_id ??
      //       params.data?.contract?.mnet_application_id ??
      //       params.data?.contract?.customer_loan_id ??
      //       params.data?.contract?.kpay_id ?? null
      //     );
      //   },
      //   pinned: "left",
      //   lockPosition: "left",
      //   lockPinned: true,
      // },
      {
        headerName: "Actions",
        field: "actions",
        width: 70,
        sortable: false,
        resizable: true,
        cellRenderer: buttonRenderer,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
        hide: isShowRemove === true,
      },
      {
        headerName: "",
        field: "menu",
        width: 50,
        lockPosition: "left",
        pinned: "left",
        cellRenderer: DisbursementPaymentTableRowMenu,
        cellRendererParams: {
          selectedData: (data) => {},
        },
        lockPinned: true,
      },
      {
        field: "posting_date",
        headerName: "Posting Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "is_posted",
        width: 80,
        headerName: "Posting",
        suppressMenu: true,
        sortable: false,
        resizable: false,
        cellRenderer: DisabledCheckboxRenderer,
      },
    ],
    [isShowRemove, handleButtonClick]
  );

  return (
    <Accordion title="Disbursement Journal Line">
      {data !== undefined && data !== null && data.length !== 0 && (
        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          <DisbursementJournalLineExcelExportButton />
        </div>
      )}
      <Box
        sx={{
          mt: 1,
          paddingLeft: isShowRemove ? "130px" : "100px",
          paddingRight: isShowRemove ? "130px" : "100px",
        }}
      >
        {data ? (
          <Table
            searchParams={params}
            setSearchParams={setParams}
            rowData={data ?? []}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            name="DisbursementLineIndex"
            rowKey="id"
            agThemeStyle={{
              height: "calc(100vh - 300px)",
            }}
            loading={isContractsLoading}
            buttonRenderer={buttonRenderer}
          />
        ) : (
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
        )}
      </Box>
    </Accordion>
  );
};

export default DisbursementJournalLine;
