import type { WeatherResponse } from "@/types/weather"
import EmptyState from "./EmptyState"
import LoadingState from "./LoadingState"
import WeatherDisplay from "./WeatherDisplay"
import ErrorState from "./ErrorState";

type WeatherContentProps = {
  isLoading: boolean;
  weatherInfo: WeatherResponse | null;
  error: string | null;
};


const WeatherContent = ({
  isLoading,
  weatherInfo,
  error
}: WeatherContentProps) => {
  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!weatherInfo) return <EmptyState />;
  return <WeatherDisplay weatherInfo={weatherInfo} />;
};


export default WeatherContent