import React, { useCallback, useMemo, useState } from "react";
import Toolbar from "components/Toolbar";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ArticleIcon from "@mui/icons-material/Article";
import axiosInstance from "features/api/axiosInstance";
import { saveAs } from "file-saver";
import { useDispatch } from "react-redux";
import {
  getCollateralSignature,
  updateCollateralSignature,
} from "features/collateralSignature/collateralSignatureSlice";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CircularProgress from "@mui/material/CircularProgress"; // 🌀 Add loader

const CollateralSignatureToolbar = ({ collateralSignature = [], type }) => {
  const dispatch = useDispatch();

  const firstItem = collateralSignature[0];
  const applicationCollateralUuid = firstItem?.application_collateral?.uuid;
  const applicationCollateralId = firstItem?.application_collateral?.id;
  const signatureUuid = firstItem?.uuid;
  const signatureStatus = firstItem?.status;

  const [loadingExport, setLoadingExport] = useState(false);

  const handleExport = useCallback(
    async (endpoint, filename) => {
      if (!applicationCollateralUuid) return;
      setLoadingExport(true);
      try {
        const response = await axiosInstance.get(endpoint, {
          responseType: "arraybuffer",
        });
        const blob = new Blob([response.data], {
          type: "application/pdf",
        });
        saveAs(blob, filename);
      } catch (error) {
        console.error("Error exporting PDF:", error);
      } finally {
        setLoadingExport(false);
      }
    },
    [applicationCollateralUuid]
  );

  const handleClickCORPDF = () =>
    handleExport(`/collateral-cor-pdf/${applicationCollateralUuid}`, "Collateral-COR.pdf");

  const handleClickLCPDF = () =>
    handleExport(`/lc-pdf/${applicationCollateralUuid}`, "CollectedLC.pdf");

  const handleClickUnLCPDF = () =>
    handleExport(`/lc-pdf/${applicationCollateralUuid}`, "UnCollectedLC.pdf");

  const handleStatusChange = useCallback(async () => {
    if (!signatureUuid || !applicationCollateralId) return;

    try {
      await dispatch(
        updateCollateralSignature({
          uuid: signatureUuid,
          body: {
            status: "completed",
            type: type,
          },
        })
      ).unwrap();

      showSuccessToast(CommonMessage.MFS00006);

      await dispatch(
        getCollateralSignature({
          params: {
            application_collateral_id: applicationCollateralId,
            signature_type: type,
          },
        })
      ).unwrap();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  }, [dispatch, signatureUuid, applicationCollateralId, type]);

  const toolbarData = useMemo(() => {
    let exportItem;

    const loadingIcon = (
      <CircularProgress size={20} color="inherit" style={{ marginRight: 4 }} />
    );

    if (type === "COR") {
      exportItem = {
        icon: loadingExport ? loadingIcon : <ArticleIcon />,
        title: loadingExport ? "Loading..." : "COR",
        onClick: handleClickCORPDF,
        disabled: loadingExport,
      };
    } else if (type === "UncollectedLC") {
      exportItem = {
        icon: loadingExport ? loadingIcon : <ArticleIcon />,
        title: loadingExport ? "Loading..." : "LC(Uncollected)",
        onClick: handleClickUnLCPDF,
        disabled: loadingExport,
      };
    } else if (type === "CollectedLC") {
      exportItem = {
        icon: loadingExport ? loadingIcon : <ArticleIcon />,
        title: loadingExport ? "Loading..." : "LC(Collected)",
        onClick: handleClickLCPDF,
        disabled: loadingExport,
      };
    }

    return [
      {
        title: "HOME",
        children: [
          {
            title: "Complete",
            type: "multiple",
            children: [
              {
                icon: <CheckCircleOutlineIcon />,
                title: "Complete",
                onClick: handleStatusChange,
                disabled: signatureStatus === "completed",
              },
            ],
          },
          {
            title: "Export",
            type: "multiple",
            children: exportItem ? [exportItem] : [],
          },
        ],
      },
    ];
  }, [
    type,
    handleClickCORPDF,
    handleClickLCPDF,
    handleClickUnLCPDF,
    handleStatusChange,
    signatureStatus,
    loadingExport,
  ]);

  if (!Array.isArray(collateralSignature) || collateralSignature.length === 0) {
    return null;
  }

  return <Toolbar data={toolbarData} />;
};

export default React.memo(CollateralSignatureToolbar);
