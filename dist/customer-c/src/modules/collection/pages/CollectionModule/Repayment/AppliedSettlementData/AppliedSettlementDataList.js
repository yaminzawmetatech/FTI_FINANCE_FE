import React from "react";
import { useCallback, useMemo } from "react";
import {useParams, useSearchParams} from "react-router-dom";
import Table from "components/Table";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { Box, } from "@mui/material";
import Accordion from "components/Accordion";
import { getAppliedSettlementData, getAppliedSettlementInsufficientData } from "modules/collection/slices/appliedSettlementSlice";
import AppliedSettementDataExportButton from "./AppliedSettlementDataExportButton";

const AppliedSettlementDataTable = ({appliedSettlementData,next_page_param,isLoading}) => {
  const dispatch = useDispatch();
    const {uuid, mode} = useParams();

    const [params, setParams] = useSearchParams();

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_param) {
        // dispatch(
        //   getAppliedSettlementData({
        //     params: next_page_param,
        //       uuid,
        //     firstFetch: false,
        //   })
        // );
        if(!mode){
          dispatch(
            getAppliedSettlementData({
              uuid,
              params: next_page_param,
              firstFetch: false,
            })
          );
        }else if(mode === "et"){
          dispatch(
            getAppliedSettlementData({
              uuid,
              params : {...next_page_param,is_et: true},
              firstFetch: false,
            })
          );
        }else if(mode === "insufficient-payments"){
          dispatch(
            getAppliedSettlementInsufficientData({
              uuid,
              params: next_page_param,
              firstFetch: true,
            })
          );
        }
      }
    },
    [dispatch, next_page_param]
  );

  const defaultColDef = useMemo(
    () => ({
      valueSetter: (params) => {},
    }),
    []
  );

    const getRowStyle = (params) => {
        const isPosted = params.data.is_posted;
        // const isPosted = params.data.is_posted;
        return !isPosted ? {} : {background: "rgb(194, 237, 211)"};
    };

  const columnDefs = useMemo(
    () => [
      {
        field: "journal_template_name",
        headerName: "Journal Template Name",
        width: 100,
        sortable: false,
        resizable: true,
      },
      {
        field: "journal_batch_name",
        headerName: "Journal Batch Name",
        width: 100,
        sortable: false,
        resizable: true,
      },
      {
        field: "line_no",
        headerName: "Line No",
        width: 100,
        sortable: false,
        resizable: true,
      },
      {
        field: "posting_date",
        headerName: "Posting Date",
        width: 100,
        sortable: false,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        resizable: true,
      },
      {
        field: "document_date",
        headerName: "Document Date",
        width: 100,
        sortable: false,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        resizable: true,
      },
      {
        field: "document_type",
        headerName: "Document Type",
        width: 100,
        sortable: false,
        resizable: true,
      },
      {
        field: "document_no",
        headerName: "Document No",
        width: 100,
        sortable: false,
        resizable: true,
      },
      {
        field: "external_document_no",
        headerName: "External Document No",
        width: 100,
        sortable: false,
        resizable: true,
      },
      {
        field: "account_type",
        headerName: "Account Type",
        width: 100,
        sortable: false,
        resizable: true,
      },
      {
        field: "account_no",
        headerName: "Account No",
        width: 100,
        resizable: true,
      },
      {
        field: "description",
        headerName: "Description",
        width: 200,
        resizable: true,
      },
      {
        field: "amount",
        headerName: "Amount",
        width: 100,
        sortable: false,
        resizable: true,
      },
      {
        field: "amount_lcy",
        headerName: "Amount_LCY",
        width: 100,
        sortable: false,
        resizable: true,
      },
      {
        field: "debit_amount",
        headerName: "Debit Amount",
        width: 100,
        sortable: false,
        resizable: true,
      },
      {
        field: "credit_amount",
        headerName: "Credit Amount",
        width: 100,
        sortable: false,
        resizable: true,
      }
    ],
    []
  );

  return (
    <Accordion title="Applied Settlement Data">
      <AppliedSettementDataExportButton 
        appliedSettlementData={appliedSettlementData}
      />
    <Box sx={{mt: 1}}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={appliedSettlementData ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="AppliedSettlementData"
          rowKey="id"
          agThemeStyle={{
            height: "calc(100vh - 280px)",
          }}
          onScrollBottomEnd={handleBodyScroll}
          loading={isLoading}
          getRowStyle={getRowStyle}
        />
    </Box>
    </Accordion>
    
  );
};

export default React.memo(AppliedSettlementDataTable);




