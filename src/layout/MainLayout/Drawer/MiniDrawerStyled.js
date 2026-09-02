// // material-ui
// import { styled } from '@mui/material/styles';
// import Drawer from '@mui/material/Drawer';

// // project import
// import { drawerWidth } from 'config';

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   borderRight: `1px solid ${theme.palette.divider}`,
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen
//   }),
//   overflowX: 'hidden',
//   boxShadow: 'none'
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen
//   }),
//   overflowX: 'hidden',
//   width: 0,
//   borderRight: 'none',
//   boxShadow: theme.customShadows.z1
// });

// // ==============================|| DRAWER - MINI STYLED ||============================== //

// const MiniDrawerStyled = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: 'nowrap',
//   boxSizing: 'border-box',
//   ...(open && {
//     ...openedMixin(theme),
//     '& .MuiDrawer-paper': openedMixin(theme)
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     '& .MuiDrawer-paper': closedMixin(theme)
//   })
// }));

// export default MiniDrawerStyled;


// material-ui
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';

// project import
import { drawerWidth } from 'config';

const openedMixin = (theme) => ({
  width: drawerWidth,

  // Orange-based sidebar
  backgroundColor: '#FFF7ED',
  borderRight: '1px solid #FED7AA',

  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),

  overflowX: 'hidden',

  // Remove default shadow
  boxShadow: 'none',

  // Make sure Drawer Paper also uses orange background
  '& .MuiDrawer-paper': {
    backgroundColor: '#FFF7ED',
    borderRight: '1px solid #FED7AA',
    boxShadow: 'none'
  }
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),

  overflowX: 'hidden',

  width: 0,

  borderRight: 'none',

  boxShadow: theme.customShadows.z1,

  '& .MuiDrawer-paper': {
    backgroundColor: '#FFF7ED',
    borderRight: 'none'
  }
});

// ==============================|| DRAWER - MINI STYLED ||============================== //

const MiniDrawerStyled = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',

  ...(open && {
    ...openedMixin(theme),

    '& .MuiDrawer-paper': {
      ...openedMixin(theme)
    }
  }),

  ...(!open && {
    ...closedMixin(theme),

    '& .MuiDrawer-paper': {
      ...closedMixin(theme)
    }
  })
}));

export default MiniDrawerStyled;