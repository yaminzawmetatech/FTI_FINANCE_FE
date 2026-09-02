import React, { useEffect, useState } from "react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Table from "components/Table";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import StampDutyBatchAppBar from "./StampDutyBatchAppBar";
import { Breadcrumbs, Typography, Box, Paper, Switch } from "@mui/material";
import AdvancedSearch from "components/form/AdvancedSearch";
import { SUBMITTED_STAMP_DUTY_PAYMENT_OPTIONS } from "constants/searchOptions/submittedStampDutyPaymentOptions";
import { STAMP_DUTY_PAYMENT_STATUS } from "constants/stampDutyPaymentStatus";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import { getAllCollaterals, lockCollateral } from "features/collateral/collateralSlice";
import CollateralLicenseTableRowMenu from "./CollateralLicenseTableRowMenu";
import { lockApplication } from "features/application/applicationSlice";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { getCMCO } from "features/users/usersSlice";
import CollateralLicenseListAppBar from "./CollateralLicenseListAppBar";
import { YesNoRenderer } from "common/YesNoRenderer";
import { APPLICATION_COLLATERAL_OPTIONS } from "constants/applicationCollateralSearchOptions";
import { APPLICATION_COLLATERAL_STATUS } from "constants/applicationCollateralStatus";

const CollateralLicenseTable = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();

  const { collaterals, next_page_param, isLoading } = useSelector(
    (state) => state.collaterals
  );

  const { user } = useSelector((state) => state.auth);

  const {CMCO} = useSelector((state) => state.users);
  const [applicationState, setApplicationState] = useState([]);
  const [selectedRows, setSelectedRows] = useState(null);
  const [openAssignUserModal, setOpenAssignUserModal] = useState(false);

  const handleSelectionChanged = useCallback((rows) => {
    setSelectedRows(rows);
  }, []);


  useEffect(() => {
    dispatch(
      getAllCollaterals({
        firstFetch: true,
        params: {
          renewal_type: 'License',
          only_contracts: 1,
          exclude_contract_status: ['Terminated', 'Fully Paid'],
          is_generated_gl: 1,
          ...( user?.user_group === "CMCO"
            ? { role_name: user.user_group, user_id: user.id }
            : {}),
        }
      })
    );
    dispatch(getCMCO("CMCO"));
  }, [dispatch, user]);

  const handleToggleSwitch = async (rowData) => {
    try {
      const { id, is_locked } = rowData;

      await dispatch(
        lockCollateral({
          data: {
            collateral_id: id,
            locked_user_uuid: user.uuid,
            is_locked: is_locked === 1 ? 0 : 1,
          },
        })
      ).unwrap();

      if (is_locked === 1) {
        showSuccessToast(CommonMessage.MFS00015);
      } else {
        showSuccessToast(CommonMessage.MFS00014);
      }

      await dispatch(
        getAllCollaterals({
          firstFetch: true,
          params: {
            renewal_type: 'License',
            only_contracts: 1,
            exclude_contract_status: ['Terminated', 'Fully Paid'],
            is_generated_gl: 1,
            ...( user?.user_group === "CMCO"
              ? { role_name: user.user_group, user_id: user.id }
              : {}),
          }
        })
      ).unwrap();
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_param) {
        dispatch(
          getAllCollaterals({
            params: {
              ...next_page_param,
              renewal_type: 'License',
              only_contracts: 1,
              exclude_contract_status: ['Terminated', 'Fully Paid'],
              is_generated_gl: 1,
            },
            firstFetch: false,
          })
        );
      }
    },
    [dispatch, next_page_param]
  );

  const defaultColDef = useMemo(
    () => ({
      valueSetter: (params) => { },
    }),
    []
  );

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
        field: "application.application_id",
        headerName: "Application ID",
        width: 250,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "collateral_type.name",
        headerName: "Collateral Type",
        width: 100,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
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

      {
        headerName: "",
        field: "menu",
        width: 50,
        lockPosition: "left",
        pinned: "left",
        cellRenderer: CollateralLicenseTableRowMenu,
        cellRendererParams: {
          selectedData: (data) => { },
        },
        lockPinned: true,
      },
      // {
      //   headerName: "Is Locked?",
      //   field: "is_locked",
      //   width: 100,
      //   sortable: false,
      //   cellRenderer: (params) => {
      //     const rowData = params.data;
      //     return (
      //       <Switch
      //         size="small"
      //         checked={rowData.is_locked === 1}
      //         onChange={() => handleToggleSwitch(rowData)}
      //         color="primary"
      //       />
      //     );
      //   },
      //   hide: user?.user_group !== "CMCE", // Show only for CMCE user group
      // },
      {
        field: "latest_license.license_renewal_assign_user.user_name",
        headerName: "License Renewal Assign User ",
        sortable: false,
        resizable: false,
      },
      {
        field: "contact_number",
        headerName: "Contact Number",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "application.address_district.name",
        headerName: "District",
        width: 150,
        sortable: true,
        resizable: true,
      },
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
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
      },
      {
        field: "delivered_date",
        headerName: "Delivered Date",
        width: 170,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
      },
      {
        field: "received_date",
        headerName: "Received Date",
        width: 170,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
      },
      {
        field: "filing_date",
        headerName: "Filing Date",
        width: 170,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
      },
      {
        field: "grd_informed_date",
        headerName: "GRD Informed Date (Block Letter)",
        width: 170,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
      },
      {
        field: "grd_received_date",
        headerName: "Grd Received Date",
        width: 170,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
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
        field: "latest_license.license_renewal_date",
        headerName: "Licenese Renewal Date",
        sortable: false,
        resizable: false,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
      },
      {
        field: "latest_license.license_notice_date",
        headerName: "License Notice Date",
        sortable: false,
        resizable: false,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
      },
      {
        field: "latest_license.is_license_informed_to_customer",
        headerName: "Is License Informed To Customer",
        sortable: false,
        resizable: false,
        cellRenderer: YesNoRenderer
      },
      {
        field: "latest_license.license_appointment_date",
        headerName: "License Appointment Date",
        sortable: false,
        resizable: false,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
      },
      {
        field: "latest_license.license_released_date",
        headerName: "License Released Date",
        sortable: false,
        resizable: false,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
      },
      {
        field: "latest_license.license_received_date",
        headerName: "GRD/CMCE to Loan Dept Received Date",
        sortable: false,
        resizable: false,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
      },
      {
        field: "latest_license.license_loan_to_GRD_CMCE_delivered_date",
        headerName: "Loan Dept to GRD/CMCE Delivered Date",
        sortable: false,
        resizable: false,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
      },
      {
        field: "latest_license.renewal_owner_book",
        headerName: "Renewal Owner Book",
        sortable: false,
        resizable: false,
        cellRenderer: YesNoRenderer
      },
      {
        field: "latest_insurance.renewal_insurance_premium_book",
        headerName: "Renewal Insurance Premium Book",
        sortable: false,
        resizable: false,
        cellRenderer: YesNoRenderer
      },
      {
        field: "latest_insurance.insurance_renewal_date",
        headerName: "Insurance Renewal Date",
        width: 170,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
      },
      {
        field: "latest_insurance.insurance_notice_date",
        headerName: "Insurance Notice Date",
        width: 170,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
      },
      {
        field: "latest_insurance.is_insurance_informed_to_customer",
        headerName: "Is Insurance Informed To Customer",
        sortable: false,
        resizable: false,
        cellRenderer: YesNoRenderer
      },
      {
        field: "latest_insurance.insurance_appointment_date",
        headerName: "Insurance Appointment Date",
        width: 170,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
      },
      {
        field: "return_document_date",
        headerName: "Return Document Date",
        width: 170,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
      },
      {
        field: "repayment_grd_informed_date",
        headerName: "Repayment Grd Informed Date",
        width: 170,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
      },
      {
        field: "repayment_grd_received_date",
        headerName: "Repayment Grd Received Date",
        width: 170,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
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
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
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
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
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

  const handleSearch = (searchData) => {

    const transformedSearchData = {};

    searchData.forEach(item => {
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
      getAllCollaterals({
        params: {
          ...transformedSearchData,
          renewal_type: 'License',
          only_contracts: 1,
          exclude_contract_status: ['Terminated', 'Fully Paid'],
          is_generated_gl: 1,
          ...( user?.user_group === "CMCO"
            ? { role_name: user.user_group, user_id: user.id }
            : {}),
        },
      })
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" className="margin-top-8">
        <Typography color="text.primary">Loan Operation</Typography>
        <Typography color="text.primary">
          Collateral License List
        </Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={APPLICATION_COLLATERAL_OPTIONS}
        status={APPLICATION_COLLATERAL_STATUS}
        onSearch={handleSearch}
      />
      <CollateralLicenseListAppBar selectedRows={selectedRows} user={user} CMCO={CMCO} applicationIds={collaterals.map((app) => app.id)}/>
      {/* <StampDutyBatchAppBar /> */}
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={collaterals ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="CollateralLicenseList"
          rowKey="id"
          agThemeStyle={{
            height: "calc(100vh - 210px)",
          }}
          onScrollBottomEnd={handleBodyScroll}
          loading={isLoading}
          onSelectionChanged={handleSelectionChanged}
          rowSelection={"multiple"}
          // rowMultiSelectWithClickFlag={"true"}
        />
      </Paper>
    </Box>
  );
};

export default React.memo(CollateralLicenseTable);
