import { useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import {
  createCustomerInquiries,
  getCustomerInquiries,
  updateCustomerInquiries,
} from "features/customerInquiriesForm/customerInquiriesFormSlice";
import { getUserByUuid } from "features/users/usersSlice";

const useCustomerInquiriesForm = () => {
  const dispatch = useDispatch();
  const [openEditModal, setOpenEditModal] = useState(false);

  const { control, reset, handleSubmit, setValue } = useForm({});

  const auth = useSelector((state) => state.auth.user);

  const { user } = useSelector((state) => state.user);
  const onSubmit = useCallback(
    async (body, editFlag) => {
      try {
        if (editFlag) {
          await dispatch(
            updateCustomerInquiries({
              id: body?.uuid,
              newData: {
                ...body,
                action: body.action === true ? 1 : 0,
                inquiry_datetime:
                  (body?.inquiry_datetime &&
                    body?.inquiry_datetime.format("YYYY-MM-DD HH:mm:ss")) ||
                  null,
              },
            })
          ).unwrap();

          showSuccessToast(
            CommonMessage.MFS00003.replace("%s", "Customer Inquiry")
          );
        } else {
          await dispatch(
            createCustomerInquiries({
              ...body,
              action: 0,
              inquiry_datetime:
                (body?.inquiry_datetime &&
                  body?.inquiry_datetime.format("YYYY-MM-DD HH:mm:ss")) ||
                null,
            })
          ).unwrap();

          showSuccessToast(
            CommonMessage.MFS00001.replace("%s", "Customer Inquiry")
          );
        }
        reset();

        await dispatch(getUserByUuid());
        
        if( auth.user_group === "CMCO" || auth.user_group === 'CMCE'){
          await dispatch(
            getCustomerInquiries({
              firstFetch: true,
              params: {
                created_by: user.id,
              }
            })
          );
        }else{
          await dispatch(
            getCustomerInquiries({
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

export default useCustomerInquiriesForm;
