"use client"
import { useParams } from "next/navigation"
import { Lost } from "@/types/losts"
import { lostImgs } from "@/lib/dummy"
import Link from "next/link"
import { LostInfo } from "@/components/losts/LostInfo"
import { LostItem } from "@/components/losts/LostItem"
import { lostDummy } from "@/lib/lostDummy"
import Image from "next/image"
export default function EventDetail() {
    const { lostId } = useParams();

    //대충 데이터 fetch

    const lost : Lost = {
        id: "2",
        name: "DDR5-6000 CL30",
        description: "1호관 복도에 떨어져있었습니다.",
        thumbnail: "https://picsum.photos/500",
        detailImages: lostImgs,
        acquisitionDate : "2023-08-01",
        acquisitionPlace : "1호관 복도",
    };
    return (
        <div className="flex flex-col items-center justify-center">
            <LostInfo lost={lost}/>
            
            <ul className='
                    flex gap-3 list-none max-w-[1552px] border-t-2 border-lightgray pt-[110px] mt-[135px]
                    snap-x snap-mandatory overflow-x-auto border-b-2
                '>
                    {
                
                    lost.detailImages.map((image, index) => (
                        <Image className="snap-start w-[365px] h-[365px] object-cover" key={index} src={image} alt="LostDetailImage" width={365} height={365} unoptimized={true} />
                    ))
                }
            </ul>

            <div className='
                    flex flex-col max-w-[1552px] gap-[22px]
                    pt-[160px] mb-[176px] mt-[263px] border-t-2 border-lightgray
                ' >
                
                <ul className="list-none flex gap-[30px] overflow-auto">
                    {
                        lostDummy.map((lost, index) => (
                            <Link href={`/lost/${lost.id}`} key={lost.id}>   
                                <LostItem key={lost.id} lost={lost} />
                            </Link>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}