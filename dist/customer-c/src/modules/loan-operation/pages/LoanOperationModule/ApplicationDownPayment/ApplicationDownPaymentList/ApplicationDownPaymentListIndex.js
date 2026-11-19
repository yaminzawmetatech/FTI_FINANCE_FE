import React, { useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Helmet } from "react-helmet";
import DownPaymentListTable from "./DownPaymentListTable";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import DownPaymentListToolbar from "./DownPaymentListToolbar";
import { getApplicationDownPayments } from "modules/loan-operation/slices/applicationDownPaymentSlice";
import { getInitialPaymentCalculation } from "modules/loan-operation/slices/initialPaymentCalSlice";

const ApplicationDownPaymentListIndex = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const [selectedDP, setSelectedDP] = useState([]);

  const { applicationDownPayments, next_page_url, isLoading } = useSelector(
    (state) => state.applicationDownPayments
  );


  const { initialPaymentCalculations, isLoading: initialPaymentCalLoading, isCalculating } = useSelector(
    (state) => state.initialPaymentCalculations
  );

  const fetchApi = useCallback(async() => {
    await dispatch(
      getApplicationDownPayments({
        params: {
          ...Object.fromEntries(params),
          application_id: id,
        },
      })
    );
    await dispatch(getInitialPaymentCalculation({
      params: {
        application_id: id,
      },
    }));
  }, [id, dispatch, params]);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  const onSelect = useCallback((rows) => {

    setSelectedDP(rows);
  }, [applicationDownPayments]);

  return (
    <>
      <Helmet>
        <title>View - Application DownPayment List</title>
      </Helmet>
      <DownPaymentListToolbar
        selectedDP={selectedDP}
        initialPaymentCalculations={initialPaymentCalculations}
        applicationDownPayments={applicationDownPayments}
      />
      <Box
        sx={{
          px: 1,
          pb: 1,
        }}
      >
        <DownPaymentListTable onSelect={onSelect} />
      </Box>
    </>
  );
};

export default React.memo(ApplicationDownPaymentListIndex);
