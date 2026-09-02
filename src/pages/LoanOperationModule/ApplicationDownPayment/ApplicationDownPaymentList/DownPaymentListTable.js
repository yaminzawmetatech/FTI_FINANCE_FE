import * as React from "react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { useParams } from "react-router";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import { getApplicationDownPayments } from "features/applicationDownPayment/applicationDownPaymentSlice";
import Table from "components/Table";

const DownPaymentListTable = ({onSelect }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();

  const { applicationDownPayments, next_page_url, isLoading } = useSelector(
    (state) => state.applicationDownPayments
  );

  const defaultColDef = useMemo(
    () => ({
      valueSetter: (params) => {},
    }),
    []
  );

  const columnDefs = useMemo(
    () => [
      {
        field: "downpayment_amount",
        headerName: "DownPayment Amount",
        width: 150,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "amount_paid",
        headerName: "Paid Amount",
        width: 150,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "exceed_amount",
        headerName: "Exceed Amount",
        width: 150,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "description",
        headerName: "Description",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "status",
        headerName: "Status",
        width: 150,
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
        sortable: true,
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
        sortable: true,
        resizable: true,
      },
    ],
    []
  );

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_url) {
        dispatch(
          getApplicationDownPayments({
            params: {
              ...Object.fromEntries(params),
              application_id: id,
            },
            firstFetch: false,
            url: next_page_url,
          })
        );
      }
    },
    [id, dispatch, next_page_url, params]
  );

  return (
    <Table
      rowSelection={"single"}
      onSelectionChanged={onSelect}
      searchParams={params}
      setSearchParams={setParams}
      rowData={applicationDownPayments ?? []}
      columnDefs={columnDefs}
      defaultColDef={defaultColDef}
      name="ApplicationDownPaymentTable"
      rowKey="id"
      agThemeStyle={{
        height: "calc(100vh - 280px)",
      }}
      onScrollBottomEnd={handleBodyScroll}
      loading={isLoading}
    />
  );
};

export default React.memo(DownPaymentListTable);
