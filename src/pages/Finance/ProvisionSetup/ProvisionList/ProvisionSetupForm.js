
import { getProvisionSetups, storeProvisionSetups, updateProvisionSetups } from "features/provisionSetup/provisionSetupSlice";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

function ProvisionSetupForm() {
    const { control, handleSubmit, getValues, reset } = useForm();
    const dispatch = useDispatch();
    const { isLoading } = useSelector(state => state.provisionSetup);

    const [createEditFormOpen, setCreateEditFormOpen] = useState(false);
    const [editValues, setEditValues] = useState([]);

    useEffect(() => {
        reset({
            ...editValues,
        });
    }, [reset, editValues]);


    const onSubmit = async (data, editFlag) => {
        let response;
        if (editFlag) {
            response = await dispatch(updateProvisionSetups(data))
        } else {
            response = await dispatch(storeProvisionSetups(data))
        }

        if (response?.payload?.success) {
            reset();
            setCreateEditFormOpen(false);
            dispatch(getProvisionSetups({}))
        }
    };

    const close = () => {
        setCreateEditFormOpen(false);
    }

    return useMemo(
        () => ({
            control,
            onSubmit,
            handleSubmit,
            getValues,
            isLoading,
            reset,
            createEditFormOpen,
            setCreateEditFormOpen,
            close,
            editValues,
            setEditValues
        }),
        [
            control,
            onSubmit,
            handleSubmit,
            getValues,
            isLoading,
            reset,
            createEditFormOpen,
            setCreateEditFormOpen,
            close,
            editValues,
            setEditValues
        ]
    );
}

export default ProvisionSetupForm;