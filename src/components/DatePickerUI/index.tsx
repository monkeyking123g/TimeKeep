import React from "react";
import { useTheme } from "@mui/styles";
import { tokens } from "../../theme";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Textfiled from "../FormsUI/Textfiled";
import { LocalizationProvider } from "@mui/x-date-pickers";
import "dayjs/locale/it";

const DatePickerUse = ({
  name,
  ...otherProps
}: any) => {
  const theme: any = useTheme();
  const colors = tokens(theme.palette.mode);
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
              // svg: { fill: colors.primary[500] },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default DatePickerUse;
