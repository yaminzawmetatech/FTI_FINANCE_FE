import React, { useMemo, useEffect, useState, useCallback } from "react";
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Paper } from "@mui/material";
import Accordion from "components/Accordion";
import Table from "components/Table";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Tooltip from "@mui/material/Tooltip";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import { Skeleton } from "@mui/lab";
import ExcelExportButton from "./WriteOffListExcelExportButton";
import WriteOffListTableRowMenu from "./WriteOffListTableRowMenu";
import { useDispatch, useSelector } from "react-redux";
import { getContracts } from "features/contract/contractSlice";
import AdvancedSearch from "components/form/AdvancedSearch";
import { CONTRACT_NORMAL_SEARCH_OPTIONS } from "constants/searchOptions/contractNormalSearchOptions";
import { YesNoRenderer } from "common/YesNoRenderer";
import { useNavigate } from "react-router-dom";

const WriteOffList = ({
  writeOffPrepareContracts,
  handleButtonClick,
  isWriteOffLoading,
  isCreateStage,
  handleCellValueChanged,
  editAbleForm,
  control,
  setSelectedRows,
  mode,
  uuid,
  setNormalSelectedRows,
  handleNormalSubmit,
  setOpenAddModal,
  openAddModal,
  setValue,
  auth,
  writeOffBatchs,
  ids
}) => {

  const dispatch = useDispatch();
  // inside your component
const navigate = useNavigate();

  const [params, setParams] = useSearchParams();
  const [data, setData] = useState([]);


  const { contracts, next_page_param, isLoading } = useSelector(
    (state) => state.contracts
  );

  const defaultColDef = useMemo(() => ({}), []);

  useEffect(() => {
    let temp_arr = writeOffPrepareContracts?.map((item) => ({
      ...item,
      application_id: item.application_id || item.contract?.generated_application_id,
      partner_id: item.partner_id || item.contract?.partner_id,
      contract_status: item.contract_status || item.contract?.contract_status,
      overdue_status: item.overdue_status || `Overdue${item.contract?.overdue_status}`,
      contract_date: item.contract_date || item.contract?.application?.disbursed_date,
      area: item.area || item.contract?.application?.address_state?.name,
      loan_amount: item.loan_amount || item.contract?.loan_amount,
      category_name: item.category_name || item.contract?.category?.name,
      sub_category_name: item.sub_category_name || item.contract?.sub_category?.name,
      customer_name: item.customer_name || item.contract?.customer_name,
      pic: item.pic || item.contract?.ihco_name,
      partner_id: item.partner_id || item.contract?.mnet_application_id || item.contract?.customer_loan_id || item.contract?.kpay_id,
      created_at: item.contract?.created_at || item.created_at,
      updated_at: item.contract?.updated_at || item.updated_at,
      created_user: item.contract?.created_user?.user_name || item.created_user,
      modified_user: item.contract?.created_user?.user_name || item.created_user,
      taking_legal_action: item.taking_legal_action || '',
    }));
    setData(temp_arr);
    setValue("total_count", temp_arr?.length);
  }, [writeOffPrepareContracts]);




const buttonRenderer = (params) => {
  const rowData = params.data;

  const handleDelete = () => {
    // Convert ids string array into flat list
    const idList = ids
      .flatMap(idStr => idStr.split(",")) // "1136,12921" → ["1136","12921"]
      .map(id => id.trim());

    // Filter out deleted contract_id
    const updatedIds = idList.filter(id => id !== String(rowData.contract_id));

    // Join back into comma string
    const contractIdsParams = updatedIds.join(",");

    // Call your existing callback if needed
    handleButtonClick(rowData);

    // 👇 Navigate with updated ids
    navigate(`/write-off-preparation?contract_ids=${contractIdsParams}`);
  };

  return (
    <Tooltip title="Remove" placement="top-start">
      <DeleteOutlinedIcon
        onClick={handleDelete}
        style={{ cursor: "pointer", color: "gray" }}
      />
    </Tooltip>
  );
};





  const handleSelectionChanged = useCallback((rows) => {
    setSelectedRows(rows);
  }, []);

  const handleNormalSelectionChanged = useCallback((rows) => {
    setNormalSelectedRows(rows);
  }, []);

  // Handle opening the add modal
  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  // Handle closing the add modal
  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };


  const LinkCellRenderer = ({ value, data }) => {
    const uuid = mode === "edit" || mode === "view" ? data?.contract?.uuid : data?.uuid;
    const url = `/contracts/${uuid}/view`;
    return (
      <a href={url} target="_blank" style={{ textDecoration: "underline" }}>
        {value}
      </a>
    );
  };


  const columnDefs = useMemo(
    () => [
      ...(writeOffBatchs?.status === "approved") ? [
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
      ] : [],
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
        field: "application_id",
        headerName: "Application ID",
        width: 150,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
        cellRenderer: LinkCellRenderer,
      },
      {
        field: "partner_id",
        headerName: "Partner ID",
        width: 100,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "customer_name",
        headerName: "Customer Name",
        width: 200,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "contract_status",
        headerName: "Contract Status",
        width: 120,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "overdue_status",
        headerName: "Overdue Status",
        width: 120,
        sortable: true,
        resizable: true,
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
        hide: !isCreateStage,
      },

      ...(uuid) ? [
        {
          field: "taking_legal_action",
          headerName: "Taking Legal Action",
          width: 120,
          sortable: true,
          resizable: true,
          pinned: "left",
          lockPosition: "left",
          lockPinned: true,
          cellRenderer: YesNoRenderer,
        },
        {
          headerName: "",
          field: "menu",
          width: 50,
          lockPosition: "left",
          pinned: "left",
          cellRenderer: WriteOffListTableRowMenu,
          cellRendererParams: {
            selectedData: (data) => {

            },
            writeOffBatchs
          },
          lockPinned: true,
        }] : [],
      {
        field: "ar",
        headerName: "AR",
        width: 150,
        sortable: false,
        resizable: true,
        editable: (
          !isCreateStage &&
          editAbleForm && // form must NOT be marked editable
          ["Accounting", "Collection-Manager", "administrator"].includes(auth?.user_group)
        ),
        cellEditor: 'agTextCellEditor',
        type: 'rightAligned',
        cellClass: 'textfield-cell',  // call textfield-cell css
        valueFormatter: CurrencyFormatter,
        onCellValueChanged: handleCellValueChanged
      },
      {
        field: "ai",
        headerName: "AI",
        width: 150,
        sortable: false,
        resizable: true,
        editable: (
          !isCreateStage &&
          editAbleForm && // form must NOT be marked editable
          ["Accounting", "Collection-Manager", "administrator"].includes(auth?.user_group)
        ),
        cellEditor: 'agTextCellEditor',
        type: 'rightAligned',
        cellClass: 'textfield-cell',  // call textfield-cell css
        valueFormatter: CurrencyFormatter,
        onCellValueChanged: handleCellValueChanged
      },
      {
        field: "write_off_amount",
        headerName: "Write Off amount",
        width: 150,
        sortable: false,
        resizable: true,
        editable: false,
        cellEditor: 'agTextCellEditor',
        type: 'rightAligned',
        cellClass: 'textfield-cell',  // call textfield-cell css
        valueFormatter: CurrencyFormatter,
        onCellValueChanged: handleCellValueChanged
      },
      {
        field: "total_outstanding",
        headerName: "Total Outstanding",
        width: 150,
        sortable: false,
        resizable: true,
        editable: !isCreateStage && editAbleForm,
        cellEditor: 'agTextCellEditor',
        type: 'rightAligned',
        cellClass: 'textfield-cell',  // call textfield-cell css
        valueFormatter: CurrencyFormatter,
        onCellValueChanged: handleCellValueChanged
      },
      {
        field: "repayment_terms",
        headerName: "Repayment Terms",
        width: 100,
        sortable: true,
        resizable: true,
      },
      {
        field: "update_repayment_terms",
        headerName: "Update Repayment Terms",
        width: 130,
        sortable: true,
        resizable: true,
      },
      {
        field: "contract_date",
        headerName: "Disbursed Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
        width: 180,
        sortable: true,
        resizable: true,
      },
      {
        field: "due_date",
        headerName: "Due Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        width: 100,
        sortable: true,
        resizable: true,
      },
      // {
      //   field: "days_late",
      //   headerName: "Days Late",
      //   width: 200,
      //   sortable: true,
      //   resizable: true,
      // },
      {
        field: "monthly_installment",
        headerName: "Monthly Installment",
        valueFormatter: CurrencyFormatter,
        width: 180,
        sortable: true,
        resizable: true,
      },
      {
        field: "due_amount",
        headerName: "Due Amount",
        valueFormatter: CurrencyFormatter,
        width: 120,
        sortable: true,
        resizable: true,
      },
      {
        field: "penalty_days",
        headerName: "Penalty Days",
        width: 100,
        sortable: true,
        resizable: true,
      },
      {
        field: "due_amount_penalty",
        headerName: "Due Amount+Penalty",
        valueFormatter: CurrencyFormatter,
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "last_paid_date",
        headerName: "Last Paid Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "area",
        headerName: "Area",
        width: 100,
        sortable: true,
        resizable: true,
      },
      {
        field: "pic",
        headerName: "PIC",
        width: 180,
        sortable: true,
        resizable: true,
      },
      {
        field: "loan_amount",
        headerName: "Loan Amount",
        width: 150,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "category_name",
        headerName: "Category",
        width: 150,
        resizable: true,
      },
      {
        field: "sub_category_name",
        headerName: "Sub Category",
        width: 150,
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
        field: "created_user",
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
        field: "modified_user",
        headerName: "Modified By",
        width: 200,
        resizable: true,
      },
    ],
    [isCreateStage, handleButtonClick, handleCellValueChanged, editAbleForm, uuid]
  );

  const LinkCellsRenderer = ({ value, data }) => {
    const uuid = data?.uuid;
    const url = `/contracts/${uuid}/view`;
    return (
      <a href={url} target="_blank" style={{ textDecoration: "underline" }}>
        {value}
      </a>
    );
  };

  const columnForNormalDefs = useMemo(
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
        field: "generated_application_id",
        headerName: "ApplicationID",
        width: 130,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
        cellRenderer: LinkCellsRenderer,
      },
      {
        field: "application.application_info.mnet_application_id",
        headerName: "MNET ApplicationID",
        width: 130,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "application.application_info.customer_loan_id",
        headerName: "Customer Loan ID",
        width: 130,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "application.application_info.kpay_id",
        headerName: "Kpay ID",
        width: 130,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "disbursement_date",
        headerName: "Disbursed Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
        width: 180,
        sortable: true,
        resizable: true,
      },
      {
        field: "interest_first_installment_prorata_interest",
        headerName: "Prorata Interest",
        valueFormatter: CurrencyFormatter,
        width: 120,
        sortable: true,
        resizable: true,
      },
      {
        field: "first_due_date",
        headerName: "First Due Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        width: 100,
        sortable: true,
        resizable: true,
      },
      {
        field: "monthly_installment_amount",
        headerName: "Monthly Installment",
        valueFormatter: CurrencyFormatter,
        width: 120,
        sortable: true,
        resizable: true,
      },
      {
        field: "category.name",
        headerName: "Category",
        width: 100,
        resizable: true,
      },
      {
        field: "sub_category.name",
        headerName: "Sub Category",
        width: 100,
        resizable: true,
      },
      {
        field: "application.applicant_name",
        headerName: "Applicant Name",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "application.credit_scheme.name",
        headerName: "Credit Scheme",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "application.nrc",
        headerName: "NRC Number",
        width: 150,
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
        field: "application.loan_amount",
        headerName: "Loan Amount",
        width: 100,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "loan_amount",
        headerName: "Approved Amount",
        width: 100,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "application.application_info.mnet_township",
        headerName: "MNET Township",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "application.address_township.name",
        headerName: "Customer Current Township",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "application.address_ward.name",
        headerName: "Customer Current Ward",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "contract_status",
        headerName: "Contract Status",
        width: 150,
        sortable: true,
        resizable: true,
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

  const handleSearch = (searchData) => {
    const transformedSearchData = {};

    searchData.forEach((item) => {
      if (item.filtered_by === "disbursed_date") {
        const startOfDay = `${item.value1}T00:00:00`;
        const endOfDay = `${item.value2}T23:59:59`;
        transformedSearchData[`${item.filtered_by}_from_date`] = startOfDay;
        transformedSearchData[`${item.filtered_by}_to_date`] = endOfDay;
      } else if (item.type === "date") {
        transformedSearchData[`${item.filtered_by}_from_date`] = item.value1;
        transformedSearchData[`${item.filtered_by}_to_date`] = item.value2;
      } else if (item.type === "autocomplete_status") {
        transformedSearchData[item.filtered_by] = JSON.stringify(item.value1);
      } else {
        transformedSearchData[item.filtered_by] = item.value1;
      }
    });

    dispatch(
      getContracts({
        params: {
          is_generated_gl: 1,
          ...transformedSearchData,
          write_off_status: ["open", "Rejected"],
          _timestamp: new Date().getTime(), // 👈 force refresh
        },
      })
    );
  };


  return (

    <Accordion title="Write Off List">
      <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "10px", paddingBottom: "10px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenAddModal} // Add click handler
          disabled={mode === "edit" || mode === "view"} // Disable if not in create stage or view mode
        >
          Add
        </Button>
        <ExcelExportButton control={control} />
      </div>
      <Box>
        {data ? (<Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={data ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="WriteOffListIndex"
          rowKey="contract_id"
          agThemeStyle={{
            height: "calc(100vh - 300px)",
          }}
          loading={isWriteOffLoading}
          buttonRenderer={buttonRenderer}
          onSelectionChanged={writeOffBatchs?.status === "approved" ? handleSelectionChanged : undefined}
          rowSelection={writeOffBatchs?.status === "approved" ? "multiple" : "none"}
        // rowMultiSelectWithClickFlag={"true"}
        />) : (<Skeleton animation="wave" variant="circular" width={40} height={40} />)}

      </Box>
      {/* Add Modal Dialog */}
      <Dialog
        open={openAddModal}
        onClose={handleCloseAddModal}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Add New Write Off</DialogTitle>
        <DialogContent>
          {/* Add your form components here */}
          <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
            <AdvancedSearch
              options={CONTRACT_NORMAL_SEARCH_OPTIONS}
              onSearch={handleSearch}
            />
            <Paper sx={{ width: "100%" }}>
              <Table
                searchParams={params}
                setSearchParams={setParams}
                rowData={contracts ?? []}
                columnDefs={columnForNormalDefs}
                defaultColDef={defaultColDef}
                name="WriteOffListIndex"
                rowKey="id"
                agThemeStyle={{
                  height: "calc(100vh - 300px)",
                }}
                loading={isWriteOffLoading}
                buttonRenderer={buttonRenderer}
                onSelectionChanged={handleNormalSelectionChanged}
                rowSelection={"multiple"}
              // rowMultiSelectWithClickFlag={"true"}
              />
            </Paper>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddModal}>Cancel</Button>
          <Button
            onClick={handleNormalSubmit}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Accordion>
  );
};

export default WriteOffList;
