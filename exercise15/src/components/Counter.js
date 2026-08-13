import { useReducer } from "react";

export function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "RESET":
      return 0;
    default:
      return state;
  }
}

function Counter() {
  const [count, dispatch] = useReducer(counterReducer, 0);

  return (
    <div className="counter-demo">
      <div className="counter-readout">
        <span>Current count</span>
        <strong aria-live="polite">{count}</strong>
      </div>
      <div className="counter-actions">
        <button
          type="button"
          onClick={() => dispatch({ type: "DECREMENT" })}
          aria-label="Decrement count"
        >
          −
        </button>
        <button
          className="reset-button"
          type="button"
          onClick={() => dispatch({ type: "RESET" })}
        >
          Reset
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: "INCREMENT" })}
          aria-label="Increment count"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default Counter;
