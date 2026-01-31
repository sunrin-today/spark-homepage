import HeroSection from "@/components/home/HeroSection";
import TodayMenu from "@/components/home/TodayMenu";
import NoticePreview from "@/components/home/NoticePreview";
import Weather from "@/components/home/Weather";
import ServiceCard from "@/components/home/ServiceCard";
import WeeklySchedule from "@/components/home/WeeklySchedule";
import EventCarousel from "@/components/home/EventCarousel";

export default function HomePage() {
  return (
    <main className="w-full">
      <HeroSection />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-3 gap-6 mb-12">
          <TodayMenu />

          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl">이벤트</h3>
            </div>
            <div className="flex-1">
              <EventCarousel />
            </div>
          </div>

          <NoticePreview />
        </div>

        <div className="grid grid-cols-7 gap-6 mb-12">
          <div className="col-span-2 flex flex-col">
            <h3 className="font-bold text-xl mb-4">날씨</h3>
            <div className="flex-1">
              <Weather />
            </div>
          </div>

          <div className="col-span-5 flex flex-col">
            <h3 className="font-bold text-xl mb-4">학생회 서비스</h3>

            <div className="bg-[#eee] rounded-[28px] p-8 flex-1">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                <ServiceCard
                  title="월간 분실물함"
                  description="분실한 물건을 한눈에 찾을 수 있습니다"
                  href="/losts"
                />
                <ServiceCard
                  title="충전기 대여"
                  description="학생회에서 충전기를 대여해드립니다"
                  href="/charger"
                />
                <ServiceCard
                  title="소회의실 대여"
                  description="소회의실 예약을 할 수 있습니다"
                  href="/meeting-room"
                />
              </div>
            </div>
          </div>
        </div>

        <WeeklySchedule />
      </div>
    </main>
  );
}