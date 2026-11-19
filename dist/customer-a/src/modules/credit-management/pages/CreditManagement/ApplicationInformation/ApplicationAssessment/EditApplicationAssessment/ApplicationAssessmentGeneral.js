import React, { useEffect, useCallback, useMemo } from "react";
import { Box, FormControl, FormLabel, Grid, Button } from "@mui/material";
import FormInputText from "components/form/FormInputText";
import Accordion from "components/Accordion";
import FormInputDatePicker from "components/form/FormInputDatePicker";
import { useController, useWatch } from "react-hook-form";
import FormInputNumber from "components/form/FormInputNumber";
import FormInputDateTimePicker from "components/form/FormInputDateTimePicker";
import FormInputDecimal from "components/form/FormInputDecimal";
import FormInputSelect from "components/form/FormInputSelect";
import { useParams } from "react-router";
import {
  calculateProrataDisbursement,
  getAssessment,
} from "modules/credit-management/slices/assessmentSlice";
import { useDispatch, useSelector } from "react-redux";
import FormInputCheckbox from "components/form/FormInputCheckbox";
import { get } from "lodash";

const ApplicationAssessmentGeneral = ({
  control,
  getValues,
  setValue,
  assessment,
  application_fields,
  projectCategories,
}) => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth.user);

  const { field: stamp_duty_fee_field } = useController({
    name: "stamp_duty_fee",
    control,
  });

  const { field: monthly_interest_rate_field } = useController({
    name: "monthly_interest_rate",
    control,
  });

  const { field: monthly_income_ratio_field } = useController({
    name: "monthly_income_ratio",
    control,
  });

  const stamp_duty_fee_percentage = useWatch({
    control,
    name: "stamp_duty_fee_percentage",
  });

  const processing_fee_percentage = useWatch({
    control,
    name: "processing_fee_percentage",
  });

  const processing_fee = useWatch({
    control,
    name: "processing_fee",
  });

  const loan_amount = useWatch({
    control,
    name: "loan_amount",
  });

  const interest_rate = useWatch({
    control,
    name: "interest_rate",
  });

  const estimated_monthly_income = useWatch({
    control,
    name: "estimated_monthly_income",
  });

  const monthly_installment_amount = useWatch({
    control,
    name: "monthly_installment_amount",
  });

  const stamp_duty_fee = useWatch({
    control,
    name: "stamp_duty_fee",
  });

  const remark = useWatch({
    control,
    name: "remark",
  });

  const investigation_result = useWatch({
    control,
    name: "investigation_result",
  });

  const commencement_date = useWatch({
    control,
    name: "commencement_date",
  });

  const loan_term_duration = useWatch({
    control,
    name: "loan_term_duration",
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
  //     setValue("dealer_disbursed_amount", (assessment?.application?.application_info?.package_fees)?.toFixed(2));
  //     setValue(
  //       "customer_disbursed_amount",
  //       (net_disbursed_amount - assessment?.application?.application_info?.package_fees).toFixed(2)
  //     );
  //     setValue("customer_disbursed_ratio", "");
  //     setValue("dealer_disbursed_ratio", "");
  //   }
  // }, [net_disbursed_amount, setValue, disbursed_based_on_package_setup,assessment]);

  useEffect(() => {
    if (
      get(application_fields, "dealer_disbursed_amount") &&
      get(application_fields, "dealer_disbursed_amount") &&
      get(application_fields, "customer_disbursed_ratio") &&
      get(application_fields, "customer_disbursed_amount")
    ) {
      if (net_disbursed_amount && disbursed_based_on_package_setup) {
        const safePackageFees =
          assessment?.application?.application_info?.package_fees?.toFixed(2) ??
          0;
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
    assessment,
    application_fields,
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

  // useEffect(() => {
  //   stamp_duty_fee_field.onChange(
  //     (+stamp_duty_fee_percentage / 100) * +loan_amount
  //   );
  // }, [stamp_duty_fee_percentage, loan_amount, stamp_duty_fee_field]);

  const categoryObj = useMemo(() => {
    return projectCategories.find(
      (item) => item.id === assessment?.category_id
    );
  }, [projectCategories, assessment]);

  // const downPaymentObject = useMemo(() => {
  // return categoryObj?.downpayments.filter(
  //   (item) => item.sub_category_id === assessment?.sub_category_id
  // ) || [];
  // }, [categoryObj, assessment]);

  const downPaymentObject = useMemo(() => {
    if (!categoryObj?.downpayments) return [];

    const subCategoryMatch = categoryObj.downpayments.filter(
      (item) => item.sub_category_id === assessment?.sub_category_id
    );

    if (subCategoryMatch.length > 0) return subCategoryMatch;

    const categoryMatch = categoryObj.downpayments.filter(
      (item) => item.category_id === assessment?.category_id
    );

    return categoryMatch;
  }, [categoryObj, assessment]);

  useEffect(() => {
    const calculateAmt =
      downPaymentObject[0]?.stamp_duty_fee ===
      "stamp_duty_fee_percent_on_loan_amount"
        ? loan_amount
        : total_amount;

    if (stamp_duty_fee_percentage !== "") {
      // var calculatedStampDutyFeePercentage =
      //   (+stamp_duty_fee_percentage / 100) * calculateAmt;

      // calculatedStampDutyFeePercentage =
      //   Math.round(calculatedStampDutyFeePercentage / 100) * 100;
      // setValue("stamp_duty_fee", calculatedStampDutyFeePercentage.toFixed(2));

      const calculatedStampDutyFeePercentage =
        (+stamp_duty_fee_percentage / 100) * calculateAmt;

      let roundedNumber =
        Math.round(calculatedStampDutyFeePercentage / 100) * 100;

      setValue("stamp_duty_fee", Math.round(roundedNumber));
    }
  }, [
    stamp_duty_fee_percentage,
    loan_amount,
    stamp_duty_fee_field,
    downPaymentObject,
  ]);

  useEffect(() => {
    monthly_interest_rate_field.onChange(+interest_rate / 12);
  }, [stamp_duty_fee_percentage, interest_rate, monthly_interest_rate_field]);

  useEffect(() => {
    monthly_income_ratio_field.onChange(
      (estimated_monthly_income / monthly_installment_amount).toFixed(1)
    );
  }, [
    estimated_monthly_income,
    monthly_installment_amount,
    monthly_interest_rate_field,
    monthly_income_ratio_field,
  ]);

  // useEffect(() => {
  //   if (processing_fee !== "") {
  //     const calculatedProcessingFeePercentage =
  //       (+processing_fee / +loan_amount) * 100;
  //     setValue(
  //       "processing_fee_percentage",
  //       calculatedProcessingFeePercentage.toFixed(2)
  //     );
  //   }
  // }, [loan_amount]);

  // const handleProcessingFeePercentage = (event) => {
  //   if (event) {
  //     if (processing_fee !== "") {
  //       const calculatedProcessingFeePercentage =
  //         (+processing_fee / +loan_amount) * 100;
  //       setValue(
  //         "processing_fee_percentage",
  //         calculatedProcessingFeePercentage.toFixed(2)
  //       );
  //     }
  //   }
  // };

  const handleProcessingFeePercentage = (event) => {
    const calculateAmt =
      downPaymentObject[0]?.processing_fee === null ||
      downPaymentObject[0]?.processing_fee === undefined ||
      downPaymentObject[0]?.processing_fee ===
        "processing_fee_percent_on_loan_amount"
        ? loan_amount
        : total_amount;

    if (event) {
      if (processing_fee !== "") {
        const calculatedProcessingFeePercentage =
          (+processing_fee / +calculateAmt) * 100;
        setValue(
          "processing_fee_percentage",
          calculatedProcessingFeePercentage.toFixed(2)
        );
      }
    }
  };

  // const handleProcessingFee = (event) => {
  //   if (event) {
  //     if (processing_fee_percentage !== "") {
  //       const calculatedProcessingFee =
  //         (+processing_fee_percentage / 100) * +loan_amount;
  //       let roundedNumber = Math.round(calculatedProcessingFee / 100) * 100;
  //       setValue("processing_fee", Math.round(roundedNumber));
  //     }
  //   }
  // };

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

        setValue("processing_fee", Math.round(roundedNumber));
      }
    }
  };

  const handleCalculateProrataDisbursement = useCallback(async () => {
    try {
      dispatch(
        calculateProrataDisbursement({
          id,
          body: {
            //new fields
            total_amount: total_amount,
            vehicle_down_payment_ratio: vehicle_down_payment_ratio ?? 0,
            vehicle_down_payment_amount: vehicle_down_payment_amount ?? 0,
            down_payment_amount: down_payment_amount ?? 0,
            insurance_premium_fee: insurance_premium_fee ?? 0,

            stamp_duty_fees: stamp_duty_fee,
            stamp_duty_percentage: stamp_duty_fee_percentage,
            loan_amount: loan_amount,
            processing_fees: processing_fee,
            processing_percentage: processing_fee_percentage,
            commencement_date: commencement_date.format("YYYY-MM-DD"),
            loan_term_duration: loan_term_duration,
            interest_rate: interest_rate,
            remark: remark,
            investigation_result: investigation_result,
          },
        })
      ).then((response) => {
        if (response.payload.success === true) {
          getAssessment(id);
        }
      });
    } catch (e) {
      console.error("response here", e);
    }
    // window.location.reload()
  }, [
    id,
    stamp_duty_fee,
    stamp_duty_fee_percentage,
    loan_amount,
    processing_fee,
    processing_fee_percentage,
    commencement_date,
    loan_term_duration,
    interest_rate,
    remark,
    investigation_result,
    dispatch,
  ]);

  return (
    <Accordion title="General">
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
              <FormInputText
                disabled
                control={control}
                label="Application ID"
                name="application.application_id"
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputDateTimePicker
                control={control}
                label="Conduct Date"
                name="conduct_at"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                multiline
                control={control}
                label="Remark"
                name="remark"
                sx={{
                  pt: 1,
                  textarea: {
                    minHeight: "200px",
                    maxHeight: "200px",
                    overflow: "auto !important",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                multiline
                control={control}
                label="Investigation Result"
                name="investigation_result"
                sx={{
                  pt: 1,
                  textarea: {
                    minHeight: "200px",
                    maxHeight: "200px",
                    overflow: "auto !important",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                disabled
                control={control}
                label="Assessment Type"
                name="assessment_type"
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                disabled
                control={control}
                label="Status"
                name="status"
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                disabled
                control={control}
                label="Approved by"
                name="approved_user.user_name"
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                multiline
                control={control}
                label="Summary for Final Judgement"
                name="summary_for_final_judgement"
                sx={{
                  pt: 1,
                  textarea: {
                    minHeight: "200px",
                    maxHeight: "200px",
                    overflow: "auto !important",
                  },
                }}
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
            <FormControl
              sx={{ ml: 2, mt: 2, width: "100%" }}
              component="fieldset"
              variant="standard"
            >
              <Grid
                container
                item
                spacing={2}
                xs={12}
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Grid item xs={12}>
                  <FormInputText
                    disabled
                    control={control}
                    label="Category Code"
                    name="category.code"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    disabled
                    control={control}
                    label="Category Name"
                    name="category.name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    disabled
                    control={control}
                    label="Subcategory Code"
                    name="sub_category.code"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    disabled
                    control={control}
                    label="Subcategory Name"
                    name="sub_category.name"
                  />
                </Grid>
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
                      //disabled={disabled}
                    />
                  </Grid>
                )}
                {get(application_fields, "vehicle_down_payment_amount") && (
                  <Grid item xs={12}>
                    <FormInputNumber
                      control={control}
                      label="Vehicle Down Payment Amount"
                      name="vehicle_down_payment_amount"
                      disabled
                    />
                  </Grid>
                )}
                {get(application_fields, "down_payment_amount") && (
                  <Grid item xs={12}>
                    <FormInputNumber
                      control={control}
                      label="Total Down Payment Amount"
                      name="down_payment_amount"
                      disabled
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <FormInputNumber
                    control={control}
                    label="Loan Amount"
                    name="loan_amount"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputSelect
                    control={control}
                    options={[{ id: "D" }, { id: "M" }]}
                    getOptionLabel={(option) => option?.id}
                    id="id"
                    label="Tenor/Loan Term Type"
                    name="loan_term_type"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputNumber
                    control={control}
                    label="Tenor/Loan Term Duration"
                    name="loan_term_duration"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputDecimal
                    control={control}
                    label="Interest Rate"
                    name="interest_rate"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputNumber
                    disabled
                    control={control}
                    label="Monthly Installment Amount"
                    name="monthly_installment_amount"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputDecimal
                    control={control}
                    label="Stamp Duty Fee %"
                    name="stamp_duty_fee_percentage"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputNumber
                    disabled
                    control={control}
                    label="Stamp Duty Fee"
                    name="stamp_duty_fee"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputDecimal
                    control={control}
                    label="Processing Fee %"
                    name="processing_fee_percentage"
                    onFocus={handleProcessingFeePercentage}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputNumber
                    control={control}
                    label="Processing Fee"
                    name="processing_fee"
                    onFocus={handleProcessingFee}
                  />
                </Grid>
                <Grid item xs={8} lg={10} sm={8}>
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
                    disabled={
                      auth?.is_super === true
                        ? false
                        : assessment?.application?.status?.toLowerCase() ===
                            "approved" ||
                          assessment?.application?.status?.toLowerCase() ===
                            "rejected" ||
                          assessment?.application?.status?.toLowerCase() ===
                            "canceled"
                    }
                    //sx={{ width: "80px" }}
                  >
                    Calculate
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <FormInputDatePicker
                    disabled
                    control={control}
                    label="First Due Date"
                    name="first_due_date"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputNumber
                    disabled
                    control={control}
                    label="Prorata Interest"
                    name="prorata_interest"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputNumber
                    disabled
                    control={control}
                    label="Net Disbursement Amount"
                    name="net_disbursed_amount"
                    onFocus={handleProcessingFee}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputDecimal
                    control={control}
                    label="Estimate Monthly Interest Rate"
                    name="monthly_interest_rate"
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
                      rules={{
                        required:
                          application_fields?.dealer_disbursed_ratio?.required,
                      }}
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
                      rules={{
                        required:
                          application_fields?.dealer_disbursed_amount?.required,
                      }}
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
                      rules={{
                        required:
                          application_fields?.customer_disbursed_ratio
                            ?.required,
                      }}
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
                      rules={{
                        required:
                          application_fields?.customer_disbursed_ratio
                            ?.required,
                      }}
                    />
                  </Grid>
                )}
              </Grid>
            </FormControl>
            <FormControl
              sx={{ ml: 2, mt: 1, width: "100%" }}
              component="fieldset"
              variant="standard"
            >
              <FormLabel sx={{ fontWeight: "bold", color: "black" }}>
                Monthly Income Ratio Calculation
              </FormLabel>
              <Grid
                sx={{ mt: "3px" }}
                container
                item
                spacing={2}
                xs={12}
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Grid item xs={12}>
                  <FormInputNumber
                    control={control}
                    label="Estimated Monthly Income"
                    name="estimated_monthly_income"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputDecimal
                    control={control}
                    label="Monthly Income Ratio"
                    name="monthly_income_ratio"
                    disabled
                  />
                </Grid>
              </Grid>
            </FormControl>
            <Grid item xs={12}>
              <FormInputCheckbox
                control={control}
                label="Is Downgraded?"
                name="is_downgraded"
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Accordion>
  );
};

export default React.memo(ApplicationAssessmentGeneral);
