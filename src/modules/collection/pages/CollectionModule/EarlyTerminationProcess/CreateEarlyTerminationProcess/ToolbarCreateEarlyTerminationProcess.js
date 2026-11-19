import React, { useState } from "react";
import Toolbar from "components/Toolbar";
import { useParams } from "react-router";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ArticleIcon from "@mui/icons-material/Article";
import openNewWindow from "utils/windowUtils";
import { saveAs } from "file-saver";
import axiosInstance from "core/services/api/axiosInstance";
import { CircularProgress } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

const ToolbarCreateEarlyTerminationProcess = ({
  earlyTerminationProcesses,
  handleChangeStatus,
}) => {
  const { mode, uuid } = useParams();

  const [exporting, setExporting] = useState(false);

  const handleExportET = async () => {
    setExporting(true);

    try {
      const response = await axiosInstance.get(
        `/export-termination-process/${uuid}`,
        {
          params: {
            category_id: earlyTerminationProcesses?.contract?.category_id
          },
          responseType: "arraybuffer", // Set response type to array buffer
        }
      );

      const blob = new Blob([response.data], {
        type: "collection/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(blob, "EarlyTermination.xlsx");
    } catch (error) {
      console.error("Error exporting data:", error);
    } finally {
      setExporting(false);
    }
  };

  const toolbarData = [
    {
      title: "HOME",
      children: [
        {
          title: "Process",
          type: "multiple",
          children: [
            {
              icon: <MarkEmailReadIcon />,
              title: "Request For Approval",
              disabled:
                !earlyTerminationProcesses ||
                earlyTerminationProcesses?.status !== "open" ||
                mode === "view",
              onClick: () => handleChangeStatus("Request For Approval"),
            },
            ...(mode === "edit" || mode === "view"
              ? [
                  {
                    icon: <CheckCircleIcon />,
                    title: "Approved",
                    disabled:
                      !earlyTerminationProcesses ||
                      earlyTerminationProcesses?.status !== "Pending" ||
                      mode === "view",
                    onClick: () => handleChangeStatus("Approved"),
                  },
                  // {
                  //   icon: <CancelIcon />,
                  //   title: "Reject",
                  //   disabled:
                  //     !earlyTerminationProcesses ||
                  //     earlyTerminationProcesses?.status !== "Pending" ||
                  //     mode === "view",
                  //   onClick: () => handleChangeStatus("Reject"),
                  // },
                ]
              : []),
          ],
        },
        ...(mode === "edit" || mode === "view"
          ? [
              {
                title: "Contract",
                type: "multiple",
                children: [
                  {
                    icon: <CreditCardIcon />,
                    title: "View Contract",
                    onClick: () =>
                      openNewWindow(
                        `/contracts/${earlyTerminationProcesses?.contract?.uuid}/view/contract`
                      ),
                  },
                ],
              },
              {
                title: "Export",
                type: "multiple",
                children: [
                  {
                    icon: exporting ? (
                      <CircularProgress size={20} />
                    ) : (
                      <FileDownloadIcon />
                    ),
                    title: "ET Export",
                    onClick: handleExportET,
                  },
                ],
              },
            ]
          : []),
      ],
    },
  ];

  return (
    <>
      <Toolbar data={toolbarData} />
    </>
  );
};

export default React.memo(ToolbarCreateEarlyTerminationProcess);
