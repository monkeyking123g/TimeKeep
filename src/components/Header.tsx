import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
const Header = ({
  title,
  TitleColor,
  subtitle
}: any) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <Box mb={isNonMobile ? "30px" : "5px"}>
      <Typography
        variant="h2"
        // color={TitleColor || colors.primary[700]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      {/* <Typography variant="h5" color={colors.grey[200]}>
        {subtitle}
      </Typography> */}
    </Box>
  );
};

export default Header;
