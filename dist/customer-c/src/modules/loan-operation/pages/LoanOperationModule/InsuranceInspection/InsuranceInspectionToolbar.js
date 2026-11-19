import React, { useCallback, useMemo, useState } from "react";
import Toolbar from "components/Toolbar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useDispatch, useSelector } from "react-redux";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { useParams } from "react-router";
import { getInsuranceInspectionByUuid, sendInspectionEmail, updateInsuranceInspection } from "modules/loan-operation/slices/insuranceInspectionSlice";
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmailRecordModal from "./EmailRecordModal";

const InsuranceInspectionToolbar = ({
  insuranceInspections,
  editAbleForm
}) => {
  const { id, uuid } = useParams();

  const dispatch = useDispatch();

  const [ openRecordModal, setOpenRecordModal ] = useState(false);

  const handleStatusChange = useCallback(
    (complete_status) => async () => {
      try {
        await dispatch(
          updateInsuranceInspection({
            uuid: insuranceInspections.uuid,
            body: {
              status: complete_status,
              application_id: insuranceInspections.application_id,
              insurance_company_id: insuranceInspections.insurance_company_id,
              requested_date: insuranceInspections.requested_date,
              conducted_date: insuranceInspections.conducted_date,
            },
          })
        ).unwrap();

        showSuccessToast(CommonMessage.MFS00008);
      } catch (e) {}
    },
    [dispatch, insuranceInspections,id]
  );

  const handleSendEmail = useCallback(async () => {
    try {
      const response = await dispatch(
        sendInspectionEmail({
          params: {
            application_id: insuranceInspections.application_id,
            insurance_company_id: insuranceInspections.insurance_company_id,
          },
        })
      ).unwrap();

      const subject = response.data.subject;
      const body = response.data.body;
      const to = response.data.to;
  
      handleGenerateEmail(subject, body, to);

      await dispatch(getInsuranceInspectionByUuid({uuid}));

    } catch (e) {
      console.error("Error sending email:", e);
    }
  }, [dispatch, insuranceInspections]);

  const handleGenerateEmail = (subject, body, to) => {
    try {
      const formattedTo = Array.isArray(to) ? to.join(";") : to;
      const encodedSubject = encodeURIComponent(subject);
      const encodedBody = encodeURIComponent(body);
  
      const mailtoUrl = `mailto:${formattedTo}?subject=${encodedSubject}&body=${encodedBody}`;
  
      window.location.href = mailtoUrl; // Open default email (outlook)
    } catch (error) {
      console.error("Error generating email:", error);
    }
  };

  const handleViewEmailRecord = () => {
    setOpenRecordModal(true);
  }

  const handleCloseEmailRecord = useCallback(() => {
    setOpenRecordModal(false);
  }, []);
  
  const toolbarData = useMemo(
    () => [
      {
        title: "HOME",
        children: [
          {
            title: "Status",
            type: "single",
            children: [
              {
                icon: <CheckCircleIcon />,
                title: "Completed",
                onClick: handleStatusChange("completed"),
                disabled: !editAbleForm
              },
            ],
          },
          {
            title: "Process",
            type: "Multiple",
            children: [
              {
                icon: <EmailIcon />,
                title: "Send Email",
                onClick: handleSendEmail,
                disabled: insuranceInspections?.status !== "completed"
              },
              {
                icon: <AccessTimeIcon />,
                title: "Email Record",
                onClick: handleViewEmailRecord,
                //disabled: !editAbleForm
              },
            ],
          },
        ],
      },
    ],
    [handleStatusChange]
  );

  return (
    <>
      <Toolbar data={toolbarData} />
      <EmailRecordModal
            open={openRecordModal}
            handleClose={handleCloseEmailRecord}
            insuranceInspections={insuranceInspections}
          />
    </>
  );
};

export default React.memo(InsuranceInspectionToolbar);
