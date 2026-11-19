import React, { useState, useCallback, useRef } from "react";
import { Modal, Button, IconButton, Box, Grid, Skeleton } from "@mui/material";
import { useDispatch } from "react-redux";
import ConfirmationModal from "common/ConfirmationModal";
import CommonMessage from "common/CommonMessage";
import { getContracts } from "modules/loan-operation/slices/contractSlice";
import openNewWindow from "utils/windowUtils";
import { showErrorToast, showSuccessToast } from "common/ToastMessage";
import { AppBar } from "@mui/material";
import { createBatchLCSignature, createCollateralSignature, getCollateralSignature } from "modules/loan-operation/slices/collateralSignatureSlice";
import { useForm } from "react-hook-form";
import FormInputSelect from "components/form/FormInputSelect";
import SignatureCanvas from "react-signature-canvas";
import { licenseRenewalAssign } from "modules/loan-operation/slices/collateralSlice";
import CollateralListExcelExport from "./CollateralListExcelExport";

const CollateralLicenseListAppBar = ({ selectedRows, user, CMCO, applicationIds }) => {
    const { control, getValues, reset, handleSubmit, setValue } = useForm({
        defaultValues: {
            disabled: false,
        },
    });
    const dispatch = useDispatch();

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // for confirmation modal open flag
    const [confirmMessage, setConfirmMessage] = useState(""); // for delete confirm message body
    const sigCanvasLoan = useRef(null);

    const checkConfirm = () => {
        if (!selectedRows || selectedRows.length === 0) {
            showErrorToast("Please select at least one row before performing this action");
            return;
        }
        setIsConfirmModalOpen(true);
    };

    const onSubmit = useCallback(
        async (body) => {
            if (!selectedRows || selectedRows.length === 0) {
                showErrorToast("No rows selected. Please select at least one row.");
                return;
            }

            let isSuccess = false;
            const arrayOfIds = selectedRows.map(obj => obj.id);
            try {
                const finalBody = {
                    ...body,
                    collateral_ids: arrayOfIds,
                    assign_user_id: body?.cmco_id
                };

                await dispatch(licenseRenewalAssign({ data: finalBody })).unwrap();

                isSuccess = true;
            } catch (error) {
                console.error("Error submitting signature:", error);
                showErrorToast(error.message || "Failed to submit signature");
            } finally {
                if (isSuccess) {
                    showSuccessToast(CommonMessage.MFS00008);
                    setIsConfirmModalOpen(false); // Close modal after submit
                }
            }
        },
        [dispatch, selectedRows]
    );

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
                    <div style={{ alignContent: "center" }}>
                        No. Selected Row(s) : {selectedRows?.length || 0}
                    </div>
                    <div style={{ marginLeft: "auto" }}>
                        {!(user.user_group === 'CMCO' || user.user_group === 'CMCE') && (
                            <Button
                                variant="contained"
                                onClick={checkConfirm}
                                disabled={!selectedRows || selectedRows.length === 0}
                            >
                                Assign User
                            </Button>
                        )}

                        <CollateralListExcelExport
                            applicationIds={applicationIds}
                            disabled={!selectedRows || selectedRows.length === 0}
                        />
                    </div>
                </div>
            </AppBar>
            <Modal open={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)}>
                <Box
                    sx={{
                        width: 600,
                        bgcolor: "background.paper",
                        p: 4,
                        borderRadius: 2,
                        boxShadow: 24,
                        mx: "auto",
                        mt: "10vh",
                    }}
                >
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <FormInputSelect
                                control={control}
                                options={CMCO}
                                getOptionLabel={(option) => option?.user_name || ""}
                                id="id"
                                name="cmco_id"
                                label="CMCO Name"
                            />
                        </Grid>
                    </Grid>

                    {/* Close Button */}
                    <Box sx={{ textAlign: "right", mt: 3 }}>
                        <Button
                            variant="contained"
                            color="success"
                            sx={{ mr: 2 }}
                            onClick={handleSubmit(onSubmit)}
                            disabled={!selectedRows || selectedRows.length === 0}
                        >
                            Submit
                        </Button>
                        <Button variant="contained" color="primary" onClick={() => setIsConfirmModalOpen(false)}>
                            Close
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default React.memo(CollateralLicenseListAppBar);