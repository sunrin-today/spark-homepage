import React from "react";

export default function AboutBackground() {
  return (
    <>
      {/* 피그마에 나와있는 색상대로 하면 보기보다 연해서 살짝 더 진한 색상 사용함 */}
      <div
        className="absolute inset-0 -z-30"
        style={{
          background:
            "linear-gradient(135deg, #FFE58A 0%, #FFB06A 40%, #FF785A 65%, #FF4A4A 100%)",
        }}
      />
      
      {/* 도트 */}
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
    </>
  );
}