import {useEffect, useState} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

// material-ui
import {useTheme} from "@mui/material/styles";
import {Box, Toolbar, useMediaQuery} from "@mui/material";

// project import
import Drawer from "./Drawer";
import Header from "./Header";
import navigation from "menu-items";
import Breadcrumbs from "components/@extended/Breadcrumbs";
// types
import {openDrawer} from "store/reducers/menu";

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const theme = useTheme();
  const matchDownLG = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch = useDispatch();

  const { drawerOpen } = useSelector((state) => state.menu);

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  });
  // drawer toggler
  const [open, setOpen] = useState(drawerOpen);
  const handleDrawerToggle = () => {
    setOpen(!open);
    dispatch(openDrawer({ drawerOpen: !open }));
  };

  // set media wise responsive drawer
  useEffect(() => {
    setOpen(!matchDownLG);
    dispatch(openDrawer({ drawerOpen: !matchDownLG }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownLG]);

  useEffect(() => {
    if (open !== drawerOpen) setOpen(!drawerOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerOpen]);

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Header open={open} handleDrawerToggle={handleDrawerToggle} />
      <Drawer open={open} handleDrawerToggle={handleDrawerToggle} />
      <Box
        component="main"
        sx={{
          width: "100%",
          flex: 1,
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          paddingLeft: !matchDownLG && open ? "270px !important" : 1,
        }}
      >
        <Toolbar
          sx={{
            padding: 0,
            minHeight: "44px",
          }}
        />
        <Breadcrumbs navigation={navigation} title />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
