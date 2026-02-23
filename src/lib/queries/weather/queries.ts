import { useQuery } from "@tanstack/react-query";
import weatherApi from "@/lib/api/weather";
import { weatherKeys } from "./keys";

export const useCurrentWeatherQuery = () => {
  return useQuery({
    queryKey: weatherKeys.current(),
    queryFn: () => weatherApi.getCurrentWeather(),
    staleTime: 10 * 60 * 1000, // 10분
    refetchInterval: 10 * 60 * 1000,
  });
};

export const useForecastWeatherQuery = () => {
  return useQuery({
    queryKey: weatherKeys.forecast(),
    queryFn: () => weatherApi.getForecastWeather(),
    staleTime: 30 * 60 * 1000, // 30분
    refetchInterval: 30 * 60 * 1000,
  });
};