import React, { useMemo } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Table from "components/Table";

const EmailRecordModal = ({ open, handleClose, insuranceInspections }) => {
  return (
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
        Email Record
      </DialogTitle>
      <DialogContent dividers>
        {insuranceInspections && (
          <div style={{ whiteSpace: "pre-wrap" }}>
            <p>
              <strong>To:</strong>{" "}
              {(() => {
                try {
                  return JSON.parse(
                    insuranceInspections.insurance_company?.email || "[]"
                  ).join(", ");
                } catch (error) {
                  return insuranceInspections.insurance_company?.email || "N/A";
                }
              })()}
            </p>
            <p>
              <strong>Subject:</strong> {insuranceInspections.email_subject}
            </p>
            <p>
              <strong>Body:</strong>
              <br />
              {insuranceInspections.email_text}
            </p>
          </div>
        )}
      </DialogContent>

      <DialogActions sx={{ marginBottom: "10px", marginTop: "10px" }}>
        <Button variant="contained" onClick={handleClose}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(EmailRecordModal);
