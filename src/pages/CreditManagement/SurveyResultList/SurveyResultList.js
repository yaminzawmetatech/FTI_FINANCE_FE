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
import { getSurveyResult } from "features/surveryResult/surveyResultSlice";

const SurveyResultList = () => {
  const dispatch = useDispatch();

  const columns = useMemo(
    () => [
      {
        accessorKey: "generated_application_id",
        header: "Application ID",
        size: 200,
      },
      {
        accessorKey: "survey_type",
        header: "Survey Type",
        size: 200,
      },
      {
        accessorKey: "investigation_status",
        header: "Investigation Status",
        size: 200,
      },
      {
        accessorKey: "cmco_id",
        header: "CMCO ID",
        size: 200,
      },
      {
        accessorKey: "cmco_name",
        header: "CMCO Name",
        size: 200,
      },
      {
        accessorKey: "ihco_id",
        header: "IHCO ID",
        size: 200,
      },
      {
        accessorKey: "ihco_name",
        header: "IHCO Name",
        size: 200,
      },
      {
        accessorKey: "created_by",
        header: "Created By",
        size: 200,
      },
      {
        accessorKey: "created_at",
        header: "Created Date",
        size: 200,
      },
      {
        accessorKey: "start_time",
        header: "Conduct Datetime",
        size: 200,
      },
      {
        accessorKey: "skip_time",
        header: "Skipped Datetime",
        size: 200,
      },
      {
        accessorKey: "end_time",
        header: "Complete Datetime",
        size: 200,
      },
      {
        accessorKey: "modified_by",
        header: "Modified By",
        size: 200,
      },
      {
        accessorKey: "last_modified",
        header: "Modified Date",
        size: 200,
      },
    ],
    []
  );

  const { surveyResult, isLoading, isError } = useSelector(
    (state) => state.surveyResult
  );

  useEffect(() => {
    dispatch(getSurveyResult());
  }, [dispatch]);

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }} className = "margin-top-8" >
        <Typography color="text.primary">Administration</Typography>
        <Typography color="text.primary">
          Survey Result List
        </Typography>
      </Breadcrumbs>
      <Paper sx={{ width: "100%" }}>
        <MaterialReactTable
          columns={columns}
          data={surveyResult ?? []}
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
                `/CreditManagement/SurveyResultList/inhouse_survey/${row.original.application_id}`
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

export default SurveyResultList;
