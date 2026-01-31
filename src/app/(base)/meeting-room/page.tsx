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
    const cautions = [
        "충전기는 C타입만 있습니다",
        "충전기 대여기간은 3일입니다. 연체 시 추가 대여가 제한될 수 있습니다.",
        "대여 전 충전기 상태를 꼭 확인해주세요"
    ]
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1)
    const { data: currentMeeting } = useGetMeetingRoomSchedule({ month: currentMonth + 1 })
    const locations = [
        {name: "1-6", width: "86px", height: "55px", charge: false},
        {name: "1-5", width: "86px", height: "55px", charge: false},
        {name: "1-4", width: "86px", height: "55px", charge: false},
        {name: "소회의실", width: "86px", height: "55px", charge: true},
        {name: "중앙계단", width: "140px", height: "65px", charge: false},
        {name: "성찰교실", width: "86px", height: "55px", charge: false},
        {name: "2-4", width: "86px", height: "55px", charge: false},
        {name: "2-5", width: "86px", height: "55px", charge: false},
        {name: "2-6", width: "86px", height: "55px", charge: false},
    ]
    useEffect(() => {
        console.log(currentMeeting?.data);
    }, [currentMeeting])
    return (
        <div className="w-full max-w-[1440px] mx-auto px-2 sm:px-6 lg:px-8 py-24">
            <h1 className="text-3xl flex flex-col gap-11 sm:text-4xl font-semibold pb-8 sm:pb-16">
                <BackButton />
                소회의실 대여
            </h1>        
            
            <div className="pt-8 sm:pt-16 lg:pl-8 flex flex-col gap-8 sm:gap-16">
                <Cautions title="소회의실 대여시 주의할 안내사항" items={cautions} />
                
                <div className="w-full">
                    <LocationList width="1110px" locations={locations} title="소회의실 대여하러 오는 곳" />
                </div>
            </div>
            <div className="w-full max-w-[1280px] md:pl-40 pt-16">
                <Calendar schedules={currentMeeting?.data ? buildMeetingRoomRequestIntoSchedule(currentMeeting?.data) : []}
                 onMonthChange={(year, month) => setCurrentMonth(month)} />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 pt-12 sm:pt-24">
                <Link
                    href="/meeting-room/rental"
                    className="w-full sm:w-60 h-12 text-base sm:text-lg rounded-lg bg-black text-white flex items-center justify-center">
                    소회의실 대여하기
                </Link>
            </div>
        </div>
    )
}