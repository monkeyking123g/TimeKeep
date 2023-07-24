import { createTheme } from "@mui/material/styles";
import { blue, grey } from '@mui/material/colors';
import { PaletteMode } from '@mui/material';
export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#bb86fc",
      "100": '#4cceac'

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
    fontFamily: "'Roboto', sans-serif",
    // allVariants: {
    //   fontFamily: "'Source Sans 3', sans-serif",
    // },
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
export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
        primary: {
          main: blue[500],
        },
        secondary: {
          main: "#4cceac",
        },
        // background: {
        //   paper: "#2C2C2C"
        // }
        primaryGreen: {
          main: grey[200],
        },
  
        }
      : {
          primary: {
            main: "#bb86fc",
          },
          secondary: {
            main: "#4cceac",
          },
          primaryGreen: {
            main: "#2C2C2C",
          },
        
        }),
  },
  typography: {
    allVariants: {
      fontFamily: "'Source Sans 3', sans-serif",
      fontWeight: 500, 
    },
  },
});
