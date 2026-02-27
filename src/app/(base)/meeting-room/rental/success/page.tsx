import { CompletionTemplate } from "@/components/common/CompletionTemplate/CompletionTemplate";
import { formatKoreanDate } from "@/utils/date";
export default async function MeetingRoomRentalSuccessPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const { date } = await searchParams;console.log(searchParams);
  return (
    <div className="w-full min-h-[calc(100vh-72px)] flex flex-col gap-6 px-3 py-6 md:py-12 md:px-32 justify-center ">
        <CompletionTemplate
            title="소회의실 대여 신청이 완료되었습니다!"
            description={`이용일: ${date ? `${formatKoreanDate(date as string)}` : '2026년 01월 03일'}`}
            imageSrc="/locations/location-meeting-room.png"
            imageWidth={1036}
            imageHeight={167}
            backPath="/meeting-room"
        />
    </div>
  );
}