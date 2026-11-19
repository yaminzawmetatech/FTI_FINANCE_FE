import React, { useCallback, useEffect, useMemo } from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  Skeleton,
} from "@mui/material";
import Accordion from "components/Accordion";
import FormInputText from "components/form/FormInputText";
import FormInputNumber from "components/form/FormInputNumber";
import { useController, useWatch } from "react-hook-form";
import FormInputDecimal from "components/form/FormInputDecimal";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import FormInputDatePicker from "components/form/FormInputDatePicker";
import {
  calculateInitialDownPayment,
  getInitialPaymentCalculation,
} from "modules/loan-operation/slices/initialPaymentCalSlice";
import { get } from "lodash";
import FormInputCheckbox from "components/form/FormInputCheckbox";
import FormInputSelect from "components/form/FormInputSelect";
import { red } from "@mui/material/colors";

const LoanInformation = ({
  control,
  setValue,
  formValues,
  editAbleForm,
  insurancePremiumFeesLoading,
  initialPaymentCalculations,
  vehicleLoading,
  insuranceCompaniesLoading,
  route,
  projectCategories,
  insuranceCompanies,
  application_fields = {},
}) => {
  const { categoryId, uuid, id } = useParams();

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const disabled = useWatch({
    control,
    name: "disabled",
  });

  const commencement_date = useWatch({
    control,
    name: "commencement_date",
  });

  const { field: stamp_duty_fee_field } = useController({
    name: "stamp_duty_fee_amount",
    control,
  });

  const stamp_duty_fee_percentage = useWatch({
    control,
    name: "stamp_duty_fee_percentage",
  });

  const stamp_duty_fee_amount = useWatch({
    control,
    name: "stamp_duty_fee_amount",
  });

  const total_amount = useWatch({
    control,
    name: "total_amount",
  });

  const vehicle_down_payment_ratio = useWatch({
    control,
    name: "vehicle_down_payment_ratio",
  });

  const vehicle_down_payment_amount = useWatch({
    control,
    name: "vehicle_down_payment_amount",
  });

  const insurance_premium_fee = useWatch({
    control,
    name: "insurance_premium_fee",
  });

  const down_payment_amount = useWatch({
    control,
    name: "down_payment_amount",
  });

  const loan_amount = useWatch({
    control,
    name: "loan_amount",
  });

  const processing_fee_percentage = useWatch({
    control,
    name: "processing_fee_percentage",
  });

  const processing_fee_amount = useWatch({
    control,
    name: "processing_fee_amount",
  });

  const interest_rate = useWatch({
    control,
    name: "interest_rate",
  });

  const monthly_interest_rate = useWatch({
    control,
    name: "monthly_interest_rate",
  });

  const dealer_disbursed_ratio = useWatch({
    control,
    name: "dealer_disbursed_ratio",
  });

  const net_disbursed_amount = useWatch({
    control,
    name: "net_disbursed_amount",
  });

  const disbursed_based_on_package_setup = useWatch({
    control,
    name: "disbursed_based_on_package_setup",
  });

  useEffect(() => {
    if (get(application_fields, "total_amount")) {
      if (!total_amount) {
        setValue("loan_amount", 0);
        setValue("vehicle_down_payment_amount", 0);
        return;
      }

      let calculatedDownPaymentAmount = 0;
      if (vehicle_down_payment_ratio) {
        calculatedDownPaymentAmount =
          (total_amount * vehicle_down_payment_ratio) / 100;
        setValue("vehicle_down_payment_amount", calculatedDownPaymentAmount);
        setValue("loan_amount", total_amount - calculatedDownPaymentAmount);
      }
    }
  }, [
    total_amount,
    vehicle_down_payment_ratio,
    vehicle_down_payment_amount,
    //categoryId,
    setValue,
    application_fields,
  ]);

  // useEffect(() => {
  //   if (net_disbursed_amount && disbursed_based_on_package_setup) {
  //     setValue(
  //       "dealer_disbursed_amount",
  //       initialPaymentCalculations[0]?.application?.application_info?.package_fees?.toFixed(
  //         2
  //       )
  //     );
  //     setValue(
  //       "customer_disbursed_amount",
  //       (
  //         net_disbursed_amount -
  //         initialPaymentCalculations[0]?.application?.application_info
  //           ?.package_fees
  //       ).toFixed(2)
  //     );
  //     setValue("customer_disbursed_ratio", "");
  //     setValue("dealer_disbursed_ratio", "");
  //   }
  // }, [
  //   net_disbursed_amount,
  //   setValue,
  //   disbursed_based_on_package_setup,
  //   initialPaymentCalculations,
  // ]);

  useEffect(() => {
    if (
      get(application_fields, "dealer_disbursed_amount") &&
      get(application_fields, "dealer_disbursed_amount") &&
      get(application_fields, "customer_disbursed_ratio") &&
      get(application_fields, "customer_disbursed_amount")
    ) {
      if (net_disbursed_amount && disbursed_based_on_package_setup) {
        const safePackageFees =
          initialPaymentCalculations[0]?.application?.application_info?.package_fees?.toFixed(
            2
          ) ?? 0;
        const dealer_disbursed_amt =
          net_disbursed_amount > safePackageFees
            ? safePackageFees
            : net_disbursed_amount;

        setValue("dealer_disbursed_amount", dealer_disbursed_amt);
        setValue(
          "customer_disbursed_amount",
          (net_disbursed_amount - dealer_disbursed_amt > 0
            ? net_disbursed_amount - dealer_disbursed_amt
            : 0
          ).toFixed(2)
        );
        setValue("customer_disbursed_ratio", "");
        setValue("dealer_disbursed_ratio", "");
      }
    } else {
      setValue("dealer_disbursed_amount", net_disbursed_amount);
      setValue("customer_disbursed_amount", 0);
    }
  }, [
    net_disbursed_amount,
    setValue,
    disbursed_based_on_package_setup,
    initialPaymentCalculations,
  ]);

  useEffect(() => {
    if (
      get(application_fields, "dealer_disbursed_amount") &&
      get(application_fields, "dealer_disbursed_amount") &&
      get(application_fields, "customer_disbursed_ratio") &&
      get(application_fields, "customer_disbursed_amount")
    ) {
      if (
        net_disbursed_amount &&
        dealer_disbursed_ratio &&
        !disbursed_based_on_package_setup
      ) {
        const calculatedDealerDisbursementAmount =
          (net_disbursed_amount * dealer_disbursed_ratio) / 100;
        setValue(
          "dealer_disbursed_amount",
          calculatedDealerDisbursementAmount.toFixed(2)
        );

        const calculateCustomerDisbursementAmount =
          net_disbursed_amount - calculatedDealerDisbursementAmount;
        setValue(
          "customer_disbursed_amount",
          calculateCustomerDisbursementAmount.toFixed(2)
        );
        setValue("customer_disbursed_ratio", 100 - dealer_disbursed_ratio);
      }
    } else {
      setValue("dealer_disbursed_amount", net_disbursed_amount);
      setValue("customer_disbursed_amount", 0);
    }
  }, [
    dealer_disbursed_ratio,
    net_disbursed_amount,
    setValue,
    disbursed_based_on_package_setup,
  ]);

  useEffect(() => {
    if (interest_rate) {
      const annualInterestRate = parseFloat(interest_rate);
      const monthlyInterestRate = annualInterestRate / 12;
      setValue("monthly_interest_rate", monthlyInterestRate);
    }
  }, [interest_rate, setValue]);

  const handleCalculateProrataDisbursement = useCallback(async () => {
    try {
      const values = formValues();
      dispatch(
        calculateInitialDownPayment({
          uuid,
          body: {
            ...values,
            commencement_date: values.calculate_date.format("YYYY-MM-DD"),
          },
        })
      ).then((response) => {
        if (response.payload.success === true) {
          dispatch(
            getInitialPaymentCalculation({
              params: {
                application_id: id,
              },
            })
          );
        }
      });
    } catch (e) {
      console.error("Error", e);
    }
  }, [id]);

  useEffect(() => {
    setValue(
      "loan_amount",
      loan_amount === undefined
        ? initialPaymentCalculations[0]?.application?.loan_amount
        : loan_amount
    );
  }, [
    loan_amount,
    setValue,
    initialPaymentCalculations[0]?.application?.loan_amount,
  ]);

  const categoryObj = useMemo(() => {
    return projectCategories.find(
      (item) =>
        item.id === initialPaymentCalculations[0]?.application?.category_id
    );
  }, [projectCategories, initialPaymentCalculations]);

  // const downPaymentObject = useMemo(() => {
  //   return (
  //     categoryObj?.downpayments.filter(
  //       (item) =>
  //         item.sub_category_id ===
  //         initialPaymentCalculations[0]?.application?.sub_category_id
  //     ) || []
  //   );
  // }, [categoryObj, initialPaymentCalculations]);

  const downPaymentObject = useMemo(() => {
    if (!categoryObj?.downpayments) return [];

    const subCategoryMatch = categoryObj.downpayments.filter(
      (item) =>
        item.sub_category_id ===
        initialPaymentCalculations[0]?.application?.sub_category_id
    );

    if (subCategoryMatch.length > 0) return subCategoryMatch;

    const categoryMatch = categoryObj.downpayments.filter(
      (item) =>
        item.category_id ===
        initialPaymentCalculations[0]?.application?.category_id
    );

    return categoryMatch;
  }, [categoryObj, initialPaymentCalculations]);

  useEffect(() => {
    const calculateAmt =
      downPaymentObject[0]?.stamp_duty_fee === null ||
      downPaymentObject[0]?.stamp_duty_fee === undefined ||
      downPaymentObject[0]?.stamp_duty_fee ===
        "stamp_duty_fee_percent_on_loan_amount"
        ? loan_amount
        : total_amount;

    if (stamp_duty_fee_percentage !== "") {
      const calculatedStampDutyFeePercentage =
        (+stamp_duty_fee_percentage / 100) * calculateAmt;

      let roundedNumber =
        Math.round(calculatedStampDutyFeePercentage / 100) * 100;

      setValue("stamp_duty_fee_amount", Math.round(roundedNumber));
    }
  }, [stamp_duty_fee_percentage, loan_amount, downPaymentObject]);

  const handleProcessingFeePercentage = (event) => {
    const calculateAmt =
      downPaymentObject[0]?.processing_fee === null ||
      downPaymentObject[0]?.processing_fee === undefined ||
      downPaymentObject[0]?.processing_fee ===
        "processing_fee_percent_on_loan_amount"
        ? loan_amount
        : total_amount;

    if (event) {
      if (processing_fee_amount !== "") {
        const calculatedProcessingFeePercentage =
          (+processing_fee_amount / +calculateAmt) * 100;
        setValue(
          "processing_fee_percentage",
          calculatedProcessingFeePercentage.toFixed(2)
        );
      }
    }
  };

  const handleProcessingFee = (event) => {
    const calculateAmt =
      downPaymentObject[0]?.processing_fee === null ||
      downPaymentObject[0]?.processing_fee === undefined ||
      downPaymentObject[0]?.processing_fee ===
        "processing_fee_percent_on_loan_amount"
        ? loan_amount
        : total_amount;

    if (event) {
      if (processing_fee_percentage !== "") {
        const calculatedProcessingFee =
          (+processing_fee_percentage / 100) * +calculateAmt;
        let roundedNumber = Math.round(calculatedProcessingFee / 100) * 100;

        setValue("processing_fee_amount", Math.round(roundedNumber));
      }
    }
  };

  // if (isCalculating) {
  //   return (
  //     <Backdrop
  //       sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
  //       open={isCalculating}
  //     >
  //       <CircularProgress color="inherit" />
  //     </Backdrop>
  //   );
  // }

  // const { control } = useForm({
  //   defaultValues: {
  //     calculate_date: dayjs().toDate(), // today's date
  //   },
  // });

  return (
    <Accordion title="Loan Detail">
      <Box sx={{ mt: 1 }}>
        <Grid
          container
          spacing={2}
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid
            container
            item
            spacing={2}
            xs={12}
            sm={6}
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            {insuranceCompaniesLoading ? (
              <Skeleton variant="rectangular" height={37.13} />
            ) : (
              <Grid item xs={12}>
                <FormInputSelect
                  control={control}
                  options={insuranceCompanies ?? []}
                  getOptionLabel={(option) => option?.name}
                  id="id"
                  name="insurance_company_id"
                  label="Insurance Company"
                  disabled={disabled}
                />
              </Grid>
            )}

            {get(application_fields, "insurance_premium_fees") && (
              <Grid item xs={12}>
                {insurancePremiumFeesLoading || insuranceCompaniesLoading ? (
                  <Skeleton variant="rectangular" height={37.13} />
                ) : (
                  <FormInputNumber
                    control={control}
                    label="Insurance Premium Fees"
                    name="insurance_premium_fee"
                    disabled={disabled}
                  />
                )}
              </Grid>
            )}
            {get(application_fields, "total_amount") && (
              <Grid item xs={12}>
                <FormInputNumber
                  control={control}
                  label="Total Amount/Vehicle Selling Price"
                  name="total_amount"
                  disabled
                />
              </Grid>
            )}
            {get(application_fields, "vehicle_down_payment_ratio") && (
              <Grid item xs={12}>
                <FormInputDecimal
                  control={control}
                  label="Vehicle Down Payment Ratio %"
                  name="vehicle_down_payment_ratio"
                  disabled={disabled || user?.is_super === false}
                />
              </Grid>
            )}
            {get(application_fields, "vehicle_down_payment_amount") && (
              <Grid item xs={12}>
                <FormInputNumber
                  control={control}
                  label="Vehicle Down Payment Amount"
                  name="vehicle_down_payment_amount"
                  disabled={disabled || user?.is_super === false}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Loan Amount"
                name="loan_amount"
                disabled={disabled || user?.is_super === false}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                backgroundColor: "#e3f2fd",
                border: `1px solid ${red[100]}`,
                borderRadius: "8px",
                p: 1,
                mt: 1,
              }}
            >
              <FormInputNumber
                control={control}
                label={
                  <span
                    style={{
                      color: red[500],
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                    }}
                  >
                    Total Down Payment Amount
                  </span>
                }
                name="down_payment_amount"
                disabled={disabled || user?.is_super === false}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputDecimal
                control={control}
                label="Interest Rate"
                name="interest_rate"
                disabled={disabled || user?.is_super === false}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputDecimal
                control={control}
                label="Monthly Interest Rate"
                name="monthly_interest_rate"
                disabled={disabled || user?.is_super === false}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Tenor/Loan Term Duration"
                name="loan_term_duration"
                disabled={disabled || user?.is_super === false}
              />
            </Grid>
            <Grid
              item
              xs={7}
              lg={10}
              sm={7}
              sx={{
                backgroundColor: "#e3f2fd",
                border: `1px solid ${red[100]}`,
                borderRadius: "8px",
                p: 1,
                mt: 1,
              }}
            >
              <FormInputDatePicker
                control={control}
                label={
                  <span
                    style={{
                      color: red[500],
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                    }}
                  >
                    Commencement Date
                  </span>
                }
                name="commencement_date"
                disabled={true}
                // disabled={!editAbleForm && !user?.is_super}
              />
            </Grid>
            <Grid item xs={7} lg={10} sm={7}>
              <FormInputDatePicker
                control={control}
                label="Calculate Date"
                name="calculate_date"
                disabled={!editAbleForm && !user?.is_super}
              />
            </Grid>
            <Grid item xs={2} lg={2} sm={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCalculateProrataDisbursement}
                sx={{ width: "80px" }}
                disabled={
                  !commencement_date || (!editAbleForm && !user?.is_super)
                }
              >
                Calculate
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            item
            spacing={2}
            xs={12}
            sm={6}
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs={12}>
              <FormInputText
                multiline
                control={control}
                label="Monthly Installment"
                name="monthly_installment"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputDecimal
                control={control}
                label="Stamp Duty %"
                name="stamp_duty_fee_percentage"
                disabled={disabled || user?.is_super === false}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Stamp Duty Fee"
                name="stamp_duty_fee_amount"
                disabled={disabled || user?.is_super === false}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputDecimal
                control={control}
                label="Processing %"
                name="processing_fee_percentage"
                //disabled
                disabled={disabled || user?.is_super === false}
                onFocus={handleProcessingFeePercentage}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Processing Fee"
                name="processing_fee_amount"
                //disabled
                disabled={disabled || user?.is_super === false}
                onFocus={handleProcessingFee}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputDatePicker
                control={control}
                label="First Due Date"
                name="first_due_date"
                disabled={disabled || user?.is_super === false}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Prorata Interest"
                name="prorata_interest"
                disabled={disabled || user?.is_super === false}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Net Disbursed Amount"
                name="net_disbursed_amount"
                disabled={disabled || user?.is_super === false}
              />
            </Grid>
            {get(application_fields, "dealer_disbursed_amount") && (
              <Grid item xs={12}>
                <FormInputCheckbox
                  control={control}
                  label="Disbursement Based on Package Setup"
                  name="disbursed_based_on_package_setup"
                />
              </Grid>
            )}
            {get(application_fields, "dealer_disbursed_ratio") && (
              <Grid item xs={12}>
                <FormInputNumber
                  control={control}
                  label="Dealer Disbursed Ratio"
                  name="dealer_disbursed_ratio"
                  disabled={
                    disbursed_based_on_package_setup === true ? true : false
                  }
                />
              </Grid>
            )}
            {get(application_fields, "dealer_disbursed_amount") && (
              <Grid item xs={12}>
                <FormInputNumber
                  control={control}
                  label="Dealer Disbursed Amount"
                  name="dealer_disbursed_amount"
                  disabled={true}
                />
              </Grid>
            )}
            {get(application_fields, "customer_disbursed_ratio") && (
              <Grid item xs={12}>
                <FormInputNumber
                  control={control}
                  label="Customer Disbursed Ratio"
                  name="customer_disbursed_ratio"
                  disabled={true}
                />
              </Grid>
            )}
            {get(application_fields, "customer_disbursed_amount") && (
              <Grid item xs={12}>
                <FormInputNumber
                  control={control}
                  label="Customer Disbursed Amount"
                  name="customer_disbursed_amount"
                  disabled={true}
                />
              </Grid>
            )}
            <></>
          </Grid>
        </Grid>
      </Box>
    </Accordion>
  );
};

export default React.memo(LoanInformation);
