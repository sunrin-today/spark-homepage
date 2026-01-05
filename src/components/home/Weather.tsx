"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface ForecastItem {
  time: string;
  temp: number;
  state: string;
  icon: string;
}

interface WeatherData {
  current: {
    temp: string;
    state: string;
    diff: number | null;
  };
  forecast: ForecastItem[];
}

interface APIForecastItem {
  fcstDate: string;
  fcstTime: string;
  fcstValue: number;
  state: string;
}

export default function Weather() {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    current: {
      temp: "--",
      state: "",
      diff: null,
    },
    forecast: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [currentRes, forecastRes, diffRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/weather/current`),
        fetch(`${API_BASE_URL}/api/weather/forecast`),
        fetch(`${API_BASE_URL}/api/weather/diff`),
      ]);

      if (!currentRes.ok || !forecastRes.ok || !diffRes.ok) {
        throw new Error("날씨 데이터를 가져오는데 실패했습니다");
      }

      const currentData = await currentRes.json();
      const forecastData = await forecastRes.json();
      const diffData = await diffRes.json();

      const now = new Date();
      const currentHour = now.getHours();
      
      const filteredForecast = forecastData.data
        .filter((item: APIForecastItem) => {
          const fcstHour = parseInt(item.fcstTime.substring(0, 2));
          return fcstHour >= currentHour && fcstHour < currentHour + 5;
        })
        .slice(0, 5)
        .map((item: APIForecastItem) => ({
          time: `${parseInt(item.fcstTime.substring(0, 2))}시`,
          temp: item.fcstValue,
          state: item.state,
          icon: getWeatherIcon(item.state),
        }));

      setWeatherData({
        current: {
          temp: `${currentData.data}°C`,
          state: currentData.state,
          diff: diffData.data,
        },
        forecast: filteredForecast,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "날씨 데이터를 가져오는데 실패했습니다";
      setError(errorMessage);
      console.error("날씨 데이터 로드 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (state: string): string => {
    const stateMap: Record<string, string> = {
      맑음: "sunny",
      구름많음: "cloudy",
      흐림: "cloudy",
      비: "rainy",
      눈: "snowy",
      "비/눈": "rainy",
    };
    return stateMap[state] || "cloudy";
  };

  const getTempDiffDescription = () => {
    if (weatherData.current.diff === null) return "";
    
    const diff = weatherData.current.diff;
    if (diff > 0) {
      return `오늘은 어제보다 ${Math.abs(diff)}도 추워요`;
    } else if (diff < 0) {
      return `오늘은 어제보다 ${Math.abs(diff)}도 따뜻해요`;
    } else {
      return "어제와 비슷한 날씨예요";
    }
  };

  if (loading) {
    return (
      <div
        className="rounded-[20px] text-white flex items-center justify-center"
        style={{
          background: "linear-gradient(90deg, #ACC6EA 0%, #4CA0EE 100%)",
          padding: "25px 27px 35px 29px",
        }}
      >
        <p className="text-lg">날씨 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="rounded-[20px] text-white flex flex-col items-center justify-center gap-4"
        style={{
          background: "linear-gradient(90deg, #ACC6EA 0%, #4CA0EE 100%)",
          padding: "25px 27px 35px 29px",
        }}
      >
        <p className="text-lg">날씨 정보를 불러올 수 없습니다</p>
        <button
          onClick={fetchWeatherData}
          className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div
      className="rounded-[20px] flex flex-col gap-8"
      style={{
        background: "linear-gradient(90deg, #ACC6EA 0%, #4CA0EE 100%)",
        padding: "25px 27px 35px 29px",
      }}
    >
      {/* 현재 날씨 */}
      <div className="flex items-center gap-8">
        <Image
          src={`/weather-icons/${getWeatherIcon(weatherData.current.state)}.svg`}
          alt={weatherData.current.state}
          width={108}
          height={108}
          className="flex-shrink-0"
        />
        <div className="flex flex-col gap-2">
          <p className="text-[24px] font-medium leading-none text-[#0D0D0D]">
            {weatherData.current.temp.replace('°C', '')} <span className="text-[16px]">°C</span>
          </p>
          <p className="text-[16px] font-medium text-[#272727] mt-1">
            {getTempDiffDescription()}
          </p>
        </div>
      </div>

      {/* 시간별 날씨예보 */}
      <div className="flex justify-between items-center">
        {weatherData.forecast.map((f, i) => (
          <div key={i} className="flex flex-col items-center gap-4">
            <Image
              src={`/weather-icons/${f.icon}.svg`}
              alt={f.state}
              width={80}
              height={80}
            />
            <span className="text-[14px] font-medium text-[#474747]">
              {f.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}