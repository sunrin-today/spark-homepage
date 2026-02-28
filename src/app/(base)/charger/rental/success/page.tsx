
import { CompletionTemplate } from "@/components/common/CompletionTemplate/CompletionTemplate"
export default function ChargerCompletePage() {
    
    return (
        <div className="w-full min-h-[calc(100vh-72px)] flex flex-col gap-6 px-3 py-6 md:py-12 md:px-32 justify-center ">
            <CompletionTemplate 
                title="충전기 대여가 신청되었습니다!" 
                description="아래 지도를 보고 OO시까지 방문하셔서 충전기 수령 바랍니다."     
                imageSrc="/locations/location-council.png"
                imageWidth={673}
                imageHeight={380}
            />
        </div>
    )
}