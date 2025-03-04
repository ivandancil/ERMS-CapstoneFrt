import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { BrowserRouter } from "react-router-dom";
import Approutes from "./routes/AppRoutes";

function App() {
  const { theme, colorMode } = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Approutes />
      </BrowserRouter>
    </ThemeProvider>
  </ColorModeContext.Provider>
  );
}

export default App;
