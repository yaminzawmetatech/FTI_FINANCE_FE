import React, { useEffect, useMemo, useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Modal,
  useMediaQuery,
} from "@mui/material";
import { Helmet } from "react-helmet";
import ApplicationInformation from "./ApplicationInformation";
import MyanmarNetInformation from "./MyanmarNetInformation";
import LoanInformation from "./LoanInformation";
import CreditJudgementInformation from "./CreditJudgementInformation";
import PreviousLoanInformation from "./PreviousLoanInformation";
import ApplicantInformation from "./ApplicantInformation";
import ToolbarApplication from "./ToolbarApplication";
import useApplicationForm from "./hooks/useApplicationForm";
import useApplicationSetup from "./hooks/useApplicationSetup";
import BlackListCustomerStatistics from "./BlackListCustomerStatistics";
import CurrentResidenceInformation from "./CurrentResidenceInformation";
import OccupationalInformation from "./OccupationalInformation";
import ApplicationTitle from "../../../../components/application/ApplicationTitle";
import { useDispatch, useSelector } from "react-redux";
import { getAddressStates } from "features/address/State/addressStateSlice";
import WaveMoneyInformation from "./WaveMoneyInformation";
import { useWatch } from "react-hook-form";
import {
  MYANMAR_NET,
  WAVE_MONEY,
  KPAY,
  CUSTOMER_WEB_INFO,
} from "../../../../constants/applicationType";
import ExistingCustomerStatistics from "./ExistingCustomerStatistics";
import ApplicationAddressV2 from "./ApplicationAddress";
import RelatedApplicationStatistics from "./RelatedApplicationStatistics";
import KPayInformation from "./KPayInformation";
import ApplicationHistoryStatistics from "./ApplicationHistoryStatistics";
import AssessmentLonDetail from "./AssessmentLoanDetail";
import CustomerInformation from "./CustomerInformation";
import ExtraInformation from "./ExtraInformation";
import CreditCriteriaInfo from "./CreditCriteriaInfo";
import RefinanceCustomerStatistics from "./RefinanceCustomerStatistics";
import BankPaymentChannelInformation from "./Bank&PaymentChannelInformation.js";
import FinancedVehicleInformation from "./FinancedVehicleInformation";
import { getAllVehicles } from "features/vehicleSetup/vehicleSlice";
import EducationInformation from "./EducationInformation";
import { useParams } from "react-router";
import ToolbarLoan from "./ToolbarLoan";
import { getGuaranteeDataCount } from "features/dealer/dealerGuaranteeSlice";
import { getInsurancePremiumFees } from "features/insurancePremiumFee/insurancePremiumFeeSlice";
import CustomerWebInformation from "./CustomerWebInformation";

const CreateApplicationInformationIndex = () => {
  const {
    control,
    handleSubmit,
    isLoading,
    isSubmitting,
    onSubmit,
    application,
    setValue,
    getValues,
    isRequired,
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
    dealersByType,
    dealerPackages,
    watch,
    register,
    onSubmitSendToCMCO,
    customerBanks,
  } = useApplicationForm();

  const { user } = useSelector((state) => state.auth);

  const { path, categoryId } = useParams();

  const CATEGORY = watch("category_id");

  const SUB_CATEGORY = watch("sub_category_id");

  const brand_id = watch("brand_id");

  const { application_fields, applicationSetupsLoading } =
    useApplicationSetup(SUB_CATEGORY);

  const { refinanceCustomer } = useSelector((state) => state.refinanceCustomer);

  const [isModalOpen, setModalOpen] = useState(false);
  const isTabletView = useMediaQuery("(max-width: 768px)");

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const { vehicles, isLoading: vehicleLoading } = useSelector(
    (state) => state.vehicles
  );

  const { guaranteeCount, isLoading: guaranteeLoading } = useSelector(
    (state) => state.guaranteeCount ?? []
  );

  const dealer_id = useWatch({
    control,
    name: "dealer_id",
  });

  const { insurancePremiumFees, isLoading: insurancePremiumFeesLoading } =
    useSelector((state) => state.insurancePremiumFees);

  const dispatch = useDispatch();

  const application_fields_group = useMemo(
    () => Object.values(application_fields).map((item) => item.group),
    [application_fields]
  );

  useEffect(() => {
    dispatch(getAddressStates());
  }, [dispatch]);

  useEffect(() => {
    if (dealer_id) {
      dispatch(
        getGuaranteeDataCount({
          params: {
            dealer_id: dealer_id,
          },
        })
      ); // Example param
    }
  }, [dispatch, dealer_id]);

  useEffect(() => {
    if (
      application?.category_id &&
      (application?.sub_category_id || SUB_CATEGORY)
    ) {
      dispatch(
        getAllVehicles({
          params: {
            category_id: application?.category_id,
            sub_category_id: SUB_CATEGORY ?? application?.sub_category_id,
            brand_id: brand_id,
          },
        })
      );
    }
  }, [dispatch, application, brand_id, SUB_CATEGORY]);

  const insurance_company = watch("insurance_company");

  const selectedModel = watch("model_id");

  const selectedVehicleId = useMemo(() => {
    const vehicle = vehicles.find(
      (v) => v.brand_id === brand_id && v.model_id === selectedModel
    );
    return vehicle ? vehicle.id : null;
  }, [brand_id, selectedModel, vehicles]);

  // useEffect(() => {
  //   if (insurance_company && selectedVehicleId) {
  //     dispatch(
  //       getInsurancePremiumFees({
  //         params: {
  //           vehicle_id: selectedVehicleId,
  //           insurance_company_id: insurance_company,
  //         },
  //         allFlag: true,
  //       })
  //     );
  //   }
  // }, [dispatch, insurance_company, selectedVehicleId]);

  // useEffect(() => {
  //   if (insurancePremiumFees !== null && insurancePremiumFees.length > 0) {
  //     setValue("insurance_premium_fees", insurancePremiumFees[0]?.amount);
  //   }
  // }, [insurancePremiumFees]);

  const { isLoading: addressStateLoading } = useSelector(
    (state) => state.addressStates
  );

  const { isLoading: addressTownshipLoading } = useSelector(
    (state) => state.addressTownships
  );

  const { isLoading: addressWardsLoading } = useSelector(
    (state) => state.addressWards
  );

  const { isLoading: addressVillageLoading } = useSelector(
    (state) => state.addressVillages
  );

  const { isLoading: addressCitiesLoading } = useSelector(
    (state) => state.addressCities
  );

  const { isLoading: addressVillageTractsLoading } = useSelector(
    (state) => state.addressVillageTracts
  );

  const { isLoading: addressDistrictsLoading } = useSelector(
    (state) => state.addressDistricts
  );

  // permanent selector

  const { isLoading: addressTownshipsForPermanentAddressLoading } = useSelector(
    (state) => state.addressTownships.addressTownshipsForPermanentAddress
  );

  const { isLoading: addressWardsForPermanentAddressLoading } = useSelector(
    (state) => state.addressWards.addressWardsForPermanentAddress
  );

  const { isLoading: addressVillagesForPermanentAddressLoading } = useSelector(
    (state) => state.addressVillages.addressVillagesForPermanentAddress
  );

  const { isLoading: addressCitiesForPermanentAddressLoading } = useSelector(
    (state) => state.addressCities.addressCitiesForPermanentAddress
  );

  const { isLoading: addressVillageTractsForPermanentAddressLoading } =
    useSelector(
      (state) =>
        state.addressVillageTracts.addressVillageTractsForPermanentAddress
    );

  const { isLoading: addressDistrictsForPermanentAddressLoading } = useSelector(
    (state) => state.addressDistricts.addressDistrictsForPermanentAddress
  );

  const { isLoading: nrcTownshipLoading } = useSelector(
    (state) => state.nrcTownships
  );

  const isApiLoading =
    addressStateLoading ||
    addressTownshipLoading ||
    addressWardsLoading ||
    addressVillageLoading ||
    addressCitiesLoading ||
    addressVillageTractsLoading ||
    addressDistrictsLoading ||
    addressTownshipsForPermanentAddressLoading ||
    addressWardsForPermanentAddressLoading ||
    addressVillagesForPermanentAddressLoading ||
    addressCitiesForPermanentAddressLoading ||
    addressVillageTractsForPermanentAddressLoading ||
    addressDistrictsForPermanentAddressLoading ||
    nrcStateLoading ||
    nrcTownshipLoading ||
    vehicleLoading || 
    isSubmitting ||
    isLoading;

  if (application === null || isLoading || applicationSetupsLoading ) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isSubmitting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Helmet>
        <title>New - Application Information</title>
      </Helmet>
      {path !== "loan" ? (
        <ToolbarApplication
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          onSubmitNotReady={onSubmitNotReady}
          editAbleForm={editAbleForm}
          applicationCardResponses={applicationCardResponses}
          handleModalOpen={handleModalOpen}
          onSubmitSendToCMCO={onSubmitSendToCMCO}
          isApiLoading={isApiLoading}
        />
      ) : (
        <ToolbarLoan
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          onSubmitNotReady={onSubmitNotReady}
          editAbleForm={editAbleForm}
          applicationCardResponses={applicationCardResponses}
          handleModalOpen={handleModalOpen}
          application_fields_group={application_fields_group}
        />
      )}

      <ApplicationTitle
        application={application}
        handleModalOpen={handleModalOpen}
        isTabletView={isTabletView}
      />
      <Box
        sx={{
          pb: 10,
          "@media (max-width: 760px)": {
            height: "auto",
            position: "relative",
            overflowY: "auto",
          },
        }}
      >
        <Box
          sx={{
            px: 1,
            pb: 1,
            display: "flex",
            gap: 2,
            "@media (max-width: 600px)": {
              flexDirection: "column",
            },
            // position: "fixed"
          }}
        >
          <Box sx={{ width: "100%", flex: 1 }}>
            <ApplicationInformation
              setValue={setValue}
              users={users}
              control={control}
              categories={categories}
              categoryIsLoading={categoryIsLoading}
              application={application}
              dealers={dealers}
              dealerIsLoading={dealerIsLoading}
              CMCO={CMCO}
              agents={agents}
              user={user}
              creditSchemes={creditSchemes}
              application_fields={application_fields}
              guaranteeCount={guaranteeCount}
            />
            {application_fields_group.includes(CUSTOMER_WEB_INFO) && (
              <CustomerWebInformation
                control={control}
                application_fields={application_fields}
                users={users}
              />
            )}
            <EducationInformation
              setValue={setValue}
              control={control}
              application_fields={application_fields}
              dealersByType={dealersByType}
              dealerPackages={dealerPackages}
              watch={watch}
            />
            {application_fields_group.includes(MYANMAR_NET) && (
              <MyanmarNetInformation
                control={control}
                application_fields={application_fields}
                prev_application_id={application.prev_application_id}
                prev_application_uuid={application.prev_application_uuid}
                application={application}
              />
            )}
            {application_fields_group.includes(WAVE_MONEY) && (
              <WaveMoneyInformation
                control={control}
                application_fields={application_fields}
                users={users}
              />
            )}
            {application_fields_group.includes(KPAY) && (
              <KPayInformation
                control={control}
                application_fields={application_fields}
              />
            )}
            <ApplicantInformation
              control={control}
              application_fields={application_fields}
              handleCheckExistingCustomer={handleCheckExistingCustomer}
              nrcStates={nrcStates}
              nrcStateLoading={nrcStateLoading}
              categories={categories}
              categoryIsLoading={categoryIsLoading}
              application={application}
            />
            {application_fields_group.includes(MYANMAR_NET) && (
              <CustomerInformation
                control={control}
                application_fields={application_fields}
                setValue={setValue}
              />
            )}
            {application_fields_group.includes(MYANMAR_NET) && (
              <ExtraInformation
                control={control}
                application_fields={application_fields}
                setValue={setValue}
              />
            )}
            <ApplicationAddressV2 control={control} setValue={setValue} />
            <OccupationalInformation
              control={control}
              setValue={setValue}
              getValues={getValues}
              application_fields={application_fields}
              isRequired={isRequired}
              // typeofBusinesses={typeofBusinesses}
              // isTypeofBusinessesLoading={isTypeofBusinessesLoading}
              // mainBusinessCategories={mainBusinessCategories}
              // isMainBusinessCategoriesLoading={isMainBusinessCategoriesLoading}
              // subBusinessCategories={subBusinessCategories}
              // isSubBusinessCategoriesLoading={isSubBusinessCategoriesLoading}
            />
            <CurrentResidenceInformation
              control={control}
              application_fields={application_fields}
            />
            <FinancedVehicleInformation
              control={control}
              application_fields={application_fields}
              vehicles={vehicles}
              vehicleLoading={vehicleLoading}
              setValue={setValue}
            />
            <LoanInformation
              application={application}
              isRequired={isRequired}
              control={control}
              application_fields={application_fields}
              setValue={setValue}
              isCalculating={isCalculating}
              applicationCardResponses={applicationCardResponses}
              handleSelectChange={handleSelectChange}
              categories={categories}
              selectedRemarkIds={selectedRemarkIds}
              user={user}
              register={register}
              vehicleLoading={vehicleLoading}
            />
            <BankPaymentChannelInformation
              control={control}
              application_fields={application_fields}
              customerBanks={customerBanks}
            />
            <CreditJudgementInformation
              control={control}
              application_fields={application_fields}
            />
            {/*{application?.assessments[0]?.is_calculated ? (*/}
            {/*  <AssessmentLonDetail*/}
            {/*    control={control}*/}
            {/*    assessment={application}*/}
            {/*  />*/}
            {/*) : null}*/}
            <AssessmentLonDetail
              control={control}
              assessment={application}
              application_fields={application_fields}
            />
            <PreviousLoanInformation
              control={control}
              application_fields={application_fields}
            />
            {!isApiLoading ? (
              <Box sx={{ display: "flex", px: 1, justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onSubmitNotReady}
                >
                  OK
                </Button>
              </Box>
            ) : (
              <></>
            )}
          </Box>

          {/* Sidebar */}
          {isTabletView ? (
            <>
              <Modal open={isModalOpen} onClose={handleModalClose}>
                <Box
                  sx={{
                    width: "90%",
                    maxWidth: "20rem",
                    backgroundColor: "white",
                    margin: "auto",
                    mt: "5rem",
                    p: 2,
                    borderRadius: 1,
                    boxShadow: 24,
                  }}
                >
                  <BlackListCustomerStatistics />
                  <ExistingCustomerStatistics />
                  <RelatedApplicationStatistics
                    relatedApplications={relatedApplications}
                  />
                  <ApplicationHistoryStatistics
                    applicationHistories={applicationHistories}
                  />
                  <RefinanceCustomerStatistics
                    refinanceCustomer={refinanceCustomer}
                  />
                  <CreditCriteriaInfo control={control} />
                  <Box sx={{ mt: 2, textAlign: "right" }}>
                    <Button onClick={handleModalClose}>Close</Button>
                  </Box>
                </Box>
              </Modal>
            </>
          ) : (
            <Box
              sx={{
                width: "20rem",
              }}
            >
              <BlackListCustomerStatistics />
              <ExistingCustomerStatistics />
              <RelatedApplicationStatistics
                relatedApplications={relatedApplications}
              />
              <ApplicationHistoryStatistics
                applicationHistories={applicationHistories}
              />
              <RefinanceCustomerStatistics
                refinanceCustomer={refinanceCustomer}
              />
              <CreditCriteriaInfo control={control} />
            </Box>
          )}
        </Box>
        {/*{editAbleForm ? (*/}
      </Box>

      {/*) : null}*/}
    </>
  );
};

export default CreateApplicationInformationIndex;
