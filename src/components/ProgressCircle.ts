import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const ProgressCircle = ({ progress = 0.75, size = "40", colorBg }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const angle = Math.round((progress / 100) * 360);
  return (
    <Box
      sx={{
        background: `radial-gradient(${colorBg} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, ${colors.pink[800]} ${angle}deg 360deg),
            ${colors.primary[500]}`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default ProgressCircle;
