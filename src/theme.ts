import { grey } from '@mui/material/colors';
import { PaletteMode } from '@mui/material';

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
        primary: {
          main: "#007BFF",
        },
        secondary: {
          main: "#4cceac",
        },
        primaryGreen: {
          main: grey[200],
        },
        background: {
          default: "#F8F9FA"
        }
  
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
