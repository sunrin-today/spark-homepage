import HeroSection from "@/components/home/HeroSection";
import TodayMenu from "@/components/home/TodayMenu";
import AnnouncementPreview from "@/components/home/AnnouncementPreview";
import Weather from "@/components/home/Weather";
import ServiceCard from "@/components/home/ServiceCard";
import WeeklySchedule from "@/components/home/WeeklySchedule";
import EventCarousel from "@/components/home/EventCarousel";
import { dummySchedules } from "@/lib/dummySchedule";

export default function HomePage() {
  return (
    <main className="w-full">
      <HeroSection />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-3 gap-6 mb-12">
          <TodayMenu />

          <div className="flex flex-col h-full">
            <div className="flex-1">
              <EventCarousel />
            </div>
          </div>

          <AnnouncementPreview />
        </div>

        <div className="grid grid-cols-5 gap-6 mb-12">
          <div className="col-span-2 flex flex-col">
            <h3 className="font-semi-bold text-xl mb-4">날씨</h3>
            <Weather />
          </div>

          <div className="col-span-3 flex flex-col">
            <h3 className="font-semi-bold text-xl mb-4">학생회 서비스</h3>

            <div className="bg-white border border-gray-200 rounded-[28px] p-8 flex-1">
              <div className="grid grid-cols-3 gap-4 w-full h-full">
                <ServiceCard
                  title="월간 분실물함"
                  description="해당 서비스를 이용하여 잃어버린 물건을 찾아보세요!"
                  href="/losts"
                  iconSrc="/example-image/event1.png"
                />
                <ServiceCard
                  title="충전기 대여"
                  description="학생회에서 충전기를 대여해드립니다!"
                  href="/charger"
                  iconSrc="/example-image/event1.png"
                />
                <ServiceCard
                  title="소회의실 대여"
                  description="학생회에서 소회의실을 대여해드립니다!"
                  href="/conference"
                  iconSrc="/example-image/event1.png "
                />
              </div>
            </div>
          </div>
        </div>

        <WeeklySchedule schedules={dummySchedules} />
      </div>
    </main>
  );
}