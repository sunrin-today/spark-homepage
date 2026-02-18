"use client";
import Image from "next/image";

interface ForecastDay {
  label: string;
  icon: string;
  rainPercent: number;
}

const FORECAST: ForecastDay[] = [
  { label: "어제",   icon: "cloudy", rainPercent: 40 },
  { label: "오늘",   icon: "rain", rainPercent: 80 },
  { label: "월요일", icon: "sunny",  rainPercent: 20 },
  { label: "화요일", icon: "sunny",  rainPercent: 10 },
  { label: "수요일", icon: "sunny",  rainPercent: 20 },
  { label: "목요일", icon: "sunny",  rainPercent: 10 },
];

export default function Weather() {
  return (
    <section className="w-full flex justify-center h-[186px] item-center">
      <div className="max-w-[1664px] mx-auto">
        <div className="flex items-center gap-[40px]">
          <div className="flex flex-col flex-shrink-0">
            <div className="flex items-start">
              <Image
                src="/weather-icons/redesign/rain.png"
                alt="비"
                width={148}
                height={148}
              />

              <div className="ml-[11px] mt-[12px]">
                <p className="text-xl font-bold leading-snug">
                  오늘은 <span className="text-[#4D93B8]">비</span>가 와요<br />
                  우산을 챙겨 오세요!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <span className="text-[23px] font-bold">오늘</span>

              <Image
                src="/weather-icons/redesign/rainwater.png"
                alt="빗물"
                width={24}
                height={24}
              />

              <span className="text-[22px] font-bold text-[#64B5F6]">
                80%
              </span>
            </div>
          </div>

          <div className="flex items-center gap-[24px]">
            {FORECAST.map((day, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2"
              >
                <span className="flex items-center gap-1 text-sm font-semibold text-[#64B5F6]">
                  <img 
                    src="/weather-icons/redesign/rainwater.png" 
                    alt="rain" 
                    className="w-2 h-3"
                  />
                  {day.rainPercent}%
                </span>

                <Image
                  src={`/weather-icons/redesign/${day.icon}.png`}
                  alt={day.label}
                  width={70}
                  height={70}
                />

                <span className="text-sm font-bold">
                  {day.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
