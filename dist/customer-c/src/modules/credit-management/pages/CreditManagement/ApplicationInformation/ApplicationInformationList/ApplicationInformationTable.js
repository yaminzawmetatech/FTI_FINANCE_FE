import * as React from "react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Table from "components/Table";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getApplication } from "modules/credit-management/slices/applicationSlice";
import dayjs from "dayjs";
import ApplicationTableRowMenu from "./ApplicationTableRowMenu";
import useApplicationSetup from "../CreateApplicationInformation/hooks/useApplicationSetup";
import { MYANMAR_NET, WAVE_MONEY } from "constants/applicationType";
import { CurrencyFormatter } from "common/CurrencyFormatter";

const ApplicationInformationTable = () => {
  const {
    categoryName,
    categoryId,
    // subCategoryName,
    // subCategoryUuid
  } = useParams();
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();
  const { application_fields, applicationSetupsLoading } =
    useApplicationSetup();

  const application_fields_group = useMemo(
    () => Object.values(application_fields).map((item) => item.group),
    [application_fields]
  );

  const { applications, next_page_param, isLoading } = useSelector(
    (state) => state.application
  );

  const defaultColDef = useMemo(
    () => ({
      valueSetter: (params) => {},
    }),
    []
  );

  const [gridApi, setGridApi] = React.useState(null);
  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  React.useEffect(() => {
    // Recalculate row numbers after filtering
    if (gridApi) {
      const updateRowNumbers = () => {
        const nodes = gridApi.getRenderedNodes();
        nodes.forEach((node, index) => {
          node.setDataValue('No.', index + 1);
        });
      };

      gridApi.addEventListener('firstDataRendered', updateRowNumbers);

      return () => {
        gridApi.removeEventListener('firstDataRendered', updateRowNumbers);
      };
    }
  }, [gridApi]);

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
        field: "approved_amount",
        headerName: "Approved Amount",
        width: 150,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter
      },
      {
        headerName: "",
        field: "menu",
        width: 50,
        pinned: "left",
        lockPinned: true,
        cellRenderer: ApplicationTableRowMenu,
        cellRendererParams: (params) => ({
          deleteData: (data) => {},
          categoryName,
          categoryId,
          category: params.data?.category,
          data: params.data,
        }),
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
        width: 100,
        resizable: true,
      },
      {
        field: "ihco_user.user_name",
        headerName: "IHCO",
        width: 200,
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
        field: "living_phone_number	",
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
    [application_fields_group, categoryName, categoryId]
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

  return (
    <Table
      searchParams={params}
      setSearchParams={setParams}
      rowData={applications ?? []}
      columnDefs={columnDefs}
      defaultColDef={defaultColDef}
      name="ApplicationInformationTable"
      rowKey="id"
      agThemeStyle={{
        height: "calc(100vh - 170px)",
      }}
      onScrollBottomEnd={handleBodyScroll}
      loading={isLoading}
    />
  );
};

export default React.memo(ApplicationInformationTable);
