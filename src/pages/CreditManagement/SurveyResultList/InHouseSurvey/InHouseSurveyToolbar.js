import React, { useCallback, useEffect, useMemo, useState } from "react";
import Toolbar from "../../../../components/Toolbar";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import InHouseSurveyApplicant from "./InHouseSurveyApplicant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSurveyHeader,
  updateSurveyResultInvestigationStatusByUuid,
} from "../../../../features/surveryResult/surveyResultSlice";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";

const InHouseSurveyToolbar = ({ surveyResult }) => {
  const { surveyType: survey_type, categoryId } = useParams();
  const [surveyHeaderId, setSurveyHeaderId] = useState(null);
  const [openApplicant, setOpenApplicant] = useState(false);
  const [openGuarantor, setOpenGuarantor] = useState(false);
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
            investigation_status,
          })
        ).unwrap();

        showSuccessToast(CommonMessage.MFS00008);
      } catch (e) {}
    },
    [dispatch, surveyResult?.uuid]
  );

  const toolbarData = useMemo(
    () => [
      {
        title: "HOME",
        children: [
          {
            title: "Survey",
            type: "single",
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
                  title: item?.contact_type,
                  width: "4rem",
                  onClick: (e) => {
                    setSurveyHeaderId(item.id);
                    setOpenApplicant(true);
                  },
                })),
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
      <Toolbar data={toolbarData} />
    </>
  );
};

export default React.memo(InHouseSurveyToolbar);
