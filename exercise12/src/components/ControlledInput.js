import { useState } from "react";

function ControlledInput() {
  const [text, setText] = useState("");

  return (
    <div className="stacked-demo">
      <label htmlFor="live-text">Type something</label>
      <input
        id="live-text"
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Start typing..."
      />
      <p className="live-output" aria-live="polite">
        Input text: <strong>{text || "—"}</strong>
      </p>
    </div>
  );
}

export default ControlledInput;
