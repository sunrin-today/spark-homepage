"use client"
import { useParams } from "next/navigation"
import { EventInfo } from "@/components/events/EventInfo"
import { otherEvents } from "@/lib/dummy"
import {EventItem} from "@/components/events/EventItem"
import Link from "next/link"
import { ImageList } from "@/components/ui/list/ImageList"
import { useEventByIdQuery } from "@/lib/queries/events/queries"
export default function EventDetail() {
    const { eventId } = useParams()
    
    const { data: eventDetail } = useEventByIdQuery(eventId!.toString())
    return (
        
        <div className="flex flex-col items-center justify-center p-4">
            {eventDetail && <EventInfo event={eventDetail}/>}
            {eventDetail && <ImageList items={eventDetail.detailImages.map((image) => image.url) || []} />}

            <div className='flex flex-col max-w-[1480px] gap-[22px]
                            pt-[160px] mb-[180px] mt-[256px] border-t-2 border-lightgray
                            snap-x snap-mandatory overflow-x-auto' >
                <div className="flex items-center justify-between">
                    <h4 className="text-2xl">다른 이벤트 구경하기</h4>
                    <button onClick={() => {}} className="text-lg">자세히 보기 +</button>
                </div>
                <ul className="list-none flex gap-[30px] overflow-auto">
                    {
                        otherEvents.map((event) => (
                            <Link href={`/events/${event.id}`} key={event.id} className="snap-start">   
                                <EventItem key={event.id} event={event} />
                            </Link>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}