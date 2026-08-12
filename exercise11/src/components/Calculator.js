import { useState } from "react";

function Calculator() {
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [operator, setOperator] = useState("+");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleCompute = (event) => {
    event.preventDefault();

    if (firstNumber === "" || secondNumber === "") {
      setResult("");
      setError("Please enter both numbers.");
      return;
    }

    const first = Number(firstNumber);
    const second = Number(secondNumber);
    let nextResult;

    switch (operator) {
      case "+":
        nextResult = first + second;
        break;
      case "-":
        nextResult = first - second;
        break;
      case "*":
        nextResult = first * second;
        break;
      case "/":
        if (second === 0) {
          setResult("");
          setError("Cannot divide by zero.");
          return;
        }
        nextResult = first / second;
        break;
      default:
        return;
    }

    setResult(Object.is(nextResult, -0) ? 0 : nextResult);
    setError("");
  };

  return (
    <div className="calculator-demo">
      <form className="calculator-form" onSubmit={handleCompute}>
        <label htmlFor="first-number">First:</label>
        <input
          id="first-number"
          aria-label="First number"
          type="number"
          step="any"
          value={firstNumber}
          onChange={(event) => setFirstNumber(event.target.value)}
        />

        <label htmlFor="second-number">Second:</label>
        <input
          id="second-number"
          aria-label="Second number"
          type="number"
          step="any"
          value={secondNumber}
          onChange={(event) => setSecondNumber(event.target.value)}
        />

        <label htmlFor="operator">Operator:</label>
        <select
          id="operator"
          aria-label="Operator"
          value={operator}
          onChange={(event) => setOperator(event.target.value)}
        >
          <option value="+">+</option>
          <option value="-">−</option>
          <option value="*">×</option>
          <option value="/">÷</option>
        </select>

        <span aria-hidden="true" />
        <button type="submit">Compute</button>

        <label htmlFor="calculation-result">Result:</label>
        <input
          id="calculation-result"
          aria-label="Result"
          type="text"
          value={result}
          readOnly
        />
      </form>

      {error && <p className="calculator-error">{error}</p>}
    </div>
  );
}

export default Calculator;
