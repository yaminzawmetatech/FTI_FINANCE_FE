import React, { useCallback, useEffect, useMemo, useState } from "react";
import Toolbar from "components/Toolbar";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InHouseSurveyApplicant from "../InHouseSurveyApplicant";
import InHouseSurveyGuarantor from "../InHouseSurveyGuarantor";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSurveyHeader,
  updateSurveyResultInvestigationStatusByUuid,
} from "modules/credit-management/slices/surveyResultSlice";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import ChooseGuarantorModal from "./ChooseGuarantorModal";
import AttachFileIcon from "@mui/icons-material/AttachFile";

const InHouseSurveyToolbar = ({ surveyResult, formValues, application }) => {
  const { surveyType: survey_type, categoryId } = useParams();
  const [surveyHeaderId, setSurveyHeaderId] = useState(null);
  const [openApplicant, setOpenApplicant] = useState(false);
  const [openGuarantor, setOpenGuarantor] = useState(false);

  const [openChooseGuarantorModal, setOpenChooseGuarantorModal] = useState(false);
  const [ contactType, setContactType ] = useState(null);

  const { data, isLoading } = useSelector(
    (state) => state.surveyResult.surveyHeader
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSurveyHeader({ survey_type, category_id: categoryId }));
  }, [categoryId, dispatch, survey_type]);

  const handleStatusChange = useCallback(
    (investigation_status) => async () => {
      try {
        await dispatch(
          updateSurveyResultInvestigationStatusByUuid({
            uuid: surveyResult?.uuid,
            body: {
              ...formValues(),
              investigation_status,
            },
          })
        ).unwrap();

        showSuccessToast(CommonMessage.MFS00008);
      } catch (e) {}
    },
    [dispatch, surveyResult?.uuid]
  );

  const handleClickSurvey = (item) => {
    setSurveyHeaderId(item?.id);
    if(item?.contact_type === "Applicant") {
      setSurveyHeaderId(item?.id);
      setOpenApplicant(true);
    }else{
      setContactType(item?.contact_type);
      setOpenChooseGuarantorModal(true);
    }
  }

  const type = survey_type === "field_survey" ? "Field Survey" : "Inhouse Survey";

  const toolbarData = useMemo(
    () => [
      {
        title: "HOME",
        children: [
          {
            title: "Survey",
            type: "multiple",
            children: isLoading
              ? [
                  {
                    icon: <CircularProgress />,
                    title: "---",
                    width: "4rem",
                  },
                ]
              : data.map((item) => ({
                  icon: <PendingActionsIcon fontSize="large" />,
                  title: item?.survey_header_code	,
                 // width: "4rem",
                  // onClick: (e) => {
                  //   setSurveyHeaderId(item.id);
                  //   setOpenApplicant(true);
                  // },
                  onClick: () => handleClickSurvey(item)
                })),
          },
          {
            title: "Status",
            type: "single",
            children: [
              {
                icon: <PlayArrowIcon fontSize="large" />,
                title: "Conducting",
                width: "4rem",
                onClick: handleStatusChange("conducting"),
              },
              {
                icon: <SkipNextIcon fontSize="large" />,
                title: "Skipped",
                width: "4rem",
                onClick: handleStatusChange("skipped"),
              },
              {
                icon: <CheckCircleIcon fontSize="large" />,
                width: "4rem",
                title: "Completed",
                onClick: handleStatusChange("completed"),
              },
            ],
          },
          {
            title: "Attachment",
            type: "multiple",
            children: [
              {
                icon: <AttachFileIcon />,
                title: "Survey",
                url: `/CreditManagement/ApplicationAttachment/${application?.uuid}/${type}/${application?.id}`,
              },
            ]
        },
        ],
      },
    ],
    [data, handleStatusChange, isLoading]
  );

  return (
    <>
      <InHouseSurveyApplicant
        survey_header_id={surveyHeaderId}
        open={openApplicant}
        onClose={() => {
          setOpenApplicant(false);
        }}
      />
      <InHouseSurveyGuarantor
        open={openGuarantor}
        onClose={() => {
          setOpenGuarantor(false);
        }}
      />
      <Toolbar data={toolbarData} />
      <ChooseGuarantorModal
        open={openChooseGuarantorModal}
        onClose={() => setOpenChooseGuarantorModal(false)}
        // selectedRow={selectedRow}
        // fetchApi={fetchApi}
        application={application}
        contactType={contactType}
        surveyHeaderId={surveyHeaderId}
      />
    </>
  );
};

export default React.memo(InHouseSurveyToolbar);
