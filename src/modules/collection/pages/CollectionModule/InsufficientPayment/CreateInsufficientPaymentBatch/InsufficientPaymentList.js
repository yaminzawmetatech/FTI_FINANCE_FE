import React, { useMemo, useEffect, useState, useCallback } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
} from "@mui/material";
import Accordion from "components/Accordion";
import Table from "components/Table";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Tooltip from "@mui/material/Tooltip";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import { Skeleton } from "@mui/lab";
import ExcelExportButton from "./InsufficientPaymentListExcelExportButton";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const InsufficientPaymentList = ({
  insufficientPaymentContracts,
  handleButtonClick,
  isinsufficientPaymentLoading,
  editAbleForm,
  control,
  setSelectedRows,
  setValue,
  isCreateStage,
}) => {
  const dispatch = useDispatch();

  const [params, setParams] = useSearchParams();
  const [data, setData] = useState([]);

  const defaultColDef = useMemo(() => ({}), []);

  const { mode } = useParams();

  // const normalizeInsufficientContract = (item) => {
  //   const contract = item.contract || {};
  //   const latestPayment = item.latestactual_payment_line || contract.latest_actual_payment_line || {};

  //   return {
  //     ...item,
  //     generated_application_id: item.generated_application_id || contract.generated_application_id,
  //     overdue_status: contract.overdue_status
  //       ? `Overdue${contract.overdue_status}`
  //       : item.overdue_status
  //         ? `Overdue${item.overdue_status}`
  //         : undefined,
  //     loan_amount: item.loan_amount ?? contract.loan_amount,
  //     category_name: item.category_name ?? contract.category?.name,
  //     sub_category_name: item.sub_category_name ?? contract.sub_category?.name,
  //     customer_name: item.customer_name ?? contract.customer_name,
  //     received_date: latestPayment?.received_date,
  //     penalty_amount: latestPayment?.total_penalty_fee ?? item.penalty_amount,
  //     total_remaining_mi: item.remaining_mi ?? contract.remaining_mi,

  //   };
  // };

  const normalizeInsufficientContract = (item, mode) => {
    const contract = item.contract || {};
    const latestPayment =
      item.latestactual_payment_line ||
      contract.latest_actual_payment_line ||
      {};

    const isEditOrView = mode === "edit" || mode === "view";

    return {
      ...item,
      generated_application_id: isEditOrView
        ? contract.generated_application_id
        : item.generated_application_id || contract.generated_application_id,

      overdue_status: isEditOrView
        ? contract.overdue_status != null
          ? `Overdue${contract.overdue_status}`
          : undefined
        : contract.overdue_status != null
        ? `Overdue${contract.overdue_status}`
        : item.overdue_status != null
        ? `Overdue${item.overdue_status}`
        : undefined,
      
      contract_uuid : isEditOrView
      ? contract.uuid
      : item.uuid ?? contract.uuid,

      loan_amount: isEditOrView
        ? contract.loan_amount
        : item.loan_amount ?? contract.loan_amount,

      category_name: isEditOrView
        ? contract.category?.name
        : item.category.name ?? contract.category?.name,

      sub_category_name: isEditOrView
        ? contract.sub_category?.name
        : item.sub_category.name ?? contract.sub_category?.name,

      customer_name: isEditOrView
        ? contract.customer_name
        : item.customer_name ?? contract.customer_name,

      received_date: latestPayment?.received_date,

      penalty_amount: latestPayment?.total_penalty_fee ?? item.penalty_amount,

      total_remaining_mi: isEditOrView
        ? item.remaining_mi
        : item.remaining_mi ?? contract.remaining_mi,

      monthly_installment: latestPayment?.monthly_installment,
    };
  };

  useEffect(() => {
    if (!insufficientPaymentContracts) return;

    const normalized = insufficientPaymentContracts.map((item) =>
      normalizeInsufficientContract(item, mode)
    );

    setData(normalized);
    setValue("total_count", normalized.length);
  }, [insufficientPaymentContracts, mode]);

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

  const LinkCellRenderer = ({ value, data }) => {
    const uuid = data?.contract_uuid;

    const url = `/contracts/${uuid}/view`;
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
      {
        field: "generated_application_id",
        headerName: "Application ID",
        width: 130,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
        cellRenderer: LinkCellRenderer,
      },
      {
        field: "customer_name",
        headerName: "Customer Name",
        width: 150,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "loan_amount",
        headerName: "Loan Amount",
        width: 150,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
        valueFormatter: CurrencyFormatter,
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
        hide: !editAbleForm,
      },
      {
        field: "last_repayment_amount",
        headerName: "Last Repayment Amount",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "monthly_installment",
        headerName: "Monthly Installment Amount",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "total_remaining_mi",
        headerName: "Insufficient Amount ",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "received_date",
        headerName: "Repayment Date ",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "threshold_amount",
        headerName: "Threshold Amount ",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "overdue_status",
        headerName: "Overdue Status",
        width: 100,
        sortable: true,
        resizable: true,
      },
      {
        field: "category_name",
        headerName: "Category",
        width: 100,
        resizable: true,
      },
      {
        field: "sub_category_name",
        headerName: "Sub Category",
        width: 150,
        resizable: true,
      },
    ],
    []
  );

  return (
    <Accordion title="Insufficient Payment Contract List">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <ExcelExportButton control={control} />
      </div>
      <Box>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={data ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="InsufficientPaymentContracts"
          rowKey="id"
          agThemeStyle={{
            height: "calc(100vh - 300px)",
          }}
          loading={isinsufficientPaymentLoading}
          buttonRenderer={buttonRenderer}
        />
      </Box>
    </Accordion>
  );
};

export default InsufficientPaymentList;
