import React, { FC } from "react";
import { Button, useTheme, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { tokens } from "../../theme";

interface IButtonProps {
  text: string;
  bgColor?: string;
}

const UseButton: FC<IButtonProps> = ({ text, bgColor, ...otherProps }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const configButton = {
    ...otherProps,
    fullWidth: true,
    component: motion.button,
    whileTap: { scale: 0.97 },
  };

  return (
    <Button
      variant='contained'
      type="submit"
      {...configButton}
      sx={{
        mt: 3,
        mb: 2,
        fontSize: "16px",
        backgroundColor: bgColor || colors.pink[600],
        ":hover": {
          backgroundColor: bgColor || colors.primary[500],
        },
      }}
    >
      <Typography sx={{ fontSize: "16px" }}>{text}</Typography>
    </Button>
  );
};

export default UseButton;

