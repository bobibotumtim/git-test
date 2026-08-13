import { createContext, useContext, useMemo, useState } from "react";

export const themes = {
  light: {
    foreground: "#111827",
    background: "#eeeeee",
  },
  dark: {
    foreground: "#ffffff",
    background: "#61dafb",
  },
};

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [themeName, setThemeName] = useState("light");

  const value = useMemo(
    () => ({
      themeName,
      theme: themes[themeName],
      toggleTheme: () =>
        setThemeName((currentTheme) =>
          currentTheme === "light" ? "dark" : "light"
        ),
    }),
    [themeName]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider.");
  }

  return context;
}
