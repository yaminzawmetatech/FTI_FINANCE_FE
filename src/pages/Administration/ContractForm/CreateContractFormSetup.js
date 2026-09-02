import * as React from "react";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";
import {
  getApplicationInformationSetupProperties,
  handleToggleAllApplicationInformationPropertyData,
  handleToggleNewAllApplicationInformationPropertyData,
  handleTransferApplicationInformationPropertyData,
  handleTransferNewApplicationInformationPropertyData,
  reset,
  selectAllApplicationInformationSetupProperties,
  selectNewApplicationInformationSetupProperties,
  selectNumberOfAllApplicationInformationSetupProperties,
  selectNumberOfCheckedApplicationInformationSetupProperties,
  selectNumberOfCheckedNewApplicationInformationSetupProperties,
  selectNumberOfNewAllApplicationInformationSetupProperties,
} from "../../../features/applicationInformationSetup/applicationInformationSetupSlice";
import {
  Breadcrumbs,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
//import { data as projectCategories } from "../ProjectCategory/ProjectCategoryList";
//import { data as subCategories } from "../SubCategory/SubCategoryList";
import LeftApplicationSetupPropertyItem from "../ApplicationInformationSetup/components/LeftApplicationSetupPropertyItem";
import RightApplicationSetupPropertyItem from "../ApplicationInformationSetup/components/RightApplicationSetupPropertyItem";

export default function CreateContractFormSetup() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  //
  const applicationInformationSetupProperties = useSelector(
    selectAllApplicationInformationSetupProperties
  );
  const numberOfAllApplicationInformationSetupProperties = useSelector(
    selectNumberOfAllApplicationInformationSetupProperties
  );
  const numberOfCheckedApplicationInformationSetupProperties = useSelector(
    selectNumberOfCheckedApplicationInformationSetupProperties
  );

  //
  const newApplicationInformationSetupProperties = useSelector(
    selectNewApplicationInformationSetupProperties
  );
  const numberOfNewAllApplicationInformationSetupProperties = useSelector(
    selectNumberOfNewAllApplicationInformationSetupProperties
  );
  const numberOfCheckedNewApplicationInformationSetupProperties = useSelector(
    selectNumberOfCheckedNewApplicationInformationSetupProperties
  );

  useEffect(() => {
    dispatch(getApplicationInformationSetupProperties());
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }} className = "margin-top-8" >
        <Typography color="text.primary">Administration</Typography>
        <Typography color="text.primary">Contract Form</Typography>
      </Breadcrumbs>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs>
          <Card>
            <CardHeader
              sx={{ px: 2, py: 1 }}
              avatar={
                <Checkbox
                  onClick={() => {
                    dispatch(
                      handleToggleAllApplicationInformationPropertyData()
                    );
                  }}
                  checked={
                    numberOfCheckedApplicationInformationSetupProperties ===
                      numberOfAllApplicationInformationSetupProperties &&
                    numberOfCheckedApplicationInformationSetupProperties !== 0
                  }
                  indeterminate={
                    numberOfCheckedApplicationInformationSetupProperties !==
                      numberOfAllApplicationInformationSetupProperties &&
                    numberOfCheckedApplicationInformationSetupProperties !== 0
                  }
                  disabled={
                    numberOfAllApplicationInformationSetupProperties === 0
                  }
                  inputProps={{
                    "aria-label": "all items selected",
                  }}
                />
              }
              title="Choices"
              subheader={`${numberOfCheckedApplicationInformationSetupProperties}/${numberOfAllApplicationInformationSetupProperties} selected`}
            />
            <Divider />
            <List
              sx={{
                height: "calc(100vh - 245px)",
                bgcolor: "background.paper",
                overflow: "auto",
              }}
              dense
              component="div"
              role="list"
            >
              {applicationInformationSetupProperties.map((property) => (
                <LeftApplicationSetupPropertyItem
                  key={property.id}
                  property={property}
                />
              ))}
            </List>
          </Card>
        </Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={() => {
                dispatch(handleTransferNewApplicationInformationPropertyData());
              }}
              disabled={
                numberOfCheckedApplicationInformationSetupProperties === 0
              }
              aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={() => {
                dispatch(handleTransferApplicationInformationPropertyData());
              }}
              disabled={
                numberOfCheckedNewApplicationInformationSetupProperties === 0
              }
              aria-label="move selected left"
            >
              &lt;
            </Button>
          </Grid>
        </Grid>
        <Grid item xs>
          <Card>
            <CardHeader
              sx={{ px: 2, py: 1 }}
              avatar={
                <Checkbox
                  onClick={() => {
                    dispatch(
                      handleToggleNewAllApplicationInformationPropertyData()
                    );
                  }}
                  checked={
                    numberOfCheckedNewApplicationInformationSetupProperties ===
                      numberOfNewAllApplicationInformationSetupProperties &&
                    numberOfCheckedNewApplicationInformationSetupProperties !==
                      0
                  }
                  indeterminate={
                    numberOfNewAllApplicationInformationSetupProperties !==
                      numberOfCheckedNewApplicationInformationSetupProperties &&
                    numberOfCheckedNewApplicationInformationSetupProperties !==
                      0
                  }
                  disabled={
                    numberOfNewAllApplicationInformationSetupProperties === 0
                  }
                  inputProps={{
                    "aria-label": "all items selected",
                  }}
                />
              }
              title="Choices"
              subheader={`${numberOfCheckedNewApplicationInformationSetupProperties}/${numberOfNewAllApplicationInformationSetupProperties} selected`}
            />
            <Divider />
            <List
              sx={{
                height: "calc(100vh - 245px)",
                bgcolor: "background.paper",
                overflow: "auto",
              }}
              dense
              component="div"
              role="list"
            >
              {newApplicationInformationSetupProperties.map((property) => (
                <RightApplicationSetupPropertyItem
                  key={property.id}
                  property={property}
                />
              ))}
            </List>
          </Card>
        </Grid>
      </Grid>
      <Grid
        sx={{ marginTop: "10px" }}
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Button onClick={handleClickOpen} variant="contained">
          Create New Application Setup
        </Button>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle textAlign="center">
          Create New Application Setup
        </DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <Stack
              sx={{
                width: "100%",
                minWidth: { xs: "300px", sm: "360px", md: "400px" },
                gap: "1.5rem",
                mt: 1,
              }}
            >
              {/* <Autocomplete
                id="combo-box-demo"
                options={projectCategories.map((item) => ({
                  label: item.Name,
                }))}
                renderInput={(params) => (
                  <TextField {...params} label="Project Category" />
                )}
              /> */}
              {/* <Autocomplete
                id="combo-box-demo"
                options={subCategories.map((item) => ({ label: item.Name }))}
                renderInput={(params) => (
                  <TextField {...params} label="Sub Category" />
                )}
              /> */}
              <TextField label={"Name"} />
            </Stack>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} autoFocus variant="contained">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
