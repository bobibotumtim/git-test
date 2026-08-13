import { useState } from "react";

function SimpleCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter-demo">
      <p className="counter-value" aria-live="polite">
        Count: <strong>{count}</strong>
      </p>
      <button type="button" onClick={() => setCount((current) => current + 1)}>
        Increment
      </button>
    </div>
  );
}

export default SimpleCounter;
