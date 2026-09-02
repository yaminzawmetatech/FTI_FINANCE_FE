import {useCallback, useEffect, useMemo} from "react";

import {useForm} from "react-hook-form";
import dayjs from "dayjs";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {
    getAssessment,
    updateAssessmentByUuid,
    updateAssessmentStatusByUuid,
} from "../../../../../../features/assessment/assessmentSlice";
import {showSuccessToast} from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { getApplicationSetupList } from "features/menuApplicationSetup/menuApplicationSetupSlice";
import { getProjectCategory } from "features/projectcategory/projectcategorySlice";

const useApplicationAssessmentForm = () => {
    const {id} = useParams();
    const {assessment, isLoading} = useSelector(
        (state) => state.assessments.assessmentDetail
    );

    const {projectCategories, isLoading: projectCategoriesLoading} = useSelector(
        (state) => state.projectCategories
    );

    const dispatch = useDispatch();

    const {control, reset, handleSubmit, setValue, getValues} = useForm({
        defaultValues: {},
    });

    useEffect(() => {
        dispatch(getAssessment({id}));
    }, [dispatch, id]);

    const {data: applicationSetups, isLoading: applicationSetupsLoading} =
    useSelector((state) => state.menuApplicationSetup.applicationSetups);

const applicationSetup = useMemo(
    () => applicationSetups.find((item) => +item.category_id === +assessment?.category_id ),
    [assessment, applicationSetups]
);

const application_fields = useMemo(
    () => applicationSetup?.application_fields || {},
    [applicationSetup]
);

useEffect(() => {
    dispatch(getApplicationSetupList());
    dispatch(getProjectCategory());
}, [dispatch]);

    useEffect(() => {
        reset({
            ...assessment,
            conduct_at: assessment?.conduct_at && dayjs(assessment?.conduct_at),
            commencement_date:
                assessment?.commencement_date && dayjs(assessment?.commencement_date),
            first_due_date: assessment?.first_due_date && dayjs(assessment?.first_due_date),
            created_at: assessment?.created_at && dayjs(assessment?.created_at),
            updated_at: assessment?.updated_at && dayjs(assessment?.updated_at),
            disbursed_based_on_package_setup : assessment?.disbursed_based_on_package_setup === 1 ? true : false,
        });
    }, [assessment, reset]);

    const handleOnOk = useCallback(
        handleSubmit(async (data, event) => {
            await dispatch(
                updateAssessmentByUuid({
                    id: assessment?.id,
                    body: {
                        ...data,
                        disbursed_based_on_package_setup: data.disbursed_based_on_package_setup === true ? 1 : 0,
                        total_amount: data.total_amount ?? 0,
                        vehicle_down_payment_ratio: data.vehicle_down_payment_ratio ?? 0,
                        vehicle_down_payment_amount: data.vehicle_down_payment_amount ?? 0,
                        down_payment_amount: data.down_payment_amount ?? 0,
                        insurance_premium_fee: data.insurance_premium_fees ?? 0,
                        commencement_date:
                            (data?.commencement_date &&
                                data?.commencement_date.format("YYYY-MM-DD HH:mm:ss")) ||
                            null,
                        first_due_date:
                            (data?.first_due_date &&
                                data?.first_due_date.format("YYYY-MM-DD")) ||
                            null,
                    },
                })
            ).unwrap();
            showSuccessToast(CommonMessage.MFS00008);
            //setTimeout(() => {
            //  window.close();
            //}, 5000);
        }),
        [assessment?.id, dispatch, handleSubmit]
    );

    const handleStatusChange = useCallback(
        (status) =>
            handleSubmit(async (data, event) => {
                try {
                    await dispatch(
                        updateAssessmentStatusByUuid({
                            id: assessment?.id,
                            status,
                            body: {
                                ...data,
                                commencement_date:
                                    (data?.commencement_date &&
                                        data?.commencement_date.format("YYYY-MM-DD HH:mm:ss")) ||
                                    null,
                                first_due_date:
                                    (data?.first_due_date &&
                                        data?.first_due_date.format("YYYY-MM-DD HH:mm:ss")) ||
                                    null,
                            },
                        })
                    ).unwrap();

                    showSuccessToast(CommonMessage.MFS00008);
                    //setTimeout(() => {
                     //   window.close();
                    //}, 5000);
                } catch (e) {
                }
            }),
        [handleSubmit, dispatch, assessment?.id]
    );

    

    return useMemo(
        () => ({
            isLoading,
            handleOnOk,
            control,
            assessment,
            setValue,
            getValues,
            handleStatusChange,
            handleSubmit,
            reset,
            application_fields,
            projectCategories
        }),
        [
            control,
            isLoading,
            handleOnOk,
            assessment,
            setValue,
            getValues,
            handleStatusChange,
            handleSubmit,
            reset,
            application_fields,
            projectCategories
        ]
    );
};

export default useApplicationAssessmentForm;
