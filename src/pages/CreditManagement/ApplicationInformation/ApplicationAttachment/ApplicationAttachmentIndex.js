import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Button } from "@mui/material";
import Accordion from "../../../../components/Accordion";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";
import ApplicationAttachmentTable from "./ApplicationAttachmentTable";
import { getFileAttaches } from "../../../../features/fileAttach/fileAttachSlice";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ApplicationAttachmentToolbar from "./ApplicationAttachmentToolbar";
import ImagePreviewGroup from "../../../../components/ImagePreviewGroup";
import { getApplicationByUuid } from "../../../../features/application/applicationDetailSlice";
import ApplicationTitle from "../../../../components/application/ApplicationTitle";

const ApplicationAttachmentIndex = () => {
  const { primaryKey, tableName, applicationUUId } = useParams();

  const [params] = useSearchParams();

  const dispatch = useDispatch();
  const { fileAttaches } = useSelector(
    (state) => state.fileAttaches
  );
  const { application } = useSelector((state) => state.applicationDetail);

  const images = useMemo(
    () => fileAttaches?.map((item) => item?.server_url),
    [fileAttaches]
  );
  const fetchApi = useCallback(() => {
    dispatch(
      getFileAttaches({
        params: {
          ...Object.fromEntries(params),
          table_name: tableName,
          primary_key: primaryKey,
        },
      })
    );
  }, [dispatch, params, primaryKey, tableName]);

  useEffect(() => {
    dispatch(getApplicationByUuid({ uuid: applicationUUId}));
  }, [applicationUUId, dispatch]);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  const [selectedRows, setSelectedRows] = useState([]);

  const [imageCurrent, setImageCurrent] = useState(null);
  const onChangeImagePreview = (current, prevCurrent) => {};

  const onSelectionChanged = useCallback(
    (rows) => {
      if (rows.length) {
        setSelectedRows(rows);
        const rowIndex = fileAttaches.findIndex(
          (item) => item.id === rows[0].id
        );
        setImageCurrent(rowIndex);
      }
    },
    [fileAttaches]
  );

  const handleOkClick = () => {
    window.close();
  };

  return (
    <>
      <Helmet>
        <title>Edit - Attachments</title>
      </Helmet>
      <ApplicationAttachmentToolbar
        selectedAttachments={selectedRows}
        fetchApi={fetchApi}
        application={application}
      />
      <Box
        sx={{
          px: 1,
        }}
      >
        <ApplicationTitle application={application} title="Attachments" />
      </Box>

      <Box
        sx={{
          px: 1,
          pb: 1,
          display: "flex",
          gap: 2,
          "@media (max-width: 600px)": {
            flexDirection: "column",
          },
        }}
      >
        <Box sx={{ width: "100%", flex: 1 }}>
          <Accordion title={`Attachments`}>
            <ApplicationAttachmentTable
              onSelectionChanged={onSelectionChanged}
            />
          </Accordion>
        </Box>
        <Box
          sx={{
            width: "20rem",
            "@media (max-width: 600px)": {
              // Adjust the max-width as needed for your mobile breakpoint
              width: "100%",
              flex: 1,
            },
          }}
        >
          <Accordion title="Preview Picture">
            <ImagePreviewGroup
              items={images}
              current={imageCurrent ?? null}
              onChange={onChangeImagePreview}
            />
          </Accordion>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          px: 1,
          mb: 2,
          justifyContent: "flex-end",
          paddingBottom: "20px",
        }}
      >
        <Button variant="contained" color="primary" onClick={handleOkClick}>
          OK
        </Button>
      </Box>
    </>
  );
};

export default ApplicationAttachmentIndex;
