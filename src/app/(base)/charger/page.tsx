"use client"
import { Cautions } from "@/components/ui/cautions/Cautions"
import { LocationList } from "@/components/ui/list/LocationList"

export default function Charger() {
    const cautions = [
        "충전기는 C타입만 있습니다",
        "충전기 대여기간은 3일입니다. 연체 시 추가 대여가 제한될 수 있습니다.",
        "분실 시 비용이 청구될 수 있습니다",
        "대여 전 충전기 상태를 꼭 확인해주세요"
    ]
    
    const locations = [
        {"name": "취업부", "charge": false},
        {"name": "소회의실", "charge": true},
        {"name": "빈 교실", "charge": false},
        {"name": "3-1", "charge": false},
        {"name": "3-2", "charge": false},
        {"name": "3-3", "charge": false}
    ]

    return (
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <h1 className="text-3xl sm:text-4xl font-semibold pb-8 sm:pb-16 border-b-2 border-lightgray">
                충전기 대여
            </h1>        
            
            <div className="pt-8 sm:pt-16 lg:pl-8 flex flex-col gap-8 sm:gap-16">
                <Cautions title="충전기 대여시 주의할 안내사항" items={cautions} />
                
                <div className="w-full">
                    <LocationList locations={locations} title="충전기 대여하러 오는 곳" />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 pt-12 sm:pt-24">
                <button className="w-full sm:w-60 h-12 text-base sm:text-lg rounded-lg bg-black text-white hover:bg-gray-800 transition-colors">
                    충전기 대여하기
                </button>
                <button className="w-full sm:w-60 h-12 text-base sm:text-lg rounded-lg bg-lightgray text-gray border border-gray hover:bg-gray-100 transition-colors">
                    반납하기
                </button> 
            </div>
        </div>
    )
}