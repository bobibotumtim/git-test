import { useEffect, useState } from "react";

function CountdownTimer({ initialValue }) {
  const [timeRemaining, setTimeRemaining] = useState(initialValue);

  useEffect(() => {
    if (timeRemaining <= 0) {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      setTimeRemaining((currentTime) => Math.max(0, currentTime - 1));
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [timeRemaining]);

  return (
    <div className={`countdown${timeRemaining === 0 ? " countdown--done" : ""}`}>
      <span className="countdown__label">Time Remaining</span>
      <strong aria-live="polite">{timeRemaining}</strong>
      <span className="countdown__unit">
        {timeRemaining === 1 ? "second" : "seconds"}
      </span>
    </div>
  );
}

export default CountdownTimer;
