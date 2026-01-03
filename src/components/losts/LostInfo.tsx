import { Lost } from "@/types/losts"
import Image from "next/image"
import { copyLink, linkToEvent } from "@/utils/events"
export const LostInfo = ({lost}: {lost: Lost}) => {
    

    return (
        <div className="w-[1024px] flex items-center gap-8">
            <Image src={lost.thumbnail} unoptimized width={500} height={500} alt="lost image" className="rounded-[20px]"/>
            <div className="flex flex-col">
                <div className="flex flex-col gap-3 pb-[13px] text-black">
                    <h4 className="font-semibold text-[32px] text-black">{lost.name}</h4>
                    <div className="flex gap-[11px] items-center">
                        <h4 className="text-black">습득일</h4>
                        <p className="text-black bg-lightgray px-[10px] py-[8px]">{lost.acquisitionDate}</p>
                    </div>
                    <div className="flex gap-[11px] items-center">
                        <h4 className="text-black">습득장소</h4>
                        <p className="text-black bg-lightgray px-[10px] py-[8px]">{lost.acquisitionPlace}</p>
                    </div>
                </div>
                <p className="text-xs line-clamp-6 text-black">{lost.description}</p>
                <div className="pt-[27px] flex items-center gap-[28px]">
                    <i onClick={() => copyLink()} className="bi bi-share-fill cursor-pointer text-2xl"></i>
                    <button className="w-[234px] h-[49px] text-white bg-black rounded-[100px] text-[18px]" onClick={() => {}}>분실물 찾으러 가기</button>
                </div>
            </div>
        </div>
    )
}