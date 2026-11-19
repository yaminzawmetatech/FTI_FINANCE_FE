

import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import FormInputCheckbox from "components/form/FormInputCheckbox";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import useDealerContactPersonForm from "./DealerContactPersonHook";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const CreateDealerContactPersonModal = ({
  open,
  onClose,
  editValues,
  editFlag,
  selectedId
}) => {

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const { onSubmit, handleSubmit, reset } =
    useDealerContactPersonForm();

  const [valueFields, setValueFields] = useState([
    {
      id: 1,
      type: [],
      name: "",
      ph_no: "",
      email: "",
      nrc: "",
      address: "",
      title_position: "",
      password: "",
      dealer_id: selectedId || "",
    },
  ]);

  useEffect(() => {
    if (selectedId) {
      setValueFields((prev) =>
        prev.map((field) => ({
          ...field,
          dealer_id: selectedId,
        }))
      );
    }
  }, [selectedId]);
  
  const handleAddValue = () => {
    const nextId =
      valueFields.length > 0
        ? Math.max(...valueFields.map((field) => field.id)) + 1
        : 1; // Generate unique integer ID
    setValueFields((prev) => [
      ...prev,
      {
        id: nextId,
        type: [],
        name: "",
        ph_no: "",
        email: "",
        nrc: "",
        address: "",
        title_position: "",
        password: "",
        dealer_id: selectedId,
      },
    ]);
  };

  // Remove a specific input group by id and reassign IDs
  const handleRemoveValue = (id) => {
    setValueFields((prev) => {
      const updatedFields = prev.filter((field) => field.id !== id);
      return updatedFields.map((field, index) => ({
        ...field,
        id: index + 1, // Reassign IDs sequentially
      }));
    });
  };

  useEffect(() => {
    if (editFlag === false) {
      reset();
    }
  }, [editFlag, editValues, open, reset]);

  const handleClickSubmit = (data) => {
    handleSubmit(async (data) => {
      const transformedValueFields = valueFields.flatMap((field) =>
        field.type.length > 0
          ? field.type.map((t) => ({
              ...field,
              type: t,
            }))
          : [{ ...field, type: "" }]
      );
  
      const finalValueFields = transformedValueFields.map((field, index) => ({
        ...field,
        id: index + 1,
      }));
  
      const isSuccess = await onSubmit(
        { ...data, valueFields: finalValueFields },
        editFlag
      );
      if (isSuccess) {
        onClose(); // Close modal on success
      }
    })();
  };  

  const handleTypeChange = (id, selectedTypes) => {
    const selectedIds = selectedTypes.map((item) => item.id);
    setValueFields((prev) =>
      prev.map((field) =>
        field.id === id ? { ...field, type: selectedIds } : field
      )
    );
  };
  
  const handleFieldChange = (id, fieldName, value) => {
    setValueFields((prev) =>
      prev.map((field) =>
        field.id === id ? { ...field, [fieldName]: value } : field
      )
    );
  };

 
  const typeOptions = [
    { id: "Authorized Signer", name: "Authorized Signer" },
    { id: "Main Contact", name: "Main Contact" },
    { id: "Disbursement", name: "Disbursement" },
    {
      id: "Main Person for Credit",
      name: "Main Person for Credit",
    },
  ]

  return (
    <Dialog
      open={open}
      maxWidth="lg"
      sx={{ "& .MuiDialog-paper": { width: "100%" } }}
    >
      <DialogTitle textAlign="center">
        {editFlag
          ? "Edit Dealer Contact Person"
          : "Create New Dealer Contact Person"}
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} sx={{ marginTop: "10px" }}>
          {valueFields.map((field, index) => (
            <Grid
              container
              key={field.id}
              spacing={2}
              alignItems="center"
              sx={{ marginBottom: "7px" }}
            >
              <Grid item xs={12} sm={6} md={4}>                
                <Autocomplete
                  multiple
                  options={typeOptions}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.name}
                  value={typeOptions.filter((option) => field.type.includes(option.id))}
                  onChange={(e, selectedOptions) => handleTypeChange(field.id, selectedOptions)}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.name}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={<span className="required">Type</span>}
                      size="small"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  value={field.name || ""}
                  onChange={(e) =>
                    handleFieldChange(field.id, "name", e.target.value)
                  }
                  label={<span className="required">Name</span>}
                  size="small"
                  rules={{
                    required: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  value={field.ph_no || ""}
                  onChange={(e) =>
                    handleFieldChange(field.id, "ph_no", e.target.value)
                  }
                  label={<span className="required">Ph No</span>}
                  size="small"
                  rules={{
                    required: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  value={field.email || ""}
                  onChange={(e) =>
                    handleFieldChange(field.id, "email", e.target.value)
                  }
                  label="Email"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  value={field.nrc || ""}
                  onChange={(e) =>
                    handleFieldChange(field.id, "nrc", e.target.value)
                  }
                  label="NRC"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  value={field.address || ""}
                  onChange={(e) =>
                    handleFieldChange(field.id, "address", e.target.value)
                  }
                  label="Address"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  value={field.title_position || ""}
                  onChange={(e) =>
                    handleFieldChange(
                      field.id,
                      "title_position",
                      e.target.value
                    )
                  }
                  label="Title Position"
                  size="small"
                />
              </Grid>
              {field.type === "Agent" && (
                <Grid item xs={12} sm={6} md={2}>
                  <TextField
                    value={field.password || ""}
                    onChange={(e) =>
                      handleFieldChange(field.id, "password", e.target.value)
                    }
                    label={<span className="required">Password</span>}
                    size="small"
                  />
                </Grid>
              )}

              <Grid item xs={12} sm={6} md={1}>
                <Button
                  variant="outlined"
                  onClick={() => handleRemoveValue(field.id)}
                  sx={{
                    color: "red",
                    borderColor: "red",
                    "&:hover": { backgroundColor: "rgba(255, 0, 0, 0.04)" },
                  }}
                  fullWidth
                >
                  <DeleteOutlineIcon />
                </Button>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={2} sx={{ marginTop: "3px" }}>
          <Button variant="outlined" onClick={handleAddValue} sx={{ mt: 2 }}>
            <AddIcon /> Add New
          </Button>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            reset();
            onClose();
          }}
          variant="outlined"
          color="error"
        >
          Cancel
        </Button>
        <Button type="submit" onClick={handleClickSubmit} variant="contained">
          {editFlag ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateDealerContactPersonModal;
