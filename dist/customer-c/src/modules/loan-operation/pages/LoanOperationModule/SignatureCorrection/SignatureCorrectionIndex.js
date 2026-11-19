import React, { useState } from "react";
import { Button, Box, Grid, Breadcrumbs, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { getApplication } from "modules/credit-management/slices/applicationSlice";
import FormInputText from "components/form/FormInputText";
import openNewWindow from "utils/windowUtils";
import { showErrorToast } from "common/ToastMessage";
import LoadingButton from "@mui/lab/LoadingButton";

const SignatureCorrectionIndex = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const { control, handleSubmit } = useForm({
        defaultValues: {
            application_id: "",
        },
    });

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const result = await dispatch(
                getApplication({
                    params: {
                        ids: data.application_id,
                    },
                })
            ).unwrap();

            if (result.data.length > 0) {
                const application = result.data[0];

                openNewWindow(
                    `/loan-module/sign-loan-agreement/${application.uuid}/${application.id}/signature-correction`
                );
            } else {
                showErrorToast("!No Application Found");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                px: 1,
                pb: 1,
                display: "flex",
                gap: 2,
                "@media (max-width: 600px)": {
                    flexDirection: "column",
                },
            }}
        >
            <Box sx={{ mt: 1 }}>
                <Breadcrumbs aria-label="breadcrumb" className="margin-top-8">
                    <Typography color="text.primary">Loan Operation</Typography>
                    <Typography color="text.primary">Signature Correction</Typography>
                </Breadcrumbs>

                <Grid container spacing={2} sx={{ mt: 4 }}>
                    <Grid item xs={12} sm={12}>
                        <FormInputText
                            control={control}
                            label="Application ID"
                            name="application_id"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <LoadingButton
                            variant="contained"
                            loading={loading}
                            onClick={handleSubmit(onSubmit)}
                        >
                            Search
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default React.memo(SignatureCorrectionIndex);