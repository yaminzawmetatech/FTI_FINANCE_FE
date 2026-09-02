import React, { useCallback, useState } from "react";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";
import DescriptionIcon from "@mui/icons-material/Description";
import AssessmentIcon from "@mui/icons-material/Assessment";
import CachedIcon from "@mui/icons-material/Cached";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import Toolbar from "../../../../components/Toolbar";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ToolbarApplicationNewButton from "./ToolbarApplicationNewButton";
import CancelIcon from "@mui/icons-material/Cancel";
import ToolbarApplicationCancelButton from "./ToolbarApplicationCancelButton";
import { IHCO } from "../../../../constants/userGroup";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ToolbarIncompleteFieldsModal from "./ToolbarIncompleteFieldsModal";
import HistoryIcon from "@mui/icons-material/History";
import ToolbarIncompleteFieldsHistoryModal from "./ToolbarIncompleteFieldsHistoryModal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ToolbarCriteriaModal from "./ToolbarCriteriaModal";
import PlaylistRemoveOutlinedIcon from "@mui/icons-material/PlaylistRemoveOutlined";
import SendIcon from "@mui/icons-material/Send";
import FolderIcon from "@mui/icons-material/Folder";

const ToolbarApplication = ({
  handleSubmit,
  onSubmit,
  onSubmitNotReady,
  editAbleForm,
  applicationResponses,
  handleModalOpen,
  isTabletView,
  onSubmitSendToCMCO,
}) => {
  const dispatch = useDispatch();

  const { next, previous, application } = useSelector(
    (state) => state.applicationDetail
  );

  const { user } = useSelector((state) => state.auth);

  const { id, categoryId, categoryName, uuid, mode } = useParams();
  const navigate = useNavigate();
  const [openNewModal, setOpenNewModal] = useState(false);
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [openIncompleteModal, setOpenIncompleteModal] = useState(false);
  const [openIncompleteHistoryModal, setOpenIncompleteHistoryModal] =
    useState(false);
  const [openCriteriaModal, setOpenCriteriaModal] = useState(false);

  const handleCloseNewModal = useCallback(() => {
    setOpenNewModal(false);
  }, []);

  const handleCloseIncompleteModal = useCallback(() => {
    setOpenIncompleteModal(false);
  }, []);

  const handleCloseIncompleteHistoryModal = useCallback(() => {
    setOpenIncompleteHistoryModal(false);
  }, []);

  const handleCloseCancelModal = useCallback(() => {
    setOpenCancelModal(false);
  }, []);

  const handleCloseCriteriaModal = useCallback(() => {
    setOpenCriteriaModal(false);
  }, []);

  const handleOpenCancelModal = useCallback(() => {
    setOpenCancelModal(true);
  }, []);


  const toolbarData = [
    {
      title: "HOME",
      children: [
        {
          title: "Process",
          type: "multiple",
          children: [
            ...(user?.user_group !== "CMCO" && user?.user_group !== "Agent"
              ? [
                {
                  icon: <CancelIcon />,
                  title: "Cancel",
                  onClick: handleOpenCancelModal,
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
      <ToolbarApplicationNewButton
        open={openNewModal}
        handleClose={handleCloseNewModal}
      />
      <ToolbarApplicationCancelButton
        open={openCancelModal}
        handleClose={handleCloseCancelModal}
        applicationResponses={applicationResponses}
      />
      <ToolbarCriteriaModal
        open={openCriteriaModal}
        handleClose={handleCloseCriteriaModal}
      />
      {/* <div style={{overflowX: 'scroll'}} > */}
      <Toolbar data={toolbarData} />
      {/* </div> */}
      {categoryId === "3" && (
        <>
          <ToolbarIncompleteFieldsModal
            open={openIncompleteModal}
            handleClose={handleCloseIncompleteModal}
          />
          <ToolbarIncompleteFieldsHistoryModal
            open={openIncompleteHistoryModal}
            handleClose={handleCloseIncompleteHistoryModal}
          />
        </>
      )}
    </>
  );
};

export default React.memo(ToolbarApplication);
