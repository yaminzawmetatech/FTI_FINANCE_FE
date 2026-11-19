import React, { useCallback, useEffect, useMemo, useState } from "react";
import Toolbar from "components/Toolbar";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
// import { showSuccessToast } from "common/ToastMessage";
// import CommonMessage from "common/CommonMessage";
import CalculateIcon from '@mui/icons-material/Calculate';


const InitialPaymentCalToolbar = ({
  //surveyResult, formValues
}) => {
  const { surveyType: survey_type, categoryId } = useParams();
  const [surveyHeaderId, setSurveyHeaderId] = useState(null);
  const [openApplicant, setOpenApplicant] = useState(false);
  const [openGuarantor, setOpenGuarantor] = useState(false);

  const [openChooseGuarantorModal, setOpenChooseGuarantorModal] = useState(false);
  const [contactType, setContactType] = useState(null);

  const { data, isLoading } = useSelector(
    (state) => state.surveyResult.surveyHeader
  );
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getSurveyHeader({ survey_type, category_id: categoryId }));
  // }, [categoryId, dispatch, survey_type]);

  const handleStatusChange = useCallback(
    (investigation_status) => async () => {
      try {
        // await dispatch(
        //   updateSurveyResultInvestigationStatusByUuid({
        //     uuid: surveyResult?.uuid,
        //     body: {
        //       ...formValues(),
        //       investigation_status,
        //     },
        //   })
        // ).unwrap();

        //showSuccessToast(CommonMessage.MFS00008);
      } catch (e) { }
    },
    [dispatch,
      //surveyResult?.uuid
    ]
  );

  const handleCalculate = (item) => {
    // setSurveyHeaderId(item?.id);
    // if(item?.contact_type === "Applicant") {
    //   setSurveyHeaderId(item?.id);
    //   setOpenApplicant(true);
    // }else{
    //   setContactType(item?.contact_type);
    //   setOpenChooseGuarantorModal(true);
    // }
  }

  const toolbarData = useMemo(
    () => [
      {
        title: "HOME",
        children: [
          // {
          //   title: "Process",
          //   type: "single",
          //   children: 
          //     [
          //         {
          //           icon: <CalculateIcon />,
          //           title: "Calculate",
          //           //width: "4rem",
          //           onClick: handleCalculate(),
          //         },
          //       ]
          // },
          {
            title: "Status",
            type: "single",
            children: [
              // {
              //   icon: <PlayArrowIcon fontSize="large" />,
              //   title: "Conducting",
              //   width: "4rem",
              //   onClick: handleStatusChange("conducting"),
              // },
              // {
              //   icon: <SkipNextIcon fontSize="large" />,
              //   title: "Skipped",
              //   width: "4rem",
              //   onClick: handleStatusChange("skipped"),
              // },
              {
                icon: <CheckCircleIcon fontSize="large" />,
                width: "4rem",
                title: "Completed",
                onClick: handleStatusChange("completed"),
              },
            ],
          },
        ],
      },
    ],
    [data, handleStatusChange, isLoading]
  );

  return (
    <>
      {/* <InHouseSurveyApplicant
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
      /> */}
      <Toolbar data={toolbarData} />
    </>
  );
};

export default React.memo(InitialPaymentCalToolbar);
