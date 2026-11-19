import { createEOM, getEOMLogEntryByUuid } from 'modules/finance/slices/EOMSlice';
import React, { useEffect, useMemo } from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Routes, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { showSuccessToast } from 'common/ToastMessage';
function useJobQueueFrom() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { hash, pathname, search } = location;
    const { control, setValue, handleSubmit, reset } = useForm();
    const { mode, uuid, route } = useParams();
    const { jobQueueLogEntryDetails } = useSelector(state => state.EOM);

    useEffect(() => {
        if (mode === 'view') {
            dispatch(getEOMLogEntryByUuid(uuid));
        }
    }, [])

   // const disabledFormAction = () => pathname !== '/finance/eom-bom-index/kpay' && '/finance/eom-bom-index/all';
   const disabledFormAction = () => !(pathname === '/finance/eom-bom-index/kpay' || pathname === '/finance/eom-bom-index/all');


    useEffect(() => {
        if (mode === 'view') {
            reset({
                description: jobQueueLogEntryDetails?.description,
                eom_date: jobQueueLogEntryDetails?.eom_date && dayjs(jobQueueLogEntryDetails?.eom_date),
                bom_date: jobQueueLogEntryDetails?.bom_date && dayjs(jobQueueLogEntryDetails?.bom_date),
                test_date: jobQueueLogEntryDetails?.eom_date && dayjs(jobQueueLogEntryDetails?.eom_date),
            });
        }
    }, [jobQueueLogEntryDetails])

    const onSubmit = async (data) => {
        let param = {};
        if( route === "kpay"){
            param = {
                "description": data.description,
                "eom_date": data.eom_date.format("YYYY-MM-DD"),
                "bom_date": data.bom_date.format("YYYY-MM-DD"),
                //"generated_application_id": data.generated_application_id,
                "is_kpay_eom_bom": 1
            }
        }else {
            param = {
                "description": data.description,
                "eom_date": data.eom_date.format("YYYY-MM-DD"),
                "bom_date": data.bom_date.format("YYYY-MM-DD"),
                //"generated_application_id": data.generated_application_id,
                "is_kpay_eom_bom": 0
            }
        }
        

        let response = await dispatch(createEOM(param));
        showSuccessToast(response?.payload?.message);

        if (response?.payload?.success) {
            if(route === "kpay"){
                navigate(
                    `/finance/eom-bom/${response?.payload?.data?.uuid}/kpay/view`
                );
            }else{
                navigate(
                    `/finance/eom-bom/${response?.payload?.data?.uuid}/all/view`
                );
            }
            
            window.location.reload(true);
        }
    };


    return useMemo(() => ({
        control,
        setValue,
        handleSubmit,
        onSubmit,
        disabledFormAction
    }), [
        control,
        setValue,
        handleSubmit,
        onSubmit,
        disabledFormAction
    ])
}

export default useJobQueueFrom