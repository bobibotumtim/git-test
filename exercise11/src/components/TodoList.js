import { useRef, useState } from "react";

function TodoList() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const nextId = useRef(1);

  const handleAdd = (event) => {
    event.preventDefault();
    const text = input.trim();

    if (!text) {
      setError("Please enter an item.");
      return;
    }

    setItems((currentItems) => [
      ...currentItems,
      { id: nextId.current++, text },
    ]);
    setInput("");
    setError("");
  };

  const handleDelete = (id) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="todo-demo">
      <form className="todo-form" onSubmit={handleAdd}>
        <label className="sr-only" htmlFor="todo-input">
          New item
        </label>
        <input
          id="todo-input"
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button type="submit">Add List</button>
      </form>

      {error && <p className="field-error">{error}</p>}

      <h3 className="list-heading">List of Items</h3>

      {items.length > 0 && (
        <ul className="todo-list">
          {items.map((item) => (
            <li key={item.id}>
              <span>{item.text}</span>
              <button
                className="delete-button"
                type="button"
                onClick={() => handleDelete(item.id)}
                aria-label={`Delete ${item.text}`}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
