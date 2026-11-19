import React, {
  useMemo,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import Accordion from "components/Accordion";
import Table from "components/Table";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Tooltip from "@mui/material/Tooltip";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import {
  deleteNRCTownshipVariation,
  getNRCTownshipVariationsByTownshipId,
  updateNRCTownshipVariation,
} from "modules/administration/slices/nrcTownshipVarationSlice";
import DeleteConfirmationModal from "common/DeleteConfirmationModal";
import { useDispatch, useSelector } from "react-redux";
import CommonMessage from "common/CommonMessage";
import { showSuccessToast } from "common/ToastMessage";

const NRCVariationListModal = ({
  nrcTownships,
  open,
  onClose,
  nrcTownshipId,
}) => {
  const dispatch = useDispatch();

  const [params, setParams] = useSearchParams();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // for delete confirmation modal open flag
  const [confirmMessage, setConfirmMessage] = useState(""); // for delete confirm message body
  const [deleteData, setDeleteData] = useState([]); // want to delete data
  const [data, setData] = useState([]);

  const { NRCTownshipVariations, isLoading } = useSelector(
    (state) => state.NRCTownshipVariations
  );

  const nrcTownshipIdRef = useRef(nrcTownshipId); // Use ref to store nrcTownshipId

  useEffect(() => {
    if (nrcTownshipId && open) {
      dispatch(getNRCTownshipVariationsByTownshipId(nrcTownshipId));
    }
  }, [dispatch, nrcTownshipId, open]);

  // Update the ref whenever nrcTownshipId changes
  useEffect(() => {
    nrcTownshipIdRef.current = nrcTownshipId;
  }, [nrcTownshipId]);

  useEffect(() => {
    setData(NRCTownshipVariations);
  }, [NRCTownshipVariations]);

  let modifiedRowData = (row) => {
    return {
      ...row,
    };
  };

  let rowDataTemp = NRCTownshipVariations?.map(modifiedRowData);

  const defaultColDef = useMemo(() => ({}), []);

  const buttonRenderer = (params) => {
    const rowData = params.data;
    return (
      <Tooltip title="Remove" placement="top-start">
        <DeleteOutlinedIcon
          onClick={() => handleButtonClick(rowData)}
          style={{ cursor: "pointer", color: "gray" }}
        />
      </Tooltip>
    );
  };

  const handleButtonClick = (row) => {
    setIsDeleteModalOpen(true);
    setConfirmMessage(CommonMessage.MFC00001);
    setDeleteData(row);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setDeleteData([]);
  };

  const handleDeleteConfirmed = async () => {
    setIsDeleteModalOpen(false);
    try {
      await dispatch(deleteNRCTownshipVariation(deleteData.uuid)).unwrap();
      showSuccessToast(
        CommonMessage.MFS00002.replace("%s", "NRC Township Varation")
      );
      await dispatch(getNRCTownshipVariationsByTownshipId(nrcTownshipId));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCellValueChanged = useCallback(
    async (event) => {
      const value = event.newValue;
      const selectedUuid = event.data.uuid;
      const currentNrcTownshipId = nrcTownshipIdRef.current; // Use the ref value

      try {
        await dispatch(
          updateNRCTownshipVariation({
            id: selectedUuid,
            newData: { name: value },
          })
        ).unwrap();

        showSuccessToast(CommonMessage.MFS00008);
        await dispatch(
          getNRCTownshipVariationsByTownshipId(currentNrcTownshipId)
        );
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [dispatch]
  );

  const columnDefs = useMemo(
    () => [
      {
        field: "row",
        headerName: "No",
        valueGetter: "node.rowIndex + 1",
        width: 40,
        sortable: true,
        resizable: true,
      },
      {
        field: "name",
        width: 300,
        headerName: "Name",
        sortable: false,
        resizable: true,
        editable: true,
        cellEditor: "agTextCellEditor",
        cellClass: "textfield-cell", // call textfield-cell css
        // valueFormatter: CurrencyFormatter,
        onCellValueChanged: handleCellValueChanged,
      },
      {
        headerName: "Actions",
        field: "actions",
        width: 100,
        sortable: false,
        resizable: true,
        cellRenderer: buttonRenderer,
      },
    ],
    []
  );

  return (
    <>
      <Dialog
        sx={{ "& .MuiDialog-paper": { width: "35%" } }}
        maxWidth="md"
        open={open}
      >
        <DialogTitle
          id="scroll-dialog-title"
          variant="h5"
          sx={{ color: "#1890ff" }}
        >
          NRC Variation List
        </DialogTitle>
        <DialogContent>
          <Table
            searchParams={params}
            setSearchParams={setParams}
            rowData={rowDataTemp ?? []}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            name="NRCVariations"
            rowKey="id"
            agThemeStyle={{
              height: "calc(100vh - 300px)",
            }}
            //loading={isWriteOffLoading}
            buttonRenderer={buttonRenderer}
          />
          <DialogActions>
            <Button
              onClick={() => {
                onClose();
              }}
              variant="outlined"
              color="error"
            >
              Close
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        onDelete={handleDeleteConfirmed}
        message={confirmMessage}
      />
    </>
  );
};

export default NRCVariationListModal;
