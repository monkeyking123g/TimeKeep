import { ThemeOptions } from "@mui/material/styles";
import { PaletteColorOptions } from "@mui/material/styles";
declare module "@mui/material/styles" {
  interface PaletteOptions {
    primaryGreen?: PaletteColorOptions;
  }
  interface Palette {
    primaryGreen: PaletteColor;
  }
  interface PaletteColor {
    lighter?: string;
    darker?: string;
  }
}