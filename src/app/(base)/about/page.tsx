"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function AboutPage() {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
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

      <button
        className="absolute z-40 text-white hover:opacity-80 transition-opacity top-10 left-12 md:top-12 md:left-14"
        onClick={() => window.history.back()}
        aria-label="뒤로가기"
      >
        <Image
          src="/icons/back.svg"
          alt="뒤로가기"
          width={24}
          height={24}
          className="mix-blend-overlay !opacity-60" // TODO: 반투명하게 처리 안 되는 오류 수정
        />
      </button>
      <div className="flex items-center justify-center h-full px-8">
        <div className="flex items-center justify-center gap-16 max-w-6xl w-full">
          <div
            className="flex-shrink-0 transition-all duration-1000 ease-out"
            style={{
              opacity: animationComplete ? 1 : 0.1,
              transform: animationComplete
                ? "translateX(0)"
                : "translateX(150px)",
              width: "420px",
            }}
          >
            <Image
              src="/logo/logo.svg"
              alt="SPARK!"
              width={200}
              height={200}
              className="w-full"
            />
          </div>

          <div
            className="text-white transition-all duration-1000 ease-out"
            style={{
              opacity: animationComplete ? 1 : 0,
              transform: animationComplete
                ? "translateX(0)"
                : "translateX(50px)",
              maxWidth: "580px",
            }}
          >
            <h1 className="text-[24px] font-bold mb-6">
              모든 목소리를 하나로, SPARK!
            </h1>

            <p className="text-[16px] mb-5">
              새롭게 브랜딩한 120대 학생회 SPARK!를 소개합니다!
              <br />
              SPARK!는 120대 학생회가 가장 중요하게 여기는 가치인 소통, 열정,
              활기를 담았습니다.
            </p>

            <p className="text-[16px] mb-5">
              로고의 강렬한 쉐입은 말풍선을 모티브로 하여 제작되었고, 이는
              학생회 내의 활발한 소통과 부원들의 열정이 담겨있습니다. 이번 120대
              학생회 브랜딩이 학생 여러분들에게 더욱 친근하게 다가갈 수 있는
              요소로 작용하길 기대합니다.
            </p>

            <p className="text-[16px]">
              SPARK!는 작은 불씨가 모여 따뜻하고 환한 불꽃이 되듯, 학생들의
              생각과 열정을 모아 학교 곳곳에 전합니다. 서로의 다름을 존중하며
              마음을 나누고, 그 속에서 새로운 아이디어와 변화를 자연스럽게
              피워냅니다.
              <br />
              작은 제안도, 사소한 시작도 이 안에서는 모두를 움직이게 하는 힘이
              됩니다.
              <br />
              SPARK!는 그 불빛이 더 멀리, 더 밝게 퍼져나가도록 함께 지켜가는
              우리만의 공동체입니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
