import { useState } from "react";

function ToggleVisibility() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="toggle-demo">
      <button type="button" onClick={() => setIsVisible((visible) => !visible)}>
        {isVisible ? "Hide" : "Show"}
      </button>
      {isVisible && <p className="toggle-message">Toggle me!</p>}
    </div>
  );
}

export default ToggleVisibility;
