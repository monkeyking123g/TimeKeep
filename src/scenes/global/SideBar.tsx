import React from "react";
import { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { Box, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventIcon from "@mui/icons-material/Event";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelector } from 'react-redux';
import { grey } from '@mui/material/colors';

interface MenuItems {
  title: string;
  to: string,
  icon: React.ReactNode,
}
const menuItems: MenuItems[] = [
  {
    title: "Dashboard",
    to: "/",
    icon: <HomeOutlinedIcon />,
  },
  {
    title: "Admin Meneging",
    to: "/admin",
    icon: <PeopleOutlinedIcon />,
  },
  {
    title: "All Time",
    to: "/allTime",
    icon: <EventIcon />,
  },
  {
    title: "All Month",
    to: "/allMonth",
    icon: <CalendarMonthIcon />,
  },
  {
    title: "Sum by Day",
    to: "/form",
    icon: <EventIcon />,
  },
  {
    title: "Sum by Month",
    to: "/formMonth",
    icon: <CalendarMonthIcon />,
  },
  {
    title: "Calendar",
    to: "/calendar",
    icon: <CalendarTodayOutlinedIcon />,
  },
  {
    title: "Line Chatt",
    to: "/line",
    icon: <TimelineOutlinedIcon />,
  },
];

const Item = ({
  title,
  to,
  icon,
  selected,
  setSelected
}: any) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => {
        reactLocalStorage.setObject("icon", { select: title });
        setSelected(title);
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
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const user = useSelector((state: any) => state.user);
  const { collapseSidebar } = useProSidebar();
  const { collapsed } = useProSidebar();
  const [selected, setSelected] = useState<any>(
    reactLocalStorage.getObject("icon")   
  );

  const menuItemStyles = {
    button: ({
      level,
      active
    }: any) => {
      if (level === 0)
        return {
          color: active ? theme.palette.primary.main : theme.palette.text.primary,
          backgroundColor: active && theme.palette.primaryGreen.main,
          "&:hover": {
            backgroundColor: theme.palette.primaryGreen.main,
          },
        };
    },
  };


  useEffect(() => {
    if (!isNonMobile) {
      collapseSidebar(false);
    }
  }, [isNonMobile]);

  return (
    <Box
      sx={{
        display: shadow ? "none" : "flex",
        height: "100%",
        border: "0",
        ".sidebar": {
          border: "0",
          boxShadow: `1px 0 0 0 ${grey[800]}`,
        },
      }}
    >
      <Sidebar
        breakPoint={isNonMobile ? "lg" : "always"}
        backgroundColor={theme.palette.mode  === 'light' ? theme.palette.primary.main : theme.palette.primaryGreen.main}
        rootStyles={{
          border: "none",
        }}
      >
        <Menu  menuItemStyles={menuItemStyles}>
          {/*  ? (
            <Box paddingLeft={collapsed ? "0" : "35%"}>
              <MenuItem
                icon={<TimelineOutlinedIcon />}
                  // <motion.div
                  //   initial={false}
                  //   animate={collapsed ? "closed" : "open"}
                  // >
                  //   <MenuToggle
                  //     toggle={() => {
                  //       collapseSidebar();
                  //     }}
                  //   ></MenuToggle>
                  // </motion.div>
               // }
              />
            </Box>
          ) : undefined} */}

          {!collapsed && (
            <MenuItem
              style={{
                margin: "10px 0 20px 0",
              }}
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Typography variant="h3" 
                color={grey[400]}
                >
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
                    user.image_url
                      ? `${process.env.REACT_APP_DOMAIN}/${user.image_url}`
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
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user.email}
                </Typography>
                <Typography variant="h5" 
                  color={theme.palette.primary.main}
                >
                  VP Chef
                </Typography>
              </Box>
            </Box>
          )}
          <Box paddingLeft={collapsed ? "0" : "10%"}>
            {menuItems.map((item, index) => (
              <React.Fragment key={index}>
                  <Item
                    title={item.title}
                    to={item.to}
                    icon={item.icon}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  {index % 3 === 0 && ( 
                    <Typography
                      variant="h6"
                      color={grey[400]}
                      sx={{ m: "15px 0 5px 20px" }}
                    >
                      {index === 0 ? "Data" : index === 4 ? "Created" : "Charts"}
                    </Typography>
                  )}
              </React.Fragment>
            ))}
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};
export default SideBar;
