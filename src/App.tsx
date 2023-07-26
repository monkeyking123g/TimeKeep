import React from "react";
import { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import Topbar from "./scenes/global/TopBar";
import SideBar from "./scenes/global/SideBar";
import { ProSidebarProvider } from "react-pro-sidebar";
import AnimationRoutes from "./components/AnimationRoutes";
import { getDesignTokens } from "./test"
import { useSelector } from 'react-redux';
const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
function App() {
  const [isSidebar, setIsSidebar] = useState(true);
  const [shadows, setShadows] = useState(false);
  const colorMode = React.useContext(ColorModeContext);
  const user = useSelector((state: any) => state.user);

  let navigate = useNavigate();
  let location = useLocation();

  React.useEffect(() => {
    if (JSON.stringify(user) === "{}") {
      return navigate("/singin");
    }
  }, [user]);

  React.useEffect(() => {
    if (location.pathname === "/singin") {
      setShadows(true);
    } else setShadows(false);
  }, [location]);

  return (
    <>
      <CssBaseline />
        <ProSidebarProvider>
        <div className="app">
          <SideBar
            // isSidebar={isSidebar}
            shadow={shadows} />
          <div className="wrapper">
            <Topbar
              colorMode={colorMode}
              shadow={shadows} />
            <AnimationRoutes />
          </div>
        </div>
      </ProSidebarProvider>
    </>
  );
}


export default function ToggleColorMode() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('dark');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme(getDesignTokens(mode)),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App/>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}