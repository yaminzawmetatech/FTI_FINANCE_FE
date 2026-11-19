import * as React from "react";
import { useState } from "react";
import InputIcon from "@mui/icons-material/Input";
import { Backdrop, Button, CircularProgress, Portal } from "@mui/material";
import VisuallyHiddenInput from "components/form/VisuallyHiddenInput";
import { useParams } from "react-router";
import axiosInstance from "core/services/api/axiosInstance";

const VillageTractListBarExcelImportButton = ({ fetchApi }) => {
  const [importSubmitting, setImportSubmitting] = useState(false);

  const handleFileChange = async (e) => {
    setImportSubmitting(true);
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("import_excel_file", file);
      await axiosInstance.post("address-village-tracts/importAddressVillageTract", formData);
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
        // color="inherit"
        component="label"
        sx={{ borderRadius: 0 }}
        startIcon={<InputIcon />}
      >
        Excel Import
        <VisuallyHiddenInput type="file" onChange={handleFileChange} />
      </Button>
    </>
  );
};

export default React.memo(VillageTractListBarExcelImportButton);
