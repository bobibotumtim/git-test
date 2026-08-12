import Calculator from "./components/Calculator";
import SearchFilter from "./components/SearchFilter";
import TodoList from "./components/TodoList";

function App() {
  return (
    <main className="exercise-page">
      <h1>Exercise 11: React Component</h1>

      <section className="exercise-section">
        <h2>1. Create a to-do list application with add and delete functionality.</h2>
        <TodoList />
      </section>

      <section className="exercise-section">
        <h2>
          2. Create a calculator that can perform basic arithmetic operations
          (addition, subtraction, multiplication, and division).
        </h2>
        <Calculator />
      </section>

      <section className="exercise-section">
        <h2>3. Build Search filter in React</h2>
        <SearchFilter />
      </section>
    </main>
  );
}

export default App;
