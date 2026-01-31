import { Lost } from "@/types/losts"
import Image from "next/image" 
export const LostItem = ({lost}: {lost: Lost}) => {
    
    return (
        <div className="flex flex-col justify-center  w-[234px] gap-3">
            <Image src={lost.thumbnailUrl.url} unoptimized width={234} height={234} alt="event image"
            className="rounded-[5px] aspect-[1/1] object-cover bg-gray"
            />
            <div className="gap-1">
                <h4 className=" text-lg font-semibold text-black w-full truncate">{lost.title ? lost.title : "제목 없음"}</h4>
                <p className="text-xs text-black w-full h-8 line-clamp-2 break-words">{lost.description ? lost.description : "내용 없음"}</p>
            </div>
            
        </div>
    )
}