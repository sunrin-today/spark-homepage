
import { CompletionTemplate } from "@/components/common/CompletionTemplate/CompletionTemplate"
export default function LostsCompletePage() {
    
    return (
        <div className="w-full min-h-[calc(100vh-72px)] flex flex-col gap-6 px-3 py-6 md:py-12 md:px-32 justify-center ">
            <CompletionTemplate 
                title="아래 지도를 보고 분실물을 찾으러 와주세요!" 
                description="학생회실로 방문하셔서 본인 확인 후, 물건 가져가시면 됩니다."     
                imageSrc="/locations/location-council.png"
                imageWidth={673}
                imageHeight={380}
                backPath="/losts"
            />
        </div>
    )
}