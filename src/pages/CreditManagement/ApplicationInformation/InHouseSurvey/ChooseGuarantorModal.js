import React, { useEffect, useCallback, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Skeleton,
} from "@mui/material";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { useDispatch, useSelector } from "react-redux";
import FormInputSelect from "components/form/FormInputSelect";
import { useForm } from "react-hook-form";
import { getUsers } from "features/users/usersSlice";
import { lockApplication } from "features/application/applicationSlice";
import { getGuarantors } from "features/guarantor/guarantorSlice";
import { getReferences } from "features/reference/referenceSlice";
import InHouseSurveyApplicant from "../InHouseSurveyApplicant";
import { getJointApplicants } from "features/jointApplicant/jointApplicantSlice";

const ChooseGuarantorModal = ({
  open,
  onClose,
  application,
  contactType,
  surveyHeaderId,
}) => {
  const dispatch = useDispatch();

  const { control, handleSubmit, reset } = useForm({});

  const { users } = useSelector((state) => state.users);

  const { guarantors, isLoading: guarantorLoading } = useSelector(
    (state) => state.guarantors
  );

  const { references, isLoading: referenceLoading } = useSelector(
    (state) => state.references
  );

  const { jointApplicants, isLoading: jointApplicantLoading } = useSelector(
    (state) => state.jointApplicants
  );

  const [openApplicant, setOpenApplicant] = useState(false);
  const [guarantorId, setGuarantorId] = useState(null);

  useEffect(() => {
    if (open) {
      if (contactType === "Reference") {
        dispatch(
          getReferences({
            params: {
              application_id: application?.id,
            },
          })
        );
      } else if (contactType === "Joint Applicant") {
        dispatch(
          getJointApplicants({
            params: {
              application_id: application?.id,
            },
          })
        );
      } else {
        dispatch(
          getGuarantors({
            params: {
              application_id: application?.id,
            },
          })
        );
      }

      reset();
    }
  }, [open, reset, application]);

  const onSubmit = useCallback(
    () => async (body) => {
      setOpenApplicant(true);
      setGuarantorId(body?.guarantor_id);
      onClose();
      // const ihco = users?.find((item)=> item.id ===  body.locked_user_uuid);
      // try {
      //   await dispatch(
      //     lockApplication({
      //       data: {
      //         application_id: selectedRow.id,
      //         locked_user_uuid: ihco.uuid,
      //         is_locked: 1,
      //       },
      //     })
      //   ).unwrap();
      //   showSuccessToast(CommonMessage.MFS00014);
      //   fetchApi()
      // } catch (error) {
      //   console.error("Error", error);
      // }
    },
    []
  );

  return (
    <>
      <Dialog open={open}>
        <DialogTitle textAlign="center">
          {contactType === "Reference"
            ? "Choose Reference"
            : contactType === "Joint Applicant"
            ? "Choose Joint Applicant"
            : "Choose Guarantor"}
        </DialogTitle>
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
            {referenceLoading || guarantorLoading || jointApplicantLoading ? (
              <Skeleton variant="rectangular" height={37.13} />
            ) : (
              <FormInputSelect
                control={control}
                options={
                  contactType === "Reference"
                    ? references
                    : contactType === "Joint Applicant"
                    ? jointApplicants
                    : guarantors ?? []
                }
                getOptionLabel={(option) => option?.full_name || ""}
                id="id"
                name="guarantor_id"
                label={
                  <span className="required">
                    {contactType === "Reference"
                      ? "Reference"
                      : contactType === "Joint Applicant"
                      ? "Joint Applicant"
                      : "Guarantor"}
                  </span>
                }
                rules={{
                  required: true,
                }}
              />
            )}
          </Stack>
          <DialogActions sx={{ p: "1.25rem" }}>
            <Button
              onClick={() => {
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit(onSubmit())}
              variant="contained"
            >
              OK
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <InHouseSurveyApplicant
        survey_header_id={surveyHeaderId}
        open={openApplicant}
        onClose={() => {
          setOpenApplicant(false);
        }}
        contactType={contactType}
        guarantorId={guarantorId}
      />
    </>
  );
};

export default ChooseGuarantorModal;
