"use client";
import Image from "next/image";

export default function Weather() {
  const weatherData = {
    current: {
      temp: "-18 °C",
      description: "오늘은 어제보다 18 °C 더 추워요",
    },
    forecast: [
      { time: "13시", icon: "cloudy" },
      { time: "14시", icon: "cloudy" },
      { time: "15시", icon: "cloudy" },
      { time: "16시", icon: "cloudy" },
      { time: "17시", icon: "cloudy" },
    ],
  };

  return (
    <div
      className="rounded-[20px] text-white flex flex-col justify-between h-full"
      style={{
        background: "linear-gradient(90deg, #ACC6EA 0%, #4CA0EE 100%)",
        padding: "48px 40px 36px 40px",
      }}
    >
      {/* 현재 날씨 */}
      <div className="flex items-center gap-6">
        <Image
          src="/weather-icons/sunny.svg"
          alt="맑음"
          width={100}
          height={100}
          className="flex-shrink-0"
        />
        <div className="flex flex-col gap-1">
          <p className="text-[40px] font-bold leading-tight text-white">
            {weatherData.current.temp}
          </p>
          <p className="text-[15px] font-normal text-white opacity-95 mt-1">
            {weatherData.current.description}
          </p>
        </div>
      </div>

      {/* 시간별 날씨예보 */}
      <div className="flex justify-between items-center">
        {weatherData.forecast.map((f, i) => (
          <div key={i} className="flex flex-col items-center gap-3">
            <Image
              src={`/weather-icons/${f.icon}.svg`}
              alt={f.icon}
              width={48}
              height={48}
              className="opacity-90"
            />
            <span className="text-[13px] font-medium text-white opacity-90">
              {f.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
