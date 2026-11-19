import * as React from "react";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import FormInputText from "components/form/FormInputText";
import { useWatch } from "react-hook-form";

export const CreateEditEmailSetupModel = ({
  open,
  onClose,
  columns,
  editValues,
  editFlag,
  control,
  handleSubmit,
  onSubmit,
  reset,
  setEditValues,
}) => {

  const [pwdBox, setPwdBox] = useState(false);

  const handlePwdBox = () => {
    setPwdBox(!pwdBox);
  };

  useEffect(() => {
    if (editFlag === false) {
      reset();
      setPwdBox(false);
    }
  }, [editFlag, editValues, open]);

  const password = useWatch({
    control,
    name: "password",
  });

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {editFlag === true ? "Edit Email Setup" : "Create New Email Setup"}
      </DialogTitle>
      <DialogContent>
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300px", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
            marginBottom: "20px",
          }}
        >
          <FormInputText
            control={control}
            label={<span className="required">User Name</span>}
            name="user_name"
            rules={{
              required: true,
              minLength: {
                value: 3,
                message: "User Name must have at least 3 characters",
              },
              maxLength: {
                value: 255,
                message: "User Name must have at most 255 characters",
              },
            }}
          />
        </Stack>
        {!editFlag && (
          <>
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
                type="password"
                control={control}
                label={<span className="required">Password</span>}
                name="password"
                rules={{
                  required: true,
                  minLength: {
                    value: 8,
                    message: "Password must have at least 8 characters",
                  },
                }}
              />
            </Stack>
            <Stack
              sx={{
                width: "100%",
                minWidth: { xs: "300px", sm: "360px", md: "400px" },
                gap: "1.5rem",
                mt: 1,
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <FormInputText
                type="password"
                control={control}
                label={<span className="required">Confirm Password</span>}
                name="password_confirmation"
                rules={{
                  required: true,
                  validate: (value) =>
                    value === password || "The passwords do not match",
                }}
              />
            </Stack>
          </>
        )}
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300px", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
          }}
        >
          {columns.map(
            (column) =>
              column.accessorKey !== "user_name" && (
                <FormInputText
                  control={control}
                  label={<span className="required">{`${column.header}`}</span>}
                  name={column.accessorKey}
                  rules={{
                    required: true,
                    minLength:
                      column.accessorKey === "mail_from_name"
                        ? {
                            value: 3,
                            message:
                              "Mail From Name must have at least 3 characters",
                          }
                        : false,
                    maxLength:
                      column.accessorKey === "mail_from_name"
                        ? {
                            value: 255,
                            message:
                              "Mail From Name must have at most 255 characters",
                          }
                        : false,
                  }}
                />
              )
          )}
           {editFlag && (
          <FormControlLabel
            control={<Switch checked={pwdBox} onChange={handlePwdBox} />}
            label={
              <Typography sx={{ marginRight: 1 }}>Change Password</Typography>
            }
          />
        )}
         {(pwdBox) && (
          <>
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
                type="password"
                control={control}
                label={<span className="required">Old Password</span>}
                name="old_password"
                rules={{
                  required: true,
                }}
              />
            </Stack>
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
                type="password"
                control={control}
                label={<span className="required">New Password</span>}
                name="password"
                rules={{
                  required: true,
                  minLength: {
                    value: 8,
                    message: "Password must have at least 8 characters",
                  },
                }}
              />
            </Stack>
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
                type="password"
                control={control}
                label={<span className="required">Confirm Password</span>}
                name="password_confirmation"
                rules={{
                  required: true,
                  validate: (value) =>
                    value === password || "The passwords do not match",
                }}
              />
            </Stack>
          </>
        )}

          <DialogActions sx={{ p: "1.25rem" }}>
            <Button
              onClick={() => {
                reset();
                setEditValues("");
                onClose();
                setPwdBox(!pwdBox);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={() => {
                handleSubmit((data) => onSubmit(data, editFlag))();
              }}
              variant="contained"
            >
              {editFlag === true ? "Update" : "Save"}
            </Button>
          </DialogActions>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditEmailSetupModel;
