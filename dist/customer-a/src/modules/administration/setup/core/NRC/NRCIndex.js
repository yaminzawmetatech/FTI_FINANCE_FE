import * as React from "react";
import { useCallback, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { MaterialReactTable } from "material-react-table";
import {
  Breadcrumbs,
  Button,
  ListItemIcon,
  MenuItem,
  Typography,
} from "@mui/material";
import CreateNRCModal from "./CreateNRCModel";
import { Delete } from "@mui/icons-material";

const data = [
  {
    "State/Division": "1",
    Name: "Kachin",
    Description: "Kachin",
  },
  {
    "State/Division": "2",
    Name: "Kayah",
    Description: "Kayah",
  },
  {
    "State/Division": "3",
    Name: "Kayin",
    Description: "Kayin",
  },
  {
    "State/Division": "4",
    Name: "Chin",
    Description: "Chin",
  },
];

const NRCIndex = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "State/Division", //access nested data with dot notation
        header: "State/Division",
        size: 100,
      },
      {
        accessorKey: "Name",
        header: "Name",
        size: 200,
      },
      {
        accessorKey: "Description",
        header: "Description",
        size: 250,
      },
    ],
    []
  );
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState(() => data);
  const [validationErrors, setValidationErrors] = useState({});

  const handleCreateNewRow = (values) => {
    tableData.push(values);
    setTableData([...tableData]);
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      tableData[row.index] = values;
      //send/receive api updates here, then refetch or update local table data for re-render
      setTableData([...tableData]);
      exitEditingMode(); //required to exit editing mode and close modal
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    (row) => {
      if (
        !window.confirm(
          `Are you sure you want to delete ${row.getValue("firstName")}`
        )
      ) {
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
    },
    [tableData]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }} className = "margin-top-8" >
        <Typography color="text.primary">Administration</Typography>
        <Typography color="text.primary">NRC State/Division Set up</Typography>
      </Breadcrumbs>
      <Paper sx={{ width: "100%" }}>
        <MaterialReactTable
          columns={columns}
          data={data}
          muiTableContainerProps={{ sx: { maxHeight: "calc(100vh - 220px)" } }}
          enableStickyHeader
          editingMode="modal" //default
          enableColumnOrdering
          enableEditing
          enableRowActions
          enableColumnResizing
          columnResizeMode="onChange"
          onEditingRowSave={handleSaveRowEdits}
          onEditingRowCancel={handleCancelRowEdits}
          positionActionsColumn="last"
          enablePinning
          initialState={{
            columnPinning: {
              left: ["CategoryCode"],
              right: ["mrt-row-actions"],
            },
          }}
          renderRowActionMenuItems={({ row, table }) => [
            <MenuItem key="delete" onClick={() => handleDeleteRow(row)}>
              <ListItemIcon>
                <Delete />
              </ListItemIcon>
              Delete
            </MenuItem>,
          ]}
          renderTopToolbarCustomActions={({ table }) => {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "0.5rem",
                }}
              >
                <Button
                  onClick={() => setCreateModalOpen(true)}
                  variant="contained"
                >
                  Create New NRC
                </Button>
              </div>
            );
          }}
        />
        <CreateNRCModal
          columns={columns}
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSubmit={handleCreateNewRow}
        />
      </Paper>
    </Box>
  );
};

export default NRCIndex;
