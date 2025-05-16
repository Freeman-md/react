import { Icon } from "@iconify/react";
import WeatherContent from "@/components/WeatherContent";
import { useCallback, useState, type FormEvent } from "react";
import type { WeatherResponse } from "@/types/weather";

function App() {
  const apiBaseUrl = import.meta.env.VITE_WEATHER_API_URL;
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [weatherInfo, setWeatherInfo] = useState<WeatherResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const form = event.target as HTMLFormElement;
      const input = form.querySelector("input");
      const query = input?.value;

      if (!query) return;

      setIsLoading(true);
      setError(null);
      setWeatherInfo(null);

      try {
        const response = await fetch(
          `${apiBaseUrl}/current.json?key=${apiKey}&q=${query}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error?.message || "Failed to fetch weather."
          );
        }

        const weatherData: WeatherResponse = await response.json();

        console.log(weatherData)
        setWeatherInfo(weatherData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "Something went wrong");
        } else {
          setError("Something went wrong");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [apiBaseUrl, apiKey]
  );

  return (
    <main className="w-dvw h-dvh py-10 container grid grid-cols-1 grid-rows-[auto_1fr] gap-y-8">
      <header className="space-y-4">
        <nav className="flex space-x-4 items-center justify-between">
          <h1 className="text-xl font-semibold">Weather App</h1>

          <button className="p-2 border rounded-lg transition duration-200 hover:bg-gray-100 cursor-pointer">
            <Icon icon="material-symbols:dark-mode-outline" />
          </button>
        </nav>

        <form id="searchForm" onSubmit={handleFormSubmit}>
          <div className="rounded-lg border w-full p-4 py-1 pr-1 flex space-x-4 items-center">
            <input
              type="text"
              className="border-none focus:outline-none focus:border-none focus:ring-none text-sm flex-grow"
              placeholder="Search for a city to see the weather"
            />

            <button className="flex space-x-2 items-center text-sm bg-gray-800 text-white p-2 rounded-lg transition focus:outline-none focus:border-none focus:ring focus:ring-gray-800 focus:ring-offset-2 cursor-pointer">
              <Icon icon="material-symbols:search" />
              <span>Search</span>
            </button>
          </div>
        </form>
      </header>

      <WeatherContent isLoading={isLoading} error={error} weatherInfo={weatherInfo} />
    </main>
  );
}

export default App;
