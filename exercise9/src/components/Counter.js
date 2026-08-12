import React from "react";
function Counter() {
  const [count, setCount] = React.useState(0);
  return (
    <section className="exercise-box counter">
      <h2>Counter</h2>
      <strong>{count}</strong>
      <div>
        <button onClick={() => setCount((value) => value - 1)}>−</button>
        <button onClick={() => setCount(0)}>Reset</button>
        <button onClick={() => setCount((value) => value + 1)}>+</button>
      </div>
    </section>
  );
}
export default Counter;
