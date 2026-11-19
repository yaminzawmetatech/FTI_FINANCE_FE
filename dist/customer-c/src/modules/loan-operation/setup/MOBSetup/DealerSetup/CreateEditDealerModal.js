import * as React from "react";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import FormInputText from "components/form/FormInputText";
import FormInputSelect from "components/form/FormInputSelect";
import FormInputDatePicker from "components/form/FormInputDatePicker";
import useDealerForm from "./DealerHook";
import { useSelector } from "react-redux";
import FormInputCheckbox from "components/form/FormInputCheckbox";
import dayjs from "dayjs";
import { FormLabel } from "@mui/material";
import { useWatch } from "react-hook-form";
import {
  getAddressDistricts,
  getDistrictByStateAndTownship,
  resetAddressDistricts,
} from "modules/administration/slices/addressDistrictSlice";
import { useDispatch } from "react-redux";
import { getAddressTownships } from "modules/administration/slices/addressTownshipSlice";
import FormInputNumber from "components/form/FormInputNumber";

export const CreateEditDealerModal = ({
  open,
  onClose,
  editValues,
  editFlag,
  copyFlag,
  upgradeFlag,
  selectedId,
}) => {
  const dispatch = useDispatch();

  const [addressTownshipsArr, setAddressTownshipsArr] = useState([]);

  const { addressTownships, isLoading: addressTownshipLoading } = useSelector(
    (state) => state.addressTownships
  );

  const { dealerGroups } = useSelector((state) => state.dealerGroups);

  const { addressStates } = useSelector((state) => state.addressStates);

  const { addressDistricts } = useSelector((state) => state.addressDistricts);

  const { control, onSubmit, handleSubmit, reset, setValue } = useDealerForm();

  const guarantee_amount = useWatch({
    control,
    name: "guarantee_amount",
  });

  const no_of_vehicles = useWatch({
    control,
    name: "no_of_vehicles",
  });

  const state_id = useWatch({
    control,
    name: "state_id",
  });

  const district_id = useWatch({
    control,
    name: "district_id",
  });

  const township_id = useWatch({
    control,
    name: "township_id",
  });

  const has_guarantee = useWatch({
    control,
    name: "has_guarantee",
  });

  const start_date = useWatch({
    control,
    name: "start_date",
  });


  useEffect(() => {
    if (editFlag === false) {
      reset();
      setValue("in_active", true);
    }
  }, [editFlag, editValues, open, reset]);

  useEffect(() => {
    if (guarantee_amount) {
      setValue("no_of_vehicles", "");
    }
    if (no_of_vehicles) {
      setValue("guarantee_amount", "");
    }
  }, [guarantee_amount, no_of_vehicles]);

  const handleClickSubmit = (data) => {
    handleSubmit(async (data) => {
      const isSuccess = await onSubmit(
        data,
        editFlag,
        copyFlag,
        upgradeFlag,
        selectedId
      );
      if (isSuccess) {
        onClose(); // Close the modal if successful
      }
    })();
  };

  useEffect(() => {
    if (state_id) {
      dispatch(getAddressDistricts({ address_state_id: state_id }));
    }
  }, [dispatch, state_id]);

  useEffect(() => {
    if (state_id && township_id && !district_id) {
      dispatch(
        getDistrictByStateAndTownship({
          addressStateId: state_id,
          addressTownshipId: township_id,
        })
      );
    } else if (!township_id && state_id) {
      dispatch(getAddressDistricts({ address_state_id: state_id }));
    }
  }, [dispatch, township_id, state_id, district_id]);

  useEffect(() => {
    if (state_id && township_id) {
      let district_id = addressTownshipsArr.find(
        (township) => township.id === township_id
      )?.address_district_id;
      let temp_address_district_id = addressDistricts.find(
        (district) => district.id === district_id
      )?.id;
      setValue("district_id", temp_address_district_id);
    }
  }, [township_id, state_id, addressDistricts, addressTownshipsArr]);

  useEffect(() => {
    if (district_id && !township_id) {
      dispatch(getAddressTownships({ address_district_id: district_id }));
    }
  }, [dispatch, district_id, township_id]);

  useEffect(() => {
    if (state_id) {
      const townshipsArr = addressStates
        .filter((state) => state.id === state_id)
        .map((state) => state.townships)
        .flat();
      setAddressTownshipsArr(townshipsArr);
    }
  }, [state_id, addressStates]);

  useEffect(() => {
    if (state_id === null) {
      dispatch(resetAddressDistricts());
      setAddressTownshipsArr([]);
    } else if (district_id === null) {
      const townshipsArr = addressStates
        .filter((state) => state.id === state_id)
        .map((state) => state.townships)
        .flat();
      setAddressTownshipsArr(townshipsArr);
    }
  }, [dispatch, state_id, district_id, township_id]);

  useEffect(() => {
    setAddressTownshipsArr(addressTownships);
  }, [addressTownships]);

  useEffect(() => {
    if (open && (editFlag || copyFlag)) {
      reset({
        ...editValues,
        in_active: editValues?.in_active === 1 ? true : false,
        printer_available: editValues?.printer_available === 1 ? true : false,
        has_guarantee: editValues?.has_guarantee === 1 ? true : false,
        operating_starting_date:
          editValues?.operating_starting_date &&
          dayjs(editValues?.operating_starting_date),
        dealer_contract_signed_date:
          editValues?.dealer_contract_signed_date &&
          dayjs(editValues?.dealer_contract_signed_date),
        guarantee_amount: editValues?.latest_guarantee?.guarantee_amount,
        no_of_vehicles: editValues?.latest_guarantee?.no_of_vehicles,
        start_date:
          editValues?.latest_guarantee?.start_date &&
          dayjs(editValues?.latest_guarantee?.start_date),
        end_date:
          editValues?.latest_guarantee?.end_date &&
          dayjs(editValues?.latest_guarantee?.end_date),
      });
    }
  }, [open, editFlag, editValues, copyFlag, reset]);

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {editFlag === true
          ? "Edit Dealer"
          : copyFlag
          ? "Copy Dealer"
          : upgradeFlag
          ? "Create New Guarantee Information"
          : "Create New Dealer"}
      </DialogTitle>
      <DialogContent>
        {!upgradeFlag && (
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
              mt: 1,
              marginTop: "20px",
            }}
          >
            <FormInputSelect
              control={control}
              options={dealerGroups ?? []}
              getOptionLabel={(option) => option?.name || ""}
              id="id"
              name="dealer_group_id"
              label={<span className="required">Dealer Group</span>}
              rules={{
                required: true,
              }}
            />
            <FormInputText
              control={control}
              label={<span className="required">Name</span>}
              name="name"
              rules={{
                required: true,
              }}
            />
            <FormInputText
              control={control}
              label={<span className="required">Owner Name</span>}
              name="owner_name"
              rules={{
                required: true,
              }}
            />
            <FormInputSelect
              control={control}
              options={[
                { id: "HP", name: "HP" },
                { id: "School", name: "School" },
                { id: "Travel", name: "Travel" },
              ]}
              getOptionLabel={(option) => option?.name || ""}
              id="id"
              name="dealer_type"
              label={<span className="required">Dealer Type</span>}
              rules={{
                required: true,
              }}
            />
            <FormInputSelect
              control={control}
              options={addressStates ?? []}
              getOptionLabel={(option) => option?.name || ""}
              id="id"
              name="state_id"
              label={<span className="required">Address State</span>}
              rules={{
                required: true,
              }}
              onSelect={() => {
                setValue("district_id", "");
                setValue("township_id", "");
              }}
            />
            <FormInputSelect
              control={control}
              options={addressDistricts}
              getOptionLabel={(option) => option?.name}
              id="id"
              name="district_id"
              label={<span className="required">District</span>}
              onSelect={() => {
                setValue("township_id", "");
              }}
            />
            <FormInputSelect
              control={control}
              options={addressTownshipsArr}
              getOptionLabel={(option) => option?.name}
              id="id"
              name="township_id"
              label={<span className="required">Township</span>}
              rules={{
                required: true,
              }}
            />
            {/* <FormInputSelect
              control={control}
              options={addressStates ?? []}
              getOptionLabel={(option) => option?.name || ""}
              id="id"
              name="state_id"
              label={<span className="required">Address State</span>}
              rules={{
                required: true,
              }}
            /> */}
            <FormInputText
              control={control}
              label={<span className="required">Showroom Address</span>}
              name="showroom_address"
              rules={{
                required: true,
              }}
            />
            <FormInputText
              control={control}
              label={<span className="required">Showroom Ph No</span>}
              name="showroom_ph_no"
              rules={{
                required: true,
              }}
            />
            <FormInputDatePicker
              control={control}
              label={<span className="required">Dealer Contract Signed Date</span>}
              name="dealer_contract_signed_date"
              rules={{
                required: true,
              }}
            />
            <FormInputText
              control={control}
              label="Selling Product Type"
              name="selling_product_type"
            />
            <FormInputText
              control={control}
              label="Commission Percentage"
              name="commission_percentage"
            />
            <FormInputText
              control={control}
              label="Dealer Discount Percentage"
              name="dealer_discount_percentage"
            />
            <FormInputText
              control={control}
              label="Direct Marketing Commission Percentage"
              name="direct_marketing_commission_percentage"
            />
            <FormInputDatePicker
              control={control}
              label={<span className="required">Operating Starting Date</span>}
              name="operating_starting_date"
              rules={{
                required: true,
              }}
            />
            <FormInputText
              control={control}
              label="Description"
              name="description"
            />
            <FormInputText control={control} label="Printer" name="printer" />
            <FormInputText
              control={control}
              label="Fixed Asset No"
              name="printer_fixed_asset"
            />
            <FormInputCheckbox
              control={control}
              label="Is Printer Available?"
              name="printer_available"
            />
            {(!editFlag) && 
              <FormInputCheckbox
              control={control}
              label="Has Guarantee?"
              name="has_guarantee"
            />
            }
          </Stack>
        )}

        {(upgradeFlag || has_guarantee) && (
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
              mt: 1,
              marginTop: "20px",
            }}
          >
            <FormLabel sx={{ fontWeight: "bold" }}>
              Guarantee Information
            </FormLabel>
            <FormInputNumber
              control={control}
              name="guarantee_amount"
              label={<span className="required">Guarantee Amount</span>}
              // rules={{
              //   required: true,
              // }}
              disabled={no_of_vehicles}
            />
            <FormInputText
              control={control}
              name="no_of_vehicles"
              label={
                <span className="required">
                  No of Contracts
                </span>
              }
              // rules={{
              //   required: true,
              // }}
              disabled={guarantee_amount}
            />
            <FormInputDatePicker
              control={control}
              label={
                <span className="required">Guarantee Info Start Date</span>
              }
              name="start_date"
              rules={{
                required: true,
              }}
            />
            <FormInputDatePicker
              control={control}
              label={<span className="required">Guarantee Info End Date</span>}
              name="end_date"
              rules={{
                required: true,
              }}
              minDate={start_date ?? dayjs(start_date)}
              //minDate={ ? new Date() : undefined}
            />
          </Stack>
        )}
         {editFlag && !upgradeFlag && (
              <FormInputCheckbox
                control={control}
                label="Is Active?"
                name="in_active"
              />
            )}

        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
          }}
        ></Stack>
        <DialogActions sx={{ p: "1.25rem" }}>
          <Button
            onClick={() => {
              reset();
              onClose();
            }}
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
          <Button type="submit" onClick={handleClickSubmit} variant="contained">
            {editFlag === true ? "Update" : copyFlag === true ? "Copy" : "Save"}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditDealerModal;
