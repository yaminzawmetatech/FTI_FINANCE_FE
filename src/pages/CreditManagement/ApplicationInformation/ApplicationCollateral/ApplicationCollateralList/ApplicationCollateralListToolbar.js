import React, { useMemo, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Toolbar from "../../../../../components/Toolbar";
import openNewWindow from "../../../../../utils/windowUtils";
import ApplicationAssessmentListToolbarDeleteAssessment from "./ApplicationCollateralDelete";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { createCollateral, getAllCollaterals } from "features/collateral/collateralSlice";
import { useDispatch, useSelector } from "react-redux";
import ApplicationCollateralListToolbarDelete from "./ApplicationCollateralListToolbarDelete";

const ApplicationAssessmentListToolbar = ({
  selectedCollaterals,
  applicationId,
  applicationUUId,
}) => {
  const selectedCollateral = useMemo(
    () => selectedCollaterals && selectedCollaterals[0],
    [selectedCollaterals]
  );

  const dispatch = useDispatch();

  const [openDeleteCollateral, setOpenDeleteCollateral] = useState(false);

  // const handleApplicationCollateral = async () => {
  //   const url = `/CreditManagement/Applications/${applicationUUId}/${applicationId}/edit/collateral`;

  //   try {
  //     // Fetch initial payment calculation
  //     const response = await dispatch(
  //       getAllCollaterals({
  //         params: {
  //           application_id: applicationId,
  //         },
  //       })
  //     );
  //     console.log(response.data)

  //     // If data exists, open the URL in a new window
  //     if (response.data?.length > 0) {
  //       openNewWindow(url);
  //     } else {
  //       // If no data exists, create a new initial payment calculation

  //       const createResponse = await dispatch(
  //         createCollateral({
  //           data: {
  //             // application_id:
  //             // initialPaymentCalculations[0]?.application_id ?? null,
  //             application_id: applicationId,

  //           },
  //         })
  //       );
  //       console.log(createResponse)

  //       // If creation is successful, open the URL in a new window
  //       if (createResponse.payload.success) {
  //         openNewWindow(url);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const handleApplicationCollateral = async () => {
    try {
      let uuid;
      // If no data exists, create a new collateral
      const createResponse = await dispatch(
        createCollateral({
          data: {
            application_id: applicationId,
          },
        })
      );

      if (createResponse.payload?.success) {
        uuid = createResponse?.payload?.data?.uuid;
      } else {
        throw new Error("Failed to create collateral");
      }

      // Construct the URL using the UUID and open in a new window
      const url = `/CreditManagement/Applications/${uuid}/${applicationId}/edit/collateral`;
      openNewWindow(url);
    } catch (error) {
      console.error("Error handling application collateral:", error);
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
              icon: <PeopleAltIcon fontSize="large" />,
              title: "View Collateral",
              width: "5rem",
              onClick: (e) => {
                if (selectedCollateral) {
                  openNewWindow(
                    `/CreditManagement/Applications/${selectedCollateral?.uuid}/${applicationId}/view/collateral`
                  );
                }
              },
            },
            {
              icon: <NoteAddOutlinedIcon fontSize="large" />,
              title: "Create Collateral",
              width: "5rem",
              onClick: handleApplicationCollateral,
            },
            {
              icon: <EditIcon fontSize="large" />,
              title: "Edit Collateral",
              width: "5rem",
              onClick: (e) => {
                if (selectedCollateral) {
                  openNewWindow(
                    `/CreditManagement/Applications/${selectedCollateral?.uuid}/${applicationId}/edit/collateral`
                  );
                }
              },
            },
            {
              icon: <ClearIcon fontSize="large" />,
              title: "Delete Collateral",
              width: "5rem",
              onClick: (e) => {
                setOpenDeleteCollateral(true);
              },
            },
          ],
        },
      ],
    },
  ];

  return (
    <>
      <ApplicationCollateralListToolbarDelete
        open={openDeleteCollateral}
        onClose={() => {
          setOpenDeleteCollateral(false);
        }}
        selectedCollateral={selectedCollateral}
        applicationId={applicationId}
      />
      <Toolbar data={toolbarData} />
    </>
  );
};

export default React.memo(ApplicationAssessmentListToolbar);
