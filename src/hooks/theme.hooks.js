import React, { useContext } from "react";

const ThemeContext = React.createContext();

export const useFontsize = () => useContext(ThemeContext).fontSize;

export const ThemeProvider = ({ children }) => (
  <ThemeContext.Provider
    value={{
      mainColor: "orange",
      secondaryColor: "black",
      fontSize: 14
    }}
  >
    {children}
  </ThemeContext.Provider>
);
