import React, { useState } from "react";
import { Button, CircularProgress, Portal, Backdrop } from "@mui/material";
import axiosInstance from "core/services/api/axiosInstance";
import VisuallyHiddenInput from "components/form/VisuallyHiddenInput";
import InputIcon from "@mui/icons-material/Input";

const ExcelImportButton = ({ fetchApi }) => {
  const [importSubmitting, setImportSubmitting] = useState(false);

  const handleFileChange = async (e) => {
    setImportSubmitting(true);
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("import_excel_file", file);
    //  formData.append("category_id", categoryId);
      await axiosInstance.post("applications/importApplication", formData);
    } catch (e) {
      console.log(e);
    }
    setImportSubmitting(false);
    e.target.value = null;
    fetchApi();
  };

  return (
    <>
      <Portal container={document.body}>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={importSubmitting}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Portal>
      <Button
        color="inherit"
        component="label"
        sx={{ borderRadius: 0 }}
        startIcon={<InputIcon />}
      >
        Excel Import
        <VisuallyHiddenInput
          type="file"
          accept=".csv,.xlsx,.tsv,.ods, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          onChange={handleFileChange}
        />
      </Button>
    </>
  );
};

export default ExcelImportButton;
