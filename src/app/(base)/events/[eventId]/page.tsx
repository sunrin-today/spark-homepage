"use client"
import { useParams } from "next/navigation"
import { EventInfo } from "@/components/events/EventInfo"
import { useEventByIdQuery } from "@/lib/queries/events/queries"
import Image from "next/image"
import { BackButton } from "@/components/ui/button/BackButton"
export default function EventDetail() {
    const { eventId } = useParams()
    const { data: eventDetail } = useEventByIdQuery(eventId!.toString())
    return (
        <div className="w-full flex flex-col gap-6 px-3 py-6 md:py-12 md:px-32 justify-center">
            <h1 className="flex items-center gap-3 text-black font-semibold text-left text-base md:text-2xl w-full">
                <BackButton/>   이벤트 상세: {eventDetail?.name}
            </h1>   
            <div className="flex flex-col gap-14">
                {eventDetail && <>
                 <EventInfo event={eventDetail}/>
                <div className="flex flex-col gap-5">
                    <h4 className="text-black font-semibold text-left text-xl w-full">상세 이미지</h4>
                    <ul className=' 
                            
                            flex gap-3 list-none
                            snap-x snap-mandatory overflow-x-auto w-full
                        '>
                            {
                        
                            eventDetail?.detailImages.map((image: {url: string}) => (
                                <Image className="snap-start w-[365px] h-[462px] aspect-[365/462] object-cover" key={image.url} src={image.url} alt="EventDetailImage" width={462} height={365} unoptimized />
                            ))
                        }
                    </ul>
                </div>
                </> }
            </div>
        </div>
    )
}