import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const ThemeToggle = ({ className = "" }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors ${
        isDark
          ? "bg-slate-800 text-amber-300 border-slate-700 hover:bg-slate-700"
          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
      } ${className}`}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};

export default ThemeToggle;

