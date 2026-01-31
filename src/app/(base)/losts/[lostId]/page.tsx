"use client"
import { useParams } from "next/navigation"
import { LostInfo } from "@/components/losts/LostInfo"
import Image from "next/image"
import { useLostDetailQuery } from "@/lib/queries/losts/queries"
import { useLostsQuery } from "@/lib/queries/losts/queries"
import { useState } from "react"
import { LostItem } from "@/components/losts/LostItem"
import Link from "next/link"
export default function EventDetail() {
    const { lostId } = useParams();
    const {data: lost} = useLostDetailQuery(lostId as string)
    const [limit, setLimit] = useState(8)
    const {data: losts} = useLostsQuery(1, limit, "")
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center w-full max-w-[1480px] p-20">
                {lost && <LostInfo lost={lost!}/>}
                
                <ul className='
                        flex gap-3 list-none border-t-2 border-lightgray pt-[110px] mt-[135px]
                        snap-x snap-mandatory overflow-x-auto border-b-2 w-full pb-32
                    '>
                        {
                    
                        lost?.detailImageUrls.map((image: {url: string}) => (
                            <Image className="snap-start w-[365px] h-[365px] object-cover" key={image.url} src={image.url} alt="LostDetailImage" width={365} height={365} unoptimized={true} />
                        ))
                    }
                </ul>

                <div className='
                        flex flex-col gap-[20px] max-w-[1480px]
                        pt-[160px] mb-[160px] border-t-2 border-lightgray
                    ' >
                    
                    <ul className="list-none flex gap-[30px] overflow-auto">
                        {losts?.items.filter((lost) => lost.id !== lostId).map((lost) => (
                            <Link href={`/losts/${lost.id}`} key={lost.id}>   
                                <LostItem key={lost.id} lost={lost} />
                            </Link>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}