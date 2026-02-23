import api from "./api";

export interface CurrentWeatherResponse {
  data: number;
  state: string;
}

export interface ForecastItem {
  fcstDate: string;
  tmpValue: number;
  popValue: number;
  state: string;
}

export interface ForecastWeatherResponse {
  data: ForecastItem[];
}

const weatherApi = {
  getCurrentWeather: async (): Promise<CurrentWeatherResponse> => {
    const response = await api.get<CurrentWeatherResponse>("/api/weather/current");
    return response.data;
  },

  getForecastWeather: async (): Promise<ForecastWeatherResponse> => {
    const response = await api.get<ForecastWeatherResponse>("/api/weather/forecast");
    return response.data;
  },
};

export default weatherApi;