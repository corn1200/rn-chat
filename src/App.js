import React from "react";
import { StatusBar } from "react-native";
import { theme } from "./theme";
import { ThemeProvider } from "styled-components";
import Navigation from "./navigations";
import { UserProvider, ProgressProvider } from "./contexts";

const App = () => {
  console.log("all rights");
  return (
    <ThemeProvider theme={theme}>
      {/* 로딩에 대한 컨텍스트를 전체 페이지에서 사용할 수 있게 함 */}
      <ProgressProvider>
        {/* 회원 정보에 대한 컨텍스트를 전체 페이지에서 사용할 수 있게 함 */}
        <UserProvider>
          <StatusBar backgroundColor={theme.backgroundColor} barStyle="dark-content" />
          <Navigation />
        </UserProvider>
      </ProgressProvider>
    </ThemeProvider>
  );
};

export default App;