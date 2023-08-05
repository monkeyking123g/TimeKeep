import React from "react";
import { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useLocation, useNavigate, Route, Routes, Router   } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import Topbar from "./scenes/global/TopBar";
import SideBar from "./scenes/global/SideBar";
import AnimationRoutes from "./components/AnimationRoutes";
import { getDesignTokens } from "./test"
import { useSelector } from 'react-redux';
import SingIn from "./scenes/login";
const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
export function HomePage() {
  const colorMode = React.useContext(ColorModeContext);
  const user = useSelector((state: any) => state.user);

  let navigate = useNavigate();

  React.useEffect(() => {
    if (JSON.stringify(user) === "{}") {
      return navigate("/login");
    }
  }, [user]);

  
  return (
    <>
      <CssBaseline />
        <div className="app">
          <SideBar />
          <div className="wrapper">
            <Topbar
              colorMode={colorMode}
            />
            <AnimationRoutes />
          </div>
        </div>
    </>
  );
}


export default function App() {
  const location = useLocation();
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
        <Routes>
          <Route path="/login" element={<SingIn />} />
          <Route path="/*" element={<HomePage />} />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}