// 'use client';
// import { ChevronRight } from 'lucide-react';
// import { useRef, useState, useEffect } from 'react';
// import { Schedule } from '@/types/schedule';
// import { formatKoreanDate } from '@/utils/date';

// interface ScheduleListProps {
//   schedules?: Schedule[];
//   onScheduleClick?: (schedule: Schedule) => void;
// }

// export default function ScheduleList({ 
//   schedules = [],
//   onScheduleClick
// }: ScheduleListProps) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [scrollState, setScrollState] = useState<'top' | 'middle' | 'bottom'>('top');

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     const handleScroll = () => {
//       const { scrollTop, scrollHeight, clientHeight } = container;
      
//       if (scrollTop === 0) {
//         setScrollState('top');
//       } else if (scrollTop + clientHeight >= scrollHeight - 1) {
//         setScrollState('bottom');
//       } else {
//         setScrollState('middle');
//       }
//     };

//     handleScroll();
//     container.addEventListener('scroll', handleScroll);
//     return () => container.removeEventListener('scroll', handleScroll);
//   }, [schedules]);

//   const handleClick = (schedule: Schedule) => {
//     onScheduleClick?.(schedule);
//   };

//   return (
//     <div className="w-full">
//       <div className="flex items-center justify-between mb-3">
//         <h2 className="text-base font-medium">총 {schedules.length}개</h2>
//       </div>
      
//       <div 
//         className="relative bg-white overflow-hidden"
//         style={{ 
//           borderRadius: '20px', 
//           border: '1px solid #C3C3C3',
//           height: 'calc(6 * 76px)'
//         }}
//       >
//         {(scrollState === 'middle' || scrollState === 'bottom') && (
//           <div 
//             className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent pointer-events-none z-10"
//           />
//         )}
        
//         {(scrollState === 'top' || scrollState === 'middle') && (
//           <div 
//             className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none z-10"
//           />
//         )}
        
//         <div 
//           ref={containerRef}
//           className="p-4 overflow-y-auto h-full"
//         >
//           <div className="space-y-2">
//             {schedules.map((schedule) => (
//               <div
//                 key={schedule.id}
//                 onClick={() => handleClick(schedule)}
//                 className="flex items-center gap-3 py-2 cursor-pointer rounded-lg transition-colors px-2"
//               >
//                 <div
//                   className="w-7 h-7 rounded-full flex-shrink-0"
//                   style={{ backgroundColor: schedule.color }}
//                 />
                
//                 <div className="flex-1 min-w-0">
//                   <h3 className="text-base font-medium text-black mb-0.5">
//                     {schedule.title}
//                   </h3>
//                   <p className="text-sm text-gray">
//                     {formatKoreanDate(schedule.startDate)}
//                   </p>
//                 </div>
                
//                 <ChevronRight className="w-5 h-5 text-[#D9D9D9] flex-shrink-0 ml-2" />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { Schedule } from "@/types/schedule";
import { useRef, useState, useEffect } from "react";

interface ScheduleListProps {
  schedules: Schedule[];
  onScheduleClick?: (schedule: Schedule) => void;
}

export default function ScheduleList({
  schedules,
  onScheduleClick,
}: ScheduleListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showTopFade, setShowTopFade] = useState(false);
  const [showBottomFade, setShowBottomFade] = useState(false);

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;

    setShowTopFade(scrollTop > 10);
    setShowBottomFade(scrollTop < scrollHeight - clientHeight - 10);
  };

  useEffect(() => {
    handleScroll();
  }, [schedules]);

  return (
    <div
      className="flex flex-col rounded-[20px] border relative"
      style={{
        width: "366px",
        height: "684px",
        padding: "30px",
        borderColor: "#C0C0C0",
        backgroundColor: "#EEE",
      }}
    >
      {showTopFade && (
        <div
          className="absolute left-[30px] right-[30px] top-[30px] h-16 pointer-events-none z-10"
          style={{
            background: "linear-gradient(to bottom, #EEE 0%, transparent 100%)",
          }}
        />
      )}

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto space-y-4 scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {schedules.length > 0 ? (
          schedules.map((schedule) => (
            <div
              key={schedule.id}
              data-schedule-item
              onClick={() => onScheduleClick?.(schedule)}
              className="flex items-center gap-4 bg-white rounded-[10px] p-4 cursor-pointer hover:shadow-md transition-shadow flex-shrink-0"
            >
              <div
                className="w-8 h-8 rounded-full flex-shrink-0"
                style={{ backgroundColor: schedule.color }}
              />

              <div className="flex-1 min-w-0">
                <p className="font-medium text-base truncate">
                  {schedule.title}
                </p>
              </div>

              <div className="text-sm text-black flex-shrink-0">
                {schedule.startDate}
              </div>
            </div>
          ))
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-center text-black">등록된 일정이 없습니다</p>
          </div>
        )}
      </div>

      {showBottomFade && (
        <div
          className="absolute left-[30px] right-[30px] bottom-[30px] h-16 pointer-events-none z-10"
          style={{
            background: "linear-gradient(to top, #EEE 0%, transparent 100%)",
          }}
        />
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}