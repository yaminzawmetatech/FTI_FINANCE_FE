import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  checkExistingCustomer,
  getApplicationByUuid,
} from "modules/credit-management/slices/applicationDetailSlice";
import { useParams } from "react-router-dom";
import { updateApplicationByUuid } from "modules/credit-management/slices/applicationSlice";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import {
  APPROVED,
  CANCEL,
  NEW,
  PENDING,
  RECONSIDERATION,
  REJECTED,
  REQUEST_FOR_APPROVAL,
  SUBMITTED,
} from "constants/applicationStatus";
import { IHCO } from "constants/userGroup";
import { showErrorToast, showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { getAgents, getCMCO, getUsers } from "modules/administration/slices/usersSlice";
import { getNRCStates } from "modules/administration/slices/nrcStateSlice";
import { getMenuApplicationSetups } from "modules/administration/slices/menuApplicationSetupSlice";
import { getApplicationResponses } from "modules/credit-management/slices/applicationResponseSlice";
import {
  getDealerByDealerType,
  getDealersByUserRole,
} from "modules/loan-operation/slices/dealerSlice";
import { getAllCreditSchemes } from "modules/loan-operation/slices/creditSchemeSlice";
import {
  getDealerPackagesByDealerId,
  getDealerPackagesById,
} from "modules/loan-operation/slices/dealerPackageSlice";
import { getDealerContactPeople } from "modules/loan-operation/slices/dealerContactPersonSlice";
import { getCustomerBanks } from "modules/administration/slices/customerBankSlice";

const useApplicationForm = () => {
  const dispatch = useDispatch();

  const { uuid, mode, categoryId, id } = useParams();

  dayjs.extend(utc);
  dayjs.extend(timezone);

  const { application, isLoading, isCalculating } = useSelector(
    (state) => state.applicationDetail
  );

  const { customerInfo } = useSelector((state) => state.customerInfo);

  const { relatedApplications } = useSelector(
    (state) => state.relatedApplications
  );

  const { applicationHistories } = useSelector(
    (state) => state.applicationHistories
  );

  const { user } = useSelector((state) => state.auth);

  const { creditSchemes, isLoading: isCreditSchemeLoading } = useSelector(
    (state) => state.creditSchemes
  );

  const { isLoading: isSubmitting } = useSelector(
    (state) => state.application.updateApplicationByUuid
  );

  const { users } = useSelector((state) => state.users);

  const { CMCO = [] } = useSelector((state) => state.users); // Default to an empty array if CMCO is undefined

  const { agents = [] } = useSelector((state) => state.users); // Default to an empty array if CMCO is undefined

  // Dealer Selector
  const { dealers, isLoading: dealerIsLoading } = useSelector(
    (state) => state.dealers
  );

  // Dealer Selector
  const { dealersByType } = useSelector((state) => state.dealers);

  const { nrcStates, isLoading: nrcStateLoading } = useSelector(
    (state) => state.nrcStates
  );

  // const { typeofBusinesses, isTypeofBusinessesLoading } = useSelector(
  //   (state) => state.typeofBusinesses
  // );

  // const { mainBusinessCategories, isMainBusinessCategoriesLoading } =
  //   useSelector((state) => state.mainBusinessCategories);

  // const { subBusinessCategories, isSubBusinessCategoriesLoading } = useSelector(
  //   (state) => state.subBusinessCategories
  // );

  const { menuApplicationSetups: categories, isLoading: categoryIsLoading } =
    useSelector((state) => state.menuApplicationSetup);

  const { applicationCardResponses } = useSelector(
    (state) => state.applicationCardResponses
  );

  const { dealerPackages } = useSelector((state) => state.dealerPackages || {});

  const { dealerPackagesById } = useSelector(
    (state) => state.dealerPackages || {}
  );

  const { customerBanks } = useSelector((state) => state.customerBanks);

  const { control, reset, watch, handleSubmit, setValue, getValues, register } =
    useForm({
      defaultValues: {
        disabled: false,
        nrc_remark: "N",
      },
    });

  const [selectedRemarkIds, setSelectedRemarkIds] = useState([]);

  const apiCalledRef = useRef(false); // Prevent double calls

  const { addressDistricts, isLoading: addressDistrictsLoading } = useSelector(
    (state) => state.addressDistricts
  );

  const { addressTownships, isLoading: addressTownshipLoading } = useSelector(
    (state) => state.addressTownships
  );

  useEffect(() => {
    dispatch(getApplicationByUuid({ uuid }));
  }, [uuid]);

  useEffect(() => {
    if (apiCalledRef.current) return;

    if (categoryId === "1" || categoryId === "2" || categoryId === "3") {
      dispatch(getUsers("IHCO"));
    } else {
      switch (user?.user_group) {
        case "CMCO":
          dispatch(getCMCO("CMCO"));
          dispatch(getAgents("Agent"));
          dispatch(getUsers("IHCO")); // Fetch IHCO users
          break;
        case "Agent":
          dispatch(getCMCO("CMCO"));
          dispatch(getAgents("Agent"));
          dispatch(getUsers("IHCO")); // Fetch IHCO users
          break;
        case "IHCO":
          dispatch(getUsers("IHCO")); // Fetch IHCO users
          dispatch(getCMCO("CMCO"));
          dispatch(getAgents("Agent"));
          break;
        default:
          dispatch(getUsers());
          dispatch(getCMCO("CMCO"));
          dispatch(getAgents("Agent"));
      }
    }

    dispatch(getNRCStates());
    // dispatch(getTypeofBusinesses());
    // dispatch(getMainBusinessCategories());
    // dispatch(getSubBusinessCategories());
    dispatch(getMenuApplicationSetups());
    dispatch(getApplicationResponses());
    dispatch(getAllCreditSchemes({ category_id: categoryId }));
    dispatch(getCustomerBanks({}));

    if (categoryId === "4") {
      dispatch(getDealersByUserRole({ params: { dealer_type: "HP" } }));

      // if(credit_scheme_id){
      //   dispatch(getDealerContactPeople({params : {dealer_id: dealer_id}, allFlag: true}));
      // }
    }
    if (categoryId === "7") {
      dispatch(getDealerByDealerType(["School"]));
      // dispatch(getAllCreditSchemes({ category_id: categoryId }));
    }

    if (categoryId === "6") {
      dispatch(getDealerByDealerType(["Travel"]));
      // dispatch(getAllCreditSchemes({ category_id: categoryId }));
    }

    // if (categoryId === "3") {
    //   dispatch(getKPayFields({uuid}));
    //   dispatch(getIncompleteFields({ id }));
    // }
    apiCalledRef.current = true;
  }, [categoryId, id, dispatch, user?.user_group]);

  const estimateMonthlyIncome = watch("estimate_monthly_income");
  const monthlyInstallment = watch("monthly_installment");
  const ichcoId = watch("ihco_id");
  const appliedDate = watch("applied_date");
  const remarkIds = watch("remark_ids");
  const monthlyIncome = watch("monthly_income");

  const editAbleForm = useMemo(() => {
    if (mode && mode === "view") {
      return false;
    }
    // if (user?.is_super === true) {
    //   return true;
    // }
    if ([APPROVED, REJECTED, CANCEL].includes(application?.status)) {
      return false;
    }
    if ([NEW, PENDING, RECONSIDERATION].includes(application?.status)) {
      return true;
    }

    if (
      [SUBMITTED, PENDING, RECONSIDERATION, REQUEST_FOR_APPROVAL].includes(
        application?.status
      )
    ) {
      return user?.user_group !== "CMCO";
    }

    if ([REQUEST_FOR_APPROVAL].includes(application?.status)) {
      return user?.user_group !== IHCO;
    }
    return false;
  }, [application, mode, user]);

  useEffect(() => {
    if (estimateMonthlyIncome && monthlyInstallment) {
      const estimateMonthlyIncomeRatio = (
        estimateMonthlyIncome / monthlyInstallment
      ).toFixed(1);
      setValue("estimate_monthly_income_ratio", estimateMonthlyIncomeRatio);
    }
  }, [estimateMonthlyIncome, monthlyInstallment, setValue]);

  useEffect(() => {
    if (monthlyIncome && monthlyInstallment) {
      const monthlyIncomeRatio = (monthlyIncome / monthlyInstallment).toFixed(
        1
      );
      setValue("monthly_income_ratio", monthlyIncomeRatio);
    }
  }, [monthlyIncome, monthlyInstallment, setValue]);

  useEffect(() => {
    if (ichcoId && appliedDate === null) {
      const currentDate = dayjs(Date.now());

      const currentDateMyanmarTime = currentDate.tz("Asia/Yangon");

      setValue("applied_date", currentDateMyanmarTime);
    }
  }, [ichcoId, appliedDate, setValue]);

  const currentPermanentSame = watch("current_permanent_same");
  const currentParkingSame = watch("current_parking_same");
  const currentPermanentParkingSame = watch("parking_address_option");
  const permanentParkingSame = watch("permanent_parking_same");
  const addressState = watch("address_state_id");
  const addressDistrict = watch("address_district_id");
  const addressTownship = watch("address_township_id");
  const addressCity = watch("address_city_id");
  const addressVillageTract = watch("address_village_tract_id");
  const addressWard = watch("address_ward_id");
  const addressVillage = watch("address_village_id");
  const addressRoad = watch("address_road_street");
  const fullPermanentAddress = watch("permanent_address_full_address");
  const fullCurrentAddress = watch("address_full_address");
  const parkingAddress = watch("parking_address");
  // const educationGrade = watch('grade');

  // const gradeDealer = dealerPackages.find((item) => item.grade === educationGrade);

  useEffect(() => {
    if (application?.commencement_date === null) {
      setValue(
        "commencement_date",
        application?.applied_date && dayjs(application?.applied_date)
      );
    } else {
      setValue(
        "commencement_date",
        application?.commencement_date && dayjs(application?.commencement_date)
      );
    }
  }, [application, setValue]);

  useEffect(() => {
    if (currentPermanentSame === true) {
      setValue("permanent_address_state_id", addressState);
      setValue("permanent_address_district_id", addressDistrict);
      setValue("permanent_address_township_id", addressTownship);
      setValue("permanent_address_city_id", addressCity);
      setValue("permanent_address_village_tract_id", addressVillageTract);
      setValue("permanent_address_ward_id", addressWard);
      setValue("permanent_address_village_id", addressVillage);
      setValue("permanent_address_road_street", addressRoad);
    }

    const fullParkingAddress =
      application?.application_info?.parking_address || "";
    const [prefix, ...restParts] = fullParkingAddress.split("_");
    const validPrefixes = ["current", "permanent", "parking"];
    const parkingAddressOption = validPrefixes.includes(prefix) ? prefix : "";

    if (parkingAddressOption !== currentPermanentParkingSame) {
      if (currentPermanentParkingSame === "current") {
        setValue("parking_address", fullCurrentAddress);
      } else if (currentPermanentParkingSame === "permanent") {
        setValue("parking_address", fullPermanentAddress);
      } else if (currentPermanentParkingSame === "parking") {
        setValue("parking_address", "");
      }
    } else {
      const trimmedParkingAddress = restParts.join("_");
      setValue("parking_address", trimmedParkingAddress);
    }
  }, [
    currentPermanentSame,
    currentPermanentParkingSame,
    currentParkingSame,
    permanentParkingSame,
    addressState,
    addressDistrict,
    addressTownship,
    addressCity,
    addressVillageTract,
    addressWard,
    addressVillage,
    addressRoad,
    fullCurrentAddress,
    fullPermanentAddress,
    setValue,
    application?.application_info?.parking_address,
    dispatch,
  ]);

  useEffect(() => {
    if (currentPermanentSame === false) {
      setValue("permanent_address_state_id", "");
      setValue("permanent_address_district_id", "");
      setValue("permanent_address_township_id", "");
      setValue("permanent_address_city_id", "");
      setValue("permanent_address_village_tract_id", "");
      setValue("permanent_address_ward_id", "");
      setValue("permanent_address_village_id", "");
      setValue("permanent_address_road_street", "");
    }
  }, [currentPermanentSame]);

  useEffect(() => {
    const optionsToPreselect = applicationCardResponses.filter((option) =>
      application?.remark_ids?.includes(option.id)
    );

    // bind parking address and parking address options with application_info?.parking_address
    const fullParkingAddress =
      application?.application_info?.parking_address || "";
    const [prefix, ...restParts] = fullParkingAddress.split("_");
    const validPrefixes = ["current", "permanent", "parking"];
    const parkingAddressOption = validPrefixes.includes(prefix) ? prefix : "";
    const trimmedParkingAddress = restParts.join("_");

    reset({
      ...application,
      ...application?.application_info,
      ...application?.customer,
      ...application?.extra_information,
      nrc_remark: application?.nrc_remark ? application?.nrc_remark : "N",
      dealer_contact_person_id:
        application?.application_guarantors?.[0]?.dealer_contact_person_id ??
        null,
      remark_ids: optionsToPreselect ?? [],
      ihco_id: user?.user_group === "IHCO" ? user.id : application?.ihco_id,
      cmco_id: user?.user_group === "CMCO" ? user.id : application?.cmco_id,
      agent_id: user?.user_group === "Agent" ? user.id : application?.agent_id,

      parking_address: trimmedParkingAddress,
      parking_address_option: parkingAddressOption,
      apply_by_yourself:
        application?.application_info?.apply_by_yourself === 1 ? 1 : 2,
      disbursed_based_on_package_setup:
        application?.disbursed_based_on_package_setup === 1 ? true : false,
      created_at: application?.created_at && dayjs(application?.created_at),
      updated_at: application?.updated_at && dayjs(application?.updated_at),
      date_of_birth:
        application?.date_of_birth && dayjs(application?.date_of_birth),
      mnet_verified_date:
        application?.application_info?.mnet_verified_date &&
        dayjs(application?.application_info?.mnet_verified_date),
      mnet_applied_date:
        application?.application_info?.mnet_applied_date &&
        dayjs(application?.application_info?.mnet_applied_date),
      internet_service_registration_date:
        application?.application_info?.internet_service_registration_date &&
        dayjs(
          application?.application_info?.internet_service_registration_date
        ),
      applied_date:
        application?.applied_date && dayjs(application?.applied_date),
      commencement_date:
        application?.commencement_date === null
          ? application?.applied_date && dayjs(application?.applied_date)
          : application?.commencement_date &&
            dayjs(application?.commencement_date),
      disbursed_date:
        application?.disbursed_date && dayjs(application?.disbursed_date),
      credit_assessment_date:
        application?.credit_assessment_date &&
        dayjs(application?.credit_assessment_date),
      // commencement_date:
      //   application?.commencement_date && dayjs(application?.commencement_date),
      first_due_date:
        application?.first_due_date && dayjs(application?.first_due_date),
      disabled:
        user?.is_super === true && mode !== "view" ? false : !editAbleForm,
      assessment_commencement_date:
        application?.assessment_commencement_date &&
        dayjs(application?.assessment_commencement_date),
      assessment_first_due_date:
        application?.assessment_first_due_date &&
        dayjs(application?.assessment_first_due_date),
    });
    //setSelectedRemarkIds(application?.remark_ids || []);
  }, [
    application,
    mode,
    reset,
    user,
    editAbleForm,
    applicationCardResponses,
    application?.application_info,
  ]);

  useEffect(() => {
    reset({
      ...customerInfo,
      date_of_birth:
        customerInfo?.date_of_birth && dayjs(customerInfo?.date_of_birth),
    });
  }, [customerInfo, reset]);

  // handle select change
  const handleSelectChange = (selectedOptions) => {
    const existingRemark = getValues("remark_of_application") || "";

    // Split existing remarks into individual lines, trim spaces, and remove any bullet points
    const existingNames = existingRemark
      .split("\n")
      .map((name) => name.trim().replace(/^•\s*/, "")) // Remove any existing bullet points
      .filter(Boolean);

    // Get the text of the newly selected options
    const newSelectedNames =
      selectedOptions?.map((option) => option.text) || [];

    // Identify manually added remarks (those that are not in the select box options)
    const manuallyAddedNames = existingNames.filter(
      (existingName) =>
        !applicationCardResponses.some((option) =>
          existingName.includes(option.text)
        )
    );

    // Remove any existing names that are no longer selected
    const updatedNames = existingNames.filter((existingName) => {
      return (
        newSelectedNames.some((newName) => existingName.includes(newName)) ||
        manuallyAddedNames.includes(existingName)
      );
    });

    // Add only new selections that are not already in the updated list
    const combinedNames = Array.from(
      new Set([
        ...newSelectedNames.filter(
          (newName) =>
            !updatedNames.some((existingName) => existingName.includes(newName))
        ),
        ...updatedNames, // Include manually modified or existing names
        ...manuallyAddedNames, // Preserve truly manually added names
      ])
    );

    // Concatenate with bullet points and new lines, with new selections at the top
    const newRemark = combinedNames.map((name) => `• ${name}`).join("\n");

    // Update the form field with the new value
    setValue("remark_of_application", newRemark);
  };

  const updateApplicationForm = useCallback(
    async (body, status, ready) => {
      const remarkIdsArray = remarkIds?.map((remark) => remark.id);
      let resolvedDistrictId = body.address_district_id;

      // If township selected but district empty → auto-fill district
      if (
        body.address_township_id &&
        (body.address_district_id === null ||
          body.address_district_id === "" ||
          body.address_district_id === undefined ||
          body.address_district_id === "null")
      ) {
        const district_id = addressTownships.find(
          (township) => township.id === body.address_township_id
        )?.address_district_id;

        resolvedDistrictId = addressDistricts.find(
          (district) => district.id === district_id
        )?.id;
      }

      await dispatch(
        updateApplicationByUuid({
          uuid,
          body: {
            ...body,
            address_district_id: resolvedDistrictId || null,
            parking_address: `${currentPermanentParkingSame}_${parkingAddress}`, // Save as "prefix_address" format (e.g. current_Yangon...) so we can easily bind the parking address option without needing an extra column
            remark_ids: remarkIdsArray,
            apply_by_yourself: body.apply_by_yourself === 1 ? 1 : 0,
            disbursed_based_on_package_setup:
              body.disbursed_based_on_package_setup === true ? 1 : 0,
            total_amount: body.total_amount ?? 0,
            vehicle_down_payment_ratio: body.vehicle_down_payment_ratio ?? 0,
            vehicle_down_payment_amount: body.vehicle_down_payment_amount ?? 0,
            down_payment_amount: body.down_payment_amount ?? 0,
            insurance_premium_fees: body.insurance_premium_fees ?? 0,
            status,
            ready,
            category_id: categoryId,
            applied_date:
              (body?.applied_date &&
                body?.applied_date.format("YYYY-MM-DD HH:mm:ss")) ||
              null,
            date_of_birth:
              (body?.date_of_birth &&
                body?.date_of_birth.format("YYYY-MM-DD")) ||
              null,
            mnet_verified_date:
              (body?.mnet_verified_date &&
                body?.mnet_verified_date.format("YYYY-MM-DD")) ||
              null,
            mnet_applied_date:
              (body?.mnet_applied_date &&
                body?.mnet_applied_date.format("YYYY-MM-DD")) ||
              null,
            internet_service_registration_date:
              (body?.internet_service_registration_date &&
                body?.internet_service_registration_date.format(
                  "YYYY-MM-DD"
                )) ||
              null,
            disbursed_date:
              (body?.disbursed_date &&
                body?.disbursed_date.format("YYYY-MM-DD")) ||
              null,
            commencement_date:
              (body?.commencement_date &&
                body?.commencement_date.format("YYYY-MM-DD")) ||
              null,
            first_due_date:
              (body?.first_due_date &&
                body?.first_due_date.format("YYYY-MM-DD")) ||
              null,
            credit_assessment_date:
              (body?.credit_assessment_date &&
                body?.credit_assessment_date.format("YYYY-MM-DD HH:mm:ss")) ||
              null,
            assessment_commencement_date:
              (body?.assessment_commencement_date &&
                body?.assessment_commencement_date.format(
                  "YYYY-MM-DD HH:mm:ss"
                )) ||
              null,
            assessment_first_due_date:
              (body?.assessment_first_due_date &&
                body?.assessment_first_due_date.format(
                  "YYYY-MM-DD HH:mm:ss"
                )) ||
              null,
          },
        })
      ).unwrap();
      await dispatch(getApplicationByUuid({ uuid })).unwrap();
      showSuccessToast(CommonMessage.MFS00008);
    },
    [dispatch, uuid, remarkIds, currentPermanentParkingSame, parkingAddress,addressTownships,addressDistricts]
  );

  const onSubmit = useCallback(
    (application_status = null, ready = true) =>
      async (body) => {
        try {
          const status = application_status ? application_status : body?.status;
          await updateApplicationForm(body, status, ready);
        } catch (e) {
          console.error("Error", e);
        }
      },
    [updateApplicationForm]
  );

  const onSubmitNotReady = useCallback(async () => {
    try {
      const body = getValues();
      await updateApplicationForm(body, body.status, false);
    } catch (e) {
      console.error("Error", e);
    }
  }, [getValues, updateApplicationForm]);

  const onSubmitSendToCMCO = useCallback(async () => {
    try {
      const body = getValues();
      await updateApplicationForm(
        { ...body, send_to_cmco: true },
        body.status,
        false
      );
    } catch (e) {
      console.error("Error", e);
    }
  }, [getValues, updateApplicationForm]);

  const handleCheckExistingCustomer = useCallback(async (nrc) => {
    try {
      dispatch(checkExistingCustomer({ body: { nrc: nrc } }));
    } catch (e) {
      console.error("Error", e);
    }
  }, []);

  return useMemo(
    () => ({
      watch,
      isLoading,
      isSubmitting,
      onSubmit,
      handleSubmit,
      control,
      application,
      setValue,
      getValues,
      onSubmitNotReady,
      editAbleForm,
      handleCheckExistingCustomer,
      users,
      nrcStates,
      nrcStateLoading,
      // typeofBusinesses,
      // isTypeofBusinessesLoading,
      // mainBusinessCategories,
      // isMainBusinessCategoriesLoading,
      // subBusinessCategories,
      // isSubBusinessCategoriesLoading,
      categories,
      categoryIsLoading,
      relatedApplications,
      applicationHistories,
      isCalculating,
      applicationCardResponses,
      handleSelectChange,
      selectedRemarkIds,
      dealers,
      dealerIsLoading,
      CMCO,
      agents,
      creditSchemes,
      isCreditSchemeLoading,
      dealersByType,
      dealerPackages,
      register,
      onSubmitSendToCMCO,
      customerBanks,
    }),
    [
      watch,
      control,
      handleSubmit,
      isLoading,
      isSubmitting,
      onSubmit,
      application,
      setValue,
      getValues,
      onSubmitNotReady,
      editAbleForm,
      users,
      nrcStates,
      nrcStateLoading,
      // typeofBusinesses,
      // isTypeofBusinessesLoading,
      // mainBusinessCategories,
      // isMainBusinessCategoriesLoading,
      // subBusinessCategories,
      // isSubBusinessCategoriesLoading,
      categories,
      categoryIsLoading,
      relatedApplications,
      applicationHistories,
      isCalculating,
      handleCheckExistingCustomer,
      applicationCardResponses,
      handleSelectChange,
      selectedRemarkIds,
      dealers,
      dealerIsLoading,
      CMCO,
      agents,
      creditSchemes,
      isCreditSchemeLoading,
      dealersByType,
      dealerPackages,
      register,
      onSubmitSendToCMCO,
      customerBanks,
    ]
  );
};

export default useApplicationForm;
