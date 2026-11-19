import React, { useCallback, useEffect, useMemo } from "react";
import { Backdrop, Box, Button, CircularProgress, Grid } from "@mui/material";
import Accordion from "components/Accordion";
import FormInputText from "components/form/FormInputText";
import { get, intersection } from "lodash";
import FormInputNumber from "components/form/FormInputNumber";
import { useController, useWatch } from "react-hook-form";
import FormInputDecimal from "components/form/FormInputDecimal";
import { useParams } from "react-router";
import {
  calculateProrataDisbursement,
  getApplicationByUuid,
} from "modules/credit-management/slices/applicationDetailSlice";
import { useDispatch } from "react-redux";
import FormInputDatePicker from "components/form/FormInputDatePicker";
import dayjs from "dayjs";

const LoanInformation = ({
  control,
  setValue,
  application,
  isCalculating,
  categories,
  applicationCardResponses,
  handleSelectChange,
  selectedRemarkIds,
  user,
  register
}) => {
  const { categoryName, categoryId, uuid } = useParams();
  const dispatch = useDispatch();

  const disabled = useWatch({
    control,
    name: "disabled",
  });

  const { field: stamp_duty_fee_field } = useController({
    name: "stamp_duty_fees",
    control,
  });

  const stamp_duty_percentage = useWatch({
    control,
    name: "stamp_duty_percentage",
  });

  const address_township_id = useWatch({
    control,
    name: "address_township_id",
  });

  const stamp_duty_fees = useWatch({
    control,
    name: "stamp_duty_fees",
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

  const insurance_premium_fees = useWatch({
    control,
    name: "insurance_premium_fees",
  });

  const down_payment_amount = useWatch({
    control,
    name: "down_payment_amount",
  });

  const loan_amount = useWatch({
    control,
    name: "loan_amount",
  });

  const processing_percentage = useWatch({
    control,
    name: "processing_percentage",
  });

  const processing_fees = useWatch({
    control,
    name: "processing_fees",
  });

  const commencement_date = useWatch({
    control,
    name: "commencement_date",
  });

  const loan_term_duration = useWatch({
    control,
    name: "loan_term_duration",
  });

  const sub_category_id = useWatch({
    control,
    name: "sub_category_id",
  });

  const interest_rate = useWatch({
    control,
    name: "interest_rate",
  });

  const monthly_interest_rate = useWatch({
    control,
    name: "monthly_interest_rate",
  });

  useEffect(() => {
    if (total_amount) {
      // Watch for changes in total_amount or vehicle_down_payment_ratio
      if (vehicle_down_payment_ratio) {
        const calculatedDownPaymentAmount =
          (total_amount * vehicle_down_payment_ratio) / 100;
        setValue("vehicle_down_payment_amount", calculatedDownPaymentAmount);
        setValue("loan_amount", total_amount - calculatedDownPaymentAmount);
      } else if (vehicle_down_payment_amount) {
        const calculatedDownPaymentRatio =
          (vehicle_down_payment_amount / total_amount) * 100;
        setValue("loan_amount", total_amount - vehicle_down_payment_amount);
      }
      if (vehicle_down_payment_amount && stamp_duty_fees && processing_fees) {
        const totalDownpaymentAmount =
          parseInt(vehicle_down_payment_amount || 0, 10) +
          parseInt(stamp_duty_fees || 0, 10) +
          parseInt(processing_fees || 0, 10);

        setValue("down_payment_amount", totalDownpaymentAmount);
      }
    } else {
      // If total_amount is null, reset loan_amount and vehicle_down_payment_amount to null
      setValue("loan_amount", 0);
      setValue("vehicle_down_payment_amount", 0);
      // setValue("stamp_duty_fees", 0);
      // setValue("processing_fees", 0);
      // setValue("down_payment_amount", 0);
    }
  }, [
    total_amount,
    vehicle_down_payment_ratio,
    down_payment_amount,
    vehicle_down_payment_amount,
    stamp_duty_fees,
    processing_fees,
    categoryId,
    setValue,
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
      dispatch(
        calculateProrataDisbursement({
          uuid,
          body: {
            total_amount: total_amount,
            vehicle_down_payment_ratio: vehicle_down_payment_ratio,
            vehicle_down_payment_amount: vehicle_down_payment_amount,
            down_payment_amount: down_payment_amount,
            insurance_premium_fees: insurance_premium_fees,
            stamp_duty_fees: stamp_duty_fees,
            stamp_duty_percentage: stamp_duty_percentage,
            loan_amount: loan_amount,
            processing_fees: processing_fees,
            processing_percentage: processing_percentage,
            commencement_date: commencement_date.format("YYYY-MM-DD"),
            loan_term_duration: loan_term_duration,
            interest_rate: interest_rate,
            township_id: address_township_id,
          },
        })
      ).then((response) => {
        if (response.payload.success === true) {
          getApplicationByUuid(application?.uuid);
        }
      });
    } catch (e) {
      console.error("Error", e);
    }
    // window.location.reload()
  }, [
    uuid,
    stamp_duty_fees,
    stamp_duty_percentage,
    loan_amount,
    processing_fees,
    processing_percentage,
    commencement_date,
    loan_term_duration,
    interest_rate,
    address_township_id,
    total_amount,
    vehicle_down_payment_amount,
    vehicle_down_payment_ratio,
    down_payment_amount,
    insurance_premium_fees,
  ]);

  const subCategories = useMemo(
    () =>
      categories?.find((item) => item.id === parseInt(categoryId))
        ?.sub_categories || [],
    [categories, categoryId]
  );

  useEffect(() => {
    let downPaymentObject;
    let sub_category;
    let interest_rate_by_sub_category;

    async function setValuesByDownPaymentScheme() {
      if (sub_category_id) {
        downPaymentObject = await application.category?.downpayments.filter(
          (item) => item.sub_category_id === sub_category_id
        );
        sub_category = subCategories.find(
          (item) => item.id === sub_category_id
        );
        interest_rate_by_sub_category =
          sub_category?.interest_rate !== null
            ? sub_category?.interest_rate
            : "";
        setValue(
          "interest_rate",
          application?.interest_rate ?? interest_rate_by_sub_category
        );
      } else {
        downPaymentObject = application.category?.downpayments;
        downPaymentObject = await application.category?.downpayments.filter(
          (item) => item.sub_category_id === null
        );
      }
      if (downPaymentObject && downPaymentObject.length > 0) {
        await setValue(
          "stamp_duty_fees",
          application.stamp_duty_fee_fixed_amount ??
            (downPaymentObject && downPaymentObject.length > 0
              ? downPaymentObject[0].stamp_duty_fee_fixed_amount
              : null),
          { shouldDirty: true }
        );
        await setValue(
          "stamp_duty_percentage",
          application.stamp_duty_percentage ??
            (downPaymentObject && downPaymentObject.length > 0
              ? downPaymentObject[0]?.stamp_duty_fee_percentage
              : null),
          { shouldDirty: true }
        );

        await setValue(
          "processing_fees",
          application.processing_fees ??
            (downPaymentObject && downPaymentObject.length > 0
              ? downPaymentObject[0]?.processing_fee_fixed_amount
              : null),
          { shouldDirty: true }
        );
        await setValue(
          "processing_percentage",
          application.processing_percentage ??
            (downPaymentObject && downPaymentObject.length > 0
              ? downPaymentObject[0]?.processing_fee_percentage
              : null),
          { shouldDirty: true }
        );
      }
    }

    setValuesByDownPaymentScheme();
  }, [sub_category_id, application.category, subCategories, setValue]);

  useEffect(() => {
    setValue(
      "loan_amount",
      loan_amount === undefined ? application?.loan_amount : loan_amount
    );
  }, [loan_amount, setValue, application?.loan_amount]);

  
  const downPaymentObject = useMemo(() => {
    if (!categoryObj?.downpayments) return [];

    
    const subCategoryMatch = categoryObj.downpayments.filter(
      (item) => item.sub_category_id === initialPaymentCalculations[0]?.application?.sub_category_id
    );
  
    if (subCategoryMatch.length > 0) return subCategoryMatch;
  
    const categoryMatch = categoryObj.downpayments.filter(
      (item) => item.category_id === initialPaymentCalculations[0]?.application?.category_id
    );
  
    return categoryMatch;
    
  }, [categoryObj, initialPaymentCalculations]);  

  useEffect(() => {

    const calculateAmt = downPaymentObject[0]?.stamp_duty_fee === null ||  downPaymentObject[0]?.stamp_duty_fee === undefined || downPaymentObject[0]?.stamp_duty_fee === "stamp_duty_fee_percent_on_loan_amount" ? loan_amount : total_amount;

    if (stamp_duty_percentage !== "") {
      const calculatedStampDutyFeePercentage =
        (+stamp_duty_percentage / 100) * calculateAmt;
        
      let roundedNumber = Math.round(calculatedStampDutyFeePercentage / 100) * 100;
      
      setValue("stamp_duty_fees",  Math.round(roundedNumber));
    }
  }, [stamp_duty_percentage, loan_amount, downPaymentObject]);

  const handleProcessingFeePercentage = (event) => {
    const calculateAmt =
      downPaymentObject[0]?.processing_fee === null ||  downPaymentObject[0]?.processing_fee === undefined ||
      downPaymentObject[0]?.processing_fee ===
      "processing_fee_percent_on_loan_amount"
        ? loan_amount
        : total_amount;

    if (event) {
      if (processing_fees !== "") {
        const calculatedProcessingFeePercentage =
          (+processing_fees / +calculateAmt) * 100;
        setValue(
          "processing_percentage",
          calculatedProcessingFeePercentage.toFixed(2)
        );
      }
    }
  };

  const handleProcessingFee = (event) => {
    const calculateAmt =
      downPaymentObject[0]?.processing_fee === null ||  downPaymentObject[0]?.processing_fee === undefined ||
      downPaymentObject[0]?.processing_fee ===
      "processing_fee_percent_on_loan_amount"
        ? loan_amount
        : total_amount;

    if (event) {
      if (processing_percentage !== "") {
        const calculatedProcessingFee =
          (+processing_percentage / 100) * +calculateAmt;
        let roundedNumber = Math.round(calculatedProcessingFee / 100) * 100;

        setValue("processing_fees", Math.round(roundedNumber));
      }
    }
  };

  // useEffect(() => {
  //   // stamp_duty_fee_field.onChange(
  //   //     (+stamp_duty_percentage / 100) * +loan_amount
  //   // );
  //   if (stamp_duty_percentage !== "") {
  //     // var calculatedStampDutyFeePercentage =
  //     //   (+stamp_duty_percentage / 100) * loan_amount;
  //     // calculatedStampDutyFeePercentage =
  //     //   Math.round(calculatedStampDutyFeePercentage / 100) * 100;
  //     // setValue("stamp_duty_fees", calculatedStampDutyFeePercentage.toFixed(2));

  //     const calculatedStampDutyFeePercentage =
  //       (+stamp_duty_percentage / 100) * calculateAmt;
        
  //     let roundedNumber = Math.round(calculatedStampDutyFeePercentage / 100) * 100;
      
  //     setValue("stamp_duty_fees",  Math.round(roundedNumber));
  //   }
  // }, [stamp_duty_percentage, loan_amount, stamp_duty_fee_field]);

  // const handleProcessingFeePercentage = (event) => {
  //   if (event) {
  //     if (processing_fees !== "") {
  //       const calculatedProcessingFeePercentage =
  //         (+processing_fees / +loan_amount) * 100;
  //       setValue(
  //         "processing_percentage",
  //         calculatedProcessingFeePercentage.toFixed(2)
  //       );
  //     }
  //   }
  // };

  // const handleProcessingFee = (event) => {
  //   if (event) {
  //     if (processing_percentage !== "") {
  //       const calculatedProcessingFee =
  //         (+processing_percentage / 100) * +loan_amount;
  //       let roundedNumber = Math.round(calculatedProcessingFee / 100) * 100;

  //       setValue("processing_fees", Math.round(roundedNumber));
  //     }
  //   }
  // };

  if (isCalculating) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isCalculating}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

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
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Insurance Premium Fees"
                name="insurance_premium_fees"
              />
            </Grid>
            <Grid item xs={7} lg={10} sm={7}>
              <FormInputDatePicker
                control={control}
                label="Commencement Date"
                name="commencement_date"
              />
            </Grid>
            <Grid item xs={2} lg={2} sm={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCalculateProrataDisbursement}
                sx={{ width: "80px" }}
              >
                Calculate
              </Button>
            </Grid>
            <Grid item xs={12}>
              <FormInputDatePicker
                control={control}
                label="First Due Date"
                name="first_due_date"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Total Amount/Vehicle Selling Price"
                name="total_amount"
                disabled
              />
            </Grid>
            <>
              <Grid item xs={12}>
                <FormInputNumber
                  control={control}
                  label="Tenor/Loan Term Duration"
                  name="loan_term_duration"
                />
              </Grid>
            </>
            <Grid item xs={12}>
              <FormInputDecimal
                control={control}
                label="Stamp Duty %"
                name="stamp_duty_percentage"
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Stamp Duty Fee"
                name="stamp_duty_fees"
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputDecimal
                control={control}
                label="Processing %"
                name="processing_percentage"
                //disabled
                onFocus={handleProcessingFeePercentage}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Processing Fee"
                name="processing_fees"
                //disabled
                onFocus={handleProcessingFee}
              />
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
              <FormInputDecimal
                control={control}
                label="Interest Rate"
                name="interest_rate"
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Prorata Interest"
                name="prorata_interest"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputDecimal
                control={control}
                label="Monthly Interest Rate"
                name="monthly_interest_rate"
              />
            </Grid>
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
                label="Vehicle Down Payment Ratio %"
                name="vehicle_down_payment_ratio"
              />
            </Grid>

            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Vehicle Down Payment Amount"
                name="vehicle_down_payment_amount"
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Down Payment Amount(DP+SD+PF)"
                name="down_payment_amount"
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Loan Amount"
                name="loan_amount"
              />
            </Grid>
            <></>
            {/*)}*/}
          </Grid>
        </Grid>
      </Box>
    </Accordion>
  );
};

export default React.memo(LoanInformation);
