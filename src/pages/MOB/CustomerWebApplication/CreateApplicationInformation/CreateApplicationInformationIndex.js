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
    categoryId,
    ichcoId,
    cmco_id,
    dealerByTypeLoading,
  } = useApplicationForm();

  const { user } = useSelector((state) => state.auth);

  const SUB_CATEGORY = watch("sub_category_id");

  const brand_id = watch("brand_id");

  const { application_fields, applicationSetupsLoading } = useApplicationSetup(
    categoryId,
    SUB_CATEGORY
  );

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

  const isOkDisabled = useMemo(() => {
    const hasEitherIchoOrCmco = ichcoId || cmco_id; // ✅ one is enough
    return !categoryId || !SUB_CATEGORY || !hasEitherIchoOrCmco;
  }, [categoryId, SUB_CATEGORY, ichcoId, cmco_id]);

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
    // if(categoryId && SUB_CATEGORY){
    dispatch(
      getAllVehicles({
        params: {
          category_id: categoryId,
          sub_category_id: SUB_CATEGORY,
          brand_id: brand_id,
        },
      })
    );
    // }
  }, [dispatch, categoryId, SUB_CATEGORY, brand_id]);

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

  if (application === null || isLoading || applicationSetupsLoading) {
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
      <ToolbarApplication
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        onSubmitNotReady={onSubmitNotReady}
        editAbleForm={editAbleForm}
        applicationCardResponses={applicationCardResponses}
        handleModalOpen={handleModalOpen}
        onSubmitSendToCMCO={onSubmitSendToCMCO}
        categoryId={categoryId}
      />

      <ApplicationTitle
        title={application?.customer_web_category_name || "Application Information"}
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
              categoryId={categoryId}
            />
            <EducationInformation
              setValue={setValue}
              control={control}
              application_fields={application_fields}
              dealersByType={dealersByType}
              dealerPackages={dealerPackages}
              watch={watch}
              categoryId={categoryId}
              dealerByTypeLoading={dealerByTypeLoading}
            />
            {application_fields_group.includes(MYANMAR_NET) && (
              <MyanmarNetInformation
                control={control}
                application_fields={application_fields}
                prev_application_id={application.prev_application_id}
                prev_application_uuid={application.prev_application_uuid}
                application={application}
                categoryId={categoryId}
              />
            )}
            {application_fields_group.includes(WAVE_MONEY) && (
              <WaveMoneyInformation
                control={control}
                application_fields={application_fields}
                users={users}
                categoryId={categoryId}
              />
            )}
            {application_fields_group.includes(KPAY) && (
              <KPayInformation
                control={control}
                application_fields={application_fields}
                categoryId={categoryId}
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
              categoryId={categoryId}
            />
            {application_fields_group.includes(CUSTOMER_WEB_INFO) && (
              <CustomerWebInformation
                control={control}
                application_fields={application_fields}
                users={users}
              />
            )}
            {application_fields_group.includes(MYANMAR_NET) && (
              <CustomerInformation
                control={control}
                application_fields={application_fields}
                setValue={setValue}
                categoryId={categoryId}
              />
            )}
            {application_fields_group.includes(MYANMAR_NET) && (
              <ExtraInformation
                control={control}
                application_fields={application_fields}
                setValue={setValue}
                categoryId={categoryId}
              />
            )}
            <ApplicationAddressV2 control={control} setValue={setValue} />
            <OccupationalInformation
              control={control}
              setValue={setValue}
              getValues={getValues}
              application_fields={application_fields}
              isRequired={isRequired}
              categoryId={categoryId}
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
              categoryId={categoryId}
            />
            <FinancedVehicleInformation
              control={control}
              application_fields={application_fields}
              vehicles={vehicles}
              vehicleLoading={vehicleLoading}
              setValue={setValue}
              categoryId={categoryId}
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
              categoryId={categoryId}
            />
            <BankPaymentChannelInformation
              control={control}
              application_fields={application_fields}
              customerBanks={customerBanks}
              categoryId={categoryId}
            />
            <CreditJudgementInformation
              control={control}
              application_fields={application_fields}
              categoryId={categoryId}
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
              categoryId={categoryId}
            />
            <PreviousLoanInformation
              control={control}
              application_fields={application_fields}
              categoryId={categoryId}
            />
            <Box sx={{ display: "flex", px: 1, justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={onSubmitNotReady}
                disabled={isOkDisabled} // ✅ disable logic added here
              >
                OK
              </Button>
            </Box>
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
                  <BlackListCustomerStatistics categoryId={categoryId} />
                  <ExistingCustomerStatistics categoryId={categoryId} />
                  <RelatedApplicationStatistics
                    relatedApplications={relatedApplications}
                    categoryId={categoryId}
                  />
                  <ApplicationHistoryStatistics
                    applicationHistories={applicationHistories}
                    categoryId={categoryId}
                  />
                  <RefinanceCustomerStatistics
                    refinanceCustomer={refinanceCustomer}
                    categoryId={categoryId}
                  />
                  <CreditCriteriaInfo
                    control={control}
                    categoryId={categoryId}
                  />
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
              <BlackListCustomerStatistics categoryId={categoryId} />
              <ExistingCustomerStatistics categoryId={categoryId} />
              <RelatedApplicationStatistics
                relatedApplications={relatedApplications}
                categoryId={categoryId}
              />
              <ApplicationHistoryStatistics
                applicationHistories={applicationHistories}
                categoryId={categoryId}
              />
              <RefinanceCustomerStatistics
                refinanceCustomer={refinanceCustomer}
                categoryId={categoryId}
              />
              <CreditCriteriaInfo control={control} categoryId={categoryId} />
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
