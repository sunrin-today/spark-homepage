import React, { ReactNode } from "react";

interface LoginBackgroundProps {
  children: ReactNode;
}

export default function LoginBackground({ children }: LoginBackgroundProps) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 그라데이션 배경 */}
      <div
        className="absolute inset-0 -z-30"
        style={{
          background:
            "linear-gradient(225deg, #FFE58A 0%, #FFB06A 40%, #FF785A 65%, #FF4A4A 100%)",
        }}
      />

      {/* 도트 패턴 */}
      <div
        className="absolute inset-0 -z-20 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle, rgba(255, 90, 90, 0.28) 2px, transparent 2px),
            radial-gradient(circle, rgba(255, 90, 90, 0.28) 2px, transparent 2px)
          `,
          backgroundSize: "18px 18px",
          backgroundPosition: "0 0, 9px 9px",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.22) 55%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.22) 55%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* 컨텐츠 영역 */}
      <div className="flex items-center justify-center h-full px-8">
        {children}
      </div>
    </div>
  );
}