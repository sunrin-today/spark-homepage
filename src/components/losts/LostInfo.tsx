import { Lost } from "@/types/losts"
import Image from "next/image"
import { copyLink } from "@/utils/events"
import { Share2 } from "lucide-react"
import { getDashedFormattedDate } from "@/utils/date"
import { useFindLostMutation } from "@/lib/queries/losts/mutations"

export const LostInfo = ({lost}: {lost: Lost}) => {
    const { mutate } = useFindLostMutation(lost.id)
    return (
        <div className='max-w-[1024px] w-full flex items-center gap-8
                        lg:flex-row flex-col'>
            <Image src={lost.thumbnailUrl.url} unoptimized width={500} height={500} alt="lost image" 
                    className="w-[500px] h-[500px] aspect-square object-cover rounded-[20px]"/>
            <div className="w-full flex flex-col max-w-[365px]">
                <div className="w-full flex flex-col gap-3 pb-[13px] text-black">
                    <h4 className="font-semibold text-[32px] text-black w-full truncate">{lost.title}</h4>
                    <div className="flex gap-[11px] items-center">
                        <h4 className="text-black font-semibold">습득일</h4>
                        <p className="text-black bg-lightgray px-[10px] py-[8px]">{getDashedFormattedDate(lost.foundDate)}</p>
                    </div>
                    <div className="flex gap-[11px] items-center">
                        <h4 className="text-black font-semibold">습득장소</h4>
                        <p className="text-black bg-lightgray px-[10px] py-[8px]">{lost.location}</p>
                    </div>
                </div>
                <p className="w-full text-xs break-words line-clamp-6 text-black">{lost.description}</p>
                <div className="pt-[27px] w-full flex items-center justify-between px-[7px]">
                    <Share2 onClick={() => copyLink()} className="cursor-pointe w-8 h-8" />
                    <button className="w-[234px] h-[49px] text-white bg-black rounded-[100px] text-lg" onClick={() => mutate()}>분실물 찾으러 가기</button>
                </div>
            </div>

        </div>
    )
}