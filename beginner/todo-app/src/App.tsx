import { useEffect, useState } from "react";

type Todo = {
  id: number;
  text: string;
  isComplete: boolean;
};

function App() {
  const [todos, setTodos] = useState<Array<Todo>>([]);

  useEffect(() => {
    console.log("todos have changed", todos);
  }, [todos]);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const input = form.querySelector("input");
    const todoText = input?.value.trim();

    if (todoText) {
      addTodo(todoText);

      if (input) {
        input.value = "";
      }
    }
  };

  const addTodo = (text: string) => {
    setTodos((prev) => [
      ...prev,
      {
        text,
        id: Math.random(),
        isComplete: false,
      },
    ]);
  };

  const removeTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  return (
    <main className="w-dvw h-dvh align-middle pt-10 pb-20">
      <section className="container grid grid-rows-[auto_1fr_auto] gap-y-10 h-full max-w-lg md:max-w-1/2 mx-auto">
        <h1 className="text-center text-3xl font-semibold">Simple Todo List</h1>

        <section id="todo-list" className="w-full overflow-y-auto">
          {todos.length > 0 ? (
            <div className="space-y-4 my-1">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className="w-full flex justify-between items-center"
                >
                  <label className="text-lg flex space-x-4 items-center peer">
                    <input
                      type="checkbox"
                      name={todo.text}
                      defaultChecked={todo.isComplete}
                      onChange={() => toggleTodo(todo.id)}
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
                      className={`${
                        todo.isComplete ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {todo.text}
                    </span>
                  </label>

                  <button
                    onClick={() => removeTodo(todo.id)}
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
              ))}
            </div>
          ) : (
            <p className="text-center">There are no todos at the moment</p>
          )}
        </section>

        <section id="todo-form" className="w-full place-self-end">
          <form className="w-full group" onSubmit={handleFormSubmit}>
            <div className="border border-gray-200 shadow rounded-full p-3 !pr-1 text-base flex space-x-4 justify-between items-center group-hover:placeholder:text-red-500">
              <input
                type="text"
                placeholder="What would you like to do today?"
                className="w-full border-none focus:border-none focus:outline-none"
              />

              <button className="shrink-0 text-sm text-white bg-gray-700 p-2 !px-4 -my-2 rounded-full transition hover:shadow-md hover:shadow-gray-400 focus:ring focus:ring-gray-500 focus:ring-offset-2 cursor-pointer">
                Add Todo
              </button>
            </div>
          </form>
        </section>
      </section>
    </main>
  );
}

export default App;
