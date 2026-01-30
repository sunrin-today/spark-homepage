import { Event } from "@/types/events"
import Image from "next/image" 
export const EventItem = ({event}: {event: Event}) => {
    
    return (
        <div className="flex flex-col justify-center max-w-[315px] gap-3">
            <div className="relative">
                <Image src={event.thumbnail.url} unoptimized width={315} height={150} alt="event image"
                className="rounded-[20px] w-full h-[196px] object-cover bg-gray"
                />
            </div>
            <div className="gap-1">
                <h4 className=" text-lg text-black w-full truncate">{event.name ? event.name : "제목 없음"}</h4>
                <p className="text-xs font-extralight text-black w-full line-clamp-2">{event.description ? event.description : "내용 없음"}ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd</p>
            </div>
            {(() => {
                const today = new Date();
                const deadlineDate = new Date(event.deadline);
                const daysRemaining = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                
                if (daysRemaining < 0 || daysRemaining >= 6) {
                    return (
                        <div className={`px-[22px] py-[10px] text-xs w-fit text-white rounded-[100px] bg-black/50`}>
                            {daysRemaining < 0 ? `${Math.abs(daysRemaining)}일 지났음` : `${daysRemaining}일 남음`}
                        </div>
                    );
                } else {
                    return (
                        <div className={`px-[22px] py-[10px] text-xs w-fit text-black rounded-[100px] bg-main`}>
                            {daysRemaining}일 남음
                        </div>
                    );
                }
            })()}
        </div>
    )
}