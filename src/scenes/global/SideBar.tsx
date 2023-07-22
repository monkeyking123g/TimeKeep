import React from "react";
import { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
//import "react-pro-sidebar/dist/css/styles.css";
import { Box, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import Axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
// Icons
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventIcon from "@mui/icons-material/Event";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MenuToggle } from "../../components/svg/MenuToggle";
import { motion } from "framer-motion";

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => {
        reactLocalStorage.setObject("icon", { select: title });
        setSelected(reactLocalStorage.getObject("icon").select);
      }}
      icon={icon}
      component={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const SideBar = ({ shadow = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [imageStatus, setImageStatus] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [userCredensial, setUserCredensial] = useState(
    reactLocalStorage.getObject("user")
  );
  const [selected, setSelected] = useState(
    reactLocalStorage.getObject("icon").select
  );
  //const [isCollapsed, setIsCollapsed] = useState(true);
  const pathImage = `${process.env.REACT_APP_DOMAIN}/images/${userCredensial.image}`;
  const { collapseSidebar } = useProSidebar();
  const { collapsed } = useProSidebar();

  const CheckImage = async (path) => {
    try {
      const respose = await Axios.get(path);
      if (respose.status === 200) {
        setImageStatus(true);
      } else {
        setImageStatus(false);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
      } else {
        console.log("Error", error.message);
      }
    }
  };

  const menuItemStyles = {
    button: ({ level, active }) => {
      // only apply styles on first level elements of the tree
      if (level === 0)
        return {
          color: active ? colors.pink[500] : colors.textColor[100],
          backgroundColor: active ? colors.secondary[500] : undefined,
          "&:hover": {
            backgroundColor: "#2c2c2c",
          },
        };
    },
  };

  useEffect(() => {
    CheckImage(pathImage);
  }, []);

  useEffect(() => {
    if (!isNonMobile) {
      collapseSidebar(false);
    }
  }, [isNonMobile]);

  useEffect(() => {
    const user = reactLocalStorage.getObject("user");
    if (userCredensial.id !== user.id) {
      setUserCredensial({ ...user });
    }
  }, [reactLocalStorage.getObject("user")]);

  return (
    <Box
      sx={{
        display: shadow ? "none" : "flex",
        height: "100%",
        border: "0",
        ".sidebar": {
          border: "0",
          boxShadow: `1px 0 0 0 ${colors.grey[800]}`,
        },
      }}
    >
      <Sidebar
        breakPoint={isNonMobile ? "lg" : "always"}
        backgroundColor={colors.secondary[500]}
        rootStyles={{
          border: "none",
        }}
      >
        <Menu iconshape="square" menuItemStyles={menuItemStyles}>
          {/* LOGO AND MENU ICON */}
          {isNonMobile ? (
            <Box paddingLeft={collapsed ? "0" : "35%"}>
              <MenuItem
                icon={
                  <motion.div
                    initial={false}
                    animate={collapsed ? "closed" : "open"}
                  >
                    <MenuToggle
                      toggle={() => {
                        collapseSidebar();
                      }}
                    ></MenuToggle>
                  </motion.div>
                }
              />
            </Box>
          ) : undefined}

          {!collapsed && (
            <MenuItem
              style={{
                margin: "10px 0 20px 0",
                color: colors.primary[100],
              }}
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                // ml="17px"
              >
                <Typography variant="h3" color={colors.primary[700]}>
                  ADMINIS
                </Typography>
              </Box>
            </MenuItem>
          )}

          {!collapsed && (
            <Box mb={isNonMobile ? "25px" : "1px"}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={
                    imageStatus
                      ? pathImage
                      : "https://www.3dproduction.it/public/no_attore.jpg?nocache="
                  }
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                    boxShadow: "rgba(0, 0, 0, 1) 0px 2px 12px 0px",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h5"
                  color={colors.primary[700]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {userCredensial.email}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  VP Chef
                </Typography>
              </Box>
            </Box>
          )}

          {/* Menu items */}
          <Box paddingLeft={collapsed ? "0" : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[400]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Admin Meneging"
              to="/admin"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="All Time"
              to="/allTime"
              icon={<EventIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="All Month"
              to="/allMonth"
              icon={<CalendarMonthIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[400]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Created
            </Typography>
            <Item
              title="Sum by Day"
              to="/form"
              icon={<EventIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Sum by Month"
              to="/formMonth"
              icon={<CalendarMonthIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[400]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Line Chatt"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};
export default SideBar;
