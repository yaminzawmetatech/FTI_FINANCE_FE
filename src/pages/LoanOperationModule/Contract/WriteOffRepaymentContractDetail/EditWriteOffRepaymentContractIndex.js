import React, { useEffect, useMemo } from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import useContractForm from "./hooks/useContractForm";
import ApplicationInformation from "./ApplicationInformation";
import LoanInformation from "./LoanInformation";
import ApplicantInformation from "./ApplicantInformation";
import ActualPaymentLines from "./ActualPaymentLines";
import { useParams } from "react-router";
import { getApplicationSetupList } from "features/menuApplicationSetup/menuApplicationSetupSlice";
import FinancedVehicleInfo from "./FinancedVehicleInfo";
import WriteOffInformation from "./WriteOffInformation";
import PaymentAfterWriteOffLines from "./PaymentAfterWriteOffLine";
import {
  changeStatusWriteOffRecoveryIncome,
  getWriteOffRecoveryIncomeByUuid,
} from "features/writeOffRecoveryIncome/writeOffRecoveryIncomeSlice";
import { showSuccessToast } from "common/ToastMessage";

const EditWriteOffRepaymentContractIndex = () => {
  const {
    control,
    handleSubmit,
    isLoading,
    isSubmitting,
    onSubmit,
    writeOffRecoveryIncomes,
    editAbleForm,
    setValue,
  } = useContractForm();

  const dispatch = useDispatch();
  const { uuid, mode } = useParams();

  const { data: applicationSetups, isLoading: applicationSetupsLoading } =
    useSelector((state) => state.menuApplicationSetup.applicationSetups);

  const applicationSetup = useMemo(
    () =>
      applicationSetups?.find(
        (item) =>
          +item.category_id === +writeOffRecoveryIncomes?.contract?.category_id
      ),
    [writeOffRecoveryIncomes, applicationSetups]
  );

  const application_fields = useMemo(
    () => applicationSetup?.application_fields || {},
    [applicationSetup]
  );

  useEffect(() => {
    dispatch(getApplicationSetupList());
  }, [dispatch]);

  const application_fields_group = useMemo(
    () => Object.values(application_fields).map((item) => item.group),
    [application_fields]
  );

  const handleClose = (option) => {
    if (option) {
      // Convert option to status value (you can map these as needed)
      const statusMap = {
        "Write Off Fully Paid": "Write Off Fully Paid",
        "Recovery Fully Paid": "Recovery Fully Paid",
      };

      const status = statusMap[option];

      if (status && writeOffRecoveryIncomes?.uuid) {
        dispatch(
          changeStatusWriteOffRecoveryIncome({
            status,
            uuid: writeOffRecoveryIncomes?.contract?.id,
          })
        )
          .unwrap()
          .then(() => {
            showSuccessToast(`${option} status updated successfully`);
          })
          .catch((error) => {
            alert(`Failed to update status: ${error}`);
          });
        dispatch(getWriteOffRecoveryIncomeByUuid({ uuid }));
      }
    }

  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isSubmitting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Helmet>
        <title>Write Off Repayment Detail</title>
      </Helmet>
      {/* <ToolbarContract
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        editAbleForm={editAbleForm}
        contract={contract}
        control={control}
        setValue={setValue}
      /> */}
      <Box
        sx={{
          px: 1,
          pb: 1,
          display: "flex",
          gap: 2,
          "@media (max-width: 600px)": {
            flexDirection: "column",
          },
        }}
      >
        <Box sx={{ width: "100%", flex: 1 }}>
          <ApplicationInformation control={control} />
          <ApplicantInformation control={control} />
          {application_fields_group.includes(
            "Financed Vehicle Information"
          ) && (
            <FinancedVehicleInfo
              control={control}
              application_fields={application_fields}
            />
          )}
          <LoanInformation
            contract={writeOffRecoveryIncomes?.contract}
            control={control}
            application_fields={application_fields}
          />
            <ActualPaymentLines
              contract={writeOffRecoveryIncomes?.contract}
              isLoading={isLoading}
            />
          <WriteOffInformation control={control} />
          <PaymentAfterWriteOffLines
            isLoading={isLoading}
            recoveryIncomes={writeOffRecoveryIncomes?.contract?.recovery_incomes}
            handleClose={handleClose}
            contractId={writeOffRecoveryIncomes?.contract?.id}
          />
        </Box>
      </Box>
      
    </>
  );
};

export default EditWriteOffRepaymentContractIndex;
