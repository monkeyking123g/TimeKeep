import { Typography, Box, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";

interface HeaderProps {
  title : string
}
const Header : React.FC<HeaderProps> = ({ title }) => {
  // const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <Box mb={isNonMobile ? "30px" : "5px"}>
      <Typography
        variant={isNonMobile ? "h2" : "h4"}
        fontWeight="bold"
      >
        {title}
      </Typography>
    </Box>
  );
};

export default Header;
