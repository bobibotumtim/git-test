import { useState } from "react";

function TodoList() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([
    "Review React hooks",
    "Finish Exercise 12",
  ]);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const todo = newTodo.trim();

    if (!todo) {
      setError("Please enter a task before adding it.");
      return;
    }

    setTodos((currentTodos) => [...currentTodos, todo]);
    setNewTodo("");
    setError("");
  };

  const handleDelete = (todoIndex) => {
    setTodos((currentTodos) =>
      currentTodos.filter((_, index) => index !== todoIndex)
    );
  };

  return (
    <div className="todo-demo">
      <form className="todo-form" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="todo-input">
          New todo
        </label>
        <input
          id="todo-input"
          type="text"
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
          placeholder="Please input a task"
        />
        <button type="submit">Add todo</button>
      </form>
      {error && <p className="form-error">{error}</p>}

      <div className="todo-panel">
        <div className="todo-panel__heading">
          <h3>Todo list</h3>
          <span>{todos.length} active</span>
        </div>
        {todos.length === 0 ? (
          <p className="empty-state">All tasks are complete.</p>
        ) : (
          <ul className="todo-list">
            {todos.map((todo, index) => (
              <li key={`${todo}-${index}`}>
                <span>{todo}</span>
                <button
                  type="button"
                  onClick={() => handleDelete(index)}
                  aria-label={`Delete ${todo}`}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TodoList;
