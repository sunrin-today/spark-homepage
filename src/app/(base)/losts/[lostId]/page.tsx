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
    const handleApi = async () => {
        try {
            const response = await fetch("http://13.209.189.170/api/notice");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response;
            console.log('Fetched data:', data);
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error; // Re-throw to allow calling code to handle the error
        }
    }
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center max-w-[1480px] p-20">
                <LostInfo lost={lost}/>
                
                <ul className='
                        flex gap-3 list-none border-t-2 border-lightgray pt-[110px] mt-[135px]
                        snap-x snap-mandatory overflow-x-auto border-b-2
                    '>
                        {
                    
                        lost.detailImages.map((image, index) => (
                            <Image className="snap-start w-[365px] h-[365px] object-cover" key={index} src={image} alt="LostDetailImage" width={365} height={365} unoptimized={true} />
                        ))
                    }
                </ul>

                <div className='
                        flex flex-col gap-[20px] max-w-[1480px]
                        pt-[160px] mb-[160px] mt-[256px] border-t-2 border-lightgray
                    ' >
                    
                    <ul className="list-none flex gap-[30px] overflow-auto">
                        {   lostDummy && ( 
                                lostDummy.map((lost, index) => (
                                    <Link href={`/lost/${lost.id}`} key={lost.id}>   
                                        <LostItem key={lost.id} lost={lost} />
                                    </Link>
                                    )
                                )
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}