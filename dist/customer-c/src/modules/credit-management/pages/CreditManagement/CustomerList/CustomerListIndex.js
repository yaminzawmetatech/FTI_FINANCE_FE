import * as React from "react";
import { useMemo, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { MaterialReactTable } from "material-react-table";
import { useSelector, useDispatch } from "react-redux";
import {
  Breadcrumbs,
  Button,
  ListItemIcon,
  MenuItem,
  Typography,
} from "@mui/material";
import openNewWindow from "utils/windowUtils";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Link } from "react-router-dom";
import { getAllAssessment } from "modules/credit-management/slices/assessmentSlice";
import dayjs from "dayjs";
import { getAllCustomers } from "modules/credit-management/slices/customerListSlice";

const CustomerList = () => {
  const dispatch = useDispatch();

  const columns = useMemo(
    () => [
      {
        accessorKey: "application_id",
        header: "Application ID",
        size: 200,
      },
      {
        accessorKey: "conduct_at",
        header: "Conduct Date",
        size: 200,
        Cell: ({ cell }) => {
          const row = cell.getValue();
          return dayjs(row).format("YYYY-MM-DD hh:mm:ss A")
        },
      },
      {
        accessorKey: "remark",
        header: "Remark",
        size: 200,
      },
      {
        accessorKey: "investigation_result",
        header: "Investigation Result",
        size: 200,
      },
      {
        accessorKey: "assessment_type",
        header: "Assessment Type",
        size: 200,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 200,
      },
      {
        accessorKey: "approved_user.user_name",
        header: "Approved by",
        size: 200,
      },
      {
        accessorKey: "created_user.user_name",
        header: "Created By",
        size: 200,
      },
      {
        accessorKey: "created_at",
        header: "Created Date",
        size: 200,
        Cell: ({ cell }) => {
          const row = cell.getValue();
          return dayjs(row).format("YYYY-MM-DD hh:mm:ss A")
        },
      },
      {
        accessorKey: "modified_user.user_name",
        header: "Modified By",
        size: 200,
      },
      {
        accessorKey: "updated_at",
        header: "Modified Date",
        size: 200,
        Cell: ({ cell }) => {
          const row = cell.getValue();
          return dayjs(row).format("YYYY-MM-DD hh:mm:ss A")
        },
      },
    ],
    []
  );

  const { assessment, isLoading } = useSelector(
    (state) => state.assessments.assessmentDetail
  );

  useEffect(() => {
    dispatch(getAllAssessment());
    dispatch(getAllCustomers());
  }, [dispatch]);

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }} className = "margin-top-8" >
        <Typography color="text.primary">Administration</Typography>
        <Typography color="text.primary">
          Customer List
        </Typography>
      </Breadcrumbs>
      <Paper sx={{ width: "100%" }}>
        <MaterialReactTable
          columns={columns}
          data={assessment? assessment : []}
          muiTableContainerProps={{ sx: { maxHeight: "calc(100vh - 220px)" } }}
          muiTableBodyCellEditTextFieldProps={{
            variant: "outlined",
          }}
          enableStickyHeader
          enableColumnOrdering
          enableRowActions
          enableColumnResizing
          columnResizeMode="onChange"
          positionActionsColumn="last"
          enablePinning
          state={{ isLoading: isLoading }} //pass our managed row selection state to the table to use
          initialState={{
            columnPinning: {
              left: ["SubCategory Code"],
              right: ["mrt-row-actions"],
            },
          }}
          renderRowActionMenuItems={({ row, table }) => [
            <MenuItem
            onClick={() => {
              openNewWindow(
                `/CreditManagement/CustomerList/${row.original.id}`
              );
            }}
            component={Link}
            key="view"
          >
            <ListItemIcon>
              <VisibilityOutlinedIcon />
            </ListItemIcon>
            View
          </MenuItem>
          ]}
        />
      </Paper>
    </Box>
  );
};

export default CustomerList;
