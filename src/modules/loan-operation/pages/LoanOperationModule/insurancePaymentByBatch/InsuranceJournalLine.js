import React, { useMemo, useEffect, useState } from "react";
import { Box } from "@mui/material";
import Accordion from "components/Accordion";
import Table from "components/Table";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Tooltip from "@mui/material/Tooltip";
import { useParams } from "react-router-dom";
import InsuranceJournalLineExcelExportButton from "./InsuranceJournalLineExcelExportButton";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import { Skeleton } from "@mui/lab";
import InsurancePaymentTableRowMenu from "./InsurancePaymentTableRowMenu";

const InsuranceJournalLine = ({
  updatedContracts,
  handleButtonClick,
  isContractsLoading,
  isShowRemove,
  insurancePayments,
}) => {
  const [params, setParams] = useSearchParams();
  const { mode } = useParams();
  const [data, setData] = useState([]);

  const defaultColDef = useMemo(
    () => ({
      valueSetter: (params) => { },
    }),
    []
  );

  useEffect(() => {
    let temp_arr = updatedContracts?.map((item, index) => ({
      ...item,
      disbursement_date: item?.disbursement_date ??
        insurancePayments?.insurance_payment_contracts[index]?.contract?.disbursement_date,
      is_posted: insurancePayments?.is_posted,
      posting_date: insurancePayments?.posting_date,
      settlement_date: insurancePayments?.settlement_date,
    }));
    setData(temp_arr);
  }, [updatedContracts, insurancePayments]);

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
        width: 100,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field:
          mode === "view" || mode === "edit"
            ? "contract.generated_application_id"
            : "generated_application_id",
        headerName: "ApplicationID",
        width: 150,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "partner_id",
        headerName: "Partner Id",
        width: 130,
        sortable: true,
        resizable: true,
        valueGetter: (params) => {
          return (
            params.data?.mnet_application_id ??
            params.data?.customer_loan_id ??
            params.data?.kpay_id ??
            params.data?.contract?.mnet_application_id ??
            params.data?.contract?.customer_loan_id ??
            params.data?.contract?.kpay_id ?? null
          );
        },
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
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
        cellRenderer: InsurancePaymentTableRowMenu,
        cellRendererParams: {
          selectedData: (data) => { },
        },
        lockPinned: true,
      },
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
        field:
          mode === "view" || mode === "edit"
            ? "contract.insurance_amount"
            : "insurance_amount",
        headerName: "Amount",
        width: 150,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter
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

    <Accordion title="Insurance Journal Line">
      {data !== undefined && data !== null && data.length !== 0 && (
        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          <InsuranceJournalLineExcelExportButton />
        </div>
      )}
      <Box
        sx={{
          mt: 1,
          paddingLeft: isShowRemove ? "130px" : "100px",
          paddingRight: isShowRemove ? "130px" : "100px",
        }}
      >
        {data ? (<Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={data ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="InsuranceLineIndex"
          rowKey="id"
          agThemeStyle={{
            height: "calc(100vh - 300px)",
          }}
          loading={isContractsLoading}
          buttonRenderer={buttonRenderer}
        />) : (<Skeleton animation="wave" variant="circular" width={40} height={40} />)}

      </Box>
    </Accordion>
  );
};

export default InsuranceJournalLine;
