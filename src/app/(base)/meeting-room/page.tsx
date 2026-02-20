"use client"
import { Cautions } from "@/components/ui/cautions/Cautions"
import { LocationList } from "@/components/ui/list/LocationList"
import { BackButton } from "@/components/ui/button/BackButton"
import Calendar from "@/components/schedule/Calendar"
import { useGetMeetingRoomSchedule } from "@/lib/queries/meeting-room/queries"
import { useEffect, useState } from "react"
import { buildMeetingRoomRequestIntoSchedule } from "@/utils/meeting-room"
import Link from "next/link"

export default function Charger() {
    const cautions = "OO시에서 OO시 사이에만 이용이 가능합니다."
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1)
    const { data: currentMeeting } = useGetMeetingRoomSchedule({ month: currentMonth + 1 })
    useEffect(() => {
        console.log(currentMeeting?.data);
    }, [currentMeeting])
    return (
        <div className='w-full max-w-[1440px] mx-auto px-2 sm:px-6 lg:px-8 py-24
                        flex flex-col gap-9'>
            <h1 className="flex w-full items-center gap-3 text-2xl font-semibold border-lightgray">
                <BackButton/> 학생회 서비스: 소회의실 대여
            </h1>   
            
            <Cautions title="소회의실 대여시, 주의할 사항" items={cautions} />
            
            <div className="w-full">
                <LocationList width="1110px" url="/locations/location-meeting-room.png" title="소회의실 대여하러 오는 곳" />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 pt-12 sm:pt-24">
                <Link
                    href="/meeting-room/rental"
                    className="w-full sm:w-60 h-12 text-base sm:text-lg rounded-lg bg-black text-white flex items-center justify-center">
                    대여하기
                </Link>
            </div>
        </div>
    )
}