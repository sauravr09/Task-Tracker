import { useUserSettings } from "../hooks/useUserSettings"
import { setTheme } from "../utils/userSettings"

export const ThemeToggle = () => {
    const { theme } = useUserSettings()

    const cycleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }

    return (
        <button className="theme-toggle-btn" onClick={cycleTheme} aria-label={`Current theme: ${theme}`}>
            <span>{theme === "light" ? "☀️" : "🌙"}</span>
            {theme === "light" ? "Light" : "Dark"}
        </button>
    )
}