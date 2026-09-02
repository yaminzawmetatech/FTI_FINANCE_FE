import React, { useState, useCallback, useRef, useEffect } from "react";
import { Modal, Button, IconButton, Box, Grid, Skeleton } from "@mui/material";
import { useDispatch } from "react-redux";
import ConfirmationModal from "common/ConfirmationModal";
import CommonMessage from "common/CommonMessage";
import { getContracts } from "features/contract/contractSlice";
import openNewWindow from "utils/windowUtils";
import { showErrorToast, showSuccessToast } from "common/ToastMessage";
import { AppBar } from "@mui/material";
import { createBatchLCSignature, createCollateralSignature, getCollateralSignature } from "features/collateralSignature/collateralSignatureSlice";
import { useForm } from "react-hook-form";
import FormInputSelect from "components/form/FormInputSelect";
import SignatureCanvas from "react-signature-canvas";
import CollateralListExcelExport from "./CollateralListExcelExport";
import { use } from "react";

const RepaymentCollateralAppBar = ({ selectedRows, users, user, applicationIds }) => {

    const { control, getValues, reset, handleSubmit, setValue } = useForm({
        defaultValues: {
            disabled: false,
        },
    });
    const dispatch = useDispatch();

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // for confirmation modal open flag
    const [confirmMessage, setConfirmMessage] = useState(""); // for delete confirm message body
    const sigCanvasLoan = useRef(null);

    const loanManagerOptions = user?.user_group === "Loan Operation Manager"
        ? users.filter(u => u.id === user.id)
        : users;

    useEffect(() => {
        if (loanManagerOptions) {
            setValue("loan_manager_id", loanManagerOptions[0]?.id); // Set default value for loan manager
        }
    }, [loanManagerOptions, reset]);


    const handleConfirmed = () => {
        setIsConfirmModalOpen(false);
        const arrayOfIds = selectedRows.map(obj => obj.id);
        // const category = selectedRows.map((repayment) => repayment.category_id);
        // let paramsUrl = `/${category[0]}/Insurance?contract_ids=${arrayOfIds}`;
        // openNewWindow(
        //     paramsUrl
        // );
    };
    const checkConfirm = () => {
        setIsConfirmModalOpen(true);
    };

    const onSubmit = useCallback(
        async (body) => {
            // Validate signature
            if (sigCanvasLoan?.current?.isEmpty()) {
                showErrorToast("Signature is required before submitting.");
                return;
            }
    
            let isSuccess = false;
            const arrayOfIds = selectedRows.map(obj => obj.id);
    
            try {
                const loanSignatureDataUrl = sigCanvasLoan?.current?.toDataURL() ?? null;
    
                const finalBody = {
                    ...body,
                    application_collateral_ids: arrayOfIds,
                    loan_manager_signature: loanSignatureDataUrl,
                };
    
                await dispatch(createBatchLCSignature({ body: finalBody })).unwrap();
                isSuccess = true;
            } catch (error) {
                console.error("Error submitting signature:", error);
                showErrorToast(error.message || "Failed to submit signature");
            } finally {
                if (isSuccess) {
                    showSuccessToast(CommonMessage.MFS00008);
                    setIsConfirmModalOpen(false);
                }
            }
        },
        [dispatch, selectedRows]
    );

    const handleClear = () => {
        sigCanvasLoan.current.clear();
    };


    // useEffect(() => {
    //     if (collateralSignature?.length > 0) {
    //         const foundSignature = collateralSignature?.find(sig => sig.loan_manager_signature !== "");
    //         if (foundSignature && sigCanvas.current) {
    //             sigCanvas.current.fromDataURL(foundSignature.loan_manager_signature);
    //         }
    //     }
    // }, [collateralSignature]);

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
                {/* <StampDutyProcessAppBarSearchInput onIdsChange={setSearchValue} />
        <StampDutyProcessAppBarCategories setCategory={setCategory} />
        <StampDutyPaymentDateRangeSearch
          onFromDateChange={setFromDate}
          onToDateChange={setToDate}
        />
        <Button variant="outlined" onClick={handleSearchClick}>
          Search
        </Button> */}
                <div style={{ display: "flex" }}>
                    <div style={{ alignContent: "center" }}>
                        No. Selected Row(s) : {selectedRows.length}
                    </div>
                    <div style={{ marginLeft: "auto" }}>
                        {(user?.user_group === "Loan Operation Manager" || user?.user_group === "administrator") && (
                            <Button
                                variant="contained"
                                onClick={() => {
                                    checkConfirm();
                                }}
                                disabled={selectedRows.length === 0}
                            >
                                Signature
                            </Button>

                        )}
                        <CollateralListExcelExport
                            applicationIds={applicationIds}
                        />

                        {/* <StampDutyPaymentExcelExport
                            ids={searchValue}
                            categoryId={category}
                            fromDate={fromDate}
                            toDate={toDate}
                            applicationIds={applicationIds}
                        /> */}
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
                        {/* Loan Manager Selection */}
                        <Grid item xs={12} sm={6}>
                            <FormInputSelect
                                control={control}
                                options={loanManagerOptions}
                                getOptionLabel={(option) => option?.user_name || ""}
                                id="id"
                                name="loan_manager_id"
                                label="Loan Manager Name"
                            />
                        </Grid>

                        {/* Signature Canvas */}
                        <Grid item xs={12} sm={6}>
                            <Box sx={{ border: "1px solid black", p: 1 }}>
                                <SignatureCanvas
                                    ref={sigCanvasLoan}
                                    penColor="black"
                                    backgroundColor="white"
                                    canvasProps={{
                                        width: 250,
                                        height: 100,
                                        className: "signature-canvas",
                                    }}
                                />
                                <br />
                                <button
                                    onClick={handleClear}
                                >
                                    Clear
                                </button>
                            </Box>
                        </Grid>
                    </Grid>

                    {/* Close Button */}
                    <Box sx={{ textAlign: "right", mt: 3 }}>
                        <Button
                            variant="contained"
                            color="success"
                            sx={{ mr: 2 }}
                            onClick={handleSubmit(onSubmit)}
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

export default React.memo(RepaymentCollateralAppBar);
