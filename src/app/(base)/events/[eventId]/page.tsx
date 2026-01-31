"use client"
import { useParams } from "next/navigation"
import { EventInfo } from "@/components/events/EventInfo"
import {EventItem} from "@/components/events/EventItem"
import Link from "next/link"
import { useEventByIdQuery, useEventsQuery } from "@/lib/queries/events/queries"
import { useState } from "react"
import Image from "next/image"
import { Minus, Plus } from "lucide-react"
export default function EventDetail() {
    const { eventId } = useParams()
    const [limit, setLimit] = useState(5)
    const { data: eventDetail } = useEventByIdQuery(eventId!.toString())
    const { data: otherEvents} = useEventsQuery({page: 1, limit:limit, url:""})
    return (
        
        <div className="flex flex-col items-center max-w-[1440px] pt-56 w-full mx-auto justify-center p-4">
            {eventDetail && <> <EventInfo event={eventDetail}/>
            <ul className='
                    
                    flex gap-3 list-none border-t-2 border-lightgray pt-[110px] mt-[135px]
                    snap-x snap-mandatory overflow-x-auto border-b-2 w-full pb-32
                '>
                    {
                
                    eventDetail?.detailImages.map((image: {url: string}) => (
                        <Image className="snap-start w-[365px] h-[462px] aspect-[365/462] object-cover" key={image.url} src={image.url} alt="EventDetailImage" width={462} height={365} unoptimized />
                    ))
                }
            </ul>
            </> }
            { otherEvents &&
            <div className='flex w-full flex-col lg:max-w-[1440px] gap-[22px]
                            pt-[160px] mb-[180px] mt-[256px] border-t-2 border-lightgray
                            overflow-x-auto' >
                <div className="flex w-full items-center justify-between">
                    <h4 className="text-2xl">다른 이벤트 구경하기</h4>
                    {
                        limit < 20 && (
                            <button onClick={() => {setLimit(20)}} className="text-lg flex items-center gap-2">자세히 보기 <Plus className="w-5 h-5"/></button>
                        )
                    }
                    {
                        limit === 20 && (
                            <button onClick={() => {setLimit(5)}} className="text-lg flex items-center gap-2">간단히 보기 <Minus className="w-5 h-5"/></button>
                        )
                    }
                </div>
                <ul className="list-none flex gap-[30px] overflow-auto">
                    {
                        otherEvents?.items.filter((event) => event.id !== eventId).map((event) => (
                            <Link href={`/events/${event.id}`} key={event.id} className="snap-start">   
                                <EventItem key={event.id} event={event} />
                            </Link>
                        ))
                    }
                </ul>
            </div>
                }
                
        </div>
    )
}