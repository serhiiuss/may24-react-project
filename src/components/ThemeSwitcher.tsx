import React from "react";
import { useTheme } from "../switcher/ThemeSwitch";

const ThemeSwitcher: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme} className={`theme-switcher ${theme}`}>
            <span className="icon">{theme === "light" ? "🌙" : "☀️"}</span>
            <span className="label">
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </span>
        </button>
    );
};

export default ThemeSwitcher;
