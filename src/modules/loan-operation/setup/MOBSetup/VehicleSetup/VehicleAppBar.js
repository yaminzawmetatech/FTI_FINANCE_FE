import { AppBar } from "@mui/material";
import { useState } from "react";
import { Button } from "@mui/material";
import CreateEditVehicleModal from "./CreateEditVehicleModal";
import useVehicleForm from "./VehicleHook";
import VehicleAppBarExcelImport from "./VehicleAppBarExcelImport";
import VehicleExportButton from "./VehichleExportButton";

const VehicleAppBar = ({ fetchApi,transformedSearchDataResponse }) => {
  const { onSubmit, handleSubmit, control, reset } = useVehicleForm();

  const [open, setOpen] = useState(false);

  const handleCreateEdit = () => {
    setOpen(true);
  };

  return (
    <>
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
        <div style={{ display: "flex" }}>
          <div style={{ flex : "auto"}}>
            <Button variant="contained" onClick={handleCreateEdit}>
              Create New
            </Button>
          </div>
        <VehicleAppBarExcelImport fetchApi={fetchApi}/>
        <VehicleExportButton transformedSearchDataResponse={transformedSearchDataResponse}/>
        </div>
      </AppBar>
      <CreateEditVehicleModal
        open={open}
        onClose={() => setOpen(false)}
        editFlag={false}
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        reset={reset}
      />
    </>
  );
};

// export default React.memo(VehicleAppBar);
export default VehicleAppBar;
