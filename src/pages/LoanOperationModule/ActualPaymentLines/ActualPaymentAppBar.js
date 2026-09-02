import React, { useState, useCallback } from "react";
import CustomAppBar from "components/CustomAppBar";
import ActualPaymentAppBarSearchInput from "./ActualPaymentAppBarSearchInput";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import ActualPaymentAppBarCategories from "./ActualPaymentAppBarCategories";
import { getAllActualPaymentLines } from "features/actualPaymentLines/actualPaymentLinesSlice";
import ActualPaymentLineExcelExportButton from "./ActualPaymentLineExcelExportButton";
import { AppBar } from "@mui/material";

const ActualPaymentAppBar = ({transformedSearchDataResponse}) => {
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const handleSearchClick = useCallback(() => {
    const newParams = {};

    if (category !== "") {
      newParams.category_id = category?.id;
      setCategoryId(category?.id);
    }

    if (searchValue !== "") {
      newParams.ids = searchValue;
    }

    const entries = Object.entries(newParams);

    dispatch(
      getAllActualPaymentLines({
        params: {
          ...Object.fromEntries(entries),
        },
      })
    );
  }, [category, searchValue, dispatch]);

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
      {/* <ActualPaymentAppBarSearchInput onIdsChange={setSearchValue} />
        <ActualPaymentAppBarCategories onCategoryChange={setCategory} />
        <Button
          variant="outlined"
          onClick={handleSearchClick}
          sx={{ marginLeft: "10px" }}
        >
          Search
        </Button> */}
      <div style={{ marginLeft: "auto" }}>
        <ActualPaymentLineExcelExportButton
          applicationIds={searchValue}
          categoryId={categoryId}
          transformedSearchDataResponse={transformedSearchDataResponse}
        />
      </div>
    </AppBar>
  );
};

export default React.memo(ActualPaymentAppBar);
