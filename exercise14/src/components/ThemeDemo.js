import { useTheme } from "../contexts/ThemeContext";

function ThemeDemo() {
  const { theme, themeName, toggleTheme } = useTheme();

  return (
    <div
      className="theme-demo"
      style={{ backgroundColor: theme.background, color: theme.foreground }}
    >
      <div>
        <span className="theme-demo__status">Current theme</span>
        <strong>{themeName}</strong>
      </div>
      <button
        type="button"
        onClick={toggleTheme}
        style={{ backgroundColor: theme.foreground, color: theme.background }}
      >
        Toggle theme
      </button>
    </div>
  );
}

export default ThemeDemo;
