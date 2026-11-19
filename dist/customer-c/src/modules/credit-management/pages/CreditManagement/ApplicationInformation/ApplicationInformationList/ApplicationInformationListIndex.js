import * as React from "react";
import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getApplication,
  lockApplication,
} from "modules/credit-management/slices/applicationSlice";
import ApplicationListAppBar from "./ApplicationListAppBar";
import AdvancedSearch from "components/form/AdvancedSearch";
import {
  APPLICATION_STATUS,
  APPLICATION_MOB_STATUS,
} from "constants/applicationStatusArr";
import { Breadcrumbs, Typography, Box, Paper } from "@mui/material";
import Table from "components/Table";
import {
  MYANMAR_NET,
  WAVE_MONEY,
  KPAY,
} from "constants/applicationType";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import ApplicationTableRowMenu from "./ApplicationTableRowMenu";
import dayjs from "dayjs";
import useApplicationSetup from "../CreateApplicationInformation/hooks/useApplicationSetup";
import { APPLICATION_PROJECTF_SEARCH_OPTIONS } from "constants/searchOptions/applicationProjectFSearchOptions";
import { APPLICATION_PROJECT_WAVE_SEARCH_OPTIONS } from "constants/searchOptions/applicationProjectWaveSearchOptions";
import { APPLICATION_PROJECT_KPAY_SEARCH_OPTIONS } from "constants/searchOptions/applicationProjectKpaySearchOptions";
import { Switch } from "@mui/material";
import CommonMessage from "common/CommonMessage";
import { showSuccessToast } from "common/ToastMessage";
import AssignUserModal from "./AssignUserModal";
import { APPLICATION_PROJECT_HP_SEARCH_OPTIONS } from "constants/searchOptions/applicationProjectHPSearchOptions";
import { getCategories } from "modules/administration/slices/categorySlice";

const ApplicationInformationListIndex = () => {
  const dispatch = useDispatch();

  const [params, setParams] = useSearchParams();
  const { categoryId, categoryName } = useParams();
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

  const [applicationState, setApplicationState] = useState([]);

  const apiCalledRef = useRef(false); // Prevent double calls

  const { projectCategories } = useSelector((state) => state.projectCategories);

  const category = projectCategories?.find((item) => item.id == categoryId);

  useEffect(() => {
    const processedApplications = applications.map((app) => ({
      ...app,
      showIsLocked: [1, 2, 3].includes(Number(categoryId))
        ? ["New", "Pending"].includes(app.status) &&
          (auth.user_group === "IHCO" ||
            auth.user_group === "Credit Manager" ||
            auth.user_group === "administrator")
        : ["Submitted", "Pending"].includes(app.status) &&
          (auth.user_group === "IHCO" ||
            auth.user_group === "Credit Manager" ||
            auth.user_group === "administrator"),
    }));

    setApplicationState(processedApplications);
  }, [applications, auth, categoryId]);

  const fetchApi = useCallback(() => {
    dispatch(
      getApplication({
        params: {
          ...Object.fromEntries(params),
          category_id: categoryId,
          ...transformedSearchDataRef.current,
          ...(auth.user_group === "CMCO" || auth.user_group === "Agent"
            ? { created_by: auth.id }
            : {}),
        },
      })
    );
  }, [categoryId, dispatch, params]);

  useEffect(() => {
    if (apiCalledRef.current) return;
    fetchApi();
    dispatch(getCategories());
    apiCalledRef.current = true;
  }, [fetchApi]);

  const defaultColDef = useMemo(
    () => ({
      valueSetter: (params) => {},
    }),
    []
  );

  const handleToggleSwitch = async (rowData) => {
    try {
      const { id, is_locked } = rowData;

      if (auth.user_group === "Credit Manager" || auth.is_super === true) {
        setSelectedRow(rowData);
        setOpenAssignUserModal(true);
      } else {
        await dispatch(
          lockApplication({
            data: {
              application_id: id,
              locked_user_uuid: auth.uuid,
              is_locked: is_locked === 1 ? 0 : 1,
            },
          })
        ).unwrap();

        if (is_locked === 1) {
          showSuccessToast(CommonMessage.MFS00015);
        } else {
          showSuccessToast(CommonMessage.MFS00014);
        }
      }

      fetchApi();
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
        field: "application_info.mnet_application_id",
        headerName: "MNet ID",
        width: 80,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
        hide: !application_fields_group.includes(MYANMAR_NET),
      },
      {
        field: "application_info.customer_loan_id",
        headerName: "Customer Loan ID",
        width: 150,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
        hide: !application_fields_group.includes(WAVE_MONEY),
      },
      {
        field: "application_info.kpay_id",
        headerName: "Kpay ID",
        width: 150,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
        hide: !application_fields_group.includes(KPAY),
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
        cellRenderer: ApplicationTableRowMenu,
        cellRendererParams: {
          deleteData: (data) => {},
          categoryName,
          category,
          categoryId
        },
        lockPinned: true,
      },
      {
        headerName: "Is Locked?",
        field: "is_locked",
        width: 80,
        sortable: false,
        cellRenderer: (params) => {
          const rowData = params.data;
          return (
            <Switch
              size="small"
              checked={rowData.is_locked === 1}
              onChange={() => handleToggleSwitch(rowData)}
              color="primary"
              disabled={
                rowData.status !== "New" &&
                rowData.status !== "Submitted" &&
                rowData.status !== "Pending"
              }
            />
          );
        },
        hide: !applicationState.some((app) => app.showIsLocked),
      },
      {
        headerName: "Latest Locked By",
        field: "locked_user.user_name",
        width: 140,
        sortable: false,
        hide: !applicationState.some((app) => app.showIsLocked),
      },
      {
        field: "latest_assessment.assign_user.user_name",
        headerName: "Reconsider Assign User",
        width: 200,
        resizable: true,
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
        hide: [KPAY, MYANMAR_NET, WAVE_MONEY].some((item) =>
          application_fields_group.includes(item)
        ),
      },
      {
        field: "agent_user.user_name",
        headerName: "Agent",
        width: 150,
        resizable: true,
        hide: [KPAY, MYANMAR_NET, WAVE_MONEY].some((item) =>
          application_fields_group.includes(item)
        ),
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
    [application_fields_group, categoryName, categoryId, applicationState]
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
          category_id: categoryId,
          ...transformedSearchData,
          ...(auth.user_group === "CMCO" || auth.user_group === "Agent"
            ? { created_by: auth.id }
            : {}),
        },
      })
    );
  };

  let searchOptions;

  switch (categoryId) {
    case "1":
      searchOptions = APPLICATION_PROJECTF_SEARCH_OPTIONS;
      break;
    case "2":
      searchOptions = APPLICATION_PROJECT_WAVE_SEARCH_OPTIONS;
      break;
    case "3":
      searchOptions = APPLICATION_PROJECT_KPAY_SEARCH_OPTIONS;
      break;
    case "4":
      searchOptions = APPLICATION_PROJECT_HP_SEARCH_OPTIONS;
      break;
    case "5":
      searchOptions = APPLICATION_PROJECT_HP_SEARCH_OPTIONS;
      break;
    case "6":
      searchOptions = APPLICATION_PROJECT_HP_SEARCH_OPTIONS;
      break;
    case "7":
      searchOptions = APPLICATION_PROJECT_HP_SEARCH_OPTIONS;
      break;
    default:
      searchOptions = APPLICATION_PROJECTF_SEARCH_OPTIONS;
  }

  let statusOptions;
  if (categoryId === "1" || categoryId === "2" || categoryId === "3") {
    statusOptions = APPLICATION_STATUS;
  } else {
    statusOptions = APPLICATION_MOB_STATUS;
  }

  const getRowStyle = (params) => {
    const customer_response_flag = params?.data?.is_customer_response === 1;
    const kpay_status_flag =
      params?.data?.kpay_app_status === "Marked as Correction";
    return customer_response_flag
      ? { background: "rgb(194,237,211)" }
      : kpay_status_flag
      ? { background: "rgba(255, 0, 0, 0.1)" }
      : {};
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" className="margin-top-8">
        <Typography color="text.primary">Credit Management</Typography>
        <Typography color="text.primary">Application Table</Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={searchOptions}
        status={statusOptions}
        onSearch={handleSearch}
        searchValue={searchValue}
        searchCategory={categoryId}
      />
      <ApplicationListAppBar fetchApi={fetchApi} category={category} />
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={applicationState ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="ApplicationInformationListTable"
          rowKey="id"
          agThemeStyle={{
            height: "calc(100vh - 170px)",
          }}
          onScrollBottomEnd={handleBodyScroll}
          loading={isLoading}
          getRowStyle={getRowStyle}
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

export default React.memo(ApplicationInformationListIndex);
