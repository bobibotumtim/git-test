import ColorSwitcher from "./components/ColorSwitcher";
import ControlledInput from "./components/ControlledInput";
import DragDropList from "./components/DragDropList";
import SearchFilter from "./components/SearchFilter";
import SimpleCounter from "./components/SimpleCounter";
import TodoList from "./components/TodoList";
import ToggleVisibility from "./components/ToggleVisibility";

const exercises = [
  {
    number: "01",
    title: "Simple counter",
    description: "Increment a number every time the button is clicked.",
    component: <SimpleCounter />,
  },
  {
    number: "02",
    title: "Controlled input",
    description: "Mirror the input value in real time.",
    component: <ControlledInput />,
  },
  {
    number: "03",
    title: "Toggle visibility",
    description: "Show and hide a piece of content.",
    component: <ToggleVisibility />,
  },
  {
    number: "04",
    title: "Todo list",
    description: "Add tasks and remove them when they are complete.",
    component: <TodoList />,
    wide: true,
  },
  {
    number: "05",
    title: "Color switcher",
    description: "Change a preview panel with a select control.",
    component: <ColorSwitcher />,
  },
  {
    number: "06",
    title: "Search filter",
    description: "Filter a list as the search query changes.",
    component: <SearchFilter />,
  },
  {
    number: "07",
    title: "Drag and drop list",
    description: "Drag an item and drop it on another row to reorder.",
    component: <DragDropList />,
    wide: true,
  },
];

function App() {
  return (
    <main className="page-shell">
      <header className="page-header">
        <p className="eyebrow">FER202 / Exercise 12</p>
        <h1>Managing local state with useState</h1>
        <p className="intro">
          Seven small, interactive components that demonstrate how state can
          drive content, forms, lists, styles, and drag-and-drop behavior.
        </p>
      </header>

      <div className="exercise-grid">
        {exercises.map((exercise) => (
          <section
            className={`exercise-card${exercise.wide ? " exercise-card--wide" : ""}`}
            key={exercise.number}
          >
            <div className="card-heading">
              <span>{exercise.number}</span>
              <div>
                <h2>{exercise.title}</h2>
                <p>{exercise.description}</p>
              </div>
            </div>
            <div className="demo-area">{exercise.component}</div>
          </section>
        ))}
      </div>
    </main>
  );
}

export default App;
