export const useStyledTextField = ({
  color,
  globalColor
}: any) => ({
  root: {
    "& input:-webkit-autofill": {
      "-webkit-box-shadow": `0 0 0 30px ${globalColor} inset !important`,
      "-webkit-text-fill-color": "#fff !important",
      caretColor: "#fff !important",
    },

    "& input:-webkit-autofill:hover": {
      "-webkit-box-shadow": `0 0 0 30px ${globalColor} inset !important`,
    },
    "& input:-webkit-autofill:focus": {
      "-webkit-box-shadow": `0 0 0 30px ${globalColor} inset !important`,
    },
    "& input:-webkit-autofill:active": {
      "-webkit-box-shadow": `0 0 0 30px ${globalColor} inset !important`,
    },
    "& input[type=time]": {
      border: "none",
      fontSize: "16px",
      fontFamily: "helvetica",
      width: "250px",
    },
    "& input::-webkit-datetime-edit-hour-field:focus": {
      backgroundColor: `${color} !important`,
      color: "#000",
    },
    "& input::-webkit-datetime-edit-minute-field:focus": {
      backgroundColor: `${color} !important`,
      color: "#000",
    },
    "& input[type='time']::-webkit-calendar-picker-indicator": {
      display: "none",
      filter: "invert(0.5) sepia(1) saturate(5) hue-rotate(175deg)",
    },
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "none",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "none",
      },
      "&:hover fieldset": {
        borderColor: "#fff",
      },
      "&.Mui-focused fieldset": {
        border: `2px solid ${color}`,
      },
    },
  },
});

export const useStyledButton = ({
  color,
  hoverColor
}: any) => ({
  root: {
    backgroundColor: color,
    color: "#121212",
    "&:hover": {
      backgroundColor: hoverColor,
    },
  },
});

export const useStyleDataGrid = ({
  primary,
  green,
  background
}: any) => ({
  root: {
    "& .MuiDataGrid-row:hover": {
      backgroundColor: "#2c2c2c",
    },
    "& .MuiDataGrid-row.Mui-selected": {
      backgroundColor: "#212121",
    },
    "& .MuiDataGrid-row.Mui-selected:hover": {
      backgroundColor: "#2c2c2c",
    },
    "& .MuiDataGrid-root": {
      border: "none",
    },

    "& .MuiDataGrid-cell": {
      borderBottom: `2px solid #292929`,
      fontSize: "15px",
    },
    "& .name-column--cell": {
      color: green,
      fontSize: "16px",
    },
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: primary,
      borderBottom: "none",
      color: "#000",
      fontSize: "14px",
      svg: {
        color: "#212121",
      },
    },
    "& .MuiDataGrid-columnHeaders:focus": {
      //  outline: "solid #bb86fc 1px",
      outline: "none !important",
    },
    "& .MuiDataGrid-columnHeader:focus-within": {
      outline: "none !important",
    },
    "& .MuiDataGrid-virtualScroller": {
      backgroundColor: background,
    },
    "& .MuiDataGrid-footerContainer": {
      borderTop: "none",
      backgroundColor: primary,
      fontSize: "14px",
      color: background,

      svg: {
        color: "#000",
      },
    },
    "& .MuiCheckbox-root": {
      color: `#b7ebde !important`,
    },
    "& .MuiDataGrid-toolbarContainer": {
      backgroundColor: background,
    },
    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
      color: `#a3a3a3 !important`,
    },
    ".MuiButtonBase-root-MuiButton-root": {
      color: green,
    },
    ".MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked": {
      color: green,
    },
    "& .MuiTablePagination-root": {
      color: "#121212",
    },
  },
});

export const useStyleFullcalendar = ({
  grey,
  green,
  primary,
  textColor
}: any) => ({
  root: {
    ".fc .fc-list-event:hover td": {
      backgroundColor: grey, //colors.grey[800],
    },
    ".fc .fc-daygrid-day.fc-day-today": {
      color: green, //colors.greenAccent[500],
    },
    ".fc .fc-button-primary:disabled": {
      color: "#000",
      backgroundColor: primary, //colors.primary[500],
      borderColor: primary, //colors.primary[500],
      opacity: 0.9,
    },
    ".fc .fc-button:focus": {
      outline: "none",
    },
    ".fc .fc-button-primary:not(:disabled):active, .fc .fc-button-primary:not(:disabled).fc-button-active":
      {
        color: "#000",
      },
    ".fc-daygrid-dot-event .fc-event-title": {
      color: textColor, //colors.textColor[100],
      fontSize: "13px",
    },
    ".fc-theme-standard .fc-popover-header": {
      color: textColor, //colors.textColor[200],
    },
    ".fc .fc-button-primary:disable": {
      color: "#000",
      backgroundColor: "#dbe0e6",
      borderColor: "#dbe0e6",
    },
  },
});
