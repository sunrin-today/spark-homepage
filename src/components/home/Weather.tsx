"use client";

import Image from "next/image";
import { useCurrentWeatherQuery, useForecastWeatherQuery } from "@/lib/queries/weather/queries";
import { ForecastItem } from "@/lib/api/weather";

const STATE_LABELS: Record<string, string> = {
  sunny: "맑음",
  cloudy: "흐림",
  rain: "비",
  snow: "눈",
  thunder: "천둥번개",
};

const STATE_INFO: Record<string, { color: string; line1: string; line2: string }> = {
  sunny: { color: "#F5A623", line1: "오늘은 맑아요", line2: "기분 좋은 하루 되세요!" },
  cloudy: { color: "#8E8E8E", line1: "오늘은 흐려요", line2: "날씨가 쌀쌀할 수 있어요" },
  rain:   { color: "#4D93B8", line1: "오늘은 비가 와요", line2: "우산을 챙겨 오세요!" },
  snow:   { color: "#6BAED6", line1: "오늘은 눈이 와요", line2: "미끄러지지 않게 조심하세요!" },
  thunder:{ color: "#7B5EA7", line1: "오늘은 천둥번개가 쳐요", line2: "실내에 머무는게 좋아요" },
};

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

function formatFcstDate(fcstDate: string): string {
  const year = parseInt(fcstDate.slice(0, 4), 10);
  const month = parseInt(fcstDate.slice(4, 6), 10) - 1;
  const day = parseInt(fcstDate.slice(6, 8), 10);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(year, month, day);
  target.setHours(0, 0, 0, 0);

  const diffDays = Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === -1) return "어제";
  if (diffDays === 0) return "오늘";
  if (diffDays === 1) return "내일";
  return `${WEEKDAYS[target.getDay()]}요일`;
}

function getTodayFcstDate(): string {
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, "0");
  const d = String(today.getDate()).padStart(2, "0");
  return `${y}${m}${d}`;
}

const KEYWORDS: Record<string, string> = {
  sunny: "맑아요",
  cloudy: "흐려요",
  rain: "비가 와요",
  snow: "눈이 와요",
  thunder: "천둥번개가 쳐요",
};

function ColoredLine({ text, keyword, color }: { text: string; keyword: string; color: string }) {
  const idx = text.indexOf(keyword);
  if (idx === -1) return <span>{text}</span>;

  const before = text.slice(0, idx);
  const after = text.slice(idx + keyword.length);

  return (
    <span>
      {before}
      <span style={{ color }}>{keyword}</span>
      {after}
    </span>
  );
}

export default function Weather() {
  const { data: current } = useCurrentWeatherQuery();
  const { data: forecast } = useForecastWeatherQuery();

  const currentState = current?.state ?? "sunny";
  const stateInfo = STATE_INFO[currentState] ?? STATE_INFO["sunny"];
  const forecastList: ForecastItem[] = forecast?.data ?? [];
  const todayForecast = forecastList.find((f) => f.fcstDate === getTodayFcstDate());

  const keyword = KEYWORDS[currentState] ?? "";

  return (
    <section className="flex items-center">
      <div className="flex items-center gap-10 flex-wrap">

        {/* 왼쪽: 현재 날씨 */}
        <div className="flex flex-col flex-shrink-0">

          {/* sm 이상: 기존 레이아웃 (아이콘 + 텍스트 가로 배치) */}
          <div className="hidden sm:flex items-center gap-[11px]">
            <Image
              src={`/weather-icons/${currentState}.svg`}
              alt={STATE_LABELS[currentState] ?? currentState}
              width={148}
              height={148}
            />
            <div className="flex flex-col">
              <p className="text-xl font-bold leading-snug">
                <ColoredLine text={stateInfo.line1} keyword={keyword} color={stateInfo.color} />
              </p>
              <p className="text-xl font-bold leading-snug">{stateInfo.line2}</p>
            </div>
          </div>

          {/* sm 미만(모바일): 아이콘+강수확률(왼쪽) + 상태텍스트(오른쪽) */}
          <div className="flex sm:hidden items-stretch gap-[10px]">
            {/* 왼쪽: 아이콘 + 강수확률 */}
            <div className="flex flex-col items-center flex-shrink-0" style={{ gap: "10px" }}>
              <Image
                src={`/weather-icons/${currentState}.svg`}
                alt={STATE_LABELS[currentState] ?? currentState}
                width={148}
                height={148}
              />
              {todayForecast && (
                <div className="flex items-center gap-1">
                  <span className="text-[16px] font-bold">오늘</span>
                  <Image src="/weather-icons/water-drop.svg" alt="강수확률" width={10} height={15} />
                  <span className="text-[16px] font-bold text-[#64B5F6]">
                    {todayForecast.popValue}%
                  </span>
                </div>
              )}
            </div>

            {/* 오른쪽: 상태 텍스트 (세로 중앙 정렬) */}
            <div className="flex flex-col justify-center">
              <p className="text-[16px] font-bold leading-snug">
                <ColoredLine text={stateInfo.line1} keyword={keyword} color={stateInfo.color} />
              </p>
              <p className="text-[16px] font-bold leading-snug">{stateInfo.line2}</p>
            </div>
          </div>

          {/* sm 이상: 오늘 강수확률 (기존 위치) */}
          {todayForecast && (
            <div className="hidden sm:flex items-center gap-1">
              <span className="text-[23px] font-bold">오늘</span>
              <Image src="/weather-icons/water-drop.svg" alt="강수확률" width={24} height={24} />
              <span className="text-[22px] font-bold text-[#64B5F6]">
                {todayForecast.popValue}%
              </span>
            </div>
          )}
        </div>

        {/* 오른쪽: 예보 리스트 (sm 이상에서만 표시) */}
        {forecastList.length > 0 && (
          <div className="hidden sm:flex items-center gap-10 overflow-x-auto pb-1">
            {forecastList.map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-1 flex-shrink-0">
                <div className="flex items-center gap-1">
                  <Image src="/weather-icons/water-drop.svg" alt="강수확률" width={10} height={13} />
                  <span className="text-sm font-semibold text-[#64B5F6]">{day.popValue}%</span>
                </div>
                <Image
                  src={`/weather-icons/${day.state}.svg`}
                  alt={STATE_LABELS[day.state] ?? day.state}
                  width={70}
                  height={70}
                />
                <div className="flex items-center gap-1">
                  <span className="text-sm font-semibold">{formatFcstDate(day.fcstDate)}</span>
                  <span className="text-sm font-medium text-[#505050]">{day.tmpValue} °C</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}