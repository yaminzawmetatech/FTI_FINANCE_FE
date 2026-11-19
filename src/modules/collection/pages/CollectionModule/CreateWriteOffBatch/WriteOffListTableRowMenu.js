import * as React from "react";
import { useState, useEffect } from "react";
import {
  IconButton,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import { useForm } from "react-hook-form";
import TableRowMenu from "components/TableRowMenu";
import FormInputText from "components/form/FormInputText"; // Adjust import path
import openNewWindow from "utils/windowUtils";
import FormInputCheckbox from "components/form/FormInputCheckbox";
import { getWriteOffContractByUuid, updateWriteOffContract } from "modules/collection/slices/writeOffContractSlice";
import { showSuccessToast } from "common/ToastMessage";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { add } from "lodash";

const WriteOffListTableRowMenu = ({ data, writeOffBatchs }) => {
  console.log(writeOffBatchs, "write")
  const dispatch = useDispatch();
  const { uuid, mode } = useParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const open = Boolean(anchorEl);

  const auth = useSelector((state) => state.auth.user);
  console.log(auth)
  const { writeOffContract } = useSelector((state) => state.writeOffContract); // Assuming you have a slice for writeOffContract

  useEffect(() => {

    if (openModal) {
      dispatch(getWriteOffContractByUuid(data.uuid));
    }
  }, [openModal, data, dispatch]);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);
  const handleOpenModal = () => {
    handleClose();
    setOpenModal(true);
  };
  const handleCloseModal = () => setOpenModal(false);



  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      check_one: false,
      check_two: false,
      check_three: false,
      check_four: false,
      check_five: false,
      remark: "",
      remark_one: "",
      remark_two: "",
      remark_three: "",
      remark_four: "",
      remark_five: "",
      taking_legal_action: false,
      reason: "",
      area_of_court: "",
      lawyer_name: "",
      budget_of_legal_action: "",
      plan_date_legal_action: "",
      address: "",
    },
  });

  useEffect(() => {
    if (writeOffContract) {
      reset({
        check_one: writeOffContract.check_one || false,
        check_two: writeOffContract.check_two || false,
        check_three: writeOffContract.check_three || false,
        check_four: writeOffContract.check_four || false,
        check_five: writeOffContract.check_five || false,
        remark: writeOffContract.remark || "",
        remark_one: writeOffContract.remark_one || "",
        remark_two: writeOffContract.remark_two || "",
        remark_three: writeOffContract.remark_three || "",
        remark_four: writeOffContract.remark_four || "",
        remark_five: writeOffContract.remark_five || "",
        taking_legal_action: writeOffContract.taking_legal_action || false,
        reason: writeOffContract.reason || "",
        area_of_court: writeOffContract.area_of_court || "",
        lawyer_name: writeOffContract.lawyer_name || "",
        budget_of_legal_action: writeOffContract.budget_of_legal_action || "",
        plan_date_legal_action: writeOffContract.plan_date_legal_action || "",
        address: writeOffContract.address || "",
      });
    }
  }, [writeOffContract, reset]);



  const onSubmit = async (formData) => {
    try {
      await dispatch(updateWriteOffContract({ body: formData, id: data?.id })).unwrap();
      showSuccessToast("Write Off Contract updated successfully.");
      await dispatch(getWriteOffContractByUuid(data?.uuid)).unwrap();
    } catch (error) {
      console.error("Error saving data:", error);
      // Optionally show an error toast
      // showErrorToast("Failed to update Write Off Contract.");
    } finally {
      handleCloseModal();
      setOpenModal(false);
      reset();
    }
  };



  return (
    <>
      <IconButton
        size="small"
        onClick={handleClick}
        sx={{ "& .MuiSvgIcon-root": { fontSize: "1rem" } }}
      >
        <MoreVert />
      </IconButton>

      <TableRowMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {/* <MenuItem
          onClick={() => {
            handleClose();
            openNewWindow(`/contracts/${data.uuid}/view`);
          }}
          disableRipple
        >
          <VisibilityOutlinedIcon sx={{ mr: 1 }} />
          View Contract
        </MenuItem> */}

        <MenuItem onClick={handleOpenModal} disableRipple>
          <EditIcon sx={{ mr: 1 }} />
          Write (Check & Remark)
        </MenuItem>
      </TableRowMenu>

      <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="sm">
        <DialogTitle>Check & Remarks</DialogTitle>
        <DialogContent dividers>
          <form id="check-remark-form" onSubmit={handleSubmit(onSubmit)}>
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
                  <FormInputCheckbox
                    control={control}
                    label="Legal Warning Letter Sent"
                    name="check_one"
                    disabled={
                      mode === "view" ||
                      (writeOffBatchs?.status === "approved" && auth?.user_group !== "administrator")
                    }


                  />
                </Grid>

                <Grid item xs={12}>
                  <FormInputCheckbox
                    control={control}
                    label="Internal Warning Sent"
                    name="check_two"
                    disabled={
                      mode === "view" ||
                      (writeOffBatchs?.status === "approved" && auth?.user_group !== "administrator")
                    }

                  />
                </Grid>

                <Grid item xs={12}>
                  <FormInputCheckbox
                    control={control}
                    label="Customer Visit After Warning Letter"
                    name="check_three"
                    disabled={
                      mode === "view" ||
                      (writeOffBatchs?.status === "approved" && auth?.user_group !== "administrator")
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    name="remark"
                    label="Remark"
                    multiline
                    disabled={
                      mode === "view" ||
                      (writeOffBatchs?.status === "approved" && auth?.user_group !== "administrator")
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    name="remark_one"
                    label="Remark - Legal Warning Letter Sent"
                    multiline
                    disabled={
                      mode === "view" ||
                      (writeOffBatchs?.status === "approved" && auth?.user_group !== "administrator")
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    name="remark_two"
                    label="Remark - Internal Warning Sent"
                    multiline
                    disabled={
                      mode === "view" ||
                      (writeOffBatchs?.status === "approved" && auth?.user_group !== "administrator")
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    name="remark_three"
                    label="Remark - Customer Visit After Warning Letter"
                    multiline
                    disabled={
                      mode === "view" ||
                      (writeOffBatchs?.status === "approved" && auth?.user_group !== "administrator")
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    name="remark_four"
                    label="Remark - No Payment After 7 Days of Legal Letter"
                    multiline
                    disabled={
                      mode === "view" ||
                      (writeOffBatchs?.status === "approved" && auth?.user_group !== "administrator")
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    name="remark_five"
                    label="Remark - Repossession Failed"
                    multiline
                    disabled={
                      mode === "view" ||
                      (writeOffBatchs?.status === "approved" && auth?.user_group !== "administrator")
                    }
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
                <Grid item xs={12}>
                  <FormInputCheckbox
                    control={control}
                    label="No Payment After 7 Days of Legal Letter"
                    name="check_four"
                    disabled={
                      mode === "view" ||
                      (writeOffBatchs?.status === "approved" && auth?.user_group !== "administrator")
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputCheckbox
                    control={control}
                    label="Repossession Failed"
                    name="check_five"
                    disabled={
                      mode === "view" ||
                      (writeOffBatchs?.status === "approved" && auth?.user_group !== "administrator")
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputCheckbox
                    control={control}
                    label="Taking Legal Action"
                    name="taking_legal_action"
                    disabled={
                      mode === "view" ||
                      (writeOffBatchs?.status === "approved" && auth?.user_group !== "administrator")
                    }
                  />
                </Grid>


                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    name="reason"
                    label="Reason"
                    multiline
                    disabled={
                      mode === "view" ||
                      (writeOffBatchs?.status === "approved" && auth?.user_group !== "administrator")
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    name="area_of_court"
                    label="Area of Court"
                    multiline
                    disabled={
                      mode === "view" ||
                      (writeOffBatchs?.status === "approved" && auth?.user_group !== "administrator")
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    name="lawyer_name"
                    label="Lawyer Name"
                    multiline
                    disabled={
                      mode === "view" ||
                      (writeOffBatchs?.status === "approved" && auth?.user_group !== "administrator")
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    name="budget_of_legal_action"
                    label="Budget of Legal Action"
                    multiline
                    disabled={
                      mode === "view" ||
                      (writeOffBatchs?.status === "approved" && auth?.user_group !== "administrator")
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    name="plan_date_legal_action"
                    label="Plan Date Legal Action"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    disabled={
                      mode === "view" ||
                      (writeOffBatchs?.status === "approved" && auth?.user_group !== "administrator")
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    name="address"
                    label="Address"
                    multiline
                    disabled={
                      mode === "view" ||
                      (writeOffBatchs?.status === "approved" && auth?.user_group !== "administrator")
                    }
                  />
                </Grid>

              </Grid>
            </Grid>
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          {
            mode !== "view" && (
              <Button type="submit" form="check-remark-form" variant="contained">
                Submit
              </Button>
            )
          }
        </DialogActions>

      </Dialog>
    </>
  );
};

export default React.memo(WriteOffListTableRowMenu);
