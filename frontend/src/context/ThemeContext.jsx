import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "nb_theme";
const LIGHT_THEME = "light";
const DARK_THEME = "dark";

const ThemeContext = createContext(undefined);

function getSystemPreference() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return LIGHT_THEME;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? DARK_THEME : LIGHT_THEME;
}

function getInitialTheme() {
  if (typeof window === "undefined") {
    return LIGHT_THEME;
  }

  const rootTheme = document.documentElement.getAttribute("data-theme");
  if (rootTheme === LIGHT_THEME || rootTheme === DARK_THEME) {
    return rootTheme;
  }

  try {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY);
    if (storedTheme === LIGHT_THEME || storedTheme === DARK_THEME) {
      return storedTheme;
    }
  } catch {
    // Ignore localStorage access issues and fall back to system preference.
  }

  return getSystemPreference();
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Ignore localStorage write issues.
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) => (currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME));
  }, []);

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === DARK_THEME,
      setTheme,
      toggleTheme,
    }),
    [theme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}

