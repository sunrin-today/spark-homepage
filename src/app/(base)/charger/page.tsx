export default function Charger() {
    return (
        <div className="p-16 px-[184px] flex flex-col">
            <h1 className="font-semibold text-4xl pb-[74px] border-b-2 border-lightgray">충전기 대여</h1>        
            <div className="pl-[30px] pt-[78px] flex flex-col gap-16">
                <div className="bg-lightgray border-[1px] border-gray rounded-[20px] w-[629px] wflex flex-col gap-[20px] px-[50px] py-[45px]">
                    <h4 className="font-semibold text-2xl text-black">충전기 대여시 주의 할 안내사항</h4>
                    <ul className="list-none">
                        <li className="before:content-['•'] before:mx-2 before:text-2xl before:text-black text-[18px] before:text-center before:mr-2">충전기는 C타입만 있습니다</li>
                        <li className="before:content-['•'] before:mx-2 before:text-2xl text-[18px] before:text-black before:text-center">충전기 대여기간은 --일입니다, 만약 연체 되실 경우 어떻게되는거죠</li>
                        <li className="before:content-['•'] before:mx-2  before:text-2xl text-[18px] before:text-black before:text-center">ㅁㄴㅇㄹ</li>
                        <li className="before:content-['•'] before:mx-2  before:text-2xl text-[18px] before:text-black before:text-center">ㅁㄴㅇㄹ</li>
                    </ul>
                </div>
                <div className="bg-lightgray border-[1px] border-gray rounded-[20px] w-[773px] flex flex-col gap-5 px-[50px] py-[45px]">
                    <h4 className="font-semibold text-black text-2xl">충전기 대여하러 오는 곳</h4>
                    <div className="flex items-center justify-center gap-4 px-[35px] py-[51px] rounded-[10px] bg-white">
                        <span className="text-lg rounded-[5px] shrink-0 flex items-center justify-center bg-gray text-black w-[86px] h-[55px]">취업부</span>
                        <span className="text-lg rounded-[5px] shrink-0 flex items-center justify-center bg-main text-white w-[86px] h-[55px]">소회의실</span>
                        <span className="text-lg rounded-[5px] shrink-0 flex items-center justify-center bg-gray text-black w-[86px] h-[55px]">빈 교실</span>
                        <span className="text-lg rounded-[5px] shrink-0 flex items-center justify-center bg-gray text-black w-[86px] h-[55px]">3-1</span>
                        <span className="text-lg rounded-[5px] shrink-0 flex items-center justify-center bg-gray text-black w-[86px] h-[55px]">3-2</span>
                        <span className="text-lg rounded-[5px] shrink-0 flex items-center justify-center bg-gray text-black w-[86px] h-[55px]">3-3</span>
                    </div>
                </div>
            </div>
            <div className="flex pt-[154px] gap-8">
                <button className="w-60 h-12 text-lg rounded-[10px] bg-black text-white">충전기 대여하기</button>
                <button className="w-60 h-12 text-lg rounded-[10px] bg-lightgray text-gray border-[1px] border-gray">반납하기</button> 
            </div>
        </div>
    )
}