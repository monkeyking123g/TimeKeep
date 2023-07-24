import React from "react";
import { useTheme } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Textfiled from "../FormsUI/Textfiled";
import { LocalizationProvider } from "@mui/x-date-pickers";
import "dayjs/locale/it";

const DatePickerUse = ({
  name,
  ...otherProps
}: any) => {
  const theme = useTheme();

  const configDatePicker = {
    ...otherProps,
  };
  const configTextfiled = {
    name: name,
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"it"}>
      <DatePicker
        {...configDatePicker}
        renderInput={(params) => (
          <Textfiled
            {...params}
            {...configTextfiled}
            sx={{
              gridColumn: "span 4",
              svg: { fill: theme.palette.primary.main },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default DatePickerUse;
