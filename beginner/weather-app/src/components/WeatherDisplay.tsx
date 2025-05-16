import type { WeatherResponse } from "@/types/weather";

type WeatherDisplayProps = {
  weatherInfo: WeatherResponse;
};

const WeatherDisplay = ({ weatherInfo }: WeatherDisplayProps) => {
  return (
    <section>
      <div className="border-2 rounded-lg border-gray-200 grid grid-cols-4 p-4 h-auto">
        <div className="flex flex-col space-y-4 col-span-3">
          <h2 className="text-2xl">
            {weatherInfo.location.name}, {weatherInfo.location.country}
          </h2>
          <h3 className="text-7xl">{weatherInfo.current.temp_c}&deg;</h3>
          <h4>{weatherInfo.current.condition.text}</h4>

          <p>Wind: {weatherInfo.current.wind_mph} mph</p>
        </div>

        <img
          src={weatherInfo.current.condition.icon}
          alt={weatherInfo.location.name}
        />
      </div>
    </section>
  );
};

export default WeatherDisplay;
