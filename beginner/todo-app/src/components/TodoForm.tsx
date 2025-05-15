import type { FormEvent } from "react"

type TodoFormProps = {
    addTodo: (text: string) => void
}

export default function TodoForm({
    addTodo
} : TodoFormProps) {
    
    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
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

    return (
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
    )
}