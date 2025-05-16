export type WeatherResponse = {
  location: {
    name: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    condition: { text: string; icon: string };
    humidity: number;
    temp_c: number;
    temp_f: number;
    wind_mph: number;
    wind_kph: number;
  };
};