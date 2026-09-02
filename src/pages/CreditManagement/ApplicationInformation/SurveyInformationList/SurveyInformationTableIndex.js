import React, { useEffect, useRef, useState } from "react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Table from "components/Table";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { getContracts } from "features/contract/contractSlice";
import { CONTRACT_STATUS } from "constants/contractStatus";
import { Breadcrumbs, Typography, Box, Paper } from "@mui/material";
import AdvancedSearch from "components/form/AdvancedSearch";
import { CONTRACT_SEARCH_OPTIONS } from "constants/searchOptions/contractSearchOptions";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import { getSurveyInformation } from "features/surveyInformation/surveyInformationSlice";
import ContractTableRowMenu from "pages/LoanOperationModule/Contract/ContractInformationList/ContractTableRowMenu";
import ContractAppBar from "pages/LoanOperationModule/Contract/ContractInformationList/ContractAppBar";
import { useParams } from "react-router-dom";
import SurveyInformationTableRowMenu from "./SurveyInformationTableRowMenu";
import { SURVEY_SEARCH_OPTIONS } from "constants/searchOptions/surveySearchOptions";
import { SURVEY_STATUS } from "constants/searchOptions/surveyStatus";
import CommonMessage from "common/CommonMessage";
import { showSuccessToast } from "common/ToastMessage";
import { getApplication, lockApplication } from "features/application/applicationSlice";
import { Switch } from "@mui/material";

const SurveyInformationTable = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();
  const { categoryName, categoryId, surveyType, surveyResult } = useParams();
  const [selectedRow, setSelectedRow] = useState();
  const [openAssignUserModal, setOpenAssignUserModal] = useState(false);

  const auth = useSelector((state) => state.auth.user);

  const transformedSearchDataRef = useRef();

    const apiCalledRef = useRef(false); // Prevent double calls

  const { surveyInformation, next_page_param, isLoading } = useSelector(
    (state) => state.surveyInformation
  );

    const { applications } = useSelector(
      (state) => state.application
    );
    
  const [applicationState, setApplicationState] = useState([]);

  const rowData = surveyInformation || [];
  // const contracts = useSelector((state) => state.contracts.contracts || []);

    useEffect(() => {
      const processedApplications = applications.map((app) => ({
        ...app,
        showIsLocked: [1, 2, 3].includes(Number(categoryId))
          ? ["New", "Pending"].includes(app.status) &&
            (auth.user_group === "IHCO" ||
              auth.user_group === "Credit Manager" ||
              auth.user_group === "administrator")
          : ["Submitted","Pending"].includes(app.status) &&
            (auth.user_group === "IHCO" ||
              auth.user_group === "Credit Manager" ||
              auth.user_group === "administrator"),
      }));
  
      setApplicationState(processedApplications);
    }, [applications, auth, categoryId]);

const surveyInformationParam = {
  category_id: categoryId,
  survey_type: surveyType,
  investigation_status: surveyResult.toLowerCase(),
  ...((auth.user_group === "CMCO" || auth.user_group === "CMCE" || auth.user_group === "Agent") && { assign_user_id: auth.id }),
};


  const handleToggleSwitch = async (rowData) => {
    try {
      const { application } = rowData;
      const is_locked = application.is_locked;

      if (auth.user_group === "Credit Manager" || auth.is_super === true) {
        setSelectedRow(rowData);
        setOpenAssignUserModal(true);
      } else {
        await dispatch(
          lockApplication({
            data: {
              application_id: application?.id,
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
      fetchSurveyInformation()
    } catch (error) {
      console.error("Error:", error);
    }
  };

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

    // Define the fetchSurveyInformation function using useCallback
    const fetchSurveyInformation = useCallback(() => {
      dispatch(
        getSurveyInformation({
          firstFetch: true,
          params: {
            ...surveyInformationParam, // Use your actual parameters here
          },
        })
      );
    }, [dispatch, surveyInformationParam]); // Add dependencies

  useEffect(() => {
    if (apiCalledRef.current) return;
    fetchApi();
    fetchSurveyInformation();
    apiCalledRef.current = true;
  }, [fetchApi, fetchSurveyInformation]);


  // useEffect(() => {
  //   dispatch(
  //     getSurveyInformation({
  //       firstFetch: true,
  //       params: {
  //         ...surveyInformationParam,
  //       },
  //     })
  //   );
  // }, [dispatch]);
  
  const defaultColDef = useMemo(
    () => ({
      valueSetter: (params) => { },
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
        headerName: "ApplicationID",
        width: 130,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "name",
        headerName: "Name",
        width: 130,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "survey_type",
        headerName: "Survey Type",
        width: 130,
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
        cellRenderer: SurveyInformationTableRowMenu,
        cellRendererParams: {},
        lockPinned: true,
      },
      {
        headerName: "Is Locked?",
        field: "application.is_locked",
        width: 80,
        sortable: false,
        lockPosition: "left",
        pinned: "left",
        lockPinned: true,
        cellRenderer: (params) => {
          const rowData = params.data;
          const status = rowData.application.status;
          return (
            <Switch
              size="small"
              checked={rowData.application.is_locked === 1}
              onChange={() => handleToggleSwitch(rowData)}
              color="primary"
              disabled={rowData.application.status !== "New" && rowData.application.status !== "Submitted" && rowData.application.status !== "Pending"}
            />
          );
        },
        hide: !applicationState.some((app) => app.showIsLocked),
      },
      {
        headerName: "Latest Locked By",
        field: "application.locked_user.user_name",
        width: 140,
        sortable: false,
        hide: !applicationState.some((app) => app.showIsLocked),
      },
      {
        field: "cmco_user.user_name",
        headerName: "CMCO Name",
        width: 130,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "ihco_user.user_name",
        headerName: "IHCO Name",
        width: 130,
        sortable: true,
        resizable: true,
      },
      {
        field: "investigation_status",
        headerName: "Investigation Status",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "start_time",
        headerName: "Start Time",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
        width: 180,
        sortable: true,
        resizable: true,
      },
      {
        field: "skip_time",
        headerName: "Skip Time",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
        width: 180,
        sortable: true,
        resizable: true,
      },
      {
        field: "end_time",
        headerName: "End Time",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
        width: 180,
        sortable: true,
        resizable: true,
      },
      {
        field: "remark",
        headerName: "Remark",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "assign_user.user_name",
        headerName: "Assign Name",
        width: 130,
        sortable: true,
        resizable: true,
      },
      {
        field: "agent_user.user_name",
        headerName: "Agent Name",
        width: 130,
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
    [ categoryName, categoryId, applicationState]
  );

  const handleBodyScroll = useCallback(async () => {
    if (next_page_param) {
      dispatch(
        getSurveyInformation({
          params: next_page_param,
          firstFetch: false,
        })
      );
    }
  }, [dispatch, next_page_param]);

  const [filterBy, setFilterBy] = useState();

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

    setFilterBy(transformedSearchData);
    dispatch(
      getSurveyInformation({
        params: {
          ...surveyInformationParam,
          ...transformedSearchData,
        },
      })
    );
  };


  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" className="margin-top-8">
        <Typography color="text.primary">Application</Typography>
        <Typography color="text.primary">Survey</Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={SURVEY_SEARCH_OPTIONS}
        status={SURVEY_STATUS}
        onSearch={handleSearch}
      />
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={rowData ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="SurveyInformationTable"
          rowKey="id"
          agThemeStyle={{
            height: "calc(100vh - 210px)",
          }}
          onScrollBottomEnd={handleBodyScroll}
          loading={isLoading}
        />
      </Paper>
    </Box>
  );
};

export default React.memo(SurveyInformationTable);
