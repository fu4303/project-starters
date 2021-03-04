import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

import { ThemeProvider } from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import Weather from "./components/Weather";

import Theme from "./Theme.js";

const App = () => (
  <ThemeProvider theme={Theme}>
    <CssBaseline />
    <Container className="xcontainer">
      <Weather apiKey={"5ce07d841919bc82dcccf2f3c310c2eb"} />
    </Container>
  </ThemeProvider>
);

export default App;
