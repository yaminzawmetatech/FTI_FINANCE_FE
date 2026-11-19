import { AppBar } from "@mui/material";
import { useState } from "react";
import { Button } from "@mui/material";
import CreateEditBrandModal from "./CreateEditModelModal";
import useVehicleForm from "./ModelHook";

const VehicleAppBar = ({ fetchApi }) => {
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
          <div style={{ marginLeft: "auto" }}>
            <Button variant="contained" onClick={handleCreateEdit}>
              Create New
            </Button>
          </div>
        </div>
      </AppBar>
      <CreateEditBrandModal
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
