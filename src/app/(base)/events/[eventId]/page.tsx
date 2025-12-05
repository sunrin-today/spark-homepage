"use client"
import { useParams } from "next/navigation"
import { EventInfo } from "@/components/events/EventInfo"
import { Event } from "@/types/events"
export default function EventDetail() {
    const { eventId } = useParams()
    console.log(eventId);

    //대충 데이터 fetch

    const event: Event = {
            id: "1",
            name: "사랑감기에실려",
            description: "변해가마는풍경, 창문너머로 바라보고 싶어, 그리운 바람이 불어왔어, 어딘가에서 보이지 않는 서로를 서로에게 신호를 주며 두 사람은 살짝 눈을 돌리며 깨달았어, 형편없는 사랑을 하며, 우리는 항상 웃고 있어, 생각나는 나날이, 우리를 슬프게 하네, 있잖아, 형편없는 사랑을 하, 우리는 항상 웃고 있어어,변해가마는풍경, 창문너머로 바라보고 싶어, 그리운 바람이 불어왔어, 어딘가에서 보이지 않는 서로를 서로에게 신호를 주며 두 사람은 살짝 눈을 돌리며 깨달았어, 형편없는 사랑을 하며, 우리는 항상 웃고 있어, 생각나는 나날이, 우리를 슬프게 하네, 있잖아, 형편없는 사랑을 하, 우리는 항상 웃고 있어어,변해가마는풍경, 창문너머로 바라보고 싶어, 그리운 바람이 불어왔어, 어딘가에서 보이지 않는 서로를 서로에게 신호를 주며 두 사람은 살짝 눈을 돌리며 깨달았어, 형편없는 사랑을 하며, 우리는 항상 웃고 있어, 생각나는 나날이, 우리를 슬프게 하네, 있잖아, 형편없는 사랑을 하, 우리는 항상 웃고 있어어,변해가마는풍경, 창문너머로 바라보고 싶어, 그리운 바람이 불어왔어, 어딘가에서 보이지 않는 서로를 서로에게 신호를 주며 두 사람은 살짝 눈을 돌리며 깨달았어, 형편없는 사랑을 하며, 우리는 항상 웃고 있어, 생각나는 나날이, 우리를 슬프게 하네, 있잖아, 형편없는 사랑을 하, 우리는 항상 웃고 있어어",
            deadline: "2025-12-01",
            link: "https://placehold.co/150x150",
            thumbnail: "https://placehold.co/629x391",
            detailImages: ["https://placehold.co/150x150", "https://placehold.co/150x150", "https://placehold.co/150x150"],
        }
    return (
        <div className="flex flex-col items-center justify-center">
            <EventInfo event={event}/>
        </div>
    )
}