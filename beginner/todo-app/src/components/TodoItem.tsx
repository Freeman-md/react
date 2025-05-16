import React from "react";
import type { Todo } from "../App";

type TodoItemProps = {
  todo: Todo;
  onToggleTodo: (id: number) => void;
  onRemoveTodo: (id: number) => void;
};

const TodoItem = React.memo(({ todo, onToggleTodo, onRemoveTodo }: TodoItemProps) => {
  console.log("Rendering:", todo.text);

  return (
    <div key={todo.id} className="w-full flex justify-between items-center">
      <label className="text-lg flex space-x-4 items-center peer">
        <input
          type="checkbox"
          name={todo.text}
          defaultChecked={todo.isComplete}
          onChange={() => onToggleTodo(todo.id)}
          className="sr-only"
        />
        <span
          className={`h-5 w-5 flex items-center justify-center rounded border-2 border-gray-400 transition 
    ${
      todo.isComplete ? "bg-gray-700 border-gray-700 !text-white" : "bg-white"
    }`}
        >
          {todo.isComplete && <span className="text-sm">✔</span>}
        </span>
        <span
          className={`${todo.isComplete ? "line-through text-gray-500" : ""}`}
        >
          {todo.text}
        </span>
      </label>

      <button
        onClick={() => onRemoveTodo(todo.id)}
        className="peer-has-checked:hidden cursor-pointer shrink-0 rounded p-1 bg-gray-200 transition hover:bg-gray-400 focus:ring focus:ring-offset-2 focus:ring-gray-400 mr-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"
          />
        </svg>
      </button>
    </div>
  );
});

export default TodoItem;
