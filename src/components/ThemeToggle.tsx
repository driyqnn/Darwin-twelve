
import React from "react";
import { useTheme } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-5 right-5 z-50 p-2 rounded-full bg-gray-800 dark:bg-gray-800 shadow-lg border border-gray-700 transition-all duration-300 hover:scale-110"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 text-indigo-400" />
      ) : (
        <Sun className="h-5 w-5 text-yellow-300" />
      )}
    </button>
  );
};

export default ThemeToggle;
