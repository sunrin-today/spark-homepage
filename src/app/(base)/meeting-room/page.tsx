"use client"
import { Cautions } from "@/components/ui/cautions/Cautions"
import { LocationList } from "@/components/ui/list/LocationList"
import { BackButton } from "@/components/ui/button/BackButton"
import { useGetMeetingRoomSchedule } from "@/lib/queries/meeting-room/queries"
import { useEffect, useState } from "react"
import Link from "next/link"
import type { Column } from "@/types/table"
import type { Charger } from "@/types/charger"
import { MeetingRoomRequest } from "@/types/meeting-room"
import { Table } from "@/components/common/Table/Table"
import { useTableSort } from "@/hooks/useTableSort"
import { UserProfile } from "@/components/ui/user/UserProfile"
import { formatKoreanDate } from "@/utils/date"
import { PaginationBar } from "@/components/ui/paging/PaginationBar"
import { useIsMobile } from "@/hooks/useIsMobile"

export default function Charger() {
    const cautions = "OO시에서 OO시 사이에만 이용이 가능합니다."
    const [currentPage, setCurrentPage] = useState(1);
    const { sort, onSortChange } = useTableSort({ key: "wantedDate", order: "ASC" })
    const { data: currentMeeting , refetch, isError, isLoading } = useGetMeetingRoomSchedule({ limit: 3, page: currentPage })
    const isMobile = useIsMobile();
    const meetingRoomColumn : Column<MeetingRoomRequest>[] = [
            {
                width: "40px",
                header: "#",
                render: (_, index) =>  <span className="text-[#505050] whitespace-normal overflow-visible text-clip">{index + 1}</span>
            },
            {
                width: "200px",
                header: "대여자",
                sortKey: "name",
                isSortable: true,
                render: (row) =>  <UserProfile name={row.borrower.name} photoURL={row.borrower.avatarUrl} />
            },
            {
                width: "380px",
                header: "대여 날짜",
                render: (row) => <span className="text-[#505050]">{formatKoreanDate(row.wantedDate)}</span>
            }
        ]
    const mobileMeetingRoomColumn : Column<MeetingRoomRequest>[] = meetingRoomColumn.slice(1, 3)
    return (
        <div className='w-full flex flex-col gap-[31px] md:gap-9 px-3 py-6 md:py-12 md:px-32 items-center md:items-start justify-center'>
            <h1 className="flex items-center gap-3 text-black font-semibold text-left text-base md:text-2xl w-full">
                <BackButton/>   학생회 서비스: 소회의실 대여
            </h1>   
            
            <Cautions title="소회의실 대여시, 주의할 사항" items={cautions} />
            
            <div className="w-full">
                <LocationList width="1110px" url="/locations/location-meeting-room.png" title="소회의실 위치" />
            </div>
            <Link
                href="/meeting-room/rental"
                className="w-fit py-[9px] px-[43px] text-xs rounded-lg  md:px-4 md:py-3 md:text-base font-medium md:rounded-2xl bg-black text-white">
                대여하기
            </Link>
            <div className="w-full max-w-[1063px] flex flex-col gap-[10px]">
                { isError && <p className="text-sm text-[#FF0000]">소회의실 대여 기록을 불러오는데 실패했습니다.</p>}
                <Table
                    tableHeader={<h4 className="text-base md:text-xl font-semibold">소회의실 대여 기록</h4>}
                    columns={isMobile ? mobileMeetingRoomColumn :   meetingRoomColumn}
                    data={currentMeeting?.data.items ?? []}
                    sort={ sort }
                    isLoading={isLoading}
                    onRefresh={ () => refetch() }
                    onSortChange={ onSortChange }
                />
                <PaginationBar
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    totalPages={currentMeeting?.data.totalPages ?? 0}
                    totalItems={currentMeeting?.data.total ?? 0}
                />
            </div>
        </div>
    )
}