import React, {
  useMemo,
  useEffect,
  useState,
} from "react";
import Table from "components/Table";
import { useSearchParams } from "react-router-dom";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Tooltip from "@mui/material/Tooltip";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import DeleteConfirmationModal from "common/DeleteConfirmationModal";
import { useDispatch, useSelector } from "react-redux";
import CommonMessage from "common/CommonMessage";
import { showSuccessToast } from "common/ToastMessage";
import { deleteCMCOUser, getCMCOUserByTownshipId } from "modules/administration/slices/usersSlice";

const CMCOListModal = ({
  open,
  onClose,
  townshipId,
}) => {
  const dispatch = useDispatch();

  const [params, setParams] = useSearchParams();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // for delete confirmation modal open flag
  const [confirmMessage, setConfirmMessage] = useState(""); // for delete confirm message body
  const [deleteData, setDeleteData] = useState([]); // want to delete data
  const [data, setData] = useState([]);

  const { cmcoUsers, isLoading } = useSelector(
    (state) => state.cmcoUsers
  );


  // const nrcTownshipIdRef = useRef(nrcTownshipId); // Use ref to store nrcTownshipId

  useEffect(() => {
    if (townshipId && open) {
      dispatch(getCMCOUserByTownshipId(townshipId));
    }
  }, [dispatch, townshipId, open]);

  // Update the ref whenever nrcTownshipId changes
  // useEffect(() => {
  //   nrcTownshipIdRef.current = nrcTownshipId;
  // }, [nrcTownshipId]);

  // useEffect(() => {
  //   setData(cmcoUsers);
  // }, [cmcoUsers]);

  // let modifiedRowData = (row) => {
  //   return {
  //     ...row,
  //   };
  // };

  // let rowDataTemp = cmcoUsers?.map(modifiedRowData);

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
      await dispatch(deleteCMCOUser({district_id: townshipId,user_id: deleteData.id})).unwrap();
      showSuccessToast(
        CommonMessage.MFS00002.replace("%s", "CMCO User")
      );
      await dispatch(getCMCOUserByTownshipId(townshipId));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // const handleCellValueChanged = useCallback(
  //   async (event) => {
  //     const value = event.newValue;
  //     const selectedUuid = event.data.uuid;
  //     const currentNrcTownshipId = nrcTownshipIdRef.current; // Use the ref value

  //     try {
  //       await dispatch(
  //         updateNRCTownshipVariation({
  //           id: selectedUuid,
  //           newData: { name: value },
  //         })
  //       ).unwrap();

  //       showSuccessToast(CommonMessage.MFS00008);
  //       await dispatch(
  //         getNRCTownshipVariationsByTownshipId(currentNrcTownshipId)
  //       );
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   },
  //   [dispatch]
  // );

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
        field: "user_name",
        width: 200,
        headerName: "Name",
        sortable: false,
        resizable: true,
        //editable: true,
        // cellEditor: "agTextCellEditor",
        // cellClass: "textfield-cell", // call textfield-cell css
        // valueFormatter: CurrencyFormatter,
        //onCellValueChanged: handleCellValueChanged,
      },
      {
        field: "nrc_or_csc",
        width: 150,
        headerName: "NRC",
        sortable: false,
        resizable: true,
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
          CMCO List
        </DialogTitle>
        <DialogContent>
          <Table
            searchParams={params}
            setSearchParams={setParams}
            rowData={cmcoUsers ?? []}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            name="UserCMCOList"
            rowKey="id"
            agThemeStyle={{
              height: "calc(100vh - 300px)",
            }}
            loading={isLoading}
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

export default CMCOListModal;
