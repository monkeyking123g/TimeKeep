import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes  } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import Topbar from "./scenes/global/TopBar";
import SideBar from "./scenes/global/SideBar";
import AnimationRoutes from "./components/AnimationRoutes";
import { getDesignTokens } from "./theme"
import { useSelector } from 'react-redux';
import SingIn from "./scenes/login";
import { RootState } from "./redux/store"
const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function HomePage() {
  const colorMode = React.useContext(ColorModeContext);
  const access_token = useSelector((state: RootState ) => state.access_token )

  // let navigate = useNavigate();

  // React.useEffect(() => {
  //   if (!access_token) {
  //     return navigate("/login");
  //   }
  // }, [access_token, navigate]);

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