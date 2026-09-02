import { useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { showSuccessToast } from "common/ToastMessage";
import { createExcludeBlackListArea } from "features/address/BlackListArea/blackListAreaSlice";

const useAddressVillageTractForm = () => {
  const dispatch = useDispatch();
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // const [selectedRows, setSelectedRows] = useState([]);

  const { control, reset, handleSubmit, setValue, resetField } = useForm({});

 // const { resetField } = useFormContext();

  const duplicateBySubCategory = (item) => {
    return item.sub_category_id.map((subCategory) => ({
      state_id: item.address_state_id ?? null,
      district_id: item.address_district_id ?? null,
      township_id: item.address_township_id ?? null,
      city_id: item.address_city_id ?? null,
      ward_id: item.address_ward_id ?? null,
      village_tract_id: item.address_village_tract_id ?? null,
      village_id: item.address_village_id ?? null,
      category_id: subCategory.category_id,
      sub_category_id: subCategory.id,
    }));
  };

  const duplicateBySelectedRows = (item, selectedRows) => {
    const result = [];
  
    item.sub_category_id.forEach((subCategory) => {
      selectedRows.forEach((selected) => {
        result.push({
          state_id: selected?.address_state_id ?? null,
          district_id: selected?.address_district_id ?? null,
          township_id: selected?.address_township_id ?? null,
          city_id: selected?.address_city_id ?? null,
          ward_id: selected?.address_ward_id ?? null,
          village_tract_id: selected?.address_village_tract_id ?? null,
          village_id: selected?.address_village_id ?? null,
          category_id: subCategory?.category_id,
          sub_category_id: subCategory?.id,
        });
      });
    });
  
    return result;
  };
    
  const onSubmit = useCallback(
    async (body, editFlag,selectedRows) => {
      const payload = editFlag ? duplicateBySubCategory(body) : duplicateBySelectedRows(body,selectedRows);
      try {
          await dispatch(
            createExcludeBlackListArea({ ...payload })
          ).unwrap();

          showSuccessToast(
            "Blacklist Area excluded successfully!"
          );
        
        // else {
        //   await dispatch(createAddressVillage({ ...body })).unwrap();

        //   showSuccessToast(
        //     CommonMessage.MFS00001.replace("%s", "Address Village")
        //   );
        // }
        reset();
        setCreateModalOpen(false);
        // await dispatch(
        //   getAddressVillageList({
        //     firstFetch: true,
        //   })
        // );
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
      createModalOpen,
      setCreateModalOpen: (value) => setCreateModalOpen(value),
      reset,
      setValue,
      // selectedRows,
      // setSelectedRows,
      resetField
    }),
    [
      onSubmit,
      handleSubmit,
      control,
      createModalOpen,
      setCreateModalOpen,
      reset,
      setValue,
      // selectedRows,
      // setSelectedRows,
      resetField
    ]
  );
};

export default useAddressVillageTractForm;
