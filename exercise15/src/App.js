import Counter from "./components/Counter";
import QuestionBank from "./components/QuestionBank";

function App() {
  return (
    <main className="page-shell">
      <header className="page-header">
        <div className="header-number">15</div>
        <div>
          <p className="eyebrow">FER202 / React hooks</p>
          <h1>Predictable state with useReducer</h1>
          <p className="intro">
            Events become actions, reducers describe every transition, and
            complex component state stays in one predictable flow.
          </p>
        </div>
      </header>

      <section className="exercise-section counter-section">
        <div className="section-heading">
          <span>Exercise 01</span>
          <h2>Reducer counter</h2>
          <p>Dispatch increment, decrement, and reset actions.</p>
        </div>
        <Counter />
      </section>

      <section className="exercise-section quiz-section">
        <div className="section-heading">
          <span>Exercise 02</span>
          <h2>Question bank</h2>
          <p>
            A single reducer manages question progress, selection, scoring,
            completion, and restart.
          </p>
        </div>
        <QuestionBank />
      </section>
    </main>
  );
}

export default App;
