import React, { useEffect, useCallback } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
} from "@mui/material";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { useDispatch, useSelector } from "react-redux";
import FormInputSelect from "components/form/FormInputSelect";
import { useForm } from "react-hook-form";

// Assuming these are correct paths from your project structure
import { getAllUsers } from "features/users/usersSlice";
import { lockCollateral } from "features/collateral/collateralSlice";

const AssignUserModal = ({ open, onClose, selectedRow, fetchApi }) => {
    console.log("AssignUserModal", selectedRow);
    const dispatch = useDispatch();

    const { control, handleSubmit, reset } = useForm({});

    // Retrieve users from Redux store
    const { users } = useSelector((state) => state.users);

    useEffect(() => {
        if (open) {
            // Fetch users when the modal is opened
            dispatch(getAllUsers(["CMCE", "CMCO"]));
            // Reset the form to its default state
            reset();
        }
    }, [open, reset, dispatch]);

    // The onSubmit function now correctly receives the form data directly.
    // It is an async function to handle the Redux dispatch.
    const onSubmit = useCallback(
        async (data) => {

            // Find the full user object from the Redux state using the selected ID
            const cmco = users?.find((item) => item.id === data.locked_user_uuid);
            const collateral_id = Array.isArray(selectedRow) && selectedRow.length > 0
                ? selectedRow[0].id
                : selectedRow.id;


            try {
                await dispatch(
                    lockCollateral({
                        data: {
                            collateral_id: collateral_id,
                            locked_user_uuid: cmco.uuid,
                            is_locked: 1,
                        },
                    })
                ).unwrap();

                // If the API call is successful, show a success toast and update the data
                showSuccessToast(CommonMessage.MFS00014);
                fetchApi();
                onClose(); // Close the modal after a successful operation

            } catch (error) {
                console.error("Failed to lock collateral:", error);
                // You might want to show an error message to the user here
            }
        },
        // Dependencies for useCallback to prevent unnecessary re-renders
        [selectedRow, users, dispatch, fetchApi, onClose]
    );

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle textAlign="center">Assign User</DialogTitle>
            <DialogContent>
                <Stack
                    sx={{
                        width: "100%",
                        minWidth: { xs: "300px", sm: "360px", md: "400px" },
                        gap: "1.5rem",
                        mt: 1,
                        marginTop: "30px",
                    }}
                >
                    <FormInputSelect
                        control={control}
                        options={users ?? []}
                        getOptionLabel={(option) => option?.user_name || ""}
                        id="id"
                        name="locked_user_uuid"
                        label={<span className="required">CMCE</span>}
                        rules={{
                            required: true,
                        }}
                    />
                </Stack>
            </DialogContent>
            <DialogActions sx={{ p: "1.25rem" }}>
                <Button onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    type="submit"
                    // The correct way to call handleSubmit is to pass the onSubmit function reference
                    // Do NOT call it immediately with ()
                    onClick={handleSubmit(onSubmit)}
                    variant="contained"
                >
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AssignUserModal;