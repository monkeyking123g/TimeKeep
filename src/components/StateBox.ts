import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";
import AnimatedNumber from "animated-number-react";
const StateBox = ({ title, subtitle, icon, process, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const formatValue = (title) => title.toFixed(2);
  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.greenAccent[500] }}
          >
            <AnimatedNumber value={title} formatValue={formatValue} />
          </Typography>
        </Box>
        <Box>
          <ProgressCircle
            progress={process}
            size="50"
            colorBg={colors.secondary[500]}
          />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5" sx={{ color: "#ddd" }}>
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: colors.primary[500] }}
        >
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default StateBox;
