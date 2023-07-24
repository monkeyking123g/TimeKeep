import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";
// @ts-ignore
import AnimatedNumber from "animated-number-react";

interface StateBoxProps {
  title: string | number;
  subtitle: string;
  icon: React.ReactNode;
  process: number;
  increase: string;
}

const StateBox: React.FC<StateBoxProps> = ({
  title,
  subtitle,
  icon,
  process,
  increase
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const formatValue = (title: number) => title.toFixed(2);
  return (
    
    <Box width="100%" m="0 30px">
      
      <Box display="flex" justifyContent="space-between">
        
        <Box>
          {icon}
          <Typography
          variant="h4"
            fontWeight="bold"
            sx={{ color: theme.palette.secondary.main }}
          >
            <AnimatedNumber value={title} formatValue={formatValue} />
          </Typography>
        </Box>
        <Box>
          <ProgressCircle
            progress={process}
            size="50"
            colorBg={theme.palette.background.paper}
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
          sx={{ color: theme.palette.primary.main }}
        >
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default StateBox;
