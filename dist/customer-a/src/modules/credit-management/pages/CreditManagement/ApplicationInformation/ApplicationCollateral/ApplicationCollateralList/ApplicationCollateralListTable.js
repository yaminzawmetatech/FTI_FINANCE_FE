import * as React from "react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { useParams } from "react-router";
import Table from "components/Table";
import { YesNoRenderer } from "common/YesNoRenderer";
import { getAllCollaterals } from "modules/loan-operation/slices/collateralSlice";

const ApplicationAssessmentListTable = ({ onSelectionChangedCollaterals }) => {
  const { applicationId: application_id } = useParams();
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();

  const { collaterals, next_page_url, isLoading } = useSelector(
    (state) => state.collaterals
  );

  const defaultColDef = useMemo(
    () => ({
      valueSetter: () => { },
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
        field: "application.application_id",
        headerName: "Application ID",
        width: 250,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      // {
      //   field: "contract_id",
      //   headerName: "Contract ID",
      //   width: 100,
      //   sortable: true,
      //   resizable: true,
      //   pinned: "left",
      //   lockPosition: "left",
      //   lockPinned: true,
      // },
      {
        field: "status",
        headerName: "Status",
        width: 200,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },

      // {
      //   headerName: "",
      //   field: "menu",
      //   width: 50,
      //   lockPosition: "left",
      //   pinned: "left",
      //   cellRenderer: StampDutyPaymentTableRowMenu,
      //   cellRendererParams: {
      //     selectedData: (data) => {},
      //   },
      //   lockPinned: true,
      // },
      {
        field: "contact_number",
        headerName: "Contact Number",
        width: 150,
        sortable: true,
        resizable: true,
      },

      // {
      //   field: "manufacturer",
      //   headerName: "Manufacturer",
      //   width: 150,
      //   sortable: true,
      //   resizable: true,
      // },
      {
        field: "division",
        headerName: "Division",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "plate_no",
        headerName: "Plate No",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "chassis_no",
        headerName: "Chassis No",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "brand.brand_name",
        headerName: "Brand",
        width: 150,
        sortable: true,
        resizable: true,
      },

      {
        field: "model.model_name",
        headerName: "Model",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "engine_no",
        headerName: "Engine No",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "engine_power",
        headerName: "Engine Power",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "year_of_manufacture",
        headerName: "Year Of Manufacture",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "vehicle_color",
        headerName: "Vehicle Color",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "collected_date",
        headerName: "Collected Date",
        width: 170,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
      },
      {
        field: "delivered_date",
        headerName: "Delivered Date",
        width: 170,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
      },
      {
        field: "received_date",
        headerName: "Received Date",
        width: 170,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
      },
      {
        field: "filing_date",
        headerName: "Filing Date",
        width: 170,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
      },
      {
        field: "loan_to_cmco_date",
        headerName: "Loan To CMCO Date",
        width: 170,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
      },
      {
        field: "grd_informed_date",
        headerName: "GRD Informed Date (Block Letter)",
        width: 170,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
      },
      {
        field: "insu_certificate_of_receipt",
        headerName: "Insurance Certificate Of Receipt",
        sortable: false,
        resizable: false,
        cellRenderer: YesNoRenderer
      },
      {
        field: "owner_book",
        headerName: "Owner Book",
        sortable: false,
        resizable: false,
        cellRenderer: YesNoRenderer
      },
      {
        field: "insurance_premium_book",
        headerName: "Insurance Premium Book",
        sortable: false,
        resizable: false,
        cellRenderer: YesNoRenderer
      },
      {
        field: "certi_receipt_with_sign",
        headerName: "Certi Receipt With Sign",
        sortable: false,
        resizable: false,
        cellRenderer: YesNoRenderer
      },
      {
        field: "license_renewal_date",
        headerName: "Licenese Renewal Date",
        sortable: false,
        resizable: false,

      },
      {
        field: "license_notice_date",
        headerName: "License Notice Date",
        sortable: false,
        resizable: false,
      },
      {
        field: "is_license_informed_to_customer",
        headerName: "Is License Informed To Customer",
        sortable: false,
        resizable: false,
        cellRenderer: YesNoRenderer
      },
      {
        field: "license_appointment_date",
        headerName: "License Appointment Date",
        sortable: false,
        resizable: false,
      },
      {
        field: "license_released_date",
        headerName: "License Released Date",
        sortable: false,
        resizable: false,
      },
      {
        field: "license_received_date",
        headerName: "GRD/CMCE to Loan Dept Received Date",
        sortable: false,
        resizable: false,
      },
      {
        field: "license_loan_to_GRD_CMCE_delivered_date",
        headerName: "Loan Dept to GRD/CMCE Delivered Date",
        sortable: false,
        resizable: false,
      },
      {
        field: "renewal_owner_book",
        headerName: "Renewal Owner Book",
        sortable: false,
        resizable: false,
        cellRenderer: YesNoRenderer
      },
      {
        field: "renewal_insurance_premium_book",
        headerName: "Renewal Insurance Premium Book",
        sortable: false,
        resizable: false,
        cellRenderer: YesNoRenderer
      },
      {
        field: "latest_license.license_renewal_assign_user",
        headerName: "License Renewal Assign User",
        sortable: false,
        resizable: false,
      },
      {
        field: "insurance_renewal_date",
        headerName: "Insurance Renewal Date",
        width: 170,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
      },
      {
        field: "insurance_notice_date",
        headerName: "Insurance Notice Date",
        width: 170,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
      },
      {
        field: "is_insurance_informed_to_customer",
        headerName: "Is Insurance Informed To Customer",
        sortable: false,
        resizable: false,
        cellRenderer: YesNoRenderer
      },
      {
        field: "insurance_appointment_date",
        headerName: "Insurance Appointment Date",
        width: 170,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
      },
      {
        field: "return_document_date",
        headerName: "Return Document Date",
        width: 170,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
      },
      {
        field: "repayment_grd_informed_date",
        headerName: "Repayment Grd Informed Date",
        width: 170,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
      },
      {
        field: "repayment_grd_received_date",
        headerName: "Repayment Grd Received Date",
        width: 170,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
      },
      {
        field: "repayment_owner_book",
        headerName: "Repayment Owner Book",
        sortable: false,
        resizable: false,
        cellRenderer: YesNoRenderer
      },
      {
        field: "repayment_insurance_premium_book",
        headerName: "Repayment Insurance Premium Book",
        sortable: false,
        resizable: false,
        cellRenderer: YesNoRenderer
      },
      {
        field: "is_cor_signed",
        headerName: "Is COR Signed",
        sortable: false,
        resizable: false,
        cellRenderer: YesNoRenderer
      },
      {
        field: "is_loan_clearance_signed",
        headerName: "Is Loan Clearance Signed",
        sortable: false,
        resizable: false,
        cellRenderer: YesNoRenderer
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

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_url) {
        dispatch(
          getAllCollaterals({
            params: {
              ...Object.fromEntries(params),
              application_id,
            },
            firstFetch: false,
            url: next_page_url,
          })
        );
      }
    },
    [application_id, dispatch, next_page_url, params]
  );

  return (
    <Table
      rowSelection={"single"}
      onSelectionChanged={onSelectionChangedCollaterals}
      searchParams={params}
      setSearchParams={setParams}
      rowData={collaterals ?? []}
      columnDefs={columnDefs}
      defaultColDef={defaultColDef}
      name="ApplicationCollateralTable"
      rowKey="id"
      agThemeStyle={{
        height: "calc(100vh - 280px)",
      }}
      onScrollBottomEnd={handleBodyScroll}
      loading={isLoading}
    />
  );
};

export default React.memo(ApplicationAssessmentListTable);
