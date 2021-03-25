import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";

import Routing from "./Router/Routing";
import theme from "./theme";
import Logger from "./Error/Logger";

function App() {
  return (
    <Logger>
      <ThemeProvider theme={theme}>
        <Routing />
      </ThemeProvider>
    </Logger>
  );
}

export default App;
