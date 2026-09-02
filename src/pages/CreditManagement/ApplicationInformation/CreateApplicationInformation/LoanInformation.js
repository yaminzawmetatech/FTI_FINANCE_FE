import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  Skeleton,
} from "@mui/material";
import Accordion from "../../../../components/Accordion";
import FormInputText from "../../../../components/form/FormInputText";
import { get, intersection } from "lodash";
import FormInputNumber from "../../../../components/form/FormInputNumber";
import { useController, useWatch } from "react-hook-form";
import FormInputSelect from "../../../../components/form/FormInputSelect";
import FormInputDecimal from "components/form/FormInputDecimal";
import { useParams } from "react-router";
import {
  calculateProrataDisbursement,
  getApplicationByUuid,
} from "features/application/applicationDetailSlice";
import { useDispatch, useSelector } from "react-redux";
import FormInputDatePicker from "components/form/FormInputDatePicker";
import { PURPOSE_OF_LOAN } from "constants/loanInformation";
import FormInputMultiSelect from "components/form/FormInputMultiSelect";
import dayjs from "dayjs";
import FormInputCheckbox from "components/form/FormInputCheckbox";

const LoanInformation = ({
  control,
  setValue,
  application_fields = {},
  application,
  isCalculating,
  categories,
  applicationCardResponses,
  handleSelectChange,
  selectedRemarkIds,
  user,
  register,
  vehicleLoading,
}) => {
  const { categoryName, categoryId, uuid } = useParams();
  const dispatch = useDispatch();

  const disabled = useWatch({
    control,
    name: "disabled",
  });

  const [wayToCal, setWayToCal] = useState();
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

  const dealer_disbursed_ratio = useWatch({
    control,
    name: "dealer_disbursed_ratio",
  });

  const net_disbursement_amount = useWatch({
    control,
    name: "net_disbursement_amount",
  });

  const disbursed_based_on_package_setup = useWatch({
    control,
    name: "disbursed_based_on_package_setup",
  });

  const package_fees = useWatch({
    control,
    name: "package_fees",
  });

  const { insurancePremiumFees, isLoading: insurancePremiumFeesLoading } =
    useSelector((state) => state.insurancePremiumFees);

  const { insuranceCompanies, isLoading: insuranceCompaniesLoading } =
    useSelector((state) => state.insuranceCompanies);

  useEffect(() => {
    if (get(application_fields, "total_amount")) {
      if (!total_amount) {
        setValue("loan_amount", 0);
        setValue("vehicle_down_payment_amount", 0);
        return;
      }

      let calculatedDownPaymentAmount = 0;
      if (vehicle_down_payment_ratio || total_amount) {
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

  useEffect(() => {
    if (
      get(application_fields, "dealer_disbursed_amount") &&
      get(application_fields, "dealer_disbursed_amount") &&
      get(application_fields, "customer_disbursed_ratio") &&
      get(application_fields, "customer_disbursed_amount")
    ) {
    
      if (net_disbursement_amount && disbursed_based_on_package_setup) {
        const safePackageFees = package_fees ?? 0;
        const dealer_disbursed_amt =
          net_disbursement_amount > safePackageFees
            ? safePackageFees
            : net_disbursement_amount;
        setValue("dealer_disbursed_amount", dealer_disbursed_amt);
        setValue(
          "customer_disbursed_amount",
          (net_disbursement_amount - dealer_disbursed_amt > 0
            ? net_disbursement_amount - dealer_disbursed_amt
            : 0
          ).toFixed(2)
        );
        setValue("customer_disbursed_ratio", "");
        setValue("dealer_disbursed_ratio", "");
      }
    }
    else {
      setValue("dealer_disbursed_amount", net_disbursement_amount);
      setValue("customer_disbursed_amount", 0);
    }
  }, [
    net_disbursement_amount,
    setValue,
    disbursed_based_on_package_setup,
    package_fees,
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
        net_disbursement_amount &&
        dealer_disbursed_ratio &&
        !disbursed_based_on_package_setup
      ) {
        const calculatedDealerDisbursementAmount =
          (net_disbursement_amount * dealer_disbursed_ratio) / 100;
        setValue(
          "dealer_disbursed_amount",
          calculatedDealerDisbursementAmount.toFixed(2)
        );

        const calculateCustomerDisbursementAmount =
          net_disbursement_amount - calculatedDealerDisbursementAmount;
        setValue(
          "customer_disbursed_amount",
          calculateCustomerDisbursementAmount.toFixed(2)
        );
        setValue("customer_disbursed_ratio", 100 - dealer_disbursed_ratio);
      }
    }else {
      setValue("dealer_disbursed_amount", net_disbursement_amount);
      setValue("customer_disbursed_amount", 0);
    }
  }, [
    dealer_disbursed_ratio,
    net_disbursement_amount,
    setValue,
    disbursed_based_on_package_setup,
    application_fields,
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
            total_amount: total_amount ?? 0,
            vehicle_down_payment_ratio: vehicle_down_payment_ratio ?? 0,
            vehicle_down_payment_amount: vehicle_down_payment_amount ?? 0,
            down_payment_amount: down_payment_amount ?? 0,
            insurance_premium_fees: insurance_premium_fees ?? 0,
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
    package_fees,
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

      //bind data according to downpayment setup
      if (downPaymentObject && downPaymentObject.length > 0) {
        await setValue(
          "stamp_duty_fees",
          application.stamp_duty_fees ??
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

        setWayToCal(downPaymentObject[0]);
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

  const getRelevantDownPayment = (downpayments, sub_category_id) => {
    if (!Array.isArray(downpayments)) return [];

    const bySubCategory = downpayments.filter(
      (item) => item.sub_category_id === sub_category_id
    );

    if (bySubCategory.length > 0) return bySubCategory;

    const byCategoryOnly = downpayments.filter((item) => !item.sub_category_id);

    return byCategoryOnly;
  };

  // const calculateFee = (type, loanAmount, totalAmount) => {
  //   return type === "stamp_duty_fee_percent_on_loan_amount" || type === "processing_fee_percent_on_loan_amount" ? loanAmount : totalAmount;
  // };

  const calculateFee = (type, loanAmount, totalAmount) => {
    if (
      type === "stamp_duty_fee_percent_on_loan_amount" ||
      type === "processing_fee_percent_on_loan_amount"
    ) {
      return loanAmount;
    }

    if (type === null || type === undefined) {
      return loanAmount;
    }

    return totalAmount;
  };

  useEffect(() => {
    const downPaymentObject = getRelevantDownPayment(
      application.category?.downpayments,
      sub_category_id
    );

    const baseAmount = calculateFee(
      downPaymentObject[0]?.stamp_duty_fee,
      loan_amount,
      total_amount
    );

    if (stamp_duty_percentage !== "") {
      const fee = (+stamp_duty_percentage / 100) * baseAmount;
      const rounded = Math.round(fee / 100) * 100;
      setValue("stamp_duty_fees", Math.round(rounded));
    }
  }, [
    stamp_duty_percentage,
    loan_amount,
    stamp_duty_fee_field,
    application,
    sub_category_id,
  ]);

  const handleProcessingFeePercentage = () => {
    const downPaymentObject = getRelevantDownPayment(
      application.category?.downpayments,
      sub_category_id
    );
    const baseAmount = calculateFee(
      downPaymentObject[0]?.processing_fee,
      loan_amount,
      total_amount
    );

    if (processing_fees !== "") {
      const calculatedPercentage = (+processing_fees / baseAmount) * 100;
      setValue("processing_percentage", calculatedPercentage.toFixed(2));
    }
  };

  const handleProcessingFee = () => {
    const downPaymentObject = getRelevantDownPayment(
      application.category?.downpayments,
      sub_category_id
    );
    const baseAmount = calculateFee(
      downPaymentObject[0]?.processing_fee,
      loan_amount,
      total_amount
    );

    if (processing_percentage !== "") {
      const fee = (+processing_percentage / 100) * baseAmount;
      const rounded = Math.round(fee / 100) * 100;
      setValue("processing_fees", Math.round(rounded));
    }
  };

  const fields = [
    "loan_amount",
    "total_amount",
    "vehicle_down_payment_ratio",
    "vehicle_down_payment_amount",
    "down_payment_amount",
    "insurance_premium_fees",
    "loan_term",
    "interest_rate",
    "monthly_interest_rate",
    "stamp_duty_percentage",
    "stamp_duty_fees",
    "processing_fees",
    "processing_percentage",
    "purpose_of_loan",
    "purpose_of_loan_remark",
    "remark_of_application",
    "net_disbursement_amount",
    "loan_repayment_amount",
    "loan_drawdown",
  ];
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

  if (intersection(fields, Object.keys(application_fields)).length) {
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
              {get(application_fields, "total_amount") && (
                <Grid item xs={12}>
                  <FormInputNumber
                    control={control}
                    label="Total Amount/Vehicle Selling Price"
                    name="total_amount"
                    disabled={disabled}
                    rules={{
                      required: application_fields?.total_amount?.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "vehicle_down_payment_ratio") && (
                <Grid item xs={12}>
                  <FormInputDecimal
                    control={control}
                    label="Vehicle Down Payment Ratio %"
                    name="vehicle_down_payment_ratio"
                    disabled={disabled}
                    rules={{
                      required:
                        application_fields?.vehicle_down_payment_ratio
                          ?.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "loan_amount") && (
                <Grid item xs={12}>
                  <FormInputNumber
                    control={control}
                    label="Loan Amount"
                    name="loan_amount"
                    disabled={disabled}
                    rules={{
                      required: application_fields?.loan_amount?.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "vehicle_down_payment_amount") && (
                <Grid item xs={12}>
                  <FormInputNumber
                    control={control}
                    label="Vehicle Down Payment Amount"
                    name="vehicle_down_payment_amount"
                    disabled={disabled}
                    rules={{
                      required:
                        application_fields?.vehicle_down_payment_amount
                          ?.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}

              {get(application_fields, "insurance_premium_fees") && (
                <Grid item xs={12}>
                  {/* {
                  insurancePremiumFeesLoading ||
                  vehicleLoading ||
                  insuranceCompaniesLoading ? (
                    <Skeleton variant="rectangular" height={37.13} />
                  ) : ( */}
                  <FormInputNumber
                    control={control}
                    label="Insurance Premium Fees"
                    name="insurance_premium_fees"
                    disabled={disabled}
                    rules={{
                      required:
                        application_fields?.insurance_premium_fees?.required, // Set required dynamically
                    }}
                  />
                  {/* )} */}
                </Grid>
              )}
              {get(application_fields, "loan_term") && (
                <>
                  <Grid item xs={12}>
                    <FormInputSelect
                      control={control}
                      options={[{ id: "D" }, { id: "M" }]}
                      getOptionLabel={(option) => option?.id}
                      id="id"
                      label="Tenor/Loan Term Type"
                      name="loan_term_type"
                      disabled={disabled}
                      rules={{
                        required: application_fields?.loan_term?.required, // Set required dynamically
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormInputNumber
                      control={control}
                      label="Tenor/Loan Term Duration"
                      name="loan_term_duration"
                      disabled={disabled}
                      rules={{
                        required: application_fields.loan_term.required, // Set required dynamically
                      }}
                    />
                  </Grid>
                </>
              )}

              {get(application_fields, "interest_rate") &&
                !["CMCO", "Agent", "CMCE"].includes(user?.user_group) && ( // Add this condition to hide the input
                  <Grid item xs={12}>
                    <FormInputDecimal
                      control={control}
                      label="Interest Rate"
                      name="interest_rate"
                      {...control.register("interest_rate")}
                      rules={{
                        required: application_fields.interest_rate.required, // Set required dynamically
                      }}
                    />
                  </Grid>
                )}

              {get(application_fields, "monthly_interest_rate") &&
                !["CMCO", "Agent", "CMCE"].includes(user?.user_group) && ( // Add this condition to hide the input
                  <Grid item xs={12}>
                    <FormInputDecimal
                      control={control}
                      label="Monthly Interest Rate"
                      name="monthly_interest_rate"
                      disabled={["CMCO", "Agent", "CMCE"].includes(
                        user?.user_group
                      )}
                      rules={{
                        required:
                          application_fields.monthly_interest_rate.required, // Set required dynamically
                      }}
                    />
                  </Grid>
                )}

              {get(application_fields, "purpose_of_loan") && (
                <Grid item xs={12}>
                  <FormInputSelect
                    control={control}
                    options={PURPOSE_OF_LOAN}
                    getOptionLabel={(option) => option?.id}
                    id="id"
                    label="Purpose of Loan"
                    name="purpose_of_loan"
                    disabled={disabled}
                    rules={{
                      required: application_fields.purpose_of_loan.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}

              {get(application_fields, "purpose_of_loan_remark") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Purpose of Loan Remark"
                    name="purpose_of_loan_remark"
                    disabled={disabled}
                    rules={{
                      required:
                        application_fields.purpose_of_loan_remark.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}

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
                  disabled={disabled}
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
              {get(application_fields, "monthly_installment") && (
                <Grid item xs={12}>
                  <FormInputText
                    multiline
                    control={control}
                    label="Monthly Installment"
                    name="monthly_installment"
                    disabled
                  />
                </Grid>
              )}
              {get(application_fields, "stamp_duty_percentage") && (
                <Grid item xs={12}>
                  <FormInputDecimal
                    control={control}
                    label="Stamp Duty %"
                    name="stamp_duty_percentage"
                    disabled={disabled}
                    rules={{
                      required:
                        application_fields.stamp_duty_percentage.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}

              {get(application_fields, "stamp_duty_fees") && (
                <Grid item xs={12}>
                  <FormInputNumber
                    control={control}
                    label="Stamp Duty Fee"
                    disabled={disabled}
                    name="stamp_duty_fees"
                    rules={{
                      required: application_fields.stamp_duty_fees.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}

              {get(application_fields, "processing_percentage") && (
                <Grid item xs={12}>
                  <FormInputDecimal
                    control={control}
                    label="Processing %"
                    name="processing_percentage"
                    disabled={disabled}
                    rules={{
                      required:
                        application_fields.processing_percentage.required, // Set required dynamically
                    }}
                    onFocus={handleProcessingFeePercentage}
                  />
                </Grid>
              )}
              {get(application_fields, "processing_fees") && (
                <Grid item xs={12}>
                  <FormInputNumber
                    control={control}
                    label="Processing Fee"
                    name="processing_fees"
                    disabled={disabled}
                    rules={{
                      required: application_fields.processing_fees.required, // Set required dynamically
                    }}
                    onFocus={handleProcessingFee}
                  />
                </Grid>
              )}
              <>
                <Grid item xs={12}>
                  <FormInputNumber
                    control={control}
                    label="Prorata Interest"
                    name="prorata_interest"
                    disabled
                  />
                </Grid>
                {get(application_fields, "down_payment_amount") && (
                  <Grid item xs={12}>
                    <FormInputNumber
                      control={control}
                      label="Total Down Payment Amount"
                      name="down_payment_amount"
                      disabled={disabled}
                      rules={{
                        required:
                          application_fields?.down_payment_amount?.required, // Set required dynamically
                      }}
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <FormInputNumber
                    control={control}
                    label="Net Disbursement Amount"
                    name="net_disbursement_amount"
                    disabled
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
                        disbursed_based_on_package_setup === true || disabled
                          ? true
                          : false
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
              </>
              {/*)}*/}
            </Grid>
          </Grid>

          {get(application_fields, "remark_of_application") && (
            <Grid sx={{ mt: 3 }}>
              <Grid item xs={12}>
                <FormInputMultiSelect
                  limitTags={2}
                  name="remark_ids"
                  control={control}
                  options={applicationCardResponses ?? []}
                  label="Select Application Remark"
                  rules={{
                    required: application_fields.remark_of_application.required,
                  }}
                  onSelect={handleSelectChange}
                  id="id"
                  getOptionLabel={(option) => option?.id}
                />
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <FormInputText
                  multiline
                  control={control}
                  label="Remark Of Application"
                  name="remark_of_application"
                  disabled={disabled}
                  sx={{
                    pt: 1,
                    textarea: {
                      minHeight: "200px",
                      maxHeight: "200px",
                      overflow: "auto !important",
                    },
                  }}
                  rules={{
                    required: application_fields.remark_of_application.required, // Set required dynamically
                  }}
                />
              </Grid>
            </Grid>
          )}
        </Box>
      </Accordion>
    );
  }
  return <></>;
};

export default React.memo(LoanInformation);
