import React from 'react';
import { Modal } from 'antd';

const ImageModal = ({ imageUrl, onClose }) => {
  return (
    <Modal
      visible={!!imageUrl}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      width={300}
      height={400}
      bodyStyle={{ maxHeight: '80vh', overflowY: 'auto' }} 
    >
      <img src={imageUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '80vh', padding: "30px" }} />
    </Modal>
  );
};

export default ImageModal;


// import React from 'react';
// import { Modal } from 'antd';
// import {
//   DownloadOutlined,
//   RotateLeftOutlined,
//   RotateRightOutlined,
//   SwapOutlined,
//   ZoomInOutlined,
//   ZoomOutOutlined,
// } from "@ant-design/icons";
// import { Box } from "@mui/material";
// import { Image, Space } from "antd";
// import { styled } from "@mui/material/styles";

// const ToolbarWrapper = styled(Space)`
//   & {
//     display: flex;
//     align-items: center;
//     padding: 0 24px;
//     background-color: rgba(0, 0, 0, 0.1);
//     border-radius: 100px;
//     color: #fff;
//     font-size: 20px;
//   }

//   & .anticon {
//     padding: 12px;
//     cursor: pointer;
//   }

//   & .anticon[disabled] {
//     cursor: not-allowed;
//     opacity: 0.3;
//   }

//   & .anticon:hover {
//     opacity: 0.3;
//   }
// `;

// const ImageModal = ({ imageUrl, onClose }) => {
//   return (
//     <Modal
//       visible={!!imageUrl}
//       onCancel={onClose}
//       footer={null}
//       destroyOnClose
//       width={300}
//       height={400}
//       bodyStyle={{ maxHeight: '80vh', overflowY: 'auto' }} 
//     >
//       <Image
//         src={imageUrl}
//         preview={{
//           toolbarRender: (
//             _,
//             {
//               transform: { scale, flipX, flipY, rotate },
//               actions: {
//                 onFlipY,
//                 onFlipX,
//                 onRotateLeft,
//                 onRotateRight,
//                 onZoomOut,
//                 onZoomIn,
//               },
//             },
//             a
//           ) => (
//             <ToolbarWrapper size={12}>
//               <DownloadOutlined
//                 //onClick={() => onDownload({ rotate, flipX, flipY })}
//               />
//               <SwapOutlined rotate={90} onClick={onFlipY} />
//               <SwapOutlined onClick={onFlipX} />
//               <RotateLeftOutlined onClick={onRotateLeft} />
//               <RotateRightOutlined onClick={onRotateRight} />
//               <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
//               <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
//             </ToolbarWrapper>
//           ),
//         }}
//       />
//     </Modal>
//   );
// };

// export default ImageModal;

