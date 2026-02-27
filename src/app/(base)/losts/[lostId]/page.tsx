"use client"
import { useParams } from "next/navigation"
import { LostInfo } from "@/components/losts/LostInfo"
import Image from "next/image"
import { useLostDetailQuery } from "@/lib/queries/losts/queries"
import { BackButton } from "@/components/ui/button/BackButton"
export default function EventDetail() {
    const { lostId } = useParams();
    const {data: lost} = useLostDetailQuery(lostId as string)
    return (
        <div className="w-full flex flex-col gap-6 px-3 py-6 md:py-12 md:px-32 justify-center">
            <div className="w-full flex flex-col gap-6 px-3 py-6 md:py-12 md:px-32 justify-center">
                <h1 className="flex items-center gap-3 text-black font-semibold text-left text-base md:text-2xl w-full">
                    <BackButton/> 분실물 상세
                </h1>   
               <div className="flex flex-col gap-14">
                {lost && <>
                    <LostInfo lost={lost}/>
                    <div className="flex flex-col gap-5">
                        <h4 className="text-black font-semibold text-left text-base md:text-xl w-full">상세 이미지</h4>
                        <ul className='flex gap-6 overflow-x-auto w-full snap-x snap-mandatory'>
                            {
                                lost?.detailImageUrls.map((image: {url: string}) => (
                                    <div key={image.url} className="snap-start flex-shrink-0 relative w-[248px] h-[347px]">
                                        <Image className="object-cover rounded-[20px]" src={image.url} alt="EventDetailImage" fill unoptimized />
                                    </div>
                                ))
                            }
                        </ul>
                    </div>
                </> }
                </div>

            </div>
        </div>
    )
}