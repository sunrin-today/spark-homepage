import { Cautions } from "../../../components/ui/cautions/Cautions"
import { LocationList } from "../../../components/ui/list/LocationList"
export default function Charger() {
    const cautions = [
        "충전기는 C타입만 있습니다",
        "충전기 대여기간은 --일입니다, 만약 연체 되실 경우 어떻게되는거죠",
        "ㅁㄴㅇㄹ",
        "ㅁㄴㅇㄹ"
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
        <div className="lg:px-[184px] px-4 bg-white flex flex-col">
            <h1 className="font-semibold text-4xl pb-[64px] border-b-2 border-lightgray">충전기 대여</h1>        
            <div className="pl-[32px] pt-[64px] flex flex-col gap-16">
                <div className="bg-lightgray border-[1px] borde r-gray rounded-[20px] w-[629px] wflex flex-col gap-[20px] px-[50px] py-[45px]">
                    <h4 className="font-semibold text-2xl text-black">충전기 대여시 주의 할 안내사항</h4> 
                    <Cautions cautions={cautions}/>
                </div>
                <LocationList locations={locations} title="충전기 대여하러 오는 곳" />
            </div>
            <div className="flex pt-[154px] gap-8">
                <button className="w-60 h-12 text-lg rounded-[10px] bg-black text-white">충전기 대여하기</button>
                <button className="w-60 h-12 text-lg rounded-[10px] bg-lightgray text-gray border-[1px] border-gray">반납하기</button> 
            </div>
        </div>
    )
}