import * as React from "react";
import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getApplication } from "modules/credit-management/slices/applicationSlice";
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
import { APPLICATION_PROJECTF_SEARCH_OPTIONS } from "constants/searchOptions/applicationProjectFSearchOptions";
import { APPLICATION_PROJECT_WAVE_SEARCH_OPTIONS } from "constants/searchOptions/applicationProjectWaveSearchOptions";
import { APPLICATION_PROJECT_KPAY_SEARCH_OPTIONS } from "constants/searchOptions/applicationProjectKpaySearchOptions";
import { APPLICATION_PROJECT_HP_SEARCH_OPTIONS } from "constants/searchOptions/applicationProjectHPSearchOptions";
import { getCategories } from "modules/administration/slices/categorySlice";
import useApplicationSetup from "modules/credit-management/pages/CreditManagement/ApplicationInformation/CreateApplicationInformation/hooks/useApplicationSetup";

const ApplicationInformationListIndex = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();
  const { categoryId, categoryName } = useParams();
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
  const apiCalledRef = useRef(false);
  const { projectCategories } = useSelector((state) => state.projectCategories);
  const category = projectCategories?.find((item) => item.id == categoryId);

  useEffect(() => {
    setApplicationState(applications);
  }, [applications]);

  const fetchApi = useCallback(() => {
    dispatch(
      getApplication({
        params: {
          ...Object.fromEntries(params),
          category_id_null: "null",
          status: "New",
          customer_web_application_id: true
        },
      })
    );
  }, [categoryId, dispatch, params, auth.id, auth.user_group]);

  useEffect(() => {
    if (apiCalledRef.current) return;
    fetchApi();
    dispatch(getCategories());
    apiCalledRef.current = true;
  }, [fetchApi, dispatch]);

  const defaultColDef = useMemo(
    () => ({
      valueSetter: () => { },
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
        field: "customer_web_category_name",
        headerName: "Customer Web Category",
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
        cellRenderer: ApplicationTableRowMenu,
        cellRendererParams: {
          deleteData: (data) => { },
          categoryName,
          category,
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
        hide: [KPAY, MYANMAR_NET, WAVE_MONEY].some((item) =>
          application_fields_group.includes(item)
        ),
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
    [application_fields_group, categoryName, category]
  );

  const handleBodyScroll = useCallback(() => {
    if (next_page_param) {
      dispatch(
        getApplication({
          params: next_page_param,
          firstFetch: false,
          category_id_null: "null",
          status: "New",
          customer_web_application_id: true
        })
      );
    }
  }, [dispatch, next_page_param]);

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
          category_id_null: "null",
          status: "New",
          customer_web_application_id: true
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
    default:
      searchOptions = APPLICATION_PROJECT_HP_SEARCH_OPTIONS;
  }

  const statusOptions =
    categoryId === "1" || categoryId === "2" || categoryId === "3"
      ? APPLICATION_STATUS
      : APPLICATION_MOB_STATUS;

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
        <Typography color="text.primary">Customer Application List</Typography>
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
          name="CustomerWebApplicationInformation"
          rowKey="id"
          agThemeStyle={{ height: "calc(100vh - 170px)" }}
          onScrollBottomEnd={handleBodyScroll}
          loading={isLoading}
          getRowStyle={getRowStyle}
        />
      </Paper>
    </Box>
  );
};

export default React.memo(ApplicationInformationListIndex);
