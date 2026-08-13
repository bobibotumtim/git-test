import { useState } from "react";

const initialItems = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];

function DragDropList() {
  const [items, setItems] = useState(initialItems);
  const [draggingItem, setDraggingItem] = useState(null);

  const handleDragStart = (event, index) => {
    setDraggingItem(index);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", String(index));
  };

  const handleDrop = (event, targetIndex) => {
    event.preventDefault();

    if (draggingItem === null || draggingItem === targetIndex) {
      setDraggingItem(null);
      return;
    }

    setItems((currentItems) => {
      const reorderedItems = [...currentItems];
      const [movedItem] = reorderedItems.splice(draggingItem, 1);
      reorderedItems.splice(targetIndex, 0, movedItem);
      return reorderedItems;
    });
    setDraggingItem(null);
  };

  return (
    <div className="drag-demo">
      <p className="drag-instruction">Grab the handle and drop a row in a new position.</p>
      <ol className="drag-list">
        {items.map((item, index) => (
          <li
            className={draggingItem === index ? "is-dragging" : ""}
            draggable
            key={item}
            onDragStart={(event) => handleDragStart(event, index)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => handleDrop(event, index)}
            onDragEnd={() => setDraggingItem(null)}
          >
            <span className="drag-handle" aria-hidden="true">
              ⋮⋮
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default DragDropList;
