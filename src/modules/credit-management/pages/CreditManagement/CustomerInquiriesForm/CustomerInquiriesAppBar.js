import * as React from "react";
import { useState } from "react";
import { AppBar } from "@mui/material";
import CreateEditDealerGroupModal from "./CreateEditCustomerInquiriesModal";
import { Button } from "@mui/material";
import useCustomerInquiriesForm from "./CustomerInquiriesHook";
import ExcelExportButton from "./CustomerInquiriesExcelExportButton";
import { useSelector } from "react-redux";

const CustomerInquiriesAppBar = ({ids}) => {
  const { onSubmit, handleSubmit, control, reset } = useCustomerInquiriesForm();

  const [open, setOpen] = useState(false);

  const auth = useSelector((state) => state.auth.user);

  const formCreateFlag =
  auth?.permissions.includes("EditCustomerInquiryForm") ||
  auth.is_super === true;

  const handleCreateEdit = () => {
    setOpen(true);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#fafafb",
          color: "black",
          boxShadow: "none",
          mb: 1,
          mt: -1,
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ marginLeft: "auto" }}>
            {formCreateFlag && 
              <Button variant="contained" onClick={handleCreateEdit}>
                Create New
              </Button>
            }
            <ExcelExportButton ids={ids} />
          </div>
        </div>
      </AppBar>
      <CreateEditDealerGroupModal
        open={open}
        onClose={() => setOpen(false)}
        editFlag={false}
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        reset={reset}
      />
    </>
  );
};

export default React.memo(CustomerInquiriesAppBar);
