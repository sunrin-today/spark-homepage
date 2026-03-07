"use client"
import { BackButton } from "@/components/ui/button/BackButton"
import { Cautions } from "@/components/ui/cautions/Cautions"
import { LocationList } from "@/components/ui/list/LocationList"
import { useChargerRequestMutation } from "@/lib/queries/charger-request/mutations"
import {useGetRemainingChargerQuery } from "@/lib/queries/charger/queries"
import { Column } from "@/types/table"
import { Table } from "@/components/common/Table/Table"
import type { Charger, ChargerRentalRecord } from "@/types/charger"
import { useTableSort } from "@/hooks/useTableSort"
import { useGetChargerRecordListQuery } from "@/lib/queries/charger-record/queries"
import { useState } from "react"
import { ChargerStatus } from "@/components/charger/ChargerStatus"
import { UserProfile } from "@/components/ui/user/UserProfile"
import { PaginationBar } from "@/components/ui/paging/PaginationBar"
import { useIsMobile } from "@/hooks/useIsMobile"

export default function Charger() {
    const cautions = `현재 학생회에서는 ‘C-Type’ 충전기에 대해서한 서비스를 제공하고 있습니다.
    충전기 대여 기간은 7일입니다. 연체 시, 한달 간 본 서비스를 이용하실 수 없습니다.
    `
    

    const chargerColumn : Column<ChargerRentalRecord>[] = [
        {
            width: "40px",
            header: "#",
            render: (_, index) => <span className="text-base text-[#767676] no-underline whitespace-normal">{index + 1}</span>
        },
        {
            width: "200px",
            header: "충전기 번호",
            sortKey: "chargerId",
            isSortable: true,
            render: (row) =>  <span className="font-medium">{row.chargerId}번 충전기</span>
        },
        {
            width: "189px",
            header: "대여자",
            sortKey: "borrower",
            isSortable: true,
            render: (row) => <UserProfile name={row.borrower.name} photoURL={row.borrower.avatarUrl} />
        },
        {
            width: "154px",
            header: "상태",
            sortKey: "isReturned",
            isSortable: true,
            render: (row) => <ChargerStatus status={row.isReturned}/>
        }
    ]
    const mobileChargerColumn : Column<ChargerRentalRecord>[] = [
        {
            width: "189px",
            header: "충전기",
            render: (row) => <p>{row.createdAt.split('T')[0].replace(/-/g, '')} {row.chargerId}번 충전기</p>
        },
        {
            width: "154px",
            header: "상태",            
            render: (row) => <ChargerStatus status={row.isReturned}/>
        }
    ]
    const { sort : sortKey, onSortChange } = useTableSort({key: "createdAt", order: "DESC"})
    const { data: remainingChargers } = useGetRemainingChargerQuery()
    const [currentPage, setCurrentPage] = useState(1);
    const { mutate: chargerRequestMutate, isPending, } = useChargerRequestMutation();
    const isMobile = useIsMobile();
    const { data: chargerRecordList, refetch, isError, isLoading } = useGetChargerRecordListQuery({page: currentPage, limit: 3, column: sortKey.key, orderDirection: sortKey.order})
   const handleChargeRequest = () => {
        if(!remainingChargers) {
            alert("현재 대여 가능한 충전기 수량이 부족하여 대여가 불가능합니다")
            return
        }
        chargerRequestMutate()
    }
    return (
        <div className="w-full flex flex-col gap-[31px] md:gap-9 px-3 py-6 md:py-12 md:px-32 items-center md:items-start justify-center">
            <h1 className="flex items-center gap-3 text-black font-semibold text-left text-base md:text-2xl w-full">
                <BackButton/> 학생회 서비스: 충전기 대여
            </h1>        
            
            <Cautions title="충전기 대여시, 주의할 사항" items={cautions} />
                
            <div className="w-full">
                <LocationList width="673px" url="/locations/location-council.png" title="충전기 대여하러 오는 곳" />
            </div>

            <div className="flex gap-3">
                <button className={`w-fit py-[9px] px-[43px] rounded-lg  md:px-4 md:py-3 text-base font-medium md:rounded-2xl bg-black text-white ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={handleChargeRequest}
                    disabled={isPending}>
                    {isPending ? "대여 중..." : "대여하기"}
                </button>
            </div>
            <div className="w-full max-w-[1063px] flex flex-col gap-[10px]">
            {isError && <p className="text-sm text-[#FF0000]">충전기 대여 기록을 불러오는데 실패했습니다.</p>}
            <Table
                tableHeader={<h4 className="text-base md:text-xl font-semibold">충전기 대여 기록</h4>}
                sort={sortKey}
                isLoading={isLoading}
                onSortChange={onSortChange}
                onRefresh={refetch}
                columns={isMobile ? mobileChargerColumn : chargerColumn}
                data={chargerRecordList?.data.items ?? []} />
            <PaginationBar
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                totalPages={chargerRecordList?.data.totalPages ?? 0}
                totalItems={chargerRecordList?.data.total ?? 0}
            />
            </div>
        </div>
    )
}