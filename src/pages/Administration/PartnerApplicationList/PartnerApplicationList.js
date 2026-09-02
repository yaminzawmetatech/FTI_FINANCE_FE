

import React, { useState, useEffect, useMemo } from 'react';
import { Box, Paper, Typography, Breadcrumbs, Chip } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import { useDispatch, useSelector } from 'react-redux';
import { getPartnerApplicationList } from 'features/PartnerApplicationList/PartnerApplicationSetupSlice';
import ImageModal from './ImageModal';
import Avatar from '@mui/material/Avatar';
import {
  DownloadOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";
import { Image, Space } from "antd";
import { styled } from "@mui/material/styles";
import { CloseOutlined } from '@ant-design/icons';


const ToolbarWrapper = styled(Space)`
  & {
    display: flex;
    align-items: center;
    padding: 0 24px;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 100px;
    color: #fff;
    font-size: 20px;
  }

  & .anticon {
    padding: 12px;
    cursor: pointer;
  }

  & .anticon[disabled] {
    cursor: not-allowed;
    opacity: 0.3;
  }

  & .anticon:hover {
    opacity: 0.3;
  }
`;


const PartnerApplicationList = () => {
  const dispatch = useDispatch();
  const { partnerApplicationList, isLoading } = useSelector((state) => state.partnerApplicationList);

  useEffect(() => {
    dispatch(getPartnerApplicationList());
  }, [dispatch]);


  const onDownload = ({ flipY, flipX, rotate, filePath  }) => {

    const img = document.createElement("img");
    img.src = filePath;
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const { naturalWidth, naturalHeight } = img;

      // flip and rotate in canvas
      const angle = (rotate * Math.PI) / 180;
      const sinAngle = Math.sin(angle);
      const cosAngle = Math.cos(angle);
      canvas.width =
        Math.abs(naturalWidth * cosAngle) + Math.abs(naturalHeight * sinAngle);
      canvas.height =
        Math.abs(naturalWidth * sinAngle) + Math.abs(naturalHeight * cosAngle);
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1);
      ctx.rotate(angle);
      ctx.drawImage(img, -naturalWidth / 2, -naturalHeight / 2);

      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      const urlObject = new URL(img.src);
      urlObject.search = "";
      link.download = urlObject.toString().split("/").pop();
      document.body.appendChild(link);
      link.click();
      link.remove();
    };
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "partner_name",
        header: "Partner",
        size: 100,
        accessorFunction: (data) => data.category.name,
      },
      {
        accessorKey: "application_id",
        header: "Application ID",
        size: 100,
      },
      {
        accessorKey: "application",
        header: "Application Files",
        size: 250,
        Cell: ({ cell }) => (
          <Box component="span">
            {cell.getValue() && cell.getValue().map((application, index) => (
              application.file_name && application.file_name.map((fileName) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Chip
                    label={`${application.name}_${fileName.file_name}`}
                    sx={{ m: 0.5, height:'40px' }}
                    variant="outlined"
                    avatar={
                    <Image
                      src={fileName.file_path}
                      preview={{
                        toolbarRender: (
                          _,
                          {
                            transform: { scale, flipX, flipY, rotate },
                            actions: {
                              onFlipY,
                              onFlipX,
                              onRotateLeft,
                              onRotateRight,
                              onZoomOut,
                              onZoomIn,
                            }
                          },
                        ) => (
                          <ToolbarWrapper size={12}>
                           <DownloadOutlined
                              onClick={() => onDownload({ rotate, flipX, flipY, filePath: fileName.file_path })}
                            />
                            <SwapOutlined rotate={90} onClick={onFlipY} />
                            <SwapOutlined onClick={onFlipX} />
                            <RotateLeftOutlined onClick={onRotateLeft} />
                            <RotateRightOutlined onClick={onRotateRight} />
                            <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
                            <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
                          </ToolbarWrapper>
                        ),
                      }}
                    />
                    }
                  />
                  
                </Box>
              ))
            ))}
          </Box>
        ),
      },
      {
        accessorKey: "guarantor",
        header: "Guarantor Files",
        size: 250,
        Cell: ({ cell }) => (
          <Box component="span">
            {cell.getValue() && cell.getValue().map((application, index) => (
              application.file_name && application.file_name.map((fileName) => (
                <Chip
                    label={`${application.name}_${fileName.file_name}`}
                    sx={{ m: 0.5, height:'40px' }}
                    variant="outlined"
                    avatar={
                    <Image
                      src={fileName.file_path}
                      preview={{
                        toolbarRender: (
                          _,
                          {
                            transform: { scale, flipX, flipY, rotate },
                            actions: {
                              onFlipY,
                              onFlipX,
                              onRotateLeft,
                              onRotateRight,
                              onZoomOut,
                              onZoomIn,
                            }
                          },
                        ) => (
                          <ToolbarWrapper size={12}>
                           <DownloadOutlined
                              onClick={() => onDownload({ rotate, flipX, flipY, filePath: fileName.file_path })}
                            />
                            <SwapOutlined rotate={90} onClick={onFlipY} />
                            <SwapOutlined onClick={onFlipX} />
                            <RotateLeftOutlined onClick={onRotateLeft} />
                            <RotateRightOutlined onClick={onRotateRight} />
                            <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
                            <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
                          </ToolbarWrapper>
                        ),
                      }}
                    />}
                  />
              ))
            ))}
          </Box>
        ),
      },
      {
        accessorKey: "reference",
        header: "Reference Files",
        size: 250,
        Cell: ({ cell }) => (
          <Box component="span">
            {cell.getValue() && cell.getValue().map((application, index) => (
              application.file_name && application.file_name.map((fileName) => (
                <Chip
                label={`${application.name}_${fileName.file_name}`}
                sx={{ m: 0.5, height:'40px' }}
                variant="outlined"
                avatar={
                <Image
                  src={fileName.file_path}
                  preview={{
                    toolbarRender: (
                      _,
                      {
                        transform: { scale, flipX, flipY, rotate },
                        actions: {
                          onFlipY,
                          onFlipX,
                          onRotateLeft,
                          onRotateRight,
                          onZoomOut,
                          onZoomIn,
                        }
                      },
                    ) => (
                      <ToolbarWrapper size={12}>
                       <DownloadOutlined
                          onClick={() => onDownload({ rotate, flipX, flipY, filePath: fileName.file_path })}
                        />
                        <SwapOutlined rotate={90} onClick={onFlipY} />
                        <SwapOutlined onClick={onFlipX} />
                        <RotateLeftOutlined onClick={onRotateLeft} />
                        <RotateRightOutlined onClick={onRotateRight} />
                        <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
                        <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
                      </ToolbarWrapper>
                    ),
                  }}
                />}
              />
              ))
            ))}
          </Box>
        ),
      },
    ],
    []
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }} className="margin-top-8">
        <Typography color="text.primary">Administration</Typography>
        <Typography color="text.primary">Partner Application List</Typography>
      </Breadcrumbs>
      <Paper sx={{ width: "100%" }}>
        <MaterialReactTable
          columns={columns}
          data={partnerApplicationList ?? []}
          muiTableContainerProps={{ sx: { maxHeight: "calc(100vh - 220px)" } }}
          enableStickyHeader
          enableColumnOrdering
          enableColumnResizing
          columnResizeMode="onChange"
          state={{ isLoading: isLoading }}
          initialState={{
            columnPinning: {
              left: ["Name"],
              right: ["mrt-row-actions"],
            },
          }}
        />
      </Paper>
    </Box>
  );
};

export default PartnerApplicationList;
