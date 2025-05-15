import { useState } from "react";

function App() {
  const [counter, setCounter] = useState<number>(0)

  const increment = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event)

    setCounter((prev: number) => prev += 1)
  }

  const decrement = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event)

    setCounter((prev: number) => {
      if (prev > 0) {
        return prev -= 1
      }

      return prev
    })
  }

  return <main className="w-dvw h-dvh grid align-middle place-content-center">

    <section className="flex items-center space-x-6">
    <button className="btn" onClick={decrement}>-</button>
    <span className="text-4xl font-semibold">{counter}</span>
    <button className="btn" onClick={increment}>+</button>
    </section>

  </main>;
}

export default App;
