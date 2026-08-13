import { useState } from "react";
import CountdownTimer from "./components/CountdownTimer";
import UserPosts from "./components/UserPosts";
import ValidatedInput from "./components/ValidatedInput";
import WindowSize from "./components/WindowSize";

const validateUsername = (value) => value.trim().length >= 5;

function App() {
  const [userId, setUserId] = useState(1);
  const [countdownStart, setCountdownStart] = useState(10);
  const [timerKey, setTimerKey] = useState(0);

  const restartTimer = () => setTimerKey((currentKey) => currentKey + 1);

  return (
    <main className="page-shell">
      <header className="page-header">
        <p className="eyebrow">FER202 / Exercise 13</p>
        <h1>Synchronizing components with useEffect</h1>
        <p>
          These examples connect React to APIs, timers, browser events, and
          validation logic while cleaning up every external effect.
        </p>
      </header>

      <section className="exercise-card exercise-card--posts">
        <div className="section-copy">
          <span className="section-number">01</span>
          <div>
            <h2>Data fetching</h2>
            <p>Posts are refetched whenever the selected user ID changes.</p>
          </div>
        </div>

        <label className="inline-control" htmlFor="user-id">
          User ID
          <select
            id="user-id"
            value={userId}
            onChange={(event) => setUserId(Number(event.target.value))}
          >
            {[1, 2, 3, 4, 5].map((id) => (
              <option value={id} key={id}>
                {id}
              </option>
            ))}
          </select>
        </label>

        <UserPosts userId={userId} />
      </section>

      <div className="exercise-grid">
        <section className="exercise-card">
          <div className="section-copy">
            <span className="section-number">02</span>
            <div>
              <h2>Countdown timer</h2>
              <p>The interval is cleared on every cleanup and stops at zero.</p>
            </div>
          </div>

          <div className="timer-settings">
            <label htmlFor="countdown-start">
              Start at
              <input
                id="countdown-start"
                type="number"
                min="1"
                max="60"
                value={countdownStart}
                onChange={(event) =>
                  setCountdownStart(
                    Math.min(60, Math.max(1, Number(event.target.value) || 1))
                  )
                }
              />
            </label>
            <button type="button" onClick={restartTimer}>
              Restart timer
            </button>
          </div>
          <CountdownTimer key={timerKey} initialValue={countdownStart} />
        </section>

        <section className="exercise-card">
          <div className="section-copy">
            <span className="section-number">03</span>
            <div>
              <h2>Window resize listener</h2>
              <p>The listener is attached on mount and removed on unmount.</p>
            </div>
          </div>
          <WindowSize />
        </section>

        <section className="exercise-card exercise-card--wide">
          <div className="section-copy">
            <span className="section-number">04</span>
            <div>
              <h2>Form input validation</h2>
              <p>Validation reruns whenever the controlled value changes.</p>
            </div>
          </div>
          <ValidatedInput
            validationFunction={validateUsername}
            errorMessage="Username must contain at least 5 characters."
          />
        </section>
      </div>
    </main>
  );
}

export default App;
