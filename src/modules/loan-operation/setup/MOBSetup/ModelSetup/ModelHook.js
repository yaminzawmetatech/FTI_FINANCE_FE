import { useState, useMemo, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { createModel, getModels, updateModel } from "modules/loan-operation/slices/ModelSlice";


const useModelFrom = () => {
  const dispatch = useDispatch();
  const [openEditModal, setOpenEditModal] = useState(false);

  const { control, reset, handleSubmit, setValue } = useForm({});


  

  const onSubmit = useCallback(
    async (body, editFlag) => {
      
      // const createData = body.valueFields;

      

      try {
        if (editFlag) {
          await dispatch(
            updateModel({
              "data" : body,
              "uuid" :  body?.uuid}
            )
          ).unwrap();

          showSuccessToast(CommonMessage.MFS00003.replace("%s", "Model"));
        } else {
          
          await dispatch(createModel({'data' : body})).unwrap();

          showSuccessToast(CommonMessage.MFS00001.replace("%s", "Model"));
        }
        reset();
        setOpenEditModal();
        await dispatch( 
          getModels({
            firstFetch: true,
          })
        );
        return true;
      } catch (error) {
        console.error("Error", error);
      }
    },
    [dispatch, reset]
  );
  return useMemo(
    () => ({
      onSubmit,
      handleSubmit,
      control,
      openEditModal,
      setOpenEditModal: (value) => setOpenEditModal(value),
      reset,
      setValue,
    }),
    [
      onSubmit,
      handleSubmit,
      control,
      openEditModal,
      setOpenEditModal,
      reset,
      setValue,
    ]
  );
};

export default useModelFrom;
