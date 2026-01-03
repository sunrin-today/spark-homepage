import { Lost } from "@/types/losts"
import Image from "next/image" 
export const LostItem = ({lost}: {lost: Lost}) => {
    
    return (
        <div className="flex flex-col justify-center  w-[234px] gap-3">
            <Image src={ "https://placehold.co/234x234"} unoptimized width={234} height={234} alt="event image"
            className="rounded-[5px] aspect-[1/1] bg-gray"
            />
            <div className="gap-1">
                <h4 className=" text-lg font-semibold text-black w-full">{lost.name ? lost.name : "제목 없음"}</h4>
                <p className="text-xs text-black w-full max-h-[32px] overflow-hidden text-ellipsis">{lost.description ? lost.description : "내용 없음"}</p>
            </div>
            
        </div>
    )
}