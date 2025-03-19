
import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Set dark mode as default
  const [theme, setTheme] = useState<Theme>("dark");
  
  useEffect(() => {
    // Check local storage for saved theme preference
    const savedTheme = localStorage.getItem("theme") as Theme;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // No saved preference, set dark mode as default
      localStorage.setItem("theme", "dark");
    }
    
    // Apply theme class to document
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
