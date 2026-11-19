// import PropTypes from "prop-types";
// import {forwardRef, useEffect} from "react";
// import {Link, useLocation} from "react-router-dom";
// import {useDispatch, useSelector} from "react-redux";

// // material-ui
// import {useTheme} from "@mui/material/styles";
// import {Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography,} from "@mui/material";

// // project import
// import {activeItem} from "store/reducers/menu";

// // ==============================|| NAVIGATION - LIST ITEM ||============================== //

// const NavItem = ({ item, level }) => {
//   const theme = useTheme();
//   const dispatch = useDispatch();
//   const { pathname } = useLocation();

//   const { drawerOpen, openItem } = useSelector((state) => state.menu);

//   let itemTarget = "_self";
//   if (item.target) {
//     itemTarget = "_blank";
//   }

//   let listItemProps = {
//     component: forwardRef((props, ref) => (
//       <Link ref={ref} {...props} to={item.url} target={itemTarget} />
//     )),
//   };
//   if (item?.external) {
//     listItemProps = { component: "a", href: item.url, target: itemTarget };
//   }

//   const itemHandler = (id) => {
//     dispatch(activeItem({ openItem: [id] }));
//   };

//   const Icon = item.icon;
//   const itemIcon = item.icon ? (
//     <Icon style={{ fontSize: drawerOpen ? "1rem" : "1.25rem" }} />
//   ) : (
//     false
//   );

//   const isSelected = openItem.findIndex((id) => id === item.id) > -1;
//   // active menuItem item on page load
//   useEffect(() => {
//     if (pathname.includes(item.url)) {
//       dispatch(activeItem({ openItem: [item.id] }));
//     }
//     // eslint-disable-next-line
//   }, [pathname]);

//   const textColor = "text.primary";
//   const iconSelectedColor = "primary.main";

//   return (
//     <ListItemButton
//       {...listItemProps}
//       disabled={item.disabled}
//       onClick={() => itemHandler(item.id)}
//       selected={isSelected}
//       sx={{
//         zIndex: 1201,
//         pl: drawerOpen ? `${level * 28}px` : 1.5,
//         py: !drawerOpen && level === 1 ? 1.25 : 1,
//         ...(drawerOpen && {
//           "&:hover": {
//             bgcolor: "primary.lighter",
//           },
//           "&.Mui-selected": {
//             bgcolor: "primary.lighter",
//             borderRight: `2px solid ${theme.palette.primary.main}`,
//             color: iconSelectedColor,
//             "&:hover": {
//               color: iconSelectedColor,
//               bgcolor: "primary.lighter",
//             },
//           },
//         }),
//         ...(!drawerOpen && {
//           "&:hover": {
//             bgcolor: "transparent",
//           },
//           "&.Mui-selected": {
//             "&:hover": {
//               bgcolor: "transparent",
//             },
//             bgcolor: "transparent",
//           },
//         }),
//       }}
//     >
//       {itemIcon && (
//         <ListItemIcon
//           sx={{
//             minWidth: 28,
//             color: isSelected ? iconSelectedColor : textColor,
//             ...(!drawerOpen && {
//               borderRadius: 1.5,
//               width: 36,
//               height: 36,
//               alignItems: "center",
//               justifyContent: "center",
//               "&:hover": {
//                 bgcolor: "secondary.lighter",
//               },
//             }),
//             ...(!drawerOpen &&
//               isSelected && {
//                 bgcolor: "primary.lighter",
//                 "&:hover": {
//                   bgcolor: "primary.lighter",
//                 },
//               }),
//           }}
//         >
//           {itemIcon}
//         </ListItemIcon>
//       )}
//       {(drawerOpen || (!drawerOpen && level !== 1)) && (
//         <ListItemText
//           primary={
//             <Typography
//               variant="h6"
//               sx={{ color: isSelected ? iconSelectedColor : textColor }}
//             >
//               {item.title}
//             </Typography>
//           }
//         />
//       )}
//       {(drawerOpen || (!drawerOpen && level !== 1)) && item.chip && (
//         <Chip
//           color={item.chip.color}
//           variant={item.chip.variant}
//           size={item.chip.size}
//           label={item.chip.label}
//           avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
//         />
//       )}
//     </ListItemButton>
//   );
// };

// NavItem.propTypes = {
//     item: PropTypes.object,
//     level: PropTypes.number
// };

// export default NavItem;

import PropTypes from "prop-types";
import { forwardRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Chip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

// project import
import { activeItem } from "store/reducers/menu";

// ==============================|| NAVIGATION - LIST ITEM ||============================== //

const NavItem = ({ item, level }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { drawerOpen, openItem } = useSelector((state) => state.menu);

  let itemTarget = "_self";

  if (item.target) {
    itemTarget = "_blank";
  }

  let listItemProps = {
    component: forwardRef((props, ref) => (
      <Link ref={ref} {...props} to={item.url} target={itemTarget} />
    )),
  };

  if (item?.external) {
    listItemProps = {
      component: "a",
      href: item.url,
      target: itemTarget,
    };
  }

  const itemHandler = (id) => {
    dispatch(activeItem({ openItem: [id] }));
  };

  const Icon = item.icon;

  const itemIcon = item.icon ? (
    <Icon
      style={{
        fontSize: drawerOpen ? "1rem" : "1.25rem",
      }}
    />
  ) : (
    false
  );

  const isSelected =
    openItem.findIndex((id) => id === item.id) > -1;

  // Active menu item on page load
  useEffect(() => {
    if (item.url && pathname.includes(item.url)) {
      dispatch(activeItem({ openItem: [item.id] }));
    }

    // eslint-disable-next-line
  }, [pathname]);

  // ==============================|| COLORS ||============================== //

  const textColor = "#FFFFFF";
  const iconSelectedColor = "#FFFFFF";

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      onClick={() => itemHandler(item.id)}
      selected={isSelected}
      sx={{
        zIndex: 1201,

        pl: drawerOpen ? `${level * 28}px` : 1.5,

        py: !drawerOpen && level === 1 ? 1.25 : 1,

        color: textColor,

        // ==============================|| OPEN DRAWER ||============================== //
        ...(drawerOpen && {
          "&:hover": {
            bgcolor: "rgba(255, 255, 255, 0.12)",
            color: "#FFFFFF",
          },

          "&.Mui-selected": {
            bgcolor: "rgba(255, 255, 255, 0.20)",
            borderRight: "3px solid #FFFFFF",
            color: "#FFFFFF",

            "&:hover": {
              bgcolor: "rgba(255, 255, 255, 0.25)",
              color: "#FFFFFF",
            },
          },

          "& .MuiListItemText-primary": {
            color: "#FFFFFF",
          },
        }),

        // ==============================|| CLOSED DRAWER ||============================== //
        ...(!drawerOpen && {
          "&:hover": {
            bgcolor: "rgba(255, 255, 255, 0.12)",
            color: "#FFFFFF",
          },

          "&.Mui-selected": {
            bgcolor: "rgba(255, 255, 255, 0.20)",
            color: "#FFFFFF",

            "&:hover": {
              bgcolor: "rgba(255, 255, 255, 0.25)",
            },
          },
        }),
      }}
    >
      {itemIcon && (
        <ListItemIcon
          sx={{
            minWidth: 28,

            color: "#FFFFFF",

            ...(!drawerOpen && {
              borderRadius: 1.5,
              width: 36,
              height: 36,
              alignItems: "center",
              justifyContent: "center",

              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.12)",
              },
            }),

            ...(!drawerOpen &&
              isSelected && {
                bgcolor: "rgba(255, 255, 255, 0.20)",

                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.25)",
                },
              }),
          }}
        >
          {itemIcon}
        </ListItemIcon>
      )}

      {(drawerOpen || (!drawerOpen && level !== 1)) && (
        <ListItemText
          primary={
            <Typography
              variant="h6"
              sx={{
                color: "#FFFFFF",
              }}
            >
              {item.title}
            </Typography>
          }
        />
      )}

      {(drawerOpen || (!drawerOpen && level !== 1)) &&
        item.chip && (
          <Chip
            color={item.chip.color}
            variant={item.chip.variant}
            size={item.chip.size}
            label={item.chip.label}
            avatar={
              item.chip.avatar && (
                <Avatar>{item.chip.avatar}</Avatar>
              )
            }
          />
        )}
    </ListItemButton>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number,
};

export default NavItem;