import { useState, useMemo, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { createBrand, getBrands, updateBrand } from "features/brandSetup/BrandSlice";


const useBrandForm = () => {
  const dispatch = useDispatch();
  const [openEditModal, setOpenEditModal] = useState(false);

  const { control, reset, handleSubmit, setValue } = useForm({});


  

  const onSubmit = useCallback(
    async (body, editFlag) => {
      
      // const createData = body.valueFields;

      

      try {
        if (editFlag) {
          await dispatch(
            updateBrand({
              "data" : body,
              "uuid" :  body?.uuid}
            )
          ).unwrap();

          showSuccessToast(CommonMessage.MFS00003.replace("%s", "Brand"));
        } else {
          
          await dispatch(createBrand({'data' : body})).unwrap();

          showSuccessToast(CommonMessage.MFS00001.replace("%s", "Brand"));
        }
        reset();
        setOpenEditModal();
        await dispatch( 
          getBrands({
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

export default useBrandForm;
