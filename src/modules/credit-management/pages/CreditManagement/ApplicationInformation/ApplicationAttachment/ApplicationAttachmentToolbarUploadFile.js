import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Table from "components/Table";
import { useParams } from "react-router";
import {
  createFileAttach,
  getDocumentTypes, getFileAttaches,
} from "modules/administration/slices/fileAttachSlice";
import { useDispatch, useSelector } from "react-redux";
import VisuallyHiddenInput from "components/form/VisuallyHiddenInput";
import { toast } from "react-toastify";
import {useSearchParams} from "react-router-dom";

const ApplicationAttachmentToolbarUploadFile = ({ open, onClose }) => {
  const { primaryKey, tableName } = useParams();
  const { application, isLoading: applicationIsLoading } = useSelector(
    (state) => state.applicationDetail
  );
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const { isSubmitting } = useSelector(
    (state) => state.fileAttaches.createFileAttach
  );

  const { data, isLoading } = useSelector(
    (state) => state.fileAttaches.documentType
  );

  const documentTypeColumnDefs = [
    {
      field: "document_type_id",
      headerName: "Document Type",
      sortable: true,
      filter: "agTextColumnFilter",
      floatingFilter: true,
    },
  ];

  useEffect(() => {
    if (application?.category_id && application?.sub_category_id) {
      dispatch(
        getDocumentTypes({
          table_name: tableName,
          params: {
            category_id: application?.category_id,
            sub_category_id: application?.sub_category_id,
          },
        })
      );
    }
  }, [
    application?.category_id,
    application?.sub_category_id,
    dispatch,
    tableName,
  ]);

  const [selectedDocumentTypes, setSelectedDocumentTypes] = useState([]);
  const fileInputRef = useRef(null);

  const onSelectionChangedDocumentTypes = useCallback((rows) => {
    setSelectedDocumentTypes(rows);
  }, []);

  const handleOnChangeFileInput = async (e) => {
    try {
      const formData = new FormData();
      const files = Array.from(e.target.files);
      files.forEach((file, index) => {
        formData.append(`files[${index}]`, file); // Append each file with a unique key
      });
      formData.append(
        "document_type",
        selectedDocumentTypes[0].document_type_id
      );
      formData.append("primary_key", primaryKey);
      formData.append("table_name", tableName);
      await dispatch(createFileAttach({ body: formData })).unwrap();
      e.target.value = null;
      setSelectedDocumentTypes([]);
      dispatch(
          getFileAttaches({
            params: {
              ...Object.fromEntries(params),
              table_name: tableName,
              primary_key: primaryKey,
            },
          })
      );
      toast.success("Upload Success", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (e) {
      console.log(e);
    }
    dispatch(
        getFileAttaches({
          params: {
            table_name: tableName,
            primary_key: primaryKey,
          }
        })
    );
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isSubmitting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog
        sx={{ "& .MuiDialog-paper": { width: "80%" } }}
        maxWidth="xs"
        open={open}
      >
        <DialogTitle
          id="scroll-dialog-title"
          variant="h5"
          sx={{ color: "#1890ff" }}
        >
          Select Document Type
        </DialogTitle>
        <DialogContent dividers>
          <Table
            loading={isLoading || applicationIsLoading}
            rowSelection={"single"}
            onSelectionChanged={onSelectionChangedDocumentTypes}
            columnDefs={documentTypeColumnDefs}
            name="ApplicationAttachment"
            rowData={data}
            rowKey="document_type_id"
            defaultColDef={{
              flex: 1,
            }}
            agThemeStyle={{
              height: "calc(100vh - 220px)",
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={async () => {
              if (selectedDocumentTypes.length) {
                fileInputRef.current.click();
                onClose();
              }
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <VisuallyHiddenInput
        ref={fileInputRef}
        type="file"
        onChange={handleOnChangeFileInput}
        multiple
      />
    </>
  );
};

export default React.memo(ApplicationAttachmentToolbarUploadFile);
