import React from "react";
import { useState } from "react";
import { Sidebar, Menu, MenuItem, SidebarProps } from "react-pro-sidebar";
import { Box, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventIcon from "@mui/icons-material/Event";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";
import { grey } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { setToggle } from "../../redux/tokenReducer";

interface MenuItems {
  title: string;
  to: string;
  icon: React.ReactNode;
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

const Item = ({ title, to, icon, selected, setSelected }: any) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => {
        setSelected(title);
      }}
      icon={icon}
      component={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const SideBar = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const user = useSelector((state: any) => state.user);
  const [selected, setSelected] = useState<any>();
  const toggle = useSelector((state: any) => state.token.toggle);
  const dispatch = useDispatch();
  const buttonDisableEnable =
    theme.palette.mode === "light"
      ? theme.palette.primary.main
      : theme.palette.primaryGreen.main;
  const buttonActive =
    theme.palette.mode === "light"
      ? theme.palette.text.secondary
      : theme.palette.primary.main;
  const menuItemStyles = {
    button: ({ level, active }: any) => {
      if (level === 0)
        return {
          color: active ? buttonActive : theme.palette.text.primary,
          backgroundColor: active && buttonDisableEnable,
          "&:hover": {
            backgroundColor: buttonDisableEnable,
          },
        };
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        border: "0",
        ".sidebar": {
          border: "0",
          boxShadow: `1px 0 0 0 ${grey[800]}`,
        },
      }}
    >
      <Sidebar
        onBackdropClick={() => dispatch(setToggle())}
        toggled={toggle}
        breakPoint={isNonMobile ? "lg" : "always"}
        backgroundColor={
          theme.palette.mode === "light"
            ? theme.palette.primary.main
            : theme.palette.primaryGreen.main
        }
        rootStyles={{
          border: "none",
        }}
      >
        <Menu menuItemStyles={menuItemStyles}>
          <MenuItem
            style={{
              margin: "10px 0 20px 0",
            }}
          >
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography variant="h3" color={grey[400]}>
                ADMINIS
              </Typography>
            </Box>
          </MenuItem>

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
                variant="subtitle1"
                fontWeight="bold"
                sx={{ m: "10px 0 0 0" }}
              >
                {user.email}
              </Typography>
              <Typography variant="h5" color={theme.palette.primary.main}>
                VP Chef
              </Typography>
            </Box>
          </Box>

          <Box paddingLeft={"10%"}>
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
