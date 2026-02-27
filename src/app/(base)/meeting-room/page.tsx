"use client"
import { Cautions } from "@/components/ui/cautions/Cautions"
import { LocationList } from "@/components/ui/list/LocationList"
import { BackButton } from "@/components/ui/button/BackButton"
import { useGetMeetingRoomSchedule } from "@/lib/queries/meeting-room/queries"
import { useState } from "react"
import { buildMeetingRoomRequestIntoSchedule } from "@/utils/meeting-room"
import Link from "next/link"
import type { Column } from "@/types/table"
import type { Charger } from "@/types/charger"
import { MeetingRoomRequest } from "@/types/meeting-room"
import { Table } from "@/components/common/Table/Table"
import { useTableSort } from "@/hooks/useTableSort"

export default function Charger() {
    const cautions = "OO시에서 OO시 사이에만 이용이 가능합니다."
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1)
    const { sort, onSortChange } = useTableSort({ key: "wantedDate", order: "ASC" })
    const { data: currentMeeting , refetch} = useGetMeetingRoomSchedule({ month: currentMonth + 1 })
    const meetingRoomColumn : Column<MeetingRoomRequest>[] = [
            {
                width: "40px",
                header: "#",
                render: (_, index) => index + 1
            },
            {
                width: "200px",
                header: "이름",
                sortKey: "name",
                isSortable: true,
                render: (row) =>  <span className="font-medium">{row.borrower.name}</span>
            },
            {
                width: "380px",
                header: "대여 날짜",
                render: (row) => <span className="text-[#505050]">{row.wantedDate}</span>
            }
        ]
    const handleSortChange = (sort: Sort) => {
        console.log(sort)
    }
    return (
        <div className='w-full flex flex-col gap-9 px-3 py-6 md:py-12 md:px-32 justify-center'>
            <h1 className="flex items-center gap-3 text-black font-semibold text-left text-base md:text-2xl w-full">
                <BackButton/>   학생회 서비스: 소회의실 대여
            </h1>   
            
            <Cautions title="소회의실 대여시, 주의할 사항" items={cautions} />
            
            <div className="w-full">
                <LocationList width="1110px" url="/locations/location-meeting-room.png" title="소회의실 위치" />
            </div>
            <Link
                href="/meeting-room/rental"
                className="w-fit lex px-4 py-3 text-base font-medium rounded-2xl bg-black text-white">
                대여하기
            </Link>
            <Table
                columns={meetingRoomColumn}
                data={currentMeeting?.data.items ?? []}
                sort={ sort }
                onRefresh={ () => refetch() }
                onSortChange={ onSortChange }
            />
        </div>
    )
}