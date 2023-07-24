import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#bb86fc",
      "100": '#053e85'

    },
    secondary: {
      main: "#2C2C2C",
    },
    error: {
      main: "#cf6679",
    },
    success: {
      main: "#4cceac",
    }
  },
  typography: {
    allVariants: {
      fontFamily: "'Sofia Sans', sans-serif",
    },
  },
//   components: {
//     // Inputs
//     MuiOutlinedInput: {
//       styleOverrides: {
//         root: {
//           "& .MuiOutlinedInput-notchedOutline": {
//             border: `5px solid green`,
//           },
//           "&.Mui-focused": {
//             "& .MuiOutlinedInput-notchedOutline": {
//               border: `5px dotted red`,
//             },
//           }
//         },
//       }
//     }
//   }
});
