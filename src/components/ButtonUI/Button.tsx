import React, { FC  } from "react";
import { Button, useTheme, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { tokens } from "../../theme";

interface IButtonProps {
  text: string;
  color?: any;
  onClick?: () => void
}

const UseButton: FC<IButtonProps> = ({ text, ...otherProps }) => {
  const theme = useTheme();

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
    >
      <Typography>{text}</Typography>
    </Button>
  );
};

export default UseButton;

