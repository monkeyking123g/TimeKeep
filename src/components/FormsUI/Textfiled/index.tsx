import React from "react";
import { TextField } from "@mui/material";
import { useField } from "formik";

const Textfiled = ({
  name,
  ...otherProps
}: any) => {
  const [field, mata] = useField(name);

  const configTextfiled = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "outlined",
  };
  if (mata && mata.touched && mata.error) {
    configTextfiled.error = true;
    configTextfiled.helperText = mata.error;
  }
  return <TextField {...configTextfiled} />;
};

export default Textfiled;
