import React from "react";
import ChatWindow from "./components/ChatWindow";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/Theme";
import GlobalStyle from "./styles/Global";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ChatWindow />
    </ThemeProvider>
  );
};

export default App;
