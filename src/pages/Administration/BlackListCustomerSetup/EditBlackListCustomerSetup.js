import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  Breadcrumbs,
  Typography,
  Button,
  TextField,
  Autocomplete,
  Grid,
} from "@mui/material";
import { getBlacklistCustomersById, updateBlacklistCustomer } from 'features/blacklistCustomer/blacklistCustomerSlice';
import { getNRCStates } from 'features/nrc/NRCState/nrcStateSlice';
import { getNRCTownships } from 'features/nrc/NRCTownship/nrcTownshipSlice';
import { getNRCRemarks } from 'features/blacklistCustomer/NRCRemarkSlice';
import { getAddressStates } from 'features/address/State/addressStateSlice';
import { getAddressDistricts } from 'features/address/District/addressDistrictSlice';
import { getAddressTownships } from 'features/address/Township/addressTownshipSlice';
import { getAddressCities } from 'features/address/City/addressCitySlice';
import { getAddressWards } from 'features/address/Ward/addressWardSlice';
import { getAddressVillageTracts } from 'features/address/VillageTract/addressVillageTractSlice';
import { getAddressVillages } from 'features/address/Village/addressVillageSlice';
import { toast } from "react-toastify";

const initialFormData = {
  black_list_customer_code: "",
  black_list_customer_name: "",
  full_nrc: "",
  father_name:"",
  passport_no:"",
  full_address:"",
  nationality:"",
  entity_and_other_groups:"",
  source:"",
  removal_type:"",    
  description: "",
  nrc_state_id: "",
  nrc_township_id: "",
  nrc_remark: "",
  nrc_number: "",
  address_state_id: "",
  address_district_id:"",
  address_township_id:"",
  address_city_id: "",
  address_ward_id: "",
  address_village_tract_id: "",
  address_village_id: "",
}

const EditBlackListCustomerSetup = () => {

  const [formData, setFormData] = useState(initialFormData);
  const param = useParams('uuid');
  const uuid = param.uuid;
  const dispatch = useDispatch();

  const { blacklistCustomers, isError: isBlacklistCustomersError, isSuccess: isBlacklistCustomersSuccess, isLoading: isBlacklistCustomersLoading, message: blacklistCustomersMessage} =
    useSelector((state) => state.blacklistCustomers); 

  useEffect(() => {
    dispatch(getBlacklistCustomersById({ uuid }));
  }, [uuid, dispatch]);

  // for NRC State (9/)
  const { nrcStates, isError: isNRCStatesError, isSuccess: isNRCStatesSuccess, isLoading: isNRCStatesLoading, message: nrcStatesMessage} =
  useSelector((state) => state.nrcStates);

  // for NRC Township (/AMaYa)
  const { nrcTownships, isError: isNRCTownshipsError, isSuccess: isNRCTownshipsSuccess, isLoading: isNRCTownshipsLoading, message: nrcTownshipsMessage} =
  useSelector((state) => state.nrcTownships);

  // for NRC Remark (/N,E,P)
  const { nrcRemarks, isError: isNRCRemarksError, isSuccess: isNRCRemarksSuccess, isLoading: isNRCRemarkLoading, message: nrcRemarksMessage } =
  useSelector((state) => state.nrcRemarks); 

  // for Address State
  const { addressStates, isError: isAddressStatesError, isSuccess: isAddressStatesSuccess, isLoading: isAddressStateLoading, message: AddressStatesMessage } =
    useSelector((state) => state.addressStates);

  // for Address District
  const { addressDistricts, isError: isAddressDistrictsError, isSuccess: isAddressDistrictsSuccess, isLoading: isAddressDistrictLoading, message: AddressDistrictsMessage } =
    useSelector((state) => state.addressDistricts);

  // for Address Township
  const { addressTownships, isError: isAddressTownshipsError, isSuccess: isAddressTownshipsSuccess, isLoading: isAddressTownshipLoading, message: AddressTownshipsMessage } =
    useSelector((state) => state.addressTownships);

  // for Address City
  const { addressCities, isError: isAddressCitiesError, isSuccess: isAddressCitiesSuccess, isLoading: isAddressCityLoading, message: AddressCitiesMessage } =
    useSelector((state) => state.addressCities);

  // for Address Ward 
  const { addressWards, isError: isAddressWardsError, isSuccess: isAddressWardsSuccess, isLoading: isAddressWardLoading, message: AddressWardsMessage } =
    useSelector((state) => state.addressWards);

  // for Address Village Tract 
  const { addressVillageTracts, isError: isAddressVillageTractsError, isSuccess: isAddressVillageTractsSuccess, isLoading: isAddressVillageTractLoading, message: AddressVillageTractsMessage } =
    useSelector((state) => state.addressVillageTracts);

  // for Address Village 
  const { addressVillages, isError: isAddressVillagesError, isSuccess: isAddressVillagesSuccess, isLoading: isAddressVillageLoading, message: AddressVillagesMessage } =
    useSelector((state) => state.addressVillages);

  useEffect(() => {
    // for NRC
    dispatch(getNRCStates());
    dispatch(getNRCTownships());
    dispatch(getNRCRemarks());

    //for Address
    dispatch(getAddressStates());
    dispatch(getAddressDistricts());
    dispatch(getAddressTownships());
    dispatch(getAddressCities());
    dispatch(getAddressWards());
    dispatch(getAddressVillageTracts());
    dispatch(getAddressVillages());
  }, [dispatch]);

  // for NRC 
  const [selectedNRCState, setSelectedNRCState] = useState(null);
  const [selectedNRCTownship, setSelectedNRCTownship] = useState(null);
  const [selectedNRCRemark, setSelectedNRCRemark] = useState(null);
  const [nrcNumber, setNRCNumber] = useState("");
  const [concatenatedNRCValue, setConcatenatedNRCValue] = useState("");

   // for Address
   const [selectedAddressState, setSelectedAddressState] = useState(null);
   const [selectedAddressDistrict, setSelectedAddressDistrict] = useState(null);
   const [selectedAddressTownship, setSelectedAddressTownship] = useState(null);
   const [selectedAddressCity, setSelectedAddressCity] = useState(null);
   const [selectedAddressWard, setSelectedAddressWard] = useState(null);
   const [selectedAddressVillageTract, setSelectedAddressVillageTract] = useState(null);
   const [selectedAddressVillage, setSelectedAddressVillage] = useState(null);
   const [concatenatedAddressValue, setConcatenatedAddressValue] = useState("");

  // Watch for changes in blacklistCustomers and update formData
  useEffect(() => {
    if (isBlacklistCustomersSuccess && blacklistCustomers) {
      setFormData(blacklistCustomers);

      // NRC (nrc-state, nrc-township, nrc-remark, nrc-number)
      setSelectedNRCState(
        nrcStates.find((nrcState) => nrcState.id === blacklistCustomers.nrc_state_id) || null
      );
      setSelectedNRCTownship(
        nrcTownships.find((nrcTownship) => nrcTownship.id === blacklistCustomers.nrc_township_id) || null
      );
      setSelectedNRCRemark(
        nrcRemarks.find((nrcRemark) => nrcRemark.key === blacklistCustomers.nrc_remark) || null
      );
      setNRCNumber(blacklistCustomers.nrc_number);
      setConcatenatedNRCValue(blacklistCustomers.full_nrc); 

      // Address (state, district, township, city, ward, villageTract, village)
      setSelectedAddressState(
        addressStates.find((addressState) => addressState.id === blacklistCustomers.address_state_id) || null
      );
      setSelectedAddressDistrict(
        addressDistricts.find((addressDistrict) => addressDistrict.id === blacklistCustomers.address_district_id) || null
      );
      setSelectedAddressTownship(
        addressTownships.find((addressTownship) => addressTownship.id === blacklistCustomers.address_township_id) || null
      );
      setSelectedAddressCity(
        addressCities.find((addressCitiy) => addressCitiy.id === blacklistCustomers.address_city_id) || null
      );
      setSelectedAddressWard(
        addressWards.find((addressWard) => addressWard.id === blacklistCustomers.address_ward_id) || null
      );
      setSelectedAddressVillageTract(
        addressVillageTracts.find((addressVillageTract) => addressVillageTract.id === blacklistCustomers.address_village_tract_id) || null
      );
      setSelectedAddressVillage(
        addressVillages.find((addressVillage) => addressVillage.id === blacklistCustomers.address_village_id) || null
      );
      setConcatenatedAddressValue(blacklistCustomers.full_address);
    }
  // }, [isBlacklistCustomersSuccess, blacklistCustomers, nrcStates, nrcTownships, nrcRemarks, addressStates, addressDistricts, addressTownships, addressCities, addressWards,addressVillageTracts, addressVillages]);
  }, [isBlacklistCustomersSuccess, blacklistCustomers]);

  // for NRC Concatenation
useEffect(() => {
  const concatenateNRCValues = () => {
    const stateCode = selectedNRCState?.state_code || "";
    const townshipCode = selectedNRCTownship?.township_nrc_code || "";
    const remark = selectedNRCRemark?.value || "";
    const number = nrcNumber || "";

    // Check if any of the parts are not empty before concatenate the format
    if (stateCode || townshipCode || remark || number) {
      const resultNRC = `${stateCode}/${townshipCode}${remark ? `(${remark})` : ""}${number ? number : ""}`;
      setConcatenatedNRCValue(resultNRC);
      setFormData({ ...formData, full_nrc: resultNRC });
    } 
    else {
      // Handle for where all parts are empty or not selected
      setConcatenatedNRCValue("");
      setFormData({ ...formData, full_nrc: "" });
    }
  };
   concatenateNRCValues();
}, [selectedNRCState, selectedNRCTownship, selectedNRCRemark, nrcNumber]);

// for Address Concatenation
useEffect(() => {
  const concatenateAddressValues = () => {
    const address_parts = [
      selectedAddressState?.name,
      selectedAddressDistrict?.name,
      selectedAddressTownship?.name,
      selectedAddressCity?.name,
      selectedAddressWard?.name,
      selectedAddressVillageTract?.name,
      selectedAddressVillage?.name,
    ];

    // Filter out empty parts (null, undefined, or empty strings)
    const address_filteredParts = address_parts.filter((part) => part);

    // Join the non-empty parts with a comma and space
    const resultAddress = address_filteredParts.join(", ");

    setConcatenatedAddressValue(resultAddress);
    setFormData({ ...formData, full_address: resultAddress });
  };
   concatenateAddressValues();
}, [selectedAddressState, selectedAddressDistrict, selectedAddressTownship, selectedAddressCity, selectedAddressWard, selectedAddressVillageTract, selectedAddressVillage]);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Function for update blacklist customer
  const handleSubmit = (e) => {    
    e.preventDefault(); // Prevent the default form submission behavior
    let id = uuid; 
    dispatch(updateBlacklistCustomer({ id, newData:formData }));

    toast.success("Successfully Updated !", {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
    // reset the form fields after submission
    handleReset();
  };

  // Function to reset the form fields
  const handleReset = () => {
    setFormData(initialFormData); 
    setConcatenatedNRCValue("");
    
    // Reset NRC Autocomplete selections parts
    setSelectedNRCState(""); 
    setSelectedNRCTownship(null);
    setSelectedNRCRemark(null);
    setNRCNumber("");

    // Reset Address Autocomplete selections parts
    setSelectedAddressState(null);
    setSelectedAddressDistrict(null);
    setSelectedAddressTownship(null);
    setSelectedAddressCity(null);
    setSelectedAddressWard(null);
    setSelectedAddressVillageTract(null);
    setSelectedAddressVillage(null);
    setConcatenatedAddressValue("");
  }; 

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }} className = "margin-top-8" >
        <Typography color="text.primary">Administration / Edit BlackList Customer</Typography>
      </Breadcrumbs>
      <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>          
            <TextField
              key="black_list_customer_code"
              label="Code"
              name="black_list_customer_code"
              value={formData.black_list_customer_code}
              onChange={handleInputChange}
              fullWidth
              required
              
            />
          </Grid>  
                  
          <Grid item xs={12} sm={6}>
            <TextField
              key="black_list_customer_name"
              label="Name"
              name="black_list_customer_name"
              value={formData.black_list_customer_name}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
          <Autocomplete
            disablePortal
            id="state_nrc_code"
            name="state_nrc_code"
            options={nrcStates}
            getOptionLabel={(option) => String(option.state_code)}
            sx={{ my: 3 }}
            renderInput={(params) => (
              <TextField {...params} label="NRC State" />
            )}
            onChange={(e, newValue) => {
              setSelectedNRCState(newValue);
              setFormData({ ...formData, nrc_state_id: newValue?.id });
            }}
            value={selectedNRCState}
          />
          </Grid>

          <Grid item xs={12} sm={6}>
          <Autocomplete
            disablePortal
            id="township_nrc_code"
            name="township_nrc_code"
            options={nrcTownships}
            getOptionLabel={(option) => option.township_nrc_code}
            sx={{ my: 3 }}
            renderInput={(params) => (
              <TextField {...params} label="NRC Township" />
            )}
            onChange={(e, newValue) => {
              setSelectedNRCTownship(newValue);
              setFormData({ ...formData, nrc_township_id: newValue?.id });
            }}
            value={selectedNRCTownship}
          />
          </Grid>

          <Grid item xs={12} sm={6}>
          <Autocomplete
            disablePortal
            id="key"
            name="value"
            options={nrcRemarks}
            getOptionLabel={(option) => option.value}
            renderInput={(params) => (
              <TextField {...params} label="NRC Remark" />
            )}
            onChange={(e, newValue) => {
              setSelectedNRCRemark(newValue);
              setFormData({ ...formData, nrc_remark: newValue?.key });
            }}
            value={selectedNRCRemark}
          />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              key="nrc_number"
              label="NRC Number"
              name="nrc_number"
              type="number"
              value={nrcNumber}
              onChange={(e) => {
                setNRCNumber(e.target.value);
                setFormData({ ...formData, nrc_number: e.target.value });                
              }}              
              fullWidth
            />
          </Grid>          
          
          <Grid item xs={12} sm={6}>
            <TextField
              key="full_nrc"
              label="Full NRC"
              name="full_nrc"              
              value={concatenatedNRCValue}              
              onChange={(e) => {
                setConcatenatedNRCValue(e.target.value);
                setFormData({ ...formData, full_nrc: e.target.value });               
              }}
              fullWidth
              sx={{ my: 3 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
          <Autocomplete
            disablePortal
            id="id"
            name="name"
            options={addressStates}
            getOptionLabel={(option) => option.name}
            sx={{ my: 3 }}
            renderInput={(params) => (
              <TextField {...params} label="Address State" />
            )}
            value={selectedAddressState} 
            onChange={(e, newValue) => {
              setSelectedAddressState(newValue);
              setFormData({ ...formData, address_state_id: newValue?.id });
            }}
          />
          </Grid>

          <Grid item xs={12} sm={6}>
          <Autocomplete
            disablePortal
            id="id"
            name="name"
            options={addressDistricts}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="Address District" />
            )}
            value={selectedAddressDistrict}
            onChange={(e, value) => {
              setSelectedAddressDistrict(value);
              setFormData({ ...formData, address_district_id: value?.id });
            }}
          />
          </Grid>

          <Grid item xs={12} sm={6}>
          <Autocomplete
            disablePortal
            id="id"
            name="name"
            options={addressTownships}
            getOptionLabel={(option) => option.name}            
            renderInput={(params) => (
              <TextField {...params} label="Address Township" />
            )}
            value={selectedAddressTownship} // for reset function test
            onChange={(e, value) => {
              setSelectedAddressTownship(value);
              setFormData({ ...formData, address_township_id: value?.id });
            }}
          />
          </Grid>

          <Grid item xs={12} sm={6}>
          <Autocomplete
            disablePortal
            id="name"
            name="name"
            options={addressCities}
            getOptionLabel={(option) => option.name}
            sx={{ my: 3 }}
            renderInput={(params) => (
              <TextField {...params} label="Address City" />
            )}
            value={selectedAddressCity} // for reset function test
            onChange={(e, value) => {
              setSelectedAddressCity(value);
              setFormData({ ...formData, address_city_id: value?.id });
            }}
            
          />
          </Grid>

          <Grid item xs={12} sm={6}>
          <Autocomplete
            disablePortal
            id="name"
            name="name"
            options={addressWards}
            getOptionLabel={(option) => option.name}
            sx={{ my: 3 }}
            renderInput={(params) => (
              <TextField {...params} label="Address Ward" />
            )}
            value={selectedAddressWard} // for reset function test
            onChange={(e, value) => {
              setSelectedAddressWard(value);
              setFormData({ ...formData, address_ward_id: value?.id });
            }}
          />
          </Grid>

          <Grid item xs={12} sm={6}>
          <Autocomplete
            disablePortal
            id="name"
            name="name"
            options={addressVillageTracts} 
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="Address Village Tract" />
            )}
            value={selectedAddressVillageTract} // for reset function test
            onChange={(e, value) => {
              setSelectedAddressVillageTract(value);
              setFormData({ ...formData, address_village_tract_id: value?.id });
            }}
          />
          </Grid>

          <Grid item xs={12} sm={6}>
          <Autocomplete
            disablePortal
            id="name"
            name="name"
            options={addressVillages}
            getOptionLabel={(option) => option.name}            
            renderInput={(params) => (
              <TextField {...params} label="Address Village" />
            )}
            value={selectedAddressVillage} // for reset function test
            onChange={(e, value) => {
              setSelectedAddressVillage(value);
              setFormData({ ...formData, address_village_id: value?.id });
            }}
          />
          </Grid>
          
          <Grid item xs={12} sm={12}>
            <TextField
              key="full_address"
              label="Full Address"
              name="full_address"
              value={concatenatedAddressValue}              
              onChange={(e) => {
                setConcatenatedAddressValue(e.target.value);
                setFormData({ ...formData, full_address: e.target.value });               
              }}
              fullWidth
              sx={{ my: 3 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              key="father_name"
              label="Father Name"
              name="father_name"
              value={formData.father_name}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              key="passport_no"
              label="Passport No"
              name="passport_no"
              value={formData.passport_no}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              key="nationality"
              label="Nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleInputChange}
              fullWidth
              sx={{ my: 3 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              key="entity_and_other_groups"
              label="Entity & other groups"
              name="entity_and_other_groups"
              value={formData.entity_and_other_groups}
              onChange={handleInputChange}
              fullWidth
              sx={{ my: 3 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              key="source"
              label="Source"
              name="source"
              value={formData.source}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              key="removal_type"
              label="Removal Type"
              name="removal_type"
              value={formData.removal_type}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              key="description"
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              fullWidth
              sx={{ my: 3 }}
            />
          </Grid>

          <Grid item xs={12} sm={6} sx={{ justifySelf: 'end' }}>          
          <Button variant="contained" type="submit" color="primary">
            Update
          </Button>
          </Grid>

      </Grid>
      </form>
    </>
  )
}

export default EditBlackListCustomerSetup;
