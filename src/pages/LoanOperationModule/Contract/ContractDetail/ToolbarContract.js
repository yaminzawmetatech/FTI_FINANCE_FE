import React, { useCallback, useEffect, useState } from "react";
import axiosInstance from "features/api/axiosInstance";
import { saveAs } from "file-saver";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Toolbar from "../../../../components/Toolbar";
import { useParams } from "react-router";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import HistoryIcon from "@mui/icons-material/History";
import ToolbarDemandLetterHistoryModal from "./ToolbarDemandLetterHistoryModal";
import ToolbarCreateDemandLetterModal from "./ToolbarCreateDemandLetterModal";
import CollectionsIcon from "@mui/icons-material/Collections";
import { useDispatch, useSelector } from "react-redux";
import { getVehicleInformation } from "features/vehicleInformation/vehicleInformationSlice";
import {  CircularProgress } from "@mui/material";

const ToolbarContract = ({ contract, control, setValue, isLoading }) => {
  const { uuid } = useParams();
  const dispatch = useDispatch();
  const [exportAgreementLoading, setExportAgreementLoading] = useState(false);
  const [exportCORLoading, setExportCORLoading] = useState(false);
  const [exportATDLoading, setExportATDLoading] = useState(false);
  const [exportULLoading, setExportULLoading] = useState(false);
  const [exportCommitmentLoading, setExportCommitmentLoading] = useState(false);

  const [openDemandLetterHistoryModal, setOpenDemandLetterHistoryModal] =
    useState(false);

  const [openCreateDemandLetterModal, setOpenCreateDemandLetterModal] =
    useState(false);

  const handleOpenDemandLetterHistoryModal = useCallback(() => {
    setOpenDemandLetterHistoryModal(true);
  }, []);

  const handleCloseDemandLetterHistoryModal = useCallback(() => {
    setOpenDemandLetterHistoryModal(false);
  }, []);

  const handleOpenCreateDemandLetterModal = useCallback(() => {
    setOpenCreateDemandLetterModal(true);
  }, []);

  const handleCloseCreateDemandLetterModal = useCallback(() => {
    setOpenCreateDemandLetterModal(false);
  }, []);

  const handleExportAggrment = useCallback(async () => {
    setExportAgreementLoading(true);
    try {
      const response = await axiosInstance.get(
        `/export-contract/${uuid}`,
        {
          responseType: "arraybuffer",
        }
      );

      setExportAgreementLoading(false);
      const fileExtension = response.headers["content-type"];

      let mimeType = "";

      if (fileExtension === "application/pdf") {
        mimeType = "application/pdf";
      } else if (fileExtension === "application/msword") {
        mimeType = "application/msword";
      } else if (
        fileExtension ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        mimeType =
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      }

      const blob = new Blob([response.data], {
        type: mimeType,
      });
      saveAs(
        blob,
        fileExtension === "application/pdf"
          ? contract?.application?.application_id + " Agreement.pdf"
          : contract?.application?.application_id + " Agreement.doc"
      );
    } catch (error) {
      setExportAgreementLoading(false);
      console.error("Error exporting data:", error);
    }
  }, [contract, uuid]);

  const handleExportCOR = useCallback(async () => {
    setExportCORLoading(true);
    try {
      const response = await axiosInstance.get(
        `/applications/${contract?.application?.uuid}/cor-pdf`,
        {
          responseType: "arraybuffer",
        }
      );

      setExportCORLoading(false);
      const fileExtension = response.headers["content-type"];

      let mimeType = "";

      if (fileExtension === "application/pdf") {
        mimeType = "application/pdf";
      } else if (fileExtension === "application/msword") {
        mimeType = "application/msword";
      } else if (
        fileExtension ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        mimeType =
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      }

      const blob = new Blob([response.data], {
        type: mimeType,
      });
      saveAs(
        blob,
        fileExtension === "application/pdf"
          ? contract?.application?.application_id + " COR.pdf"
          : contract?.application?.application_id + " COR.doc"
      );
    } catch (error) {
      setExportCORLoading(false);
      console.error("Error exporting data:", error);
    }
  }, [contract]);

  const handleExportATD = useCallback(async () => {
    setExportATDLoading(true);
    try {
      const response = await axiosInstance.get(
        `/applications/${contract?.application?.uuid}/atd-pdf`,
        {
          responseType: "arraybuffer",
        }
      );

      setExportATDLoading(false);
      const fileExtension = response.headers["content-type"];

      let mimeType = "";

      if (fileExtension === "application/pdf") {
        mimeType = "application/pdf";
      } else if (fileExtension === "application/msword") {
        mimeType = "application/msword";
      } else if (
        fileExtension ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        mimeType =
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      }

      const blob = new Blob([response.data], {
        type: mimeType,
      });
      saveAs(
        blob,
        fileExtension === "application/pdf"
          ? contract?.application?.application_id + " ATD.pdf"
          : contract?.application?.application_id + " ATD.doc"
      );
    } catch (error) {
      setExportATDLoading(false);
      console.error("Error exporting data:", error);
    }
  }, [contract]);

  const handleExportUL = useCallback(async () => {
    setExportULLoading(true);
    try {
      const response = await axiosInstance.get(
        `/applications/${contract?.application?.uuid}/ul-pdf`,
        {
          responseType: "arraybuffer",
        }
      );

      setExportULLoading(false);
      const fileExtension = response.headers["content-type"];

      let mimeType = "";

      if (fileExtension === "application/pdf") {
        mimeType = "application/pdf";
      } else if (fileExtension === "application/msword") {
        mimeType = "application/msword";
      } else if (
        fileExtension ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        mimeType =
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      }

      const blob = new Blob([response.data], {
        type: mimeType,
      });
      saveAs(
        blob,
        fileExtension === "application/pdf"
          ? contract?.application?.application_id + " UL.pdf"
          : contract?.application?.application_id + " UL.doc"
      );
    } catch (error) {
      setExportULLoading(false);
      console.error("Error exporting data:", error);
    }
  }, [contract]);

  const handleExportCommitmentLetter = useCallback(async () => {
    setExportCommitmentLoading(true);
    try {
      const response = await axiosInstance.get(
        `/obl-commitment-pdf/${contract?.uuid}`,
        {
          responseType: "arraybuffer",
        }
      );

      setExportCommitmentLoading(false);
      const fileExtension = response.headers["content-type"];

      let mimeType = "";

      if (fileExtension === "application/pdf") {
        mimeType = "application/pdf";
      } else if (fileExtension === "application/msword") {
        mimeType = "application/msword";
      } else if (
        fileExtension ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        mimeType =
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      }

      const blob = new Blob([response.data], {
        type: mimeType,
      });
      saveAs(
        blob,
        fileExtension === "application/pdf"
          ? contract?.application?.application_id + " Commitment Letter.pdf"
          : contract?.application?.application_id + " Commitment Letter.doc"
      );
    } catch (error) {
      setExportCommitmentLoading(false);
      console.error("Error exporting data:", error);
    }
  }, [contract]);

  useEffect(() => {
    dispatch(
      getVehicleInformation({
        params: {
          application_id: contract?.application?.application_id,
        },
      })
    );
  }, [dispatch, contract?.application?.application_id]);

  // const handleVehicleInformation = async () => {
  //   console.log(initialPaymentCalculations[0]?.application_id)
  //   const url = `/loan-module/vehicle-info/${application?.uuid}/${application?.id}`;

  //   try {
  //     // Fetch initial payment calculation
  //     const response = await dispatch(
  //       getVehicleInformation({
  //         params: {
  //           application_id: application?.id,
  //         },
  //       })
  //     );

  //     // If data exists, open the URL in a new window
  //     if (response.data?.length > 0) {
  //       openNewWindow(url);
  //     } else {
  //       // If no data exists, create a new initial payment calculation

  //       const createResponse = await dispatch(
  //         createVehicleInformation({
  //           data: {
  //             // application_id:
  //               // initialPaymentCalculations[0]?.application_id ?? null,
  //               application_id: application?.id,
  //             initial_downpayment_id:
  //               initialPaymentCalculations[0]?.vehicle_information[0]
  //                 ?.initial_downpayment_id ?? null,
  //             vehicle_color:
  //               initialPaymentCalculations[0]?.vehicle_information[0]
  //                 ?.vehicle_color ?? null,
  //             division:
  //               initialPaymentCalculations[0]?.vehicle_information[0]
  //                 ?.division ?? null,
  //             plate_no:
  //               initialPaymentCalculations[0]?.vehicle_information[0]
  //                 ?.plate_no ?? null,
  //             chassis_no:
  //               initialPaymentCalculations[0]?.vehicle_information[0]
  //                 ?.chassis_no ?? null,
  //             engine_no:
  //               initialPaymentCalculations[0]?.vehicle_information[0]
  //                 ?.engine_no ?? null,
  //             engine_power:
  //               initialPaymentCalculations[0]?.vehicle_information[0]
  //                 ?.engine_power ?? null,
  //             year_of_manufacture:
  //               initialPaymentCalculations[0]?.vehicle_information[0]
  //                 ?.year_of_manufacture ?? null,
  //             brand_id:
  //               initialPaymentCalculations[0]?.vehicle_information[0]?.vehicle
  //                 ?.brand_id ?? null,
  //             model_id:
  //               initialPaymentCalculations[0]?.vehicle_information[0]?.vehicle
  //                 ?.model_id ?? null,
  //             category_id:
  //               initialPaymentCalculations[0]?.vehicle_information[0]?.vehicle
  //                 ?.category_id ?? null,
  //             sub_category_id:
  //               initialPaymentCalculations[0]?.vehicle_information[0]?.vehicle
  //                 ?.sub_category_id ?? null,
  //           },
  //         })
  //       );

  //       // If creation is successful, open the URL in a new window
  //       if (createResponse.payload.success) {
  //         openNewWindow(url);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const toolbarData = [
    {
      title: "HOME",
      children: [
        {
          title: "Application",
          type: "multiple",
          children: [
            {
              icon: <PeopleAltIcon />,
              title: "Application",
              url: `/CreditManagement/CreateApplicationInformation/${contract?.category.name}/${contract?.category_id}/${contract?.application.uuid}/${contract?.application_id}/view`,
            },
            {
              icon: <CollectionsIcon />,
              title: "Collaterals",
              disabled: !(
                contract?.application?.category_id &&
                contract?.application?.sub_category_id &&
                contract?.application?.application_id
              ),
              url: `/CreditManagement/Applications/${contract?.uuid}/${contract?.application?.id}/Collaterals/${contract?.id}/contract`,
            },
          ],
        },
        {
          title: "Agreement",
          type: "multiple",
          children: [
            {
              icon: exportAgreementLoading 
                ? <CircularProgress size={20} color="inherit" /> 
                : <FileDownloadOutlinedIcon />,
              title: "Export Agreement",
              disabled: isLoading,
              onClick: handleExportAggrment,
            },
            ...(contract?.category?.mob_status === 1 &&
              contract?.category_id !== 5 &&
              contract?.category_id !== 7
              ? [
                {
                  icon: exportCORLoading 
                  ? <CircularProgress size={20} color="inherit" /> 
                  : <FileDownloadOutlinedIcon />,
                  title: "Export COR",
                  disabled: isLoading,
                  onClick: handleExportCOR,
                },
                {
                  icon: exportATDLoading 
                  ? <CircularProgress size={20} color="inherit" /> 
                  : <FileDownloadOutlinedIcon />,
                  title: "Export ATD",
                  disabled: isLoading,
                  onClick: handleExportATD,
                },
                {
                  icon: exportULLoading 
                  ? <CircularProgress size={20} color="inherit" /> 
                  : <FileDownloadOutlinedIcon />,
                  title: "Export UL",
                  disabled: isLoading,
                  onClick: handleExportUL,
                },
              ]
              : []),
            ...(contract?.category?.mob_status === 1 &&
              (contract?.category_id === 5 || contract?.category_id === 7)
              ? [
                {
                  icon: exportCommitmentLoading 
                  ? <CircularProgress size={20} color="inherit" /> 
                  : <FileDownloadOutlinedIcon />,
                  title: "Export Commitment Letter",
                  disabled: isLoading,
                  onClick: handleExportCommitmentLetter,
                },
              ]
              : []),
          ],
        },
        {
          title: "Demand Letter",
          type: "multiple",
          children: [
            {
              icon: <MailOutlineIcon />,
              title: "Create Demand Letter",
              onClick: handleOpenCreateDemandLetterModal,
            },
            {
              icon: <HistoryIcon />,
              title: "Demand Letter History",
              onClick: handleOpenDemandLetterHistoryModal,
            },
          ],
        },
        {
          title: "Documents",
          type: "multiple",
          children: [
            {
              icon: <AttachFileIcon />,
              title: "Application Attachments",
              // disabled: !(
              //   categoryId &&
              //   application?.sub_category_id &&
              //   id &&
              //   application?.application_id
              // ),
              url: `/CreditManagement/ApplicationAttachment/${contract?.application?.uuid}/Application/${contract?.application?.id}`,
            },
            {
              icon: <AttachFileIcon />,
              title: "Contract Attachments",
              url: `/contracts/ContractAttachment/${contract?.uuid}/Contract/${contract?.application_id}`,
            },
            ...(contract?.category?.mob_status === 1
              ? [
                {
                  icon: <AttachFileIcon />,
                  title: "Sale Invoice",
                  url: `/CreditManagement/ApplicationAttachment/${contract?.application?.uuid}/Sale Invoice/${contract?.application?.id}`,
                },
                {
                  icon: <AttachFileIcon />,
                  title: "Insurance",
                  url: `/CreditManagement/ApplicationAttachment/${contract?.application?.uuid}/Insurance Information/${contract?.application?.id}`,
                },
              ]
              : []),
          ],
        },
      ],
    },
  ];

  return (
    <>
      <Toolbar data={toolbarData} />
      <ToolbarCreateDemandLetterModal
        open={openCreateDemandLetterModal}
        handleClose={handleCloseCreateDemandLetterModal}
        control={control}
        setValue={setValue}
      />
      <ToolbarDemandLetterHistoryModal
        open={openDemandLetterHistoryModal}
        handleClose={handleCloseDemandLetterHistoryModal}
      />
    </>
  );
};

export default React.memo(ToolbarContract);
