import { useReducer } from "react";

const questions = [
  {
    id: 1,
    question: "What is the capital of Australia?",
    options: ["Sydney", "Canberra", "Melbourne", "Perth"],
    answer: "Canberra",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  {
    id: 3,
    question: "Which React hook is designed for reducer-based state?",
    options: ["useMemo", "useReducer", "useEffect", "useRef"],
    answer: "useReducer",
  },
  {
    id: 4,
    question: "What function sends an action to a reducer?",
    options: ["dispatch", "render", "subscribe", "resolve"],
    answer: "dispatch",
  },
];

export const initialState = {
  questions,
  currentQuestion: 0,
  selectedOption: "",
  score: 0,
  showScore: false,
};

export function quizReducer(state, action) {
  switch (action.type) {
    case "SELECT_OPTION":
      return { ...state, selectedOption: action.payload };

    case "NEXT_QUESTION": {
      if (!state.selectedOption) {
        return state;
      }

      const currentAnswer =
        state.questions[state.currentQuestion].answer;
      const nextScore =
        state.score + (state.selectedOption === currentAnswer ? 1 : 0);
      const isLastQuestion =
        state.currentQuestion === state.questions.length - 1;

      if (isLastQuestion) {
        return {
          ...state,
          score: nextScore,
          showScore: true,
        };
      }

      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        selectedOption: "",
        score: nextScore,
      };
    }

    case "RESTART_QUIZ":
      return { ...initialState };

    default:
      return state;
  }
}

function QuestionBank() {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  if (state.showScore) {
    const scorePercent = Math.round(
      (state.score / state.questions.length) * 100
    );

    return (
      <div className="score-panel">
        <p className="score-kicker">Quiz complete</p>
        <div className="score-ring" style={{ "--score": `${scorePercent}%` }}>
          <strong>{scorePercent}%</strong>
        </div>
        <h3>
          Your score: {state.score}/{state.questions.length}
        </h3>
        <p>
          {state.score === state.questions.length
            ? "Perfect score — every answer was correct."
            : "Nice work. Restart the quiz and try for a perfect score."}
        </p>
        <button
          type="button"
          onClick={() => dispatch({ type: "RESTART_QUIZ" })}
        >
          Restart quiz
        </button>
      </div>
    );
  }

  const question = state.questions[state.currentQuestion];
  const progress = ((state.currentQuestion + 1) / state.questions.length) * 100;
  const isLastQuestion =
    state.currentQuestion === state.questions.length - 1;

  return (
    <div className="quiz-card">
      <div className="quiz-progress-copy">
        <span>
          Question {state.currentQuestion + 1} of {state.questions.length}
        </span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="progress-track" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>

      <fieldset>
        <legend>{question.question}</legend>
        <div className="option-grid">
          {question.options.map((option, index) => (
            <label
              className={state.selectedOption === option ? "is-selected" : ""}
              key={option}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option}
                aria-label={option}
                checked={state.selectedOption === option}
                onChange={() =>
                  dispatch({ type: "SELECT_OPTION", payload: option })
                }
              />
              <span className="option-letter">
                {String.fromCharCode(65 + index)}
              </span>
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <button
        className="next-button"
        type="button"
        disabled={!state.selectedOption}
        onClick={() => dispatch({ type: "NEXT_QUESTION" })}
      >
        {isLastQuestion ? "Finish quiz" : "Next question"}
      </button>
    </div>
  );
}

export default QuestionBank;
