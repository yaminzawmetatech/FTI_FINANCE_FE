import * as React from "react";
import DownloadIcon from '@mui/icons-material/Download';
import { IconButton, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import TableRowMenu from "components/TableRowMenu";
import axiosInstance from "core/services/api/axiosInstance";
import { saveAs } from "file-saver";
import { showErrorToast } from "common/ToastMessage";
import { useSelector } from "react-redux";

const ContractTableRowMenu = (props) => {
  const { data } = props;
 
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { contract } = useSelector(
    (state) => state.contractDetail
  );

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDownload = async(data) => {
    try{
      const responseDoc = await axiosInstance.get(
        `/export-contract-demand-letter/${data?.uuid}`,
        {
          responseType: "arraybuffer",
        }
      );
      
      const blob = new Blob([responseDoc.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob,  contract?.application?.application_id + "_" +  data?.demand_letter_type +  "_" +  data?.letter_no + ".doc");
    }catch(error){
      console.error("Error exporting data:", error);
      showErrorToast(error);
    }
  }

  return (
    <>
      <IconButton
        size="small"
        id="basic-button"
        aria-controls={open ? "basic-menuItem" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          "& .MuiSvgIcon-root": {
            fontSize: "1rem",
          },
        }}
      >
        <MoreVert />
      </IconButton>
      <TableRowMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            handleDownload(data);
          }}
          disableRipple
        >
          <DownloadIcon />
          Download
        </MenuItem>
      </TableRowMenu>
    </>
  );
};

export default React.memo(ContractTableRowMenu);
