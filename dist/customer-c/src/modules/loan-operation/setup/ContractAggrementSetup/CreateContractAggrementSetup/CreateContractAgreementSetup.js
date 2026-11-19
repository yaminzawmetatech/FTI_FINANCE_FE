import React, {useState, useEffect, useMemo} from "react";
import {Box, Button, Grid} from "@mui/material";
import {Helmet} from "react-helmet";
import {useParams} from "react-router";
import {useWatch} from "react-hook-form";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import {useDispatch, useSelector} from "react-redux";
import FormInputText from "components/form/FormInputText";
import CustomChip from "components/CustomChip";
import FormInputSelect from "components/form/FormInputSelect";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import useContractAggrementSetupForm from "./hook/useContractAggrementSetupForm";
import {getContractAggrementSetup} from "modules/loan-operation/slices/contractAggrementSetupSlice";

const CreateContractAgreementSetup = () => {
    //=============== ckeditor =====================
    const [editorData, setEditorData] = useState("");

    const handleChipDragStart = (event, chip) => {
        // Set the data being dragged
        event.dataTransfer.setData("text/plain", JSON.stringify(chip));
    };

    const handleCKEditorDrop = (event, editor) => {
        event.preventDefault();
        const draggedChip = JSON.parse(event.dataTransfer.getData("text/plain"));
        const data = editor.getData() + `<p>${draggedChip.label}</p>`;
        setValue("template", data);
    };
    const handleCKEditorDragOver = (event) => {
        event.preventDefault();
    };

    //=================================

    const dispatch = useDispatch();

    const {uuid, mode} = useParams();
    const {
        control,
        onSubmit,
        handleSubmit,
        isLoading,
        setValue,
        projectCategories,
        subCategories,
        templateParameters,
        getValues,
    } = useContractAggrementSetupForm();

    const {contractAgreementSetup} = useSelector(
        (state) => state.contractAgreementSetup.contractAgreementSetupDetail
    );

    useEffect(() => {
        if (mode !== "CreateContractAggrementSetup" && uuid) {
            dispatch(getContractAggrementSetup(uuid));
        }
    }, [dispatch, uuid]);

    useEffect(() => {
        if (contractAgreementSetup) {
            setEditorData(contractAgreementSetup.template);
            setValue("template", contractAgreementSetup.template);
        }
    }, [contractAgreementSetup]);

    const category_id = useWatch({
        control,
        name: "category_id",
    });

    let subCategoriesByCategory = [];

    subCategoriesByCategory = useMemo(
        () => subCategories.filter((item) => item?.category_id === category_id),
        [subCategories, category_id]
    );

    return (
        <>
            <Helmet>
                {mode === "ViewContractAggrementSetup" && (
                    <title>View - Contract Agreement Setup </title>
                )}
                {mode === "CreateContractAggrementSetup" && (
                    <title>Create - Contract Agreement Setup</title>
                )}
                {mode === "EditContractAggrementSetup" && (
                    <title>Edit - Contract Agreement Setup</title>
                )}
            </Helmet>
            <Box
                sx={{
                    px: 1,
                    py: 3,
                }}
            >
                <Box sx={{width: "100%", flex: 1}}>
                    <Box sx={{mt: 1}}>
                        <Grid container spacing={2}>
                            <Grid
                                container
                                item
                                spacing={2}
                                xs={9}
                                sm={9}
                                justifyContent="flex-start"
                                alignItems="flex-start"
                            >
                                <Grid item xs={12}>
                                    <FormInputText
                                        control={control}
                                        name="name"
                                        label={<span className="required">Contract Agreement Setup Name</span>}
                                        rules={{
                                            required: true
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormInputSelect
                                        control={control}
                                        options={projectCategories}
                                        getOptionLabel={(option) => option?.name}
                                        id="id"
                                        name="category_id"
                                        label={<span className="required">Category</span>}
                                        rules={{
                                            required: true
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormInputSelect
                                        control={control}
                                        options={subCategoriesByCategory}
                                        getOptionLabel={(option) => option?.name}
                                        id="id"
                                        name="sub_category_id"
                                        label={<span className="required">Sub Category</span>}
                                        rules={{
                                            required: true
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormInputText
                                        control={control}
                                        name="description"
                                        label="Description"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={editorData}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setValue("template", data); // Set the CKEditor data to the form data
                                        }}
                                        onDrop={(event, editor) => handleCKEditorDrop(event, editor)}
                                        onDragOver={handleCKEditorDragOver}
                                        config={{
                                            toolbar: {
                                                items: [
                                                    "heading",
                                                    "|",
                                                    "bold",
                                                    "italic",
                                                    "|",
                                                    "numberedList",
                                                    "bulletedList",
                                                    "|",
                                                    "undo",
                                                    "redo",
                                                    "|",
                                                    "insertTable",
                                                    "|",
                                                    "link",
                                                    "mediaEmbed",
                                                    "|",
                                                ],
                                            },
                                            table: {
                                                contentToolbar: [
                                                    "tableColumn",
                                                    "tableRow",
                                                    "mergeTableCells",
                                                    "tableWidth",
                                                    "tableHeight",
                                                    "tableCellBorderStyle",
                                                    "TableColumnResize"
                                                ],
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid
                                    // item
                                    // // container
                                    // justifyContent="flex-end"
                                    // xs={8}
                                    // sx={{display: "auto"}}
                                    item xs={12}
                                >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSubmit(onSubmit)}
                                    >
                                        OK
                                    </Button>
                                </Grid>
                            </Grid>
                            {/*</Grid>*/}
                            {/*<Grid*/}
                            {/*    container*/}
                            {/*    item*/}
                            {/*    spacing={2}*/}
                            {/*    xs={4}*/}
                            {/*    sm={4}*/}
                            {/*    justifyContent="flex-start"*/}
                            {/*    alignItems="flex-start"*/}
                            {/*    sx={{*/}
                            {/*        position: "relative",*/}
                            {/*        // gridTemplateColumns: 'repeat(4, 1fr)',*/}
                            {/*        // position: 'sticky',*/}
                            {/*        top: 0,*/}
                            {/*        padding: "10px",*/}
                            {/*        zIndex: "1000",*/}
                            {/*    }}*/}
                            {/*>*/}

                            <Grid
                                container
                                item
                                // spacing={2}
                                xs={3}
                                sm={3}
                                justifyContent="flex-start"
                                alignItems="flex-start"
                            >

                                <Box
                                    sx={{
                                        borderRadius: '5px',
                                        border: "solid 1px #333333",
                                        height: "80%",
                                        overflow: "auto",
                                        position: "fixed",
                                    }}
                                >
                                    {templateParameters.map((item) => (
                                        <CustomChip
                                            key={item.key}
                                            sx={{m: 0.5}}
                                            label={item?.key}
                                            onDragStart={(event) => handleChipDragStart(event, item)}
                                        />
                                    ))}
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </>
    )
        ;
};

export default React.memo(CreateContractAgreementSetup);
