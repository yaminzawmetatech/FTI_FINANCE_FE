import * as React from "react";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid
} from "@mui/material";
import useDealerBankForm from "./DealerBankHook";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export const CreateDealerBankModal = ({
  open,
  onClose,
  editValues,
  editFlag,
  isDealerGpOpen
}) => {
  const { control, onSubmit, handleSubmit, reset, setValue } =
    useDealerBankForm();

  const [valueFields, setValueFields] = useState([
    {
      id: 1,
      name: isDealerGpOpen ? editValues?.owner_name : !isDealerGpOpen ? editValues?.name : "",
      beneficiary_id: "",
      beneficiary_name: "",
      company_name: "",
      bank_account_no: "",
      contact_no: "",
      address: "",
      email: "",
      remark: "",
      dealer_id: isDealerGpOpen ? editValues?.id : !isDealerGpOpen ? editValues?.dealer_id : "",
      dealer_contact_person_id: !isDealerGpOpen ? editValues?.id : "",
    },
  ]);

  useEffect(() => {
    if(open){
      setValueFields((prev) =>
        prev.map((field) => ({
          ...field,
          name: isDealerGpOpen ? editValues?.owner_name : !isDealerGpOpen ? editValues?.name : "",
          dealer_id: isDealerGpOpen ? editValues?.id : !isDealerGpOpen ? editValues?.dealer_id : "",
          dealer_contact_person_id: !isDealerGpOpen ? editValues?.id : "",
        }))
      );
    }
  }, [open]);

  const handleClickSubmit = (data) => {
    handleSubmit(async (data) => {
      const isSuccess = await onSubmit({ ...data, valueFields }, editFlag);
      if (isSuccess) {
        onClose(); // Close the modal if successful
      }
    })();
  };

  const handleAddValue = () => {
    const nextId =
      valueFields.length > 0
        ? Math.max(...valueFields.map((field) => field.id)) + 1
        : 1; // Generate unique integer ID
    setValueFields((prev) => [
      ...prev,
      {
        id: nextId,
        name:  isDealerGpOpen ? editValues?.owner_name : !isDealerGpOpen ? editValues?.name : "",
        beneficiary_id: "",
        beneficiary_name: "",
        company_name: "",
        bank_account_no: "",
        contact_no: "",
        address: "",
        email: "",
        remark: "",
        dealer_id: isDealerGpOpen ? editValues?.id : !isDealerGpOpen ? editValues?.dealer_id : "",
        dealer_contact_person_id: !isDealerGpOpen ? editValues?.id : "",
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

  const handleTypeChange = (id, selectedType) => {
    setValueFields((prev) =>
      prev.map((field) =>
        field.id === id ? { ...field, type: selectedType } : field
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

  return (
    <Dialog  open={open}
    maxWidth="lg"
    sx={{ "& .MuiDialog-paper": { width: "100%" } }}>
      <DialogTitle textAlign="center">
        {editFlag === true ? "Edit Dealer Bank" : "Create New Dealer Bank"}
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
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  value={field.name || ""}
                  onChange={(e) =>
                    handleFieldChange(field.id, "name", e.target.value)
                  }
                  label={<span className="required">Name</span>}
                  size="small"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  value={field.beneficiary_id || ""}
                  onChange={(e) =>
                    handleFieldChange(
                      field.id,
                      "beneficiary_id",
                      e.target.value
                    )
                  }
                  label={<span className="required">Beneficiary Id</span>}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  value={field.beneficiary_name || ""}
                  onChange={(e) =>
                    handleFieldChange(
                      field.id,
                      "beneficiary_name",
                      e.target.value
                    )
                  }
                  label={<span className="required">Beneficiary Name</span>}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  value={field.company_name || ""}
                  onChange={(e) =>
                    handleFieldChange(field.id, "company_name", e.target.value)
                  }
                  label={<span className="required">Company Name</span>}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  value={field.bank_account_no || ""}
                  onChange={(e) =>
                    handleFieldChange(
                      field.id,
                      "bank_account_no",
                      e.target.value
                    )
                  }
                  label={<span className="required">Bank Account No</span>}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  value={field.contact_no || ""}
                  onChange={(e) =>
                    handleFieldChange(field.id, "contact_no", e.target.value)
                  }
                  label="Contact No"
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
                  value={field.remark || ""}
                  onChange={(e) =>
                    handleFieldChange(field.id, "remark", e.target.value)
                  }
                  label="Remark"
                  size="small"
                />
              </Grid>
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
        <DialogActions sx={{ p: "1.25rem" }}>
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
            {editFlag === true ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </DialogContent>
      {/* <DialogContent>
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300px", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
            marginTop: "20px",
          }}
        >
          <FormInputText
            control={control}
            label={<span className="required">Beneficiary Id</span>}
            name="beneficiary_id"
            rules={{
              required: true,
            }}
          />
          <FormInputText
            control={control}
            label={<span className="required">Beneficiary Name</span>}
            name="beneficiary_name"
            rules={{
              required: true,
            }}
          />
          <FormInputText
            control={control}
            label={<span className="required">Company Name</span>}
            name="company_name"
            rules={{
              required: true,
            }}
          />
          <FormInputText
            control={control}
            label={<span className="required">Bank Account No</span>}
            name="bank_account_no"
            rules={{
              required: true,
            }}
          />
          <FormInputText
            control={control}
            label={<span className="required">Contact No</span>}
            name="contact_no"
            rules={{
              required: true,
            }}
          />
          <FormInputText
            control={control}
            label={<span className="required">Address</span>}
            name="address"
            rules={{
              required: true,
            }}
          />
          <FormInputText control={control} label="Email" name="email" />
          <FormInputText control={control} label="Remark" name="remark" />
        </Stack>
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
          }}
        >
          <FormInputCheckbox
            control={control}
            label="Is Active?"
            name="in_active"
          />
        </Stack>
       
      </DialogContent> */}
    </Dialog>
  );
};

export default CreateDealerBankModal;
