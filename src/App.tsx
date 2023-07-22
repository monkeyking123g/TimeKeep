import React from "react";
import { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";

// Global components
import Topbar from "./scenes/global/TopBar";
import SideBar from "./scenes/global/SideBar";

import { ProSidebarProvider } from "react-pro-sidebar";

import { ColorModeContext, useMode } from "./theme";
import AnimationRoutes from "./components/AnimationRoutes";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [shadows, setShadows] = useState(false);

  const [userCredensial, setUserCredensial] = useState(
    reactLocalStorage.getObject("user")
  );

  let navigate = useNavigate();
  let location = useLocation();

  React.useEffect(() => {
    if (JSON.stringify(userCredensial) === "{}") {
      console.log("bag");
      return navigate("/singin");
    }
  }, [userCredensial]);

  React.useEffect(() => {
    if (location.pathname === "/singin") {
      setShadows(true);
    } else setShadows(false);
  }, [location]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ProSidebarProvider>
          <div className="app">
            <SideBar
              isSidebar={isSidebar}
              shadow={shadows}
              credential={userCredensial}
            />
            <div className="wrapper">
              <Topbar setIsSidebar={setIsSidebar} shadow={shadows} />
              <AnimationRoutes />
            </div>
          </div>
        </ProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
