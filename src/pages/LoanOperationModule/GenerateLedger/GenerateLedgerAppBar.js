import React, { useState, useCallback, useEffect } from "react";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  getContracts,
  generatedGLContractByContractIds,
} from "features/contract/contractSlice";
import { Backdrop, CircularProgress } from "@mui/material";
import { AppBar } from "@mui/material";
import { showErrorToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";

const GenerateLedgerAppBar = ({ selectedRows }) => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");

  const { generateGLContract } = useSelector((state) => state.contracts);

  const contractsParam = {
    is_generated_gl: false,
  };

  const handleSearchClick = useCallback(() => {
    if (searchValue !== "") {
      contractsParam.ids = searchValue;
    }
    try {
    
      dispatch(
        getContracts({
          firstFetch: true,
          params: {
            ...contractsParam,
          },
        })
      );
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleGenerateClick = useCallback(async () => {
    if (selectedRows.length === 0) {
      showErrorToast(CommonMessage.MFE00017);
    } else {
      const uuidArray = selectedRows.map((row) => {
        return row.uuid;
      });

      const newParams = {
        contract_uuids: uuidArray,
      };

      const entries = Object.entries(newParams);
      try {
        await dispatch(
          generatedGLContractByContractIds({
            params: {
              ...Object.fromEntries(entries),
            },
          })
        );
        await dispatch(
          getContracts({
            firstFetch: true,
            params: {
              is_generated_gl: false,
            },
          })
        );
      } catch (e) {
        console.log(e);
      }
    }
  }, [selectedRows, dispatch]);

  if (generateGLContract.isLoading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  const handleValueChange = (e) => {
    setSearchValue(e.target.value);
  };
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#fafafb",
        color: "black",
        boxShadow: "none",
        mb: 1,
        mt: -1,
      }}
    >
      {/* <TextField id="search-value" sx={{marginLeft: "5px"}} label="Application ID" variant="outlined"
                           size="small" onChange={handleValueChange}/>

                <Button variant="outlined" sx={{marginLeft: "5px"}} onClick={handleSearchClick}>
                    Search
                </Button> */}
      <div style={{ display : "flex" }}>
        <div style={{ alignContent : "center"}}>
          No. Selected Row(s) : {selectedRows.length}
        </div>
        <div style={{ marginLeft: "auto" }}>
          <Button variant="outlined" onClick={handleGenerateClick}>
            Generate GL
          </Button>
        </div>
      </div>
    </AppBar>
  );
};

export default React.memo(GenerateLedgerAppBar);
