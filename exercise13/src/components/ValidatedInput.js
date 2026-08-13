import { useEffect, useState } from "react";

function ValidatedInput({ validationFunction, errorMessage }) {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setIsValid(value === "" || validationFunction(value));
  }, [value, validationFunction]);

  return (
    <div className="validation-demo">
      <label htmlFor="validated-username">Username</label>
      <div className="validation-field">
        <input
          id="validated-username"
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className={isValid ? "" : "input-error"}
          aria-invalid={!isValid}
          aria-describedby={!isValid ? "username-error" : undefined}
          placeholder="At least 5 characters"
        />
        <span className={isValid && value ? "validity validity--valid" : "validity"}>
          {isValid && value ? "Valid" : "Checking"}
        </span>
      </div>
      {!isValid && (
        <p className="validation-error" id="username-error">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default ValidatedInput;
