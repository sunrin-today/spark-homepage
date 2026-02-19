"use client"
import { BackButton } from "@/components/ui/button/BackButton"
import { Cautions } from "@/components/ui/cautions/Cautions"
import { LocationList } from "@/components/ui/list/LocationList"
import { useChargerRequestMutation } from "@/lib/queries/charger-request/mutations"
import { useGetRemainingChargerQuery } from "@/lib/queries/charger/queries"
import { Column } from "@/types/table"
import { Table } from "@/components/common/Table/Table"
import type { Charger } from "@/types/charger"
import { useTableSort } from "@/hooks/useTableSort"

export default function Charger() {
    const cautions = `현재 학생회에서는 ‘C-Type’ 충전기에 대해서한 서비스를 제공하고 있습니다.
    충전기 대여 기간은 7일입니다. 연체 시, 한달 간 본 서비스를 이용하실 수 없습니다.
    `
    

    const chargerColumn : Column<Charger>[] = [
        {
            width: "40px",
            header: "#",
            render: (_, index) => index + 1
        },
        {
            width: "200px",
            header: "충전기 번호",
            sortKey: "chargerId",
            isSortable: true,
            render: (row) =>  <span className="font-medium">{row.chargerId}번 충전기</span>
        },
        {
            width: "380px",
            header: "부가설명",
            render: (row) => <span className="text-[#505050]">{row.description}</span>
        },
        {
            width: "189px",
            header: "대여자",
            render: (row) => <span>{row.currentRentalRecord?.borrower.name}</span>
        },
        {
            width: "154px",
            header: "상태",
            render: (row) => <span>{row.status}</span>
        }
    ]
    const { sort : sortKey, onSortChange } = useTableSort({key: "chargerId", order: "ASC"})
    const { data: remainingChargers } = useGetRemainingChargerQuery()
    const { mutate: chargerRequestMutate, isPending } = useChargerRequestMutation()
    const handleChargeRequest = () => {
        if(!remainingChargers) {
            alert("현재 대여 가능한 충전기 수량이 부족하여 대여가 불가능합니다")
            return
        }
        chargerRequestMutate()
    }
    return (
        <div className="w-full max-w-[1440px] flex flex-col gap-12 mx-auto py-44 px-4 sm:px-6 lg:px-8">
            <h1 className="flex w-full items-center gap-3 text-2xl font-semibold border-lightgray">
                <BackButton/> 학생회 서비스: 충전기 대여
            </h1>        
            
            <div className="flex flex-col gap-8 sm:gap-16">
                <Cautions title="충전기 대여시, 주의할 사항" items={cautions} />
                
                <div className="w-full">
                    <LocationList width="673px" url="/locations/location-council.png" title="충전기 대여하러 오는 곳" />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 pt-12 sm:pt-24">
                <button className="w-full sm:w-60 h-12 text-base sm:text-lg rounded-lg bg-black text-white"
                    onClick={handleChargeRequest}
                    disabled={isPending}>
                    {isPending ? "대여 중..." : "충전기 대여하기"}
                </button>
            </div>
            <Table
                tableHeader={<h4 className="text-xl font-semibold">충전기 대여 기록</h4>}
                sort={sortKey}
                onSortChange={onSortChange}
                onRefresh={() => {}}
                columns={chargerColumn}
                data={[{id: "1", chargerId: 1, description: "테스트", status: "대여 가능", currentRentalRecord: null}]} />
        </div>
    )
}