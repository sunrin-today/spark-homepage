import { Lost } from "@/types/losts"
import Image from "next/image" 
export const LostItem = ({lost}: {lost: Lost}) => {
    
    return (
        <div className="w-full flex flex-col justify-center gap-3">
            <div className="relative w-full aspect-[323/201] overflow-hidden rounded-[20px]">   
                <Image src={lost.thumbnailUrl.url} unoptimized fill alt="event image"
                className="object-cover"
                />
            </div>
            <div className="gap-1">
                <h4 className="text-lg font-semibold text-black w-full truncate">{lost.title ? lost.title : "제목 없음"}</h4>
                <p className="text-sm text-[#767676] w-full truncate">{lost.location ? lost.location : "내용 없음"}</p>
            </div>
            
        </div>
    )
}