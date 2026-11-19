import { useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { createDealerContactPerson, getDealerContactPeople, updateDealerContactPerson } from "modules/loan-operation/slices/dealerContactPersonSlice";
import { getDealers } from "modules/loan-operation/slices/dealerSlice";

const useDealerContactPersonForm = () => {
  const dispatch = useDispatch();

  const { control, reset, handleSubmit, setValue } = useForm({});

  const onSubmit = useCallback(
    async (body, editFlag, selectedDealer, dealerMenuFlag, createDealerFlag) => {

     
      let createData = [];
      if(createDealerFlag){
        createData = [body];
      }else{
        createData = body.valueFields?.map((row) => ({
          ...row,
          dealer_id: row.dealer_id || "",
        }));
      }
      
       try {
        if (editFlag) {
          await dispatch(
            updateDealerContactPerson({ id: body?.uuid, newData: { ...body, in_active : body.in_active === true ? 1 : 0 } })
          ).unwrap();

          showSuccessToast(
            CommonMessage.MFS00003.replace("%s", "Dealer Contact Person")
          );
        } else {
          await dispatch(createDealerContactPerson(createData)).unwrap();

          showSuccessToast(
            CommonMessage.MFS00001.replace("%s", "Dealer Contact Person")
          );
        }
        reset();
        if(dealerMenuFlag){
          await dispatch(
            getDealerContactPeople({
              params: {
                dealer_id: selectedDealer,
              },
              firstFetch: true,
            })
          );
        }else{
          await dispatch(
            getDealerContactPeople({
              firstFetch: true,
            })
          );
        }
       
        return true;
      } catch (error) {
        console.error("Error", error);
        return false;
      }
    },
    [dispatch, reset]
  );
  return useMemo(
    () => ({
      onSubmit,
      handleSubmit,
      control,
      reset,
      setValue,
    }),
    [
      onSubmit,
      handleSubmit,
      control,
      reset,
      setValue,
    ]
  );
};

export default useDealerContactPersonForm;
