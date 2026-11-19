import React, { useCallback, useMemo, useState } from "react";
import Toolbar from "components/Toolbar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useDispatch, useSelector } from "react-redux";
import {
  getInitialPaymentCalculation,
  updateInitialPaymentCalculation,
} from "modules/loan-operation/slices/initialPaymentCalSlice";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { useParams } from "react-router";
import ConfirmationModal from "common/ConfirmationModal";

const InitialPaymentCalToolbar = ({
  initialPaymentCalculations,
  editAbleForm
}) => {
  const { id } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState("");
  const dispatch = useDispatch();

  const openConfirmation = useCallback((status) => {
    const commencementDate = initialPaymentCalculations[0]?.commencement_date || "Unknown date";
    setSelectedStatus(status);
    // setConfirmMessage(
    //   <>
    //     The commencement date is <span style={{ color: "red" }}>{commencementDate}</span>.<br />
    //     Are you sure you want to mark this as "<strong>{status}</strong>"?
    //   </>
    // );
    setConfirmMessage(
      <div className="confirm-message">
        The commencement date is{" "}
        <span className="commencement-date">
          {commencementDate}
        </span>
        .<br />
        Are you sure you want to mark this as{" "}
        <strong>{status}</strong>?
      </div>
    );
    
    setIsModalOpen(true);
  }, [initialPaymentCalculations]);

  const handleConfirm = useCallback(async () => {
    try {
      setIsModalOpen(false);

      await dispatch(
        updateInitialPaymentCalculation({
          uuid: initialPaymentCalculations[0]?.uuid,
          body: {
            status: selectedStatus,
            model_id: initialPaymentCalculations[0]?.vehicle_information[0]?.vehicle?.model_id,
            brand_id: initialPaymentCalculations[0]?.vehicle_information[0]?.vehicle?.brand_id,
            category_id: initialPaymentCalculations[0]?.application?.category_id,
            sub_category_id: initialPaymentCalculations[0]?.application?.sub_category_id,
          },
        })
      ).unwrap();

      showSuccessToast(CommonMessage.MFS00008);

      await dispatch(getInitialPaymentCalculation({ params: { application_id: id } }));
    } catch (e) {
      console.error("Error :",e);
    }
  }, [dispatch, id, initialPaymentCalculations, selectedStatus]);

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
                icon: <CheckCircleIcon fontSize="large" />,
                width: "4rem",
                title: "Completed",
                onClick: () => openConfirmation("completed"),
                disabled: !editAbleForm
              },
            ],
          },
        ],
      },
    ],
    [editAbleForm, openConfirmation]
  );

  return (
    <>
      <Toolbar data={toolbarData} />
      {/* <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        message={confirmMessage}
      /> */}
      <ConfirmationModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onConfirm={handleConfirm}
  message={confirmMessage}
  sx={{
    "& .MuiDialog-paper": {
      minWidth: "600px", // wider modal
      padding: "2rem",
    },
    "& .confirm-message": {
      fontSize: "1.2rem", // bigger font
    },
    "& .commencement-date": {
      color: "red",
      fontWeight: "bold",
      fontSize: "1.5rem", // make date bigger
    }
  }}
/>

    </>
  );
};

export default React.memo(InitialPaymentCalToolbar);
