import React from "react";
import { Box, useTheme } from "@mui/material";

interface ProgressCircleProps {
  progress?: number;
  size?: string | number;
  progressColor?: string
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  progress = 0.75,
  size = "40",
}) => {
  const theme = useTheme();

  const angle = Math.round((progress / 100) * 360);
  return (
    <Box
      sx={{
        background: `radial-gradient(${theme.palette.primaryGreen.main} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, ${theme.palette.primary.dark} ${angle}deg 360deg),
            ${theme.palette.primary.light}`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default ProgressCircle;
