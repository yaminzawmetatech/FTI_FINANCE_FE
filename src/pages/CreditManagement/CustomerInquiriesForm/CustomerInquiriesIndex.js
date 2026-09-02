import * as React from "react";
import { Box, Paper, Breadcrumbs, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo, useEffect, useState } from "react";
import AdvancedSearch from "components/form/AdvancedSearch";
import Table from "components/Table";
import { useSearchParams } from "react-router-dom";
import DealerGroupTableRowMenu from "./CustomerInquiriesTableRowMenu";
import DealerGroupAppBar from "./CustomerInquiriesAppBar";
import { DEALER_GROUP_SEARCH_OPTIONS } from "constants/searchOptions/dealerGroupSearchOptions";
import dayjs from "dayjs";
import { getCustomerInquiries } from "features/customerInquiriesForm/customerInquiriesFormSlice";
import { getAddressStates } from "features/address/State/addressStateSlice";
import { getUserByUuid } from "features/users/usersSlice";
import { YesNoRenderer } from "common/YesNoRenderer";
import { CUSTOMER_INQUIRIES_SEARCH_OPTIONS } from "constants/searchOptions/customerInquiriesSearchOptions";
import useCustomerInquiriesForm from "./CustomerInquiriesHook";

const CustomerInquiriesIndex = () => {
  const dispatch = useDispatch();

  const [params, setParams] = useSearchParams();

  const { customerInquiries, isLoading, next_page_param } = useSelector(
    (state) => state.customerInquiries
  );

  const auth = useSelector((state) => state.auth.user);

  const { user } = useSelector((state) => state.user);
 
  useEffect(() => {
    dispatch(getAddressStates());
    dispatch(getUserByUuid());
  }, [dispatch]);

  const columnDefs = useMemo(
    () => [
      {
        headerName: "No.",
        width: 50,
        valueGetter: "node.rowIndex + 1",
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "name",
        headerName: "Name",
        width: 200,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "ph_no",
        headerName: "Ph No",
        width: 100,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        headerName: "",
        field: "menu",
        width: 50,
        lockPosition: "left",
        pinned: "left",
        cellRenderer: DealerGroupTableRowMenu,
        cellRendererParams: {},
        lockPinned: true,
      },
      {
        field: "action",
        headerName: "Action Taken?",
        width: 100,
        sortable: true,
        resizable: true,
        cellRenderer: YesNoRenderer
      },
      {
        field: "state.name",
        headerName: "State",
        width: 100,
        resizable: true,
      },
      {
        field: "dealer.district.name",
        headerName: "District",
        width: 100,
        resizable: true,
      },
      {
        field: "dealer.township.name",
        headerName: "Township",
        width: 100,
        resizable: true,
      },
      {
        field: "dealer.name",
        headerName: "Dealer",
        width: 200,
        resizable: true,
      },
      {
        field: "product_name",
        headerName: "Product Name",
        width: 200,
        resizable: true,
      },
      {
        field: "inquiry_datetime",
        headerName: "Inquiry Date",
        width: 200,
        sortable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
        resizable: true,
      },
      {
        field: "remark",
        headerName: "CMCO Remark",
        width: 200,
        resizable: true,
      },
      {
        field: "pdsd_remark",
        headerName: "PDSD Remark",
        width: 200,
        resizable: true,
      },
      {
        field: "created_at",
        headerName: "Created Date",
        width: 200,
        sortable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
        resizable: true,
      },
      {
        field: "created_user.user_name",
        headerName: "Created By",
        width: 200,
        resizable: true,
      },
      {
        field: "updated_at",
        headerName: "Modified Date",
        width: 200,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
      },
      {
        field: "modified_user.user_name",
        headerName: "Modified By",
        width: 200,
        resizable: true,
      },
    ],
    []
  );

  useEffect(() => {
    fetchApi();
  }, [user]);

  const fetchApi = useCallback(() => {
    if( auth.user_group === 'CMCO' || auth.user_group === 'CMCE'){
      dispatch(
        getCustomerInquiries({
          firstFetch: true,
          params: {
            created_by: user.id
          }
        })
      );
    }else{
      dispatch(
        getCustomerInquiries({
          firstFetch: true,
        })
      );
    }
  
  }, [dispatch,auth,user]);

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_param) {
        dispatch(
          getCustomerInquiries({
            params: next_page_param,
            firstFetch: false,
          })
        );
      }
    },
    [dispatch, next_page_param]
  );

  const handleSearch = (searchData) => {
    const transformedSearchData = {};

    searchData.forEach((item) => {
      if (item.type === "date" || item.type === "date_time") {
        transformedSearchData[`${item.filtered_by}_from_date`] = item.value1;
        transformedSearchData[`${item.filtered_by}_to_date`] = item.value2;
      } else if (item.type === "autocomplete_status") {
        transformedSearchData[item.filtered_by] = JSON.stringify(item.value1);
      } else {
        transformedSearchData[item.filtered_by] = item.value1;
      }
    });


    if( auth.user_group === 'CMCO' || auth.user_group === 'CMCE'){
      dispatch(
        getCustomerInquiries({
          params: {
            created_by: user.id,
            ...transformedSearchData
          }
        })
      );
    }else{
      dispatch(
        getCustomerInquiries({
          params: {
            ...transformedSearchData,
          },
        })
      );
    }
  };

  const getRowStyle = (params) => {
    const status = params?.data?.in_active;
    return status === 0 ? {background: "rgba(128, 128, 128, 0.1)"} : { };
  };

  const defaultColDef = useMemo(
    () => ({
      valueSetter: (params) => {},
    }),
    []
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ mb: 1 }}
        className="margin-top-8"
      >
        <Typography color="text.primary">Customer Inquiry Form</Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={CUSTOMER_INQUIRIES_SEARCH_OPTIONS}
        onSearch={handleSearch}
      />
      <DealerGroupAppBar ids={customerInquiries?.map((item) => item.id)} />
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={customerInquiries ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="CustomerInquiryTable"
          rowKey="id"
          agThemeStyle={{
            height: "calc(100vh - 170px)",
          }}
          onScrollBottomEnd={handleBodyScroll}
          loading={isLoading}
          getRowStyle={getRowStyle}
        />
      </Paper>
    </Box>
  );
};

export default CustomerInquiriesIndex;
