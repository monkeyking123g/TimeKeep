import { useState } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

// Icons import
import Logo from "../../components/svg/logo";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Search } from "@mui/icons-material";

const Topbar = ({ shadow = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { toggleSidebar } = useProSidebar();

  const [seed, setSeed] = useState(1);
  const reset = () => {
    setSeed(Math.random());
  };

  let navigate = useNavigate();

  const LogoutClick = () => {
    if (window.confirm("Are you sure to leave this page ?")) {
      return navigate("/singin");
    } else console.log("Cancel !");
  };
  return (
    <Box
      display={shadow ? "none" : "flex"}
      justifyContent="space-between"
      p={2}
      backgroundColor={colors.primary[100]}
    >
      {isNonMobile ? null : (
        <IconButton onClick={() => toggleSidebar()}>
          <MenuOutlinedIcon />
        </IconButton>
      )}
      <IconButton
        onClick={reset}
        sx={{ ":hover ": { backgroundColor: "transparent" } }}
      >
        <Logo key={seed} width="50px" height="25px" />
      </IconButton>
      <Box
        display={isNonMobile ? "flex" : "none"}
        backgroundColor={colors.primary[100]}
        borderRadius="3px"
        sx={{ border: `1px solid ${colors.grey[800]}` }}
      >
        <InputBase
          sx={{ ml: 2, flex: 1, color: colors.textColor[100] }}
          placeholder="search"
        ></InputBase>
        <IconButton
          type="button"
          sx={{
            p: 1,
            color: colors.primary[700],
            backgroundColor: colors.secondary[500],
            borderRadius: "0",
          }}
        >
          <Search></Search>
        </IconButton>
      </Box>
      {/* Icons */}

      <Box display="flex">
        <IconButton onClick={LogoutClick}>
          <ExitToAppIcon
            sx={{ color: "#ef3b5b", width: "23px", height: "23px" }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
