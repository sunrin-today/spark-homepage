"use client";

export default function TodayMenu() {
  const menuItems = [
    "흑미밥",
    "소고기미역국",
    "오리로스구이",
    "옥수수김치전",
    "양배추쌈",
    "배추김치",
    "요구르트",
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-xl">급식</h3>
      </div>

      <div className="bg-white rounded-[20px] p-6 border border-[#EEE] flex-1">
        <ul className="w-full space-y-2">
          {menuItems.map((item, index) => (
            <li key={index} className="text-sm text-gray-700 text-center">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
