import { useState } from "react";

const colors = {
  red: "#ef4444",
  blue: "#3b82f6",
  green: "#22c55e",
  yellow: "#facc15",
};

function ColorSwitcher() {
  const [selectedColor, setSelectedColor] = useState("blue");

  return (
    <div className="stacked-demo">
      <label htmlFor="color-select">Select a color</label>
      <select
        id="color-select"
        value={selectedColor}
        onChange={(event) => setSelectedColor(event.target.value)}
      >
        {Object.keys(colors).map((color) => (
          <option value={color} key={color}>
            {color[0].toUpperCase() + color.slice(1)}
          </option>
        ))}
      </select>
      <div
        className="color-preview"
        style={{ backgroundColor: colors[selectedColor] }}
        aria-label={`${selectedColor} color preview`}
      >
        <span>{selectedColor}</span>
      </div>
    </div>
  );
}

export default ColorSwitcher;
