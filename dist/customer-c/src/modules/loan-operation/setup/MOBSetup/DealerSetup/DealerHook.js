import { useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import {
  createDealer,
  getDealers,
  updateDealer,
} from "modules/loan-operation/slices/dealerSlice";
import { createDealerContactPerson } from "modules/loan-operation/slices/dealerContactPersonSlice";
import { createGuaranteeData, getGuaranteeData } from "modules/loan-operation/slices/dealerGuaranteeSlice";
import dayjs from "dayjs";

const useDealerForm = () => {
  const dispatch = useDispatch();

  const { control, reset, handleSubmit, setValue } = useForm({});

  const onSubmit = useCallback(
    async (body, editFlag, copyFlag, upgradeFlag, selectedId) => {
      try {
        const guaranteeData = [];
        let currentStartDate = dayjs(body?.start_date).startOf("month");

        if(copyFlag || !upgradeFlag || !editFlag){
          while (currentStartDate.isBefore(dayjs(body?.end_date))) {

            const currentEndDate = currentStartDate.endOf("month");

            guaranteeData.push({
              start_date: currentStartDate.format("YYYY-MM-DD"),
              end_date: currentEndDate.format("YYYY-MM-DD"),
            });

            currentStartDate = currentStartDate
              .add(1, "month")
              .startOf("month");
          }
        }

        if (editFlag) {
          await dispatch(
            updateDealer({
              id: body?.uuid,
              newData: {
                ...body,
                in_active: body.in_active === true ? 1 : 0,
                printer_available: body.printer_available === true ? 1 : 0,
                has_guarantee: body.has_guarantee === true ? 1 : 0,
                operating_starting_date:
                  (body?.operating_starting_date &&
                    body?.operating_starting_date.format(
                      "YYYY-MM-DD HH:mm:ss"
                    )) ||
                  null,
                dealer_contract_signed_date:
                  (body?.dealer_contract_signed_date &&
                    body?.dealer_contract_signed_date.format(
                      "YYYY-MM-DD HH:mm:ss"
                    )) ||
                  null,
                start_date:
                  (body?.start_date &&
                    body?.start_date.format("YYYY-MM-DD HH:mm:ss")) ||
                  null,
                end_date:
                  (body?.end_date &&
                    body?.end_date.format("YYYY-MM-DD HH:mm:ss")) ||
                  null,
              },
            })
          ).unwrap();

          showSuccessToast(CommonMessage.MFS00003.replace("%s", "Dealer"));
        } else if (copyFlag) {

          await dispatch(
            createDealer({
              ...body,
              in_active: body.in_active === true ? 1 : 0,
              printer_available: body.printer_available === true ? 1 : 0,
              has_guarantee: body.has_guarantee === true ? 1 : 0,
              operating_starting_date:
                (body?.operating_starting_date &&
                  body?.operating_starting_date.format(
                    "YYYY-MM-DD HH:mm:ss"
                  )) ||
                null,
              dealer_contract_signed_date:
                (body?.dealer_contract_signed_date &&
                  body?.dealer_contract_signed_date.format(
                    "YYYY-MM-DD HH:mm:ss"
                  )) ||
                null,
              guarantee_data: guaranteeData,
            })
          ).unwrap();

          showSuccessToast(CommonMessage.MFS00004.replace("%s", "Dealer"));
        } else if (upgradeFlag) {
          const guaranteeData = [];
          let currentStartDate = dayjs(body?.start_date).startOf("month");

          // Generate monthly ranges
          while (currentStartDate.isBefore(dayjs(body?.end_date))) {
            const currentEndDate = currentStartDate.endOf("month");

            guaranteeData.push({
              dealer_id: selectedId,
              no_of_vehicles: body?.no_of_vehicles,
              guarantee_amount: body?.guarantee_amount,
              start_date: currentStartDate.format("YYYY-MM-DD"),
              end_date: currentEndDate.format("YYYY-MM-DD"),
            });

            currentStartDate = currentStartDate
              .add(1, "month")
              .startOf("month");
          }

          await dispatch(createGuaranteeData(guaranteeData)).unwrap();

          showSuccessToast(
            CommonMessage.MFS00003.replace("%s", "Dealer Guarantee Data")
          );
        } else {
          await dispatch(
            createDealer({
              ...body,
              in_active: body.in_active === true ? 1 : 0,
              printer_available: body.printer_available === true ? 1 : 0,
              operating_starting_date:
                (body?.operating_starting_date &&
                  body?.operating_starting_date.format(
                    "YYYY-MM-DD HH:mm:ss"
                  )) ||
                null,
              dealer_contract_signed_date:
                (body?.dealer_contract_signed_date &&
                  body?.dealer_contract_signed_date.format(
                    "YYYY-MM-DD HH:mm:ss"
                  )) ||
                null,
              guarantee_data: guaranteeData,
            })
          ).unwrap();

          showSuccessToast(CommonMessage.MFS00001.replace("%s", "Dealer"));
        }
        reset();
        if(upgradeFlag){
          await dispatch(
            getGuaranteeData({
              params: {
                dealer_id: selectedId,
              },
              firstFetch: true,
            })
          );
        }else{
          await dispatch(
            getDealers({
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
    [onSubmit, handleSubmit, control, reset, setValue]
  );
};

export default useDealerForm;
