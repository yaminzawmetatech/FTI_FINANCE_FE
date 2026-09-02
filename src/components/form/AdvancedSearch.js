import React, { useEffect, useState, useMemo } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useForm } from "react-hook-form";
import { Grid, Button } from "@mui/material";
import dayjs from "dayjs";
import { getMobCategory, getProjectCategory } from "features/projectcategory/projectcategorySlice";
import { useDispatch, useSelector } from "react-redux";
import { getAddressTownships } from "features/address/Township/addressTownshipSlice";
import { getAddressWards } from "features/address/Ward/addressWardSlice";
import { getUsers } from "features/users/usersSlice";
import { AppBar, Toolbar } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Checkbox from "@mui/material/Checkbox";
import { getSubCategory } from "features/subcategory/subcategorySlice";
import { getAddressStates } from "features/address/State/addressStateSlice";
import { getAllocateActivities } from "features/AllocateActivities/allocateActivitiesSlice";
import { getFollowUpResults } from "features/FollowUpResult/followUpResultSlice";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { getBankAccountCodes } from "features/cashDepositSetup/AccountCode/accountCodeSlice";
import { getDealerByDealerType } from "features/dealer/dealerSlice";
import { getAllCollateralTypes } from "features/collateralTypesSetup/collateralTypesSetupSlice";
import { CONTRACT_STATUS } from "constants/contractStatus";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const AdvancedSearch = ({
  options,
  status,
  onSearch,
  searchValue,
  searchCategory,
  searchValueDate,
  mode,
  autoSearchByClick,
  searchSingleField
}) => {
  const dispatch = useDispatch();

  const IS_TRUE_FALSE = [
    { id: "1", name: "Yes" },
    { id: "0", name: "No" },
  ];

  const IS_TRUE = [{ id: "1", name: "Yes" }];

  const PAYMENT_STATUS = [
    {id: "paid", name: "paid"},
    {id: "unpaid", name: "unpaid"},
  ];

  const DEALER_TYPE = [
    { id: "Normal", name: "Normal" },
    { id: "Special", name: "Special" },
  ];

  const ET_TYPE = [
    { id: "Before", name: "Before" },
    { id: "Due", name: "Due" },
    { id: "After", name: "After" },
  ];

  const RENEWAL_TYPE = [
    { id: "License", name: "License" },
    { id: "Insurance", name: "Insurance" },
  ];

  const DEALER_CONTACT_PERSON_TYPE = [
    { id: "Authorized Signer", name: "Authorized Signer" },
    { id: "Main Contact", name: "Main Contact" },
    { id: "Disbursement", name: "Disbursement" },
    { id: "Agent", name: "Agent" },
    { id: "Main Person for Credit", name: "Main Person for Credit" },
  ]

  const SURVEY_TYPES = [
    { id: "inhouse_survey", name: "In House Survey" },
    { id: "field_survey", name: "Field Survey" },
  ];

  // const CURRENT_STEP = [
  //   { id: 2, name: "Loan" },
  //   { id: 3, name: "Field Survey" },
  // ]

  const [filteredOptions, setFilteredOptions] = useState(options); // filteredOptions state
  const [selectedCategory, setSelectedCategory] = useState();

  const { handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      filters: [{ filtered_by: "", value1: "", value2: "", type: "" }],
    },
  });

  const { users } = useSelector((state) => state.user);

  const { projectCategories } = useSelector((state) => state.projectCategories);

  const { subCategories } = useSelector((state) => state.subCategories);

  const { addressTownships } = useSelector((state) => state.addressTownships);

  const { addressStates } = useSelector((state) => state.addressStates);

  const { addressWards } = useSelector((state) => state.addressWards);

  const { dealerGroups } = useSelector((state) => state.dealerGroups);

  const { dealers } = useSelector((state) => state.dealers);

  const { dealersByType } = useSelector((state) => state.dealers);

  const { dealerContactPeople } = useSelector((state) => state.dealerContactPeople);

  const { bankAccountCodes } = useSelector((state) => state.accountCodes);

  const { creditCriteriaTypes } = useSelector(
    (state) => state.creditCriteriaTypes
  );

  const { allocateActivities } = useSelector(
    (state) => state.allocateActivities
  );

  const { collateralTypes } = useSelector(
    (state) => state.collateralTypes
  );



  const { followUpResults } = useSelector((state) => state.followUpResults);
  let subCategoriesArr = [];
  const todayDate = dayjs(Date.now());

  subCategoriesArr = useMemo(() => {
    if (selectedCategory) {
      return subCategories.filter(
        (item) => item?.category_id === selectedCategory
      );
    }
    return subCategories;
  }, [subCategories, selectedCategory]);

  const filters = watch("filters");

  let dateValue = autoSearchByClick === "total_allocated" ? dayjs() : null;

  useEffect(() => {
    const searchValueArr = [];

    if (searchValue) {
      searchValueArr.push(searchValue);
      const filters = [
        {
          filtered_by: "status_array",
          value1: searchValueArr,
          value2: "",
          type: "autocomplete_status",
        },
      ];
      setValue("filters", filters);
    }
  }, [searchValue]);

  useEffect(() => {
    if (
      autoSearchByClick === "promised_count" ||
      autoSearchByClick === "with_response_count" ||
      autoSearchByClick === "without_response_count"
    ) {
      let auto_search_type = "";
      if (autoSearchByClick === "promised_count") {
        auto_search_type = "promise";
      } else if (autoSearchByClick === "with_response_count") {
        auto_search_type = "no_promise";
      } else if (autoSearchByClick === "without_response_count") {
        auto_search_type = "no_activities";
      }

      const filters = [
        {
          filtered_by: "due_month",
          value1: searchValueDate
            ? searchValueDate.format("YYYY-MM")
            : todayDate.format("YYYY-MM"),
          value2: "",
          type: "current_date_month",
        },
        {
          filtered_by: auto_search_type,
          value1: "1",
          value2: "",
          type: "autocomplete_is_true",
        },
      ];
      setValue("filters", filters);
    } else if (autoSearchByClick === "total_allocated") {
      const filters = [
        {
          filtered_by: "due_month",
          value1: searchValueDate
            ? searchValueDate.format("YYYY-MM")
            : todayDate.format("YYYY-MM"),
          value2: "",
          type: "current_date_month",
        },
        {
          filtered_by: "assigned_date",
          value1: searchValueDate.format("YYYY-MM-DD"),
          value2: searchValueDate.format("YYYY-MM-DD"),
          type: "date",
        },
      ];
      setValue("filters", filters);
    }
  }, [autoSearchByClick]);

  useEffect(() => {
    if (searchValueDate) {
      const filters = [
        {
          filtered_by: "due_month",
          value1: searchValueDate.format("YYYY-MM"),
          value2: "",
          type: "current_date_month",
        },
      ];
      setValue("filters", filters);
    }
  }, []);

  useEffect(() => {
    if (searchCategory) {
      setSelectedCategory(parseInt(searchCategory));
    }
  }, [searchCategory]);

  const onSubmit = (data) => {
    if (onSearch) {
      onSearch(data.filters); // pay filters array to child component
    }
  };

  // add function
  const handleAddFilter = () => {
    setValue("filters", [
      ...filters,
      { filtered_by: "", value1: "", value2: "", type: "" },
    ]);
  };

  // remove function
  const handleRemoveFilter = (index) => {
    setValue(
      "filters",
      filters.filter((_, i) => i !== index)
    );

    const remainingFilters = filters.filter((_, i) => i !== index);
    const tempFilteredOptions = options.filter((opt) =>
      remainingFilters.every((item) => item.filtered_by !== opt.id)
    );
    setFilteredOptions(tempFilteredOptions); // re_add removed option in filtered aray
  };

  //filter by
  const handleFilteredChange = (index, selectedValue) => {
    const option = options.find((option) => option.id === selectedValue);
    const updatedFilters = [...filters];
    updatedFilters[index].filtered_by = option?.id || "";
    updatedFilters[index].type = option?.type || "";
    setValue("filters", updatedFilters);

    // for autocomplete
    if (option?.type === "autocomplete_category") {
      dispatch(getProjectCategory());
    } else if (option?.type === "autocomplete_mob_category") {
      dispatch(getMobCategory());
    }
    else if (option?.type === "autocomplete_sub_category") {
      dispatch(getSubCategory());
    } else if (option?.type === "autocomplete_state") {
      dispatch(getAddressStates());
    } else if (option?.type === "autocomplete_township") {
      dispatch(getAddressTownships());
    } else if (option?.type === "autocomplete_ward") {
      dispatch(getAddressWards());
    } else if (option?.type === "autocomplete_user") {
      dispatch(getUsers());
    } else if (option?.type === "autocomplete_ihco") {
      dispatch(getUsers("IHCO"));
    } else if (option?.type === "autocomplete_activity") {
      dispatch(getAllocateActivities());
    } else if (option?.type === "autocomplete_follow_up_result") {
      dispatch(getFollowUpResults());
    } else if (option?.type === "autocomplete_bank_account_code") {
      dispatch(getBankAccountCodes());
    } else if (option?.type === "autocomplete_dealers_by_type") {
      dispatch(getDealerByDealerType(["School", "Travel"]));
    } else if (option?.type === "autocomplete_collateral_type") {
      dispatch(getAllCollateralTypes({ params: {} }));
    } else if (option?.type === "autocomplete_cmco") {
      dispatch(getUsers("CMCO"));
    }
    // remove selected option in filtered aray
    const tempFilteredOptions = options.filter((opt) =>
      updatedFilters.every((item) => item.filtered_by !== opt.id)
    );

    setFilteredOptions(tempFilteredOptions);
  };

  const handleSelectValueChange = (index, selectedValue) => {
    const updatedFilters = [...filters];
    updatedFilters[index].value1 = selectedValue || "";
    setValue("filters", updatedFilters);
  };

  const handleSelectStatusChange = (index, selectedValues) => {
    const updatedFilters = [...filters];
    updatedFilters[index].value1 =
      selectedValues.map((value) => value.id) || [];
    setValue("filters", updatedFilters);
  };

  const handleInputChange = (index, inputValue) => {
    const updatedFilters = [...filters];
    updatedFilters[index].value1 = inputValue;
    setValue("filters", updatedFilters);
  };

  const handleMonthPickerChange = (index, date) => {
    const formattedDate = date ? dayjs(date).format("YYYY-MM") : "";
    const updatedFilters = [...filters];
    updatedFilters[index].value1 = formattedDate;
    setValue("filters", updatedFilters);
  };

  const handleCurrentMonthPickerChange = (index, date) => {
    const formattedDate = date ? dayjs(date).format("YYYY-MM") : "";
    const updatedFilters = [...filters];
    updatedFilters[index].value1 = formattedDate;
    setValue("filters", updatedFilters);
  };

  const handleFromDateChange = (index, date) => {
    const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : "";
    const updatedFilters = [...filters];
    updatedFilters[index].value1 = formattedDate;
    setValue("filters", updatedFilters);
  };

  const handleToDateChange = (index, date) => {
    const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : "";
    const updatedFilters = [...filters];
    updatedFilters[index].value2 = formattedDate;
    setValue("filters", updatedFilters);
  };

  const handleFromDateTimeChange = (index, date) => {
    const formattedDate = date ? dayjs(date).format("YYYY-MM-DD HH:mm:ss") : "";
    const updatedFilters = [...filters];
    updatedFilters[index].value1 = formattedDate;
    setValue("filters", updatedFilters);
  };

  const handleMonthYearChange = (index, date) => {
    const formattedDate = date ? dayjs(date).format("YYYY-MM") : "";
    const updatedFilters = [...filters];
    updatedFilters[index].value1 = formattedDate;
    setValue("filters", updatedFilters);
  };

  const handleToDateTimeChange = (index, date) => {
    const formattedDate = date ? dayjs(date).format("YYYY-MM-DD HH:mm:ss") : "";
    const updatedFilters = [...filters];
    updatedFilters[index].value2 = formattedDate;
    setValue("filters", updatedFilters);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#fafafb",
          color: "black",
          boxShadow: "none",
          mb: 2,
          borderBottom:
            mode === "divide_mode" ? "none" : "1px solid rgb(167, 173, 182)",
          mt: -1,
          paddingTop: "10px",
          paddingBottom: mode === "divide_mode" ? "0px" : "10px",
        }}
      >
        {filters.map((filter, index) => (
          <Grid
            container
            spacing={1}
            alignItems="center"
            key={index}
            sx={{ marginTop: "1px" }}
          >
            {/* <Grid item xs={5} sm={4} md={2} lg={2}> */}
            <Grid
              item
              xs={mode === "divide_mode" ? 5 : 5}
              sm={mode === "divide_mode" ? 4 : 4}
              md={mode === "divide_mode" ? 3 : 2}
              lg={mode === "divide_mode" ? 3 : 2}
            >
              <Autocomplete
                options={filteredOptions}
                getOptionLabel={(option) => option.name || ""}
                value={
                  options.find((option) => option.id === filter.filtered_by) ||
                  null
                }
                onChange={(e, newValue) =>
                  handleFilteredChange(index, newValue?.id || "")
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Filtered By"
                    variant="outlined"
                  />
                )}
                size="small"
                name="filtered_test"
              />
            </Grid>
            {filter.type === "text_field" && (
              //<Grid item xs={5} sm={4} md={2} lg={2}>
              <Grid
                item
                xs={mode === "divide_mode" ? 5 : 5}
                sm={mode === "divide_mode" ? 4 : 4}
                md={mode === "divide_mode" ? 3 : 2}
                lg={mode === "divide_mode" ? 3 : 2}
              >
                <TextField
                  value={filter.value1}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  label="Value"
                  variant="outlined"
                  size="small"
                />
              </Grid>
            )}
            {filter.type === "autocomplete_status" && (
              //<Grid item xs={5} sm={4}>
              <Grid
                item
                xs={mode === "divide_mode" ? 5 : 5}
                sm={mode === "divide_mode" ? 4 : 4}
              // md={mode === "divide_mode" ?? 3}
              // lg={mode === "divide_mode" ?? 3}
              >
                <Autocomplete
                  multiple
                  limitTags={mode === "divide_mode" ? 1 : 2}
                  id="multiple-limit-tags"
                  disableCloseOnSelect
                  options={status}
                  getOptionLabel={(option) => option.name || ""}
                  value={status.filter((option) =>
                    filter.value1.includes(option.id)
                  )}
                  onChange={(e, newValue) =>
                    handleSelectStatusChange(index, newValue || [])
                  }
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.name}
                    </li>
                  )}
                  size="small"
                  renderInput={(params) => (
                    <TextField {...params} label="Status" />
                  )}
                />
              </Grid>
            )}
            {filter.type === "autocomplete_is_true_false" && (
              //<Grid item xs={5} sm={4} md={2} lg={2}>
              <Grid
                item
                xs={mode === "divide_mode" ? 5 : 5}
                sm={mode === "divide_mode" ? 4 : 4}
                md={mode === "divide_mode" ? 3 : 2}
                lg={mode === "divide_mode" ? 3 : 2}
              >
                <Autocomplete
                  options={IS_TRUE_FALSE}
                  getOptionLabel={(option) => option.name || ""}
                  value={
                    IS_TRUE_FALSE.find((item) => item.id === filter.value1) ||
                    null
                  }
                  onChange={(e, newValue) =>
                    handleSelectValueChange(index, newValue?.id || "")
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="" variant="outlined" />
                  )}
                  size="small"
                />
              </Grid>
            )}
            {filter.type === "autocomplete_is_true" && (
              //<Grid item xs={5} sm={4} md={2} lg={2}>
              <Grid
                item
                xs={mode === "divide_mode" ? 5 : 5}
                sm={mode === "divide_mode" ? 4 : 4}
                md={mode === "divide_mode" ? 3 : 2}
                lg={mode === "divide_mode" ? 3 : 2}
              >
                <Autocomplete
                  options={IS_TRUE}
                  getOptionLabel={(option) => option.name || ""}
                  value={
                    IS_TRUE.find((item) => item.id === filter.value1) || null
                  }
                  onChange={(e, newValue) =>
                    handleSelectValueChange(index, newValue?.id || "")
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="" variant="outlined" />
                  )}
                  size="small"
                />
              </Grid>
            )}
            {filter.type === "autocomplete_payment_status" && (
              //<Grid item xs={5} sm={4} md={2} lg={2}>
              <Grid
                item
                xs={mode === "divide_mode" ? 5 : 5}
                sm={mode === "divide_mode" ? 4 : 4}
                md={mode === "divide_mode" ? 3 : 2}
                lg={mode === "divide_mode" ? 3 : 2}
              >
                <Autocomplete
                  options={PAYMENT_STATUS}
                  getOptionLabel={(option) => option.name || ""}
                  value={
                    PAYMENT_STATUS.find((item) => item.id === filter.value1) ||
                    null
                  }
                  onChange={(e, newValue) =>
                    handleSelectValueChange(index, newValue?.id || "")
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="" variant="outlined" />
                  )}
                  size="small"
                />
              </Grid>
            )}
            {(filter.type === "autocomplete_user" ||
              filter.type === "autocomplete_ihco") && (
                //<Grid item xs={5} sm={4} md={2} lg={2}>
                <Grid
                  item
                  xs={mode === "divide_mode" ? 5 : 5}
                  sm={mode === "divide_mode" ? 4 : 4}
                  md={mode === "divide_mode" ? 3 : 2}
                  lg={mode === "divide_mode" ? 3 : 2}
                >
                  <Autocomplete
                    options={users}
                    getOptionLabel={(option) => option.user_name || ""}
                    value={
                      users.find((item) => item.id === filter.value1) || null
                    }
                    onChange={(e, newValue) =>
                      handleSelectValueChange(index, newValue?.id || "")
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="User" variant="outlined" />
                    )}
                    size="small"
                  />
                </Grid>
              )}
            {filter.type === "autocomplete_category" && (
              //<Grid item xs={5} sm={4} md={2} lg={2}>
              <Grid
                item
                xs={mode === "divide_mode" ? 5 : 5}
                sm={mode === "divide_mode" ? 4 : 4}
                md={mode === "divide_mode" ? 3 : 2}
                lg={mode === "divide_mode" ? 3 : 2}
              >
                <Autocomplete
                  options={projectCategories}
                  getOptionLabel={(option) => option.name || ""}
                  value={
                    projectCategories.find(
                      (item) => item.id === filter.value1
                    ) || null
                  }
                  onChange={(e, newValue) => {
                    handleSelectValueChange(index, newValue?.id || "");
                    setSelectedCategory(newValue?.id);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Category"
                      variant="outlined"
                    />
                  )}
                  size="small"
                />
              </Grid>
            )}
            {filter.type === "autocomplete_survey" && (
              <Grid
                item
                xs={mode === "divide_mode" ? 5 : 5}
                sm={mode === "divide_mode" ? 4 : 4}
                md={mode === "divide_mode" ? 3 : 2}
                lg={mode === "divide_mode" ? 3 : 2}
              >
                <Autocomplete
                  options={SURVEY_TYPES}
                  getOptionLabel={(option) => option.name || ""}
                  value={
                    SURVEY_TYPES.find((item) => item.id === filter.value1) || null
                  }
                  onChange={(e, newValue) => {
                    handleSelectValueChange(index, newValue?.id || "");
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Survey Type"
                      variant="outlined"
                    />
                  )}
                  size="small"
                />
              </Grid>
            )}
            {filter.type === "autocomplete_mob_category" && (
              //<Grid item xs={5} sm={4} md={2} lg={2}>
              <Grid
                item
                xs={mode === "divide_mode" ? 5 : 5}
                sm={mode === "divide_mode" ? 4 : 4}
                md={mode === "divide_mode" ? 3 : 2}
                lg={mode === "divide_mode" ? 3 : 2}
              >
                <Autocomplete
                  options={projectCategories}
                  getOptionLabel={(option) => option.name || ""}
                  value={
                    projectCategories.find(
                      (item) => item.id === filter.value1
                    ) || null
                  }
                  onChange={(e, newValue) => {
                    handleSelectValueChange(index, newValue?.id || "");
                    setSelectedCategory(newValue?.id);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Category"
                      variant="outlined"
                    />
                  )}
                  size="small"
                />
              </Grid>
            )}
            {filter.type === "autocomplete_criteria_type" && (
              //<Grid item xs={5} sm={4} md={2} lg={2}>
              <Grid
                item
                xs={mode === "divide_mode" ? 5 : 5}
                sm={mode === "divide_mode" ? 4 : 4}
                md={mode === "divide_mode" ? 3 : 2}
                lg={mode === "divide_mode" ? 3 : 2}
              >
                <Autocomplete
                  options={creditCriteriaTypes}
                  getOptionLabel={(option) => option.value || ""}
                  value={
                    creditCriteriaTypes.find(
                      (item) => item.value === filter.value1
                    ) || null
                  }
                  onChange={(e, newValue) => {
                    handleSelectValueChange(index, newValue?.value || "");
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Type" variant="outlined" />
                  )}
                  size="small"
                />
              </Grid>
            )}
            {filter.type === "autocomplete_sub_category" && (
              //<Grid item xs={5} sm={4} md={2} lg={2}>
              <Grid
                item
                xs={mode === "divide_mode" ? 5 : 5}
                sm={mode === "divide_mode" ? 4 : 4}
                md={mode === "divide_mode" ? 3 : 2}
                lg={mode === "divide_mode" ? 3 : 2}
              >
                <Autocomplete
                  options={subCategoriesArr}
                  getOptionLabel={(option) => option.name || ""}
                  value={
                    subCategoriesArr.find(
                      (item) => item.id === filter.value1
                    ) || null
                  }
                  onChange={(e, newValue) =>
                    handleSelectValueChange(index, newValue?.id || "")
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Sub Category"
                      variant="outlined"
                    />
                  )}
                  size="small"
                />
              </Grid>
            )}
            {filter.type === "autocomplete_state" && (
              //<Grid item xs={5} sm={4} md={2} lg={2}>
              <Grid
                item
                xs={mode === "divide_mode" ? 5 : 5}
                sm={mode === "divide_mode" ? 4 : 4}
                md={mode === "divide_mode" ? 3 : 2}
                lg={mode === "divide_mode" ? 3 : 2}
              >
                <Autocomplete
                  options={addressStates}
                  getOptionLabel={(option) => option.name || ""}
                  value={
                    addressStates.find((item) => item.id === filter.value1) ||
                    null
                  }
                  onChange={(e, newValue) =>
                    handleSelectValueChange(index, newValue?.id || "")
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="State" variant="outlined" />
                  )}
                  size="small"
                />
              </Grid>
            )}
            {filter.type === "autocomplete_township" && (
              //<Grid item xs={5} sm={4} md={2} lg={2}>
              <Grid
                item
                xs={mode === "divide_mode" ? 5 : 5}
                sm={mode === "divide_mode" ? 4 : 4}
                md={mode === "divide_mode" ? 3 : 2}
                lg={mode === "divide_mode" ? 3 : 2}
              >
                <Autocomplete
                  options={addressTownships}
                  getOptionLabel={(option) => option.name || ""}
                  value={
                    addressTownships.find(
                      (item) => item.id === filter.value1
                    ) || null
                  }
                  onChange={(e, newValue) =>
                    handleSelectValueChange(index, newValue?.id || "")
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Township"
                      variant="outlined"
                    />
                  )}
                  size="small"
                />
              </Grid>
            )}
            {filter.type === "autocomplete_ward" && (
              //<Grid item xs={5} sm={4} md={2} lg={2}>
              <Grid
                item
                xs={mode === "divide_mode" ? 5 : 5}
                sm={mode === "divide_mode" ? 4 : 4}
                md={mode === "divide_mode" ? 3 : 2}
                lg={mode === "divide_mode" ? 3 : 2}
              >
                <Autocomplete
                  options={addressWards}
                  getOptionLabel={(option) => option.name || ""}
                  value={
                    addressWards.find((item) => item.id === filter.value1) ||
                    null
                  }
                  onChange={(e, newValue) =>
                    handleSelectValueChange(index, newValue?.id || "")
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Ward" variant="outlined" />
                  )}
                  size="small"
                />
              </Grid>
            )}
            {filter.type === "autocomplete_activity" && (
              //<Grid item xs={5} sm={4} md={2} lg={2}>
              <Grid
                item
                xs={mode === "divide_mode" ? 5 : 5}
                sm={mode === "divide_mode" ? 4 : 4}
                md={mode === "divide_mode" ? 3 : 2}
                lg={mode === "divide_mode" ? 3 : 2}
              >
                <Autocomplete
                  options={allocateActivities}
                  getOptionLabel={(option) => option.name || ""}
                  value={
                    allocateActivities.find(
                      (item) => item.id === filter.value1
                    ) || null
                  }
                  onChange={(e, newValue) =>
                    handleSelectValueChange(index, newValue?.id || "")
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Activity"
                      variant="outlined"
                    />
                  )}
                  size="small"
                />
              </Grid>
            )}
            {filter.type === "autocomplete_follow_up_result" && (
              //<Grid item xs={5} sm={4} md={2} lg={2}>
              <Grid
                item
                xs={mode === "divide_mode" ? 5 : 5}
                sm={mode === "divide_mode" ? 4 : 4}
                md={mode === "divide_mode" ? 3 : 2}
                lg={mode === "divide_mode" ? 3 : 2}
              >
                <Autocomplete
                  options={followUpResults}
                  getOptionLabel={(option) => option.name || ""}
                  value={
                    followUpResults.find((item) => item.id === filter.value1) ||
                    null
                  }
                  onChange={(e, newValue) =>
                    handleSelectValueChange(index, newValue?.id || "")
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Follow Up Result"
                      variant="outlined"
                    />
                  )}
                  size="small"
                />
              </Grid>
            )}
            {filter.type === "autocomplete_bank_account_code" && (
              //<Grid item xs={5} sm={4} md={2} lg={2}>
              <Grid
                item
                xs={mode === "divide_mode" ? 5 : 5}
                sm={mode === "divide_mode" ? 4 : 4}
                md={mode === "divide_mode" ? 3 : 2}
                lg={mode === "divide_mode" ? 3 : 2}
              >
                <Autocomplete
                  options={bankAccountCodes}
                  getOptionLabel={(option) => option.name || ""}
                  value={
                    bankAccountCodes?.find((item) => item.id === filter.value1) ||
                    null
                  }
                  onChange={(e, newValue) =>
                    handleSelectValueChange(index, newValue?.id || "")
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="" variant="outlined" />
                  )}
                  size="small"
                />
              </Grid>
            )}
            {filter.type === "autocomplete_dealer_type" && (
              //<Grid item xs={5} sm={4} md={2} lg={2}>
              <Grid
                item
                xs={mode === "divide_mode" ? 5 : 5}
                sm={mode === "divide_mode" ? 4 : 4}
                md={mode === "divide_mode" ? 3 : 2}
                lg={mode === "divide_mode" ? 3 : 2}
              >
                <Autocomplete
                  options={DEALER_TYPE}
                  getOptionLabel={(option) => option.name || ""}
                  value={
                    DEALER_TYPE.find((item) => item.id === filter.value1) ||
                    null
                  }
                  onChange={(e, newValue) =>
                    handleSelectValueChange(index, newValue?.id || "")
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="" variant="outlined" />
                  )}
                  size="small"
                />
              </Grid>
            )}
            {filter.type === "autocomplete_et_type" && (
              //<Grid item xs={5} sm={4} md={2} lg={2}>
              <Grid
                item
                xs={mode === "divide_mode" ? 5 : 5}
                sm={mode === "divide_mode" ? 4 : 4}
                md={mode === "divide_mode" ? 3 : 2}
                lg={mode === "divide_mode" ? 3 : 2}
              >
                <Autocomplete
                  options={ET_TYPE}
                  getOptionLabel={(option) => option.name || ""}
                  value={
                    ET_TYPE.find((item) => item.id === filter.value1) ||
                    null
                  }
                  onChange={(e, newValue) =>
                    handleSelectValueChange(index, newValue?.id || "")
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="" variant="outlined" />
                  )}
                  size="small"
                />
              </Grid>
            )}
            {filter.type === "autocomplete_dealers_by_type" && (
              //<Grid item xs={5} sm={4} md={2} lg={2}>
              <Grid
                item
                xs={mode === "divide_mode" ? 5 : 5}
                sm={mode === "divide_mode" ? 4 : 4}
                md={mode === "divide_mode" ? 3 : 2}
                lg={mode === "divide_mode" ? 3 : 2}
              >
                <Autocomplete
                  options={dealersByType}
                  getOptionLabel={(option) => option.name || ""}
                  value={
                    dealersByType.find((item) => item.id === filter.value1) ||
                    null
                  }
                  onChange={(e, newValue) =>
                    handleSelectValueChange(index, newValue?.id || "")
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="" variant="outlined" />
                  )}
                  size="small"
                />
              </Grid>
            )}
            {filter.type === "autocomplete_dealer_group" && (
              //<Grid item xs={5} sm={4} md={2} lg={2}>
              <Grid
                item
                xs={mode === "divide_mode" ? 5 : 5}
                sm={mode === "divide_mode" ? 4 : 4}
                md={mode === "divide_mode" ? 3 : 2}
                lg={mode === "divide_mode" ? 3 : 2}
              >
                <Autocomplete
                  options={dealerGroups ?? []}
                  getOptionLabel={(option) => option.name || ""}
                  value={
                    dealerGroups?.find((item) => item.id === filter.value1) ||
                    null
                  }
                  onChange={(e, newValue) =>
                    handleSelectValueChange(index, newValue?.id || "")
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="" variant="outlined" />
                  )}
                  size="small"
                />
              </Grid>
            )}
            {filter.type === "autocomplete_dealer_person_type" && (
              //<Grid item xs={5} sm={4} md={2} lg={2}>
              <Grid
                item
                xs={mode === "divide_mode" ? 5 : 5}
                sm={mode === "divide_mode" ? 4 : 4}
                md={mode === "divide_mode" ? 3 : 2}
                lg={mode === "divide_mode" ? 3 : 2}
              >
                <Autocomplete
                  options={DEALER_CONTACT_PERSON_TYPE}
                  getOptionLabel={(option) => option.name || ""}
                  value={
                    DEALER_CONTACT_PERSON_TYPE.find((item) => item.id === filter.value1) ||
                    null
                  }
                  onChange={(e, newValue) =>
                    handleSelectValueChange(index, newValue?.id || "")
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="" variant="outlined" />
                  )}
                  size="small"
                />
              </Grid>
            )}
            {filter.type === "autocomplete_dealer" && (
              //<Grid item xs={5} sm={4} md={2} lg={2}>
              <Grid
                item
                xs={mode === "divide_mode" ? 5 : 5}
                sm={mode === "divide_mode" ? 4 : 4}
                md={mode === "divide_mode" ? 3 : 2}
                lg={mode === "divide_mode" ? 3 : 2}
              >
                <Autocomplete
                  options={dealers ?? []}
                  getOptionLabel={(option) => option.name || ""}
                  value={
                    dealers.find((item) => item.id === filter.value1) ||
                    null
                  }
                  onChange={(e, newValue) =>
                    handleSelectValueChange(index, newValue?.id || "")
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="" variant="outlined" />
                  )}
                  size="small"
                />
              </Grid>
            )}
            {filter.type === "date" && (
              <>
                {/* <Grid item xs={5} sm={4} md={2} lg={2}> */}
                <Grid
                  item
                  xs={mode === "divide_mode" ? 5 : 5}
                  sm={mode === "divide_mode" ? 4 : 4}
                  md={mode === "divide_mode" ? 3 : 2}
                  lg={mode === "divide_mode" ? 3 : 2}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      slotProps={{ textField: { size: "small" } }}
                      label="From Date"
                      onChange={(date) => handleFromDateChange(index, date)}
                      //value={filter.value1 ? dayjs(filter.value1).toDate() : null}
                      value={
                        filter.filtered_by === "assigned_date"
                          ? dateValue
                          : null
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
                {/* <Grid item xs={5} sm={4} md={2} lg={2}> */}
                <Grid
                  item
                  xs={mode === "divide_mode" ? 5 : 5}
                  sm={mode === "divide_mode" ? 4 : 4}
                  md={mode === "divide_mode" ? 3 : 2}
                  lg={mode === "divide_mode" ? 3 : 2}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      slotProps={{ textField: { size: "small" } }}
                      label="To Date"
                      onChange={(date) => handleToDateChange(index, date)}
                      //value={filter.value2 ? dayjs(filter.value2).toDate() : null}
                      value={
                        filter.filtered_by === "assigned_date"
                          ? dateValue
                          : null
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
              </>
            )}
            {filter.type === "date_month" && (
              // <Grid item xs={2}>
              <Grid
                item
                xs={mode === "divide_mode" ? 5 : 2}
                sm={mode === "divide_mode" ? 4 : 2}
                md={mode === "divide_mode" ? 3 : 2}
                lg={mode === "divide_mode" ? 3 : 2}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    views={["year", "month"]}
                    slotProps={{ textField: { size: "small" } }}
                    label="Month"
                    onChange={(date) => handleMonthPickerChange(index, date)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
            )}
            {filter.type === "current_date_month" && (
              //<Grid item xs={2}>
              <Grid
                item
                xs={mode === "divide_mode" ? 5 : 2}
                sm={mode === "divide_mode" ? 4 : 2}
                md={mode === "divide_mode" ? 3 : 2}
                lg={mode === "divide_mode" ? 3 : 2}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    views={["year", "month"]}
                    slotProps={{ textField: { size: "small" } }}
                    label="Month"
                    onChange={(date) =>
                      handleCurrentMonthPickerChange(index, date)
                    }
                    value={filter.value1 ? dayjs(filter.value1) : dayjs()}
                    renderInput={(params) => <TextField {...params} />}
                    minDate={dayjs()}
                  />
                </LocalizationProvider>
              </Grid>
            )}
            {filter.type === "date_time" && (
              <>
                {/* <Grid item xs={2}> */}
                <Grid
                  item
                  xs={mode === "divide_mode" ? 5 : 5}
                  sm={mode === "divide_mode" ? 4 : 4}
                  md={mode === "divide_mode" ? 3 : 2}
                  lg={mode === "divide_mode" ? 3 : 2}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      slotProps={{ textField: { size: "small" } }}
                      label="From Date"
                      onChange={(date) => handleFromDateTimeChange(index, date)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
                {/* <Grid item xs={2}> */}
                <Grid
                  item
                  xs={mode === "divide_mode" ? 5 : 5}
                  sm={mode === "divide_mode" ? 4 : 4}
                  md={mode === "divide_mode" ? 3 : 2}
                  lg={mode === "divide_mode" ? 3 : 2}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      slotProps={{ textField: { size: "small" } }}
                      label="To Date"
                      onChange={(date) => handleToDateTimeChange(index, date)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
              </>
            )}
            {filter.type === "month_year" && (
              <>
                {/* <Grid item xs={2}> */}
                <Grid
                  item
                  xs={mode === "divide_mode" ? 5 : 5}
                  sm={mode === "divide_mode" ? 4 : 4}
                  md={mode === "divide_mode" ? 3 : 2}
                  lg={mode === "divide_mode" ? 3 : 2}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      views={["year", "month"]}
                      slotProps={{ textField: { size: "small" } }}
                      label=""
                      onChange={(date) => handleMonthYearChange(index, date)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
              </>
            )}
            {filters.length > 1 && (
              // <Grid item xs={2} sm={2} md={2} lg={2}>
              <Grid
                item
                xs={mode === "divide_mode" ? 2 : 2}
                sm={mode === "divide_mode" ? 2 : 2}
                md={mode === "divide_mode" ? 2 : 2}
                lg={mode === "divide_mode" ? 2 : 2}
              >
                <Button
                  variant="outlined"
                  onClick={() => handleRemoveFilter(index)}
                  sx={{
                    color: "red",
                    borderColor: "red",
                    "&:hover": {
                      backgroundColor: "rgba(255, 0, 0, 0.04)",
                      borderColor: "red",
                    },
                  }}
                  size="small"
                >
                  Remove
                </Button>
              </Grid>
            )}
            {filter.type === "autocomplete_renewal_type" && (
              //<Grid item xs={5} sm={4} md={2} lg={2}>
              <Grid
                item
                xs={mode === "divide_mode" ? 5 : 5}
                sm={mode === "divide_mode" ? 4 : 4}
                md={mode === "divide_mode" ? 3 : 2}
                lg={mode === "divide_mode" ? 3 : 2}
              >
                <Autocomplete
                  options={RENEWAL_TYPE}
                  getOptionLabel={(option) => option.name || ""}
                  value={
                    RENEWAL_TYPE.find((item) => item.id === filter.value1) ||
                    null
                  }
                  onChange={(e, newValue) =>
                    handleSelectValueChange(index, newValue?.id || "")
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="" variant="outlined" />
                  )}
                  size="small"
                />
              </Grid>
            )}
            {filter.type === "autocomplete_collateral_type" && (
              //<Grid item xs={5} sm={4} md={2} lg={2}>
              <Grid
                item
                xs={mode === "divide_mode" ? 5 : 5}
                sm={mode === "divide_mode" ? 4 : 4}
                md={mode === "divide_mode" ? 3 : 2}
                lg={mode === "divide_mode" ? 3 : 2}
              >
                <Autocomplete
                  options={collateralTypes}
                  getOptionLabel={(option) => option.name || ""}
                  value={
                    collateralTypes.find((item) => item.id === filter.value1) ||
                    null
                  }
                  onChange={(e, newValue) =>
                    handleSelectValueChange(index, newValue?.id || "")
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="" variant="outlined" />
                  )}
                  size="small"
                />
              </Grid>
            )}
            {filter.type === "autocomplete_contract_status" && (
              //<Grid item xs={5} sm={4} md={2} lg={2}>
              <Grid
                item
                xs={mode === "divide_mode" ? 5 : 5}
                sm={mode === "divide_mode" ? 4 : 4}
                md={mode === "divide_mode" ? 3 : 2}
                lg={mode === "divide_mode" ? 3 : 2}
              >
                <Autocomplete
                  options={CONTRACT_STATUS}
                  getOptionLabel={(option) => option.name || ""}
                  value={
                    DEALER_TYPE.find((item) => item.id === filter.value1) ||
                    null
                  }
                  onChange={(e, newValue) =>
                    handleSelectValueChange(index, newValue?.id || "")
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="" variant="outlined" />
                  )}
                  size="small"
                />
              </Grid>
            )}
            {filter.type === "autocomplete_cor_signed" && (
              //<Grid item xs={5} sm={4} md={2} lg={2}>
              <Grid
                item
                xs={mode === "divide_mode" ? 5 : 5}
                sm={mode === "divide_mode" ? 4 : 4}
                md={mode === "divide_mode" ? 3 : 2}
                lg={mode === "divide_mode" ? 3 : 2}
              >
                <Autocomplete
                  options={IS_TRUE_FALSE}
                  getOptionLabel={(option) => option.name || ""}
                  value={
                    DEALER_TYPE.find((item) => item.id === filter.value1) ||
                    null
                  }
                  onChange={(e, newValue) =>
                    handleSelectValueChange(index, newValue?.id || "")
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="" variant="outlined" />
                  )}
                  size="small"
                />
              </Grid>
            )}
          </Grid>
        ))}
        <Grid container spacing={1} sx={{ marginTop: "1px" }}>
          {/* <Grid item xs={4} sm={4} md={2} lg={2}> */}
          <Grid
            item
            xs={mode === "divide_mode" ? 4 : 4}
            sm={mode === "divide_mode" ? 4 : 4}
            md={mode === "divide_mode" ? 3 : 2}
            lg={mode === "divide_mode" ? 3 : 2}
          >
            {!searchSingleField ?
              <Button
              variant="outlined"
              onClick={handleAddFilter}
              sx={{ marginRight: "10px" }}
              size="small"
            >
              Add Filter
            </Button> : 
            <></>
            }
          
            <Button variant="contained" type="submit" size="small">
              Search
            </Button>
          </Grid>
        </Grid>
      </AppBar>
    </form>
  );
};

export default AdvancedSearch;
