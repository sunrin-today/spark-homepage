import HeroSection from "@/components/home/HeroSection";
import Weather from "@/components/home/Weather";
import EventCarousel from "@/components/home/EventCarousel";
import NoticePreview from "@/components/home/NoticePreview";
import ServiceCard from "@/components/home/ServiceCard";
import MealCalendar from "@/components/home/Mealcalendar";

export default function HomePage() {
  return (
    <main className="w-full">
      <HeroSection />

      <div className="max-w-[1920px] mx-auto px-[6px] lg:px-[128px]">

        <section className="mt-12 mb-14">
          <Weather />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[141fr_127fr] gap-6 lg:gap-[56px] mb-14">
          <EventCarousel />
          <NoticePreview />
        </section>

        <section className="mb-14">
          <h3 className="font-bold text-xl mb-6">학생회 서비스</h3>
          <div className="flex flex-wrap gap-[22px] justify-start">
            <ServiceCard
              title="월간 분실물함"
              description={
                <>
                  해당 서비스를 이용하여<br />잃어버린 물건을 찾아보세요!
                </>
              }
              href="/losts"
              imageSrc="/example-image/rough.png"
            />
            <ServiceCard
              title="충전기 대여"
              description={
                <>
                  해당 서비스를 이용하여<br />충전기를 대여해보세요!
                </>
              }
              href="/charger"
              imageSrc="/example-image/rough.png"
            />
            <ServiceCard
              title="소회의실 대여"
              description={
                <>
                  해당 서비스를 이용하여<br />소회의실을 대여해보세요!
                </>
              }
              href="/meeting-room"
              imageSrc="/example-image/rough.png"
            />
          </div>
        </section>

        {/* 급식 캘린더 */}
        <section className="mb-20">
          <MealCalendar />
        </section>

      </div>
    </main>
  );
}