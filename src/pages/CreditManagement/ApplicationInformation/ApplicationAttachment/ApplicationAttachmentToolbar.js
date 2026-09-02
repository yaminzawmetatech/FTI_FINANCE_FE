import React, { useCallback, useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CachedIcon from "@mui/icons-material/Cached";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import Toolbar from "../../../../components/Toolbar";
import ConfirmationDialog from "../../../../components/ConfirmationDialog";
import { useDispatch } from "react-redux";
import ApplicationAttachmentToolbarUploadFile from "./ApplicationAttachmentToolbarUploadFile";
import { saveAs } from "file-saver";
import ClearIcon from "@mui/icons-material/Clear";
import { deleteFileAttach, getCustomerApplicationAttachment, getFileAttaches } from "../../../../features/fileAttach/fileAttachSlice";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ToolbarCriteriaModal from "./ToolbarCriteriaModal";
import { fetchMnetAttachments } from "features/application/applicationDetailSlice";
import { showSuccessToast } from "common/ToastMessage";
import { useParams } from "react-router";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  applicationCompleteFlagChange,
  invoiceSendToCMCOFlagChange,
} from "features/application/applicationSlice";
import SendIcon from "@mui/icons-material/Send";
import { useSelector } from "react-redux";

const ApplicationAttachmentToolbar = ({
  selectedAttachments,
  fetchApi,
  application,
}) => {
  const { primaryKey, tableName } = useParams();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [openDeleteFileConfirmDialog, setOpenDeleteFileConfirmDialog] =
    useState(false);
  const [openSelectDocumentTypeDialog, setOpenSelectDocumentTypeDialog] =
    useState(false);
  const [openCriteriaModal, setOpenCriteriaModal] = useState(false);
  const [isCustomerRefreshing, setIsCustomerRefreshing] = useState(false);

  const handleOpenCriteriaModal = useCallback(() => {
    setOpenCriteriaModal(true);
  }, []);

  const handleCloseCriteriaModal = useCallback(() => {
    setOpenCriteriaModal(false);
  }, []);

  const downloadHandleOnClick = useCallback(() => {
    if (
      selectedAttachments &&
      selectedAttachments.length &&
      selectedAttachments[0]?.server_url
    ) {
      const urlObject = new URL(selectedAttachments[0]?.server_url);
      urlObject.search = "";
      saveAs(
        selectedAttachments[0].server_url,
        urlObject.toString().split("/").pop()
      );
    }
  }, [selectedAttachments]);

  const handleOk = useCallback(async () => {
    if (selectedAttachments.length < 1) {
      toast.warn("select attachment to delete");
    } else {
      const res = await dispatch(
        deleteFileAttach({ id: selectedAttachments[0].id })
      );
      if (res.type.endsWith("fulfilled")) {
        toast.success("Deleted Successfully", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      fetchApi();
    }
  }, [selectedAttachments]);

  const refreshHandleOnClick = useCallback(() => {
    window.location.reload();
  }, []);


  const customerApplicationAttachment = useCallback(async () => {
    setIsCustomerRefreshing(true);
    try {
      if (application) {
        await dispatch(getCustomerApplicationAttachment(application?.id)).unwrap();
      }
      showSuccessToast("Customer Application Attachment Synced")
      await dispatch(
        getFileAttaches({
          params: {
            table_name: tableName,
            primary_key: primaryKey,
          },
        })
      );
    } catch (error) {
      console.error("Failed to fetch customer application attachment:", error);
    } finally {
      setIsCustomerRefreshing(false);
      setTimeout(refreshHandleOnClick, 2600);
    }
  }, [dispatch, application, primaryKey, tableName]);


  const [isFetching, setIsFetching] = useState(false);

  const handleFetchMnetAttachments = async () => {
    setIsFetching(true);
    try {
      const response = await dispatch(
        fetchMnetAttachments({
          uuid: application.uuid,
          verbose: 1,
        })
      );

      // Check if the action was successful
      if (response.payload.success === true) {
        showSuccessToast(response.payload.message);
      }
    } catch (e) {
      console.error("Error", e);
    } finally {
      setIsFetching(false);
      setTimeout(refreshHandleOnClick, 2600);
      console.log(
        "Mnet Fetched Done. See log for details (storage/logs/mnetLog/mnet-oauth.log)."
      );
    }
  };

  // const handleOk = async (e) => {
  //   console.log(e)
  // const res = await dispatch(deleteFileAttach({id:}))
  // const res = await dispatch(
  //   createApplication({
  //     body: {
  //       category_id: categoryId,
  //     },
  //   })
  // );
  // if (res.type.endsWith("fulfilled")) {
  //   toast.success("Create Success", {
  //     position: "top-right",
  //     autoClose: 1000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "light",
  //   });
  //   openNewWindow(
  //     `/CreditManagement/CreateApplicationInformation/${categoryName}/${categoryId}/${res.payload.data.uuid}/${res.payload.data.id}`
  //   );
  // }
  // };

  const handleClickReadyForDisbursement = async () => {
    try {
      await dispatch(
        applicationCompleteFlagChange({
          data: {
            application_id: application?.id,
            is_sale_invoice_complete: 1,
          },
        })
      ).unwrap();
      showSuccessToast("Sale Invoice Completed");
    } catch (error) {
      console.error("Error completing sale invoice:", error);
    }

  };

  const handleSaleInvoiceSendToCMCO = () => {
    dispatch(
      invoiceSendToCMCOFlagChange({
        data: {
          application_id: application?.id,
          type: "Sale Invoice",
        },
      })
    ).unwrap();
    showSuccessToast("Sale Invoice Send To CMCO Completed");
  };

  const handleDownpaymentSendToCMCO = () => {
    dispatch(
      invoiceSendToCMCOFlagChange({
        data: {
          application_id: application?.id,
          type: "Down Payment",
          downpayment_attachment_status: application?.downpayment_attachment_status,
          downpayment_status: application?.downpayment_status,
          is_contract_ready: application?.is_contract_ready,
        },
      })
    ).unwrap();
    showSuccessToast("Down Payment Send To CMCO Completed");
  };

  const handleDownPaymentComplete = async () => {
    try {
      await dispatch(
        applicationCompleteFlagChange({
          data: {
            application_id: application?.id,
            downpayment_attachment_status: 1,
          },
        })
      ).unwrap();

      // Only show success if the dispatch was successful
      showSuccessToast("Down Payment Attachment Completed");
    } catch (error) {
      // Only show error if the dispatch failed
      console.error("Error completing down payment:", error);
    }
  };

  const toolbarData = [
    {
      title: "HOME",
      children: [
        {
          title: "Process",
          type: "single",
          children: [
            {
              icon: <AttachFileIcon fontSize="large" />,
              title: "Upload File",
              width: "4rem",
              onClick: (e) => {
                setOpenSelectDocumentTypeDialog(true);
              },
            },
            {
              icon: <SimCardDownloadIcon fontSize="large" />,
              title: "Download File",
              width: "4rem",
              onClick: downloadHandleOnClick,
            },
            ...(user?.user_group !== "CMCO"
              ? [
                {
                  icon: <ClearIcon fontSize="large" />,
                  title: "Delete File",
                  width: "4rem",
                  onClick: (e) => {
                    setOpenDeleteFileConfirmDialog(true);
                  },
                },
              ]
              : []),
          ],
        },
        {
          title: "Page",
          type: "single",
          children: [
            // 🔹 Customer Refresh button (only if customer_web_application_id exists)
            ...(application?.customer_web_application_id
              ? [
                {
                  icon: isCustomerRefreshing ? (
                    <CachedIcon
                      fontSize="large"
                      style={{
                        animation: "spin 1.5s linear infinite",
                        color: "#1976d2",
                      }}
                    />
                  ) : (
                    <CachedIcon fontSize="large" />
                  ),
                  title: isCustomerRefreshing ? "Customer Refreshing..." : "Customer Refresh",
                  width: "4rem",
                  disabled: isCustomerRefreshing,
                  onClick: () => {
                    if (!isCustomerRefreshing) customerApplicationAttachment();
                  },
                }

              ]
              : [
                {
                  icon: isFetching ? (
                    <CachedIcon
                      fontSize="large"
                      style={{
                        animation: "spin 3s reverse infinite",
                        color: "black",
                      }}
                    />
                  ) : (
                    <CachedIcon fontSize="large" />
                  ),

                  title: "Refresh",

                  width: "4rem",

                  disabled: !!application?.customer_web_application_id || isFetching,

                  onClick: (e) => {
                    if (application?.customer_web_application_id) return; // prevent clicking

                    if (application.partner_id === 2 && application.category_id === 1) {
                      handleFetchMnetAttachments();
                    } else {
                      refreshHandleOnClick();
                    }
                  },
                }

              ]),

            // 🔹 Normal Refresh button

          ],
        },

        // ...(user?.user_group !== "CMCO" && user?.user_group !== "Agent"
        ...(tableName === "Application"
          ? [
            {
              title: "Information",
              type: "multiple",
              children: [
                {
                  icon: <VisibilityIcon />,
                  title: "Criteria Information",
                  onClick: handleOpenCriteriaModal,
                },
              ],
            },
          ]
          : []),
        ...(tableName === "Sale Invoice"
          ? [
            {
              title: "Status",
              type: "multiple",
              children: [
                {
                  icon: <CheckCircleOutlineIcon />,
                  title: "Complete",
                  onClick: handleClickReadyForDisbursement,
                },
              ],
            },
            ...(user?.user_group !== "CMCO" &&
              user?.user_group !== "CMCE" &&
              user?.user_group !== "Agent" &&
              application?.is_sale_invoice_complete === 1
              ? [
                {
                  title: "Process",
                  type: "multiple",
                  children: [
                    {
                      icon: <SendIcon />,
                      title: "Sale Invoice Send To CMCO",
                      onClick: handleSaleInvoiceSendToCMCO,
                    },
                  ],
                },
              ]
              : []),
          ]
          : []),
        ...(tableName === "Application Downpayment"
          ? [
            {
              title: "Process",
              type: "multiple",
              children: [
                ...(user?.user_group !== "CMCO" &&
                  user?.user_group !== "CMCE" &&
                  user?.user_group !== "Agent" &&
                  (application?.downpayment_attachment_status === 1 && application?.downpayment_status === 0)
                  ? [
                    {
                      icon: <SendIcon />,
                      title: "Down Payment Send To CMCO",
                      onClick: handleDownpaymentSendToCMCO,
                    },
                  ]
                  : []),
                {
                  icon: <CheckCircleOutlineIcon />,
                  title: "Complete",
                  onClick: handleDownPaymentComplete,
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
      <ApplicationAttachmentToolbarUploadFile
        open={openSelectDocumentTypeDialog}
        onClose={() => {
          setOpenSelectDocumentTypeDialog(false);
        }}
      />
      <ConfirmationDialog
        open={openDeleteFileConfirmDialog}
        onClose={() => {
          setOpenDeleteFileConfirmDialog(false);
        }}
        onOk={handleOk}
        title="Confirm Delete File"
        content="Are you sure you want to delete this file?"
      />
      <Toolbar data={toolbarData} />
      <ToolbarCriteriaModal
        open={openCriteriaModal}
        handleClose={handleCloseCriteriaModal}
      />
    </>
  );
};

export default React.memo(ApplicationAttachmentToolbar);
