import { Icon } from "@iconify/react";
import WeatherContent from "@/components/WeatherContent";
import { useCallback, useState, type FormEvent } from "react";
import type { WeatherResponse } from "@/types/weather";
import { useFetch } from "./hooks/useFetch";

function App() {
  const apiBaseUrl = import.meta.env.VITE_WEATHER_API_URL;
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const { loading, error, execute } = useFetch<WeatherResponse>();
  const [weatherInfo, setWeatherInfo] = useState<WeatherResponse | null>(null);

  const handleFormSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const form = event.target as HTMLFormElement;
      const input = form.querySelector("input");
      const query = input?.value;

      if (!query) return;

      setWeatherInfo(null);

      const weatherData = await execute(
        `${apiBaseUrl}/current.json?key=${apiKey}&q=${query}`
      );

      if (weatherData) {
        setWeatherInfo(weatherData);
      }
    },
    [apiBaseUrl, apiKey, execute]
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

      <WeatherContent
        isLoading={loading}
        error={error}
        weatherInfo={weatherInfo}
      />
    </main>
  );
}

export default App;
