"use client"
import { useParams } from "next/navigation"
import { EventInfo } from "@/components/events/EventInfo"
import { Event } from "@/types/events"
import { imgs } from "@/lib/dummy"
import { otherEvents } from "@/lib/dummy"
import {EventItem} from "@/components/events/EventItem"
import Link from "next/link"
import { ImageList } from "@/components/ui/list/ImageList"
import { useEffect, useState } from "react"
import { getEventById } from "@/lib/api/events"

export default function EventDetail() {
    const { eventId } = useParams()
    console.log(eventId);
    const [event, setEvent] = useState<Event | null>(null);
    
    useEffect(() => {
        const fetchEvent = async () => {
            const eventData = await getEventById(eventId as string);
            console.log(eventData);
            setEvent(eventData);
        };
        
        fetchEvent();
    }, [eventId]);
    if(event == null) {
        return <div>이벤트를 찾을 수 없습니다.</div>;
    }
    return (
        
        <div className="flex flex-col items-center justify-center p-4">
            <EventInfo event={event}/>

            <ImageList items={event?.detailImages || []} />

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