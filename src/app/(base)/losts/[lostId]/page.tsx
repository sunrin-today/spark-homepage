"use client"
import { useParams } from "next/navigation"
import { LostInfo } from "@/components/losts/LostInfo"
import Image from "next/image"
import { useLostDetailQuery } from "@/lib/queries/losts/queries"
export default function EventDetail() {
    const { lostId } = useParams();
    const {data: lost} = useLostDetailQuery(lostId as string)
    

    return (
        <div className="flex flex-col items-center justify-center">
            {
                lost && (
            <div className="flex flex-col items-center w-full max-w-[1480px] p-20">
                <LostInfo lost={lost!}/>
                
                <ul className='
                        flex gap-3 list-none border-t-2 border-lightgray pt-[110px] mt-[135px]
                        snap-x snap-mandatory overflow-x-auto border-b-2 w-full pb-32
                    '>
                        {
                    
                        lost.detailImageUrls.map((image: {url: string}) => (
                            <Image className="snap-start w-[365px] h-[365px] object-cover" key={image.url} src={image.url} alt="LostDetailImage" width={365} height={365} unoptimized={true} />
                        ))
                    }
                </ul>

                <div className='
                        flex flex-col gap-[20px] max-w-[1480px]
                        pt-[160px] mb-[160px] mt-[256px] border-t-2 border-lightgray
                    ' >
                    
                    <ul className="list-none flex gap-[30px] overflow-auto">
                        {/* This section seems to be for related lost items - you'll need to fetch related items separately */}
                    </ul>
                </div>
            </div>
                )
            }
        </div>
    )
}