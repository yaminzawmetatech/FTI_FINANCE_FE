import * as React from "react";
import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumbs, Typography, Box, Paper } from "@mui/material";
import dayjs from "dayjs";
import { Switch } from "@mui/material";
import useApplicationSetup from "pages/CreditManagement/ApplicationInformation/CreateApplicationInformation/hooks/useApplicationSetup";
import {
  getApplication,
  lockApplication,
} from "features/application/applicationSlice";
import { getCategories } from "features/category/categorySlice";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import {
  APPLICATION_MOB_STATUS,
  APPLICATION_STATUS,
} from "constants/applicationStatusArr";
import { APPLICATION_PROJECT_HP_SEARCH_OPTIONS } from "constants/searchOptions/applicationProjectHPSearchOptions";
import AdvancedSearch from "components/form/AdvancedSearch";
import Table from "components/Table";
import LoanOperationApplicationTableRowMenu from "./LoanOperationApplicationTableRowMenu";
import AssignUserModal from "pages/CreditManagement/ApplicationInformation/ApplicationInformationList/AssignUserModal";
import ApplicationListAppBar from "pages/CreditManagement/ApplicationInformation/ApplicationInformationList/ApplicationListAppBar";
import LoanApplicationAppBar from "./LoanApplicationAppBar";

const LoanOperationApplicationInformationListIndex = () => {
  const dispatch = useDispatch();

  const [params, setParams] = useSearchParams();
  const { title } = useParams();
  const [selectedRow, setSelectedRow] = useState();
  const [openAssignUserModal, setOpenAssignUserModal] = useState(false);

  const [transformedSearchDataResponse, setTransformedSearchDataResponse] =
    useState();

  const transformedSearchDataRef = useRef();

  useEffect(() => {
    transformedSearchDataRef.current = transformedSearchDataResponse;
  }, [transformedSearchDataResponse]);

  const auth = useSelector((state) => state.auth.user);

  const searchValue = params.get("status");

  const { application_fields } = useApplicationSetup();

  const application_fields_group = useMemo(
    () => Object.values(application_fields).map((item) => item.group),
    [application_fields]
  );

  const { applications, next_page_param, isLoading } = useSelector(
    (state) => state.application
  );

  const apiCalledRef = useRef(false); // Prevent double calls

  // const [applicationParams, setApplicationParams] = useState({
  //   status_array: JSON.stringify(["Approved", "Rejected"]),
  //   user_id: auth.id,
  //   category_mob_status: 1
  // });

  // useEffect(() => {
  //   let params = { ...applicationParams };

  //   console.log("title",title)
  //   switch (title) {
  //     case "Notification For Credit Judgement":
  //       params = { ...params, is_sms_generated: 0, sms_histories: 0, application_inspection: 0 };
  //       break;
  //     case "Request For Insurance Inspection":
  //       params = { ...params, is_sms_generated: 0, sms_histories: 1, application_inspection_status: "Not Completed" };
  //       break;
  //     case "Encoding of Insurance Premium":
  //       params = { ...params, is_sms_generated: 0, sms_histories: 1, application_inspection_status: "Completed", initial_payment_calculation_status: "Not Completed" };
  //       break;
  //     case "Notification For Downpayment Amount":
  //       params = { ...params, is_sms_generated: 0, sms_histories: 1, application_inspection_status: "Completed", initial_payment_calculation_status: "Completed" };
  //       break;
  //     case "Waiting For Downpayment Receipt":
  //       params = { ...params, is_sms_generated: 1 };
  //       break;
  //     default:
  //       break;
  //   }

  //   setApplicationParams(params);
  // }, [title, auth.id]);

  // const fetchApi = useCallback(() => {
  //   dispatch(
  //     getApplication({
  //       params: applicationParams,
  //     })
  //   );
  // }, [dispatch, applicationParams]);

  // useEffect(() => {
  //   fetchApi();
  // }, [applicationParams]);

  const [applicationParams, setApplicationParams] = useState({
    status_array: JSON.stringify(["Approved"]),
    mob_status: 1,
    is_loan_operation_skipped: 0,
    ...(auth.user_group === "CMCO" ||
      auth.user_group === "CMCE" ||
      auth.user_group === "Agent"
      ? { created_by: auth.id }
      : {}),
  });

  const fetchApi = useCallback(
    (params) => {
      dispatch(getApplication({ params }));
    },
    [dispatch]
  );

  useEffect(() => {
    let params = { ...applicationParams };
    switch (title) {
      case "Notification For Credit Judgement":
        params = {
          ...params,
          status_array: JSON.stringify(["Approved", "Rejected"]),
          is_sms_generated: 0,
          sms_histories: 0,
          application_inspection: 0,
        };
        break;
      case "Request For Insurance Inspection":
        params = {
          ...params,
          is_sms_generated: 0,
          sms_histories: 1,
          application_inspection_status: "Not Completed",
        };
        break;
      case "Encoding Of Insurance Premium":
        params = {
          ...params,
          is_sms_generated: 0,
          sms_histories: 1,
          application_inspection_status: "Completed",
          initial_payment_calculation_status: "Not Completed",
        };
        break;
      case "Notification For Downpayment Amount":
        params = {
          ...params,
          is_sms_generated: 0,
          sms_histories: 1,
          application_inspection_status: "Completed",
          initial_payment_calculation_status: "Completed",
        };
        break;
      case "Waiting Downpayment Receipt":
        params = {
          ...params,
          is_sms_generated: 1,
          downpayment_attachment_status: 0,
          downpayment_status: 0
        };
        break;
      case "Waiting For Downpayment Process":
        params = {
          ...params,
          is_sms_generated: 1,
          downpayment_attachment_status: 1,
          downpayment_status: 0,
        };
        break;
      case "Waiting To Click Contract Ready":
        params = {
          ...params,
          is_sms_generated: 1,
          downpayment_status: 1,
          is_contract_ready: 0,
        };
        break;
      case "To Sign Contracts":
        params = {
          ...params,
          is_sms_generated: 1,
          downpayment_status: 1,
          downpayment_attachment_status: 1,
          is_contract_ready: 1,
          is_signature_complete: 0,
        };
        break;
      case "To Be Disbursed":
          params = {
            ...params,
            status_array: JSON.stringify(["Approved"]),
            is_contract_ready: 1,
            is_signature_complete: 1,
            is_disbursed: 0,
          };
          break;
      case "Waiting For Sale Invoice":
        params = {
          ...params,
          is_contract_ready: 1,
          is_signature_complete: 1,
          is_sale_invoice_complete: 0,
        };
        break;
      case "Complete Sale Invoice":
        params = {
          ...params,
          is_contract_ready: 1,
          is_signature_complete: 1,
          is_sale_invoice_complete: 1,
        };
        break;
      default:
        // alert(title)
        break;
    }

    setApplicationParams(params);
    fetchApi(params); // fetchApi is called after params update
  }, [title, auth.id, fetchApi]);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const defaultColDef = useMemo(
    () => ({
      valueSetter: (params) => { },
    }),
    []
  );

  const columnDefs = useMemo(
    () => [
      {
        headerName: "No.",
        width: 50,
        valueGetter: "node.rowIndex + 1",
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "id",
        headerName: "ID",
        width: 50,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "application_id",
        headerName: "ApplicationID",
        width: 150,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "status",
        headerName: "Status",
        width: 100,
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
        cellRenderer: LoanOperationApplicationTableRowMenu,
        cellRendererParams: {
          deleteData: (data) => { },
        },
        lockPinned: true,
      },
      {
        field: "ihco_user.user_name",
        headerName: "IHCO",
        width: 150,
        resizable: true,
      },
      {
        field: "cmco_user.user_name",
        headerName: "CMCO",
        width: 150,
        resizable: true,
      },
      {
        field: "agent_user.user_name",
        headerName: "Agent",
        width: 150,
        resizable: true,
      },
      {
        field: "approved_amount",
        headerName: "Approved Amount",
        width: 130,
        sortable: true,
        resizable: true,

        valueGetter: (params) => {
          return (
            params.data.assessment_approved_amount ??
            params.data.approved_amount
          );
        },
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
        headerName: "Category Code",
        width: 150,
        resizable: true,
      },
      {
        field: "sub_category.name",
        headerName: "Sub Category",
        width: 150,
        resizable: true,
      },
      {
        field: "applicant_name",
        headerName: "Applicant Name",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "nrc",
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
    [application_fields_group, applications]
  );

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

    setTransformedSearchDataResponse(transformedSearchData);
    dispatch(
      getApplication({
        params: {
          ...transformedSearchData,
          ...applicationParams,
          ...(auth.user_group === "CMCO" || auth.user_group === "Agent"
            ? { created_by: auth.id }
            : {}),
          mob_status: 1,
          is_loan_operation_skipped: 0,
          status_array: JSON.stringify(["Approved", "Rejected"]),
        },
      })
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" className="margin-top-8">
        <Typography color="text.primary">Credit Management</Typography>
        <Typography color="text.primary">Application List</Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={APPLICATION_PROJECT_HP_SEARCH_OPTIONS}
        status={APPLICATION_MOB_STATUS}
        onSearch={handleSearch}
        searchValue={searchValue}
      />
      <LoanApplicationAppBar ids={applications?.map((item) => item?.id)} />
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={applications ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="LoanApplicationInformationListTable"
          rowKey="id"
          agThemeStyle={{
            height: "calc(100vh - 170px)",
          }}
          onScrollBottomEnd={handleBodyScroll}
          loading={isLoading}
        />
      </Paper>
      <AssignUserModal
        open={openAssignUserModal}
        onClose={() => setOpenAssignUserModal(false)}
        selectedRow={selectedRow}
        fetchApi={fetchApi}
      />
    </Box>
  );
};

export default React.memo(LoanOperationApplicationInformationListIndex);
