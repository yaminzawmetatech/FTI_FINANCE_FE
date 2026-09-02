import React, { useMemo, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Table from "components/Table";
import dayjs from "dayjs";
import { getDealerContactPeople } from "features/dealerContactPerson/dealerContactPersonSlice";
import DealerContactPersonTableRowMenu from "../DealerContactPersonSetup/DealerContactPersonTableRowMenu";
import CreateDealerContactPersonModal from "../DealerContactPersonSetup/CreateDealerContactPersonModal";
import { YesNoRenderer } from "common/YesNoRenderer";
import ContactPersonExcelExport from "./ContactPersonExportButton";

const DealerContactPeopleModal = ({ open, onClose, selectedId }) => {
  const dispatch = useDispatch();

  const { dealerContactPeople, isLoading } = useSelector(
    (state) => state.dealerContactPeople
  );

  const [openContactPersonModal, setOpenContactPersonModal] = useState(false);

  useEffect(() => {
    if (open) {
      dispatch(
        getDealerContactPeople({
          params: {
            dealer_id: selectedId,
          },
          firstFetch: true,
        })
      );
    }
  }, [open, dispatch, selectedId]);

  const defaultColDef = useMemo(
    () => ({
      valueSetter: (params) => {},
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
        field: "name",
        headerName: "Name",
        width: 200,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "ph_no",
        headerName: "Ph No",
        width: 100,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "email",
        headerName: "Email",
        width: 130,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "nrc",
        headerName: "Nrc",
        width: 120,
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
        cellRenderer: DealerContactPersonTableRowMenu,
        cellRendererParams: () => ({
          selectedDealerId: selectedId,
          rowMenuFlag: true,
        }),
        lockPinned: true,
      },
      {
        field: "dealer.name",
        headerName: "Dealer",
        width: 200,
        resizable: true,
      },
      {
        field: "type",
        headerName: "Type",
        width: 150,
        resizable: true,
      },
      {
        field: "address",
        headerName: "Address",
        width: 200,
        resizable: true,
      },
      {
        field: "title_position",
        headerName: "Title Position",
        width: 100,
        resizable: true,
      },
      {
        field: "in_active",
        headerName: "Is Active?",
        width: 100,
        sortable: true,
        resizable: true,
        cellRenderer: YesNoRenderer,
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
    [selectedId]
  );

  const handleAddContactPerson = () => {
    setOpenContactPersonModal(open);
  };

  return (
    <>
      <Dialog
        sx={{ "& .MuiDialog-paper": { width: "100%" } }}
        maxWidth="md"
        open={open}
      >
        <DialogTitle
          id="scroll-dialog-title"
          variant="h5"
          sx={{ color: "#1890ff" }}
        >
          <div style={{ display: "flex" }}>
            <div>Dealer Contact Person</div>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <div style={{ display: "flex" }}>
            <div style={{ marginLeft: "auto" }}>
             <ContactPersonExcelExport ids={dealerContactPeople?.map((item) => item.id)} />
            </div>
          </div>
          <Table
            //searchParams={params}
            rowData={dealerContactPeople ?? []}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            name="CreditCriteriaVersionHistory"
            rowKey="id"
            agThemeStyle={{
              height: "calc(100vh - 300px)",
            }}
            loading={isLoading}
          />
        </DialogContent>
        <DialogActions sx={{ marginBottom: "10px", marginTop: "10px" }}>
          <Button
            variant="contained"
            onClick={() => {
              onClose();
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <CreateDealerContactPersonModal
        open={openContactPersonModal}
        onClose={() => setOpenContactPersonModal(false)}
        editFlag={false}
        selectedId={selectedId}
      />
    </>
  );
};

export default React.memo(DealerContactPeopleModal);
