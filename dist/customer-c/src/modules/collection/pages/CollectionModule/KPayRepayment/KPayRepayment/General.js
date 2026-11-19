import React, {useEffect, useState} from "react";
import {Box, Grid, TextField, Button} from "@mui/material";
import Accordion from "components/Accordion";
import FormInputText from "components/form/FormInputText";
import {useWatch, Controller} from "react-hook-form";
import FormInputDateTimePicker from "components/form/FormInputDateTimePicker";
import {useDispatch, useSelector} from "react-redux";
import FormInputSelect from "components/form/FormInputSelect";
import useRepaymentForm from "./hooks/useRepaymentForm";
import ConfirmationModal from "common/ConfirmationModal";
import CommonMessage from "common/CommonMessage";
import {useParams} from 'react-router-dom';
import {getProjectCategory} from "modules/administration/slices/projectcategorySlice";

import accountCodes, {getBankAccountCodes} from "modules/finance/slices/accountCodeSlice";

const General = () => {

    const {
        control,
        handleSubmit,
        onSubmit,
    } = useRepaymentForm();

    const disabled = useWatch({
        control,
        name: "disabled",
    });

    const dispatch = useDispatch();

    const {mode, uuid} = useParams();

    const {projectCategories} = useSelector(
        (state) => state.projectCategories
    );

    const {bankAccountCodes} = useSelector(
        (state) => state.accountCodes
    );

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState("");

    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        mode === 'edit' ? setEditMode(true) : setEditMode(false);
        dispatch(getProjectCategory());

        dispatch(getBankAccountCodes());
    }, [dispatch])

    const handleOk = () => {
        setIsConfirmModalOpen(false);
        handleSubmit(onSubmit())();
    }

    return (
        <Accordion title="General">
            <Box sx={{mt: 1}}>
                <Grid
                    container
                    spacing={2}
                    justifyContent="flex-start"
                    alignItems="flex-start"
                >
                    <Grid
                        container
                        item
                        spacing={2}
                        xs={12}
                        sm={6}
                        justifyContent="flex-start"
                        alignItems="flex-start"
                    >
                        <Grid item xs={12}>
                            <FormInputText
                                control={control}
                                label={<span className="required">Description</span>}
                                name="description"
                                disabled={disabled}
                                // defaultValue={repaymentDetails ? repaymentDetails.description : ""}
                                rules={{required: true}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormInputText
                                control={control}
                                label="Uploader ID"
                                name="created_user"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormInputText
                                control={control}
                                label="Status"
                                name="status"
                                disabled
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        item
                        spacing={2}
                        xs={12}
                        sm={6}
                        justifyContent="flex-start"
                        alignItems="flex-start"
                    >
                        <Grid item xs={12}>
                            <FormInputDateTimePicker
                                control={control}
                                label={<span className="required">Posting Date</span>}
                                name="posting_date"
                                disabled={disabled}
                                rules={{required: true}}
                            />
                        </Grid>

                        {/* <Grid item xs={12}>
                            <Controller
                                control={control}
                                disabled={mode === 'view' || mode === 'edit'}
                                name={"import_excel_file"}
                                render={({field: {value, onChange, ...field}}) => {
                                    return (
                                        // <TextField id="outlined-basic" label="Outlined" variant="outlined" sx={{ width: '100%' }}/>
                                        <TextField
                                            {...field}
                                            value={value?.fileName}
                                            onChange={(event) => {
                                                onChange(event.target.files[0]);
                                            }}
                                            type="file"
                                            id="picture"
                                            rules={{required: true}}
                                            sx={{width: '100%'}}
                                            size="small"
                                        />
                                    );
                                }}
                            />
                        </Grid> */}


                        <Grid item xs={12}>
                            <FormInputSelect
                                control={control}
                                options={bankAccountCodes ?? []}
                               // getOptionLabel={(option) => option?.name || ""}
                                getOptionLabel={(option) =>`(${option.account_no ?? ""}) - ${option.name ?? ""}`}
                                id="id"
                                label="Bank Account Code"
                                name="account_code_id"
                                disabled={disabled}
                                rules={{required: false}}
                            />
                        </Grid>

                        {(mode !== 'edit') &&
                        <Grid item xs={12}>
                            <FormInputSelect
                                control={control}
                                options={projectCategories ?? []}
                                getOptionLabel={(option) => option?.name || ""}
                                id="id"
                                label="Product Category"
                                name="category_id"
                                disabled={disabled}
                                rules={{required: false}}
                            />
                        </Grid>
                        }
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{display: "flex", px: 1, pb: 1, justifyContent: "flex-end", my: 2}}>
                {mode !== 'view' && <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        setIsConfirmModalOpen(true);
                        setConfirmMessage(CommonMessage.MFC00003);
                    }}
                >
                    {mode === 'edit' ? 'Update' : 'Create'}
                </Button>}
            </Box>
            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={() => {
                    handleOk();
                }}
                message={confirmMessage}
            />
        </Accordion>
    );

};

export default React.memo(General);
