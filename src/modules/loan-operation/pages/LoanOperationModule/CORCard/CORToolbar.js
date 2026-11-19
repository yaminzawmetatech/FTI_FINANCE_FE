import React, { useCallback, useMemo } from "react";
import Toolbar from "components/Toolbar";
import { useDispatch } from "react-redux";
import { showErrorToast, showSuccessToast } from "common/ToastMessage";
import { useParams } from "react-router";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { applicationCompleteSignature } from "modules/credit-management/slices/applicationSlice";
import { getInitialPaymentCalculation } from "modules/loan-operation/slices/initialPaymentCalSlice";


const CORToolbar = ({initialPaymentCalculations}) => {

  const { id, route } = useParams();

  const dispatch = useDispatch();

  const handleClickComplete = useCallback(async () => {
    const uuid = initialPaymentCalculations[0]?.application?.uuid;
    if (!uuid) return;
  
    try {
      await dispatch(applicationCompleteSignature({ uuid })).unwrap();
      showSuccessToast("Signature Completed");

      await dispatch(
        getInitialPaymentCalculation({
          params: {
            application_id: id,
          },
        })
      );
    } catch (error) {
      showErrorToast(error.message);
    }
  }, [dispatch, initialPaymentCalculations]);
  
  const toolbarData = useMemo(
    () =>
      route !== "signature-correction"
        ? [
            {
              title: "HOME",
              children: [
                {
                  title: "Status",
                  type: "single",
                  children: [
                    {
                      icon: <CheckCircleOutlineIcon />,
                      title: "Complete",
                      onClick: handleClickComplete,
                      disabled:
                        initialPaymentCalculations[0]?.application
                          ?.is_signature_complete === 1,
                    },
                  ],
                },
              ],
            },
          ]
        : [],
    [route, handleClickComplete, initialPaymentCalculations]
  );

  return (
    <>
      <Toolbar data={toolbarData} />
    </>
  );
};

export default React.memo(CORToolbar);
