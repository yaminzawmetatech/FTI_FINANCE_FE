import React, { useCallback, useMemo, useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ClearIcon from "@mui/icons-material/Clear";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import DownPaymentListToolbarMakeDP from "./DownPaymentListToolbarMakeDP";
import DownPaymentListToolbarDeleteDP from "./DownPaymentListToolbarDeleteDP";
import Toolbar from "components/Toolbar";
import openNewWindow from "utils/windowUtils";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useParams } from "react-router";
import { invoiceSendToCMCOFlagChange } from "modules/credit-management/slices/applicationSlice";
import { useDispatch } from "react-redux";
import SendIcon from '@mui/icons-material/Send';
import { showErrorToast, showSuccessToast } from "common/ToastMessage";

const DownPaymentListToolbar = ({ selectedDP, initialPaymentCalculations, applicationDownPayments }) => {
  const { id, uuid } = useParams();
  
  const dispatch = useDispatch();

  const selectedDownPayment = useMemo(
    () => selectedDP && selectedDP[0],
    [selectedDP]
  );
  const [openMakeDownPayment, setOpenMakeDownPayment] = useState(false);
  const [
    openDeleteConfirmDialog,
    setOpenDeleteConfirmDialog,
  ] = useState(false);

  const toolbarData = [
    {
      title: "HOME",
      children: [
        {
          title: "New",
          type: "single",
          children: [
            {
              icon: <AttachMoneyIcon fontSize="large" />,
              title: "Make DownPayment",
              padding: "5rem",
              onClick: (e) => {
                setOpenMakeDownPayment(true);
              },
            },
            {
              icon: <SimCardDownloadIcon fontSize="large" />,
              title: "Check DownPayment",
              width: "5rem",
              onClick: (e) => {
                if (selectedDownPayment) {
                  openNewWindow(
                    `/loan-module/application-downpayment/edit/${selectedDownPayment?.uuid}`
                  );
                }
              },
            },
            {
              icon: <ClearIcon fontSize="large" />,
              title: "Delete DownPayment",
              width: "5rem",
              onClick: (e) => {
                if (selectedDP.length > 0) {
                  const latestId = Math.max(...selectedDP.map(item => item.id));
          
                  const latestApplicationDPId = Math.max(...applicationDownPayments.map(item => item.id));
            
                  if (latestId !== latestApplicationDPId) {
                    showErrorToast("Please select the latest record to delete!");
                    return;
                  }
                }
            
                setOpenDeleteConfirmDialog(true);
              },
            }
            
            // {
            //   icon: <ClearIcon fontSize="large" />,
            //   title: "Delete DownPayment",
            //   width: "5rem",
            //   onClick: (e) => {
            //     setOpenDeleteConfirmDialog(true);
            //   },
            // },
           
          ],
        },
        {
          title: "Attachment",
          type: "Multiple",
          children: [
            {
              icon: <AttachFileIcon />,
              title: "DownPayment",
              url: `/loan-module/attachment/${uuid}/Application Downpayment/${id}`,
            },
          ],
        }, 
      ],
    },
  ];

  const onCloseDownPayment = useCallback(() => {
    setOpenMakeDownPayment(false);
  }, []);

  return (
    <>
      <DownPaymentListToolbarMakeDP
        open={openMakeDownPayment}
        onClose={onCloseDownPayment}
        initialPaymentCalculations={initialPaymentCalculations}
      />
      <DownPaymentListToolbarDeleteDP
        open={openDeleteConfirmDialog}
        onClose={() => {
          setOpenDeleteConfirmDialog(false);
        }}
        selectedDownPayment={selectedDownPayment}
      />
      <Toolbar data={toolbarData} />
    </>
  );
};

export default React.memo(DownPaymentListToolbar);
