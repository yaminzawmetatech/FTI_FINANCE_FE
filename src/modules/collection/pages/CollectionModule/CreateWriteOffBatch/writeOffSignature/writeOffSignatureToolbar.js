import React, { useCallback, useMemo } from "react";
import Toolbar from "components/Toolbar";
import { useDispatch } from "react-redux";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { getWriteOffSignature, updateWriteOffSignature } from "modules/collection/slices/writeOffSignatureSlice";
import { useParams } from "react-router-dom";

const WriteOffSignatureToolbar = ({ writeOffSignature = [], auth }) => {
  const { uuid, id } = useParams();
  const dispatch = useDispatch();

  const firstItem = writeOffSignature[0];
  const signatureUuid = firstItem?.uuid;
  const signatureStatus = firstItem?.status;


  const handleStatusChange = useCallback(async () => {
    if (!signatureUuid || !id) return;

    try {
      await dispatch(
        updateWriteOffSignature({
          uuid: signatureUuid,
          body: {
            status: "completed",
          },
        })
      ).unwrap();

      showSuccessToast(CommonMessage.MFS00006);

      await dispatch(
        getWriteOffSignature({
          params: {
            write_off_id: id,
            signature_type: auth?.user_group,
          },
        })
      ).unwrap();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  }, [dispatch, signatureUuid, id, auth]);

  const toolbarData = useMemo(() => {
    let exportItem;

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
        ],
      },
    ];
  }, [
    handleStatusChange,
    signatureStatus,
  ]);

  // ✅ Safe early return (after hooks)
  if (!Array.isArray(writeOffSignature) || writeOffSignature.length === 0) {
    return null;
  }

  return <Toolbar data={toolbarData} />;
};

export default React.memo(WriteOffSignatureToolbar);
