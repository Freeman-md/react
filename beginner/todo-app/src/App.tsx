import { useCallback, useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

export type Todo = {
  id: number;
  text: string;
  isComplete: boolean;
};

function App() {
  const [todos, setTodos] = useState<Array<Todo>>(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

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

  const removeTodo = useCallback((id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const toggleTodo = useCallback((id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  }, []);

  return (
    <main className="w-dvw h-dvh align-middle pt-10 pb-20">
      <section className="container grid grid-rows-[auto_1fr_auto] gap-y-10 h-full max-w-lg md:max-w-1/2 mx-auto">
        <h1 className="text-center text-3xl font-semibold">Simple Todo List</h1>

        <section id="todo-list" className="w-full overflow-y-auto">
          {todos.length > 0 ? (
            <div className="space-y-4 my-1">
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggleTodo={toggleTodo}
                  onRemoveTodo={removeTodo}
                />
              ))}
            </div>
          ) : (
            <p className="text-center">There are no todos at the moment</p>
          )}
        </section>

        <TodoForm onAddTodo={addTodo} />
      </section>
    </main>
  );
}

export default App;
