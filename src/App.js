import React from "react";
import { StatusBar } from "react-native";
import { theme } from "./theme";
import { ThemeProvider } from "styled-components";
import Navigation from "./navigations";

const App = () => {
  console.log("all rights");
  return (
    <ThemeProvider theme={theme}>
      <StatusBar backgroundColor={theme.backgroundColor} barStyle="dark-content" />
      <Navigation />
    </ThemeProvider>
  );
};

export default App;