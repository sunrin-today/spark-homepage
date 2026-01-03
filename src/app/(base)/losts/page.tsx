"use client"
import { useState } from "react";
import type {Lost} from "@/types/losts"
import { LostItem } from "@/components/losts/LostItem";
import Link from "next/link";
import Image from "next/image";
import { lostDummy } from "@/lib/lostDummy";
export default function Losts() {
    function lostsSearch() {
        //api 요청 및 데이터 저장
    }
    const [losts, setLosts] = useState<Lost[]>(lostDummy);
    
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="w-full flex flex-col mt-36 max-w-[1280px]">
                <div className="w-full flex flex-col gap-[64px] mb-[64px]">
                    <div className="w-full flex flex-col gap-[15px]">
                        <h1 className="text-black font-semibold text-left text-4xl w-full">학생회 이벤트</h1>
                        <p className="text-[#777777] text-lg">선린학생여러분들의즐거운학교생활을위해spark학생회부원들이준비한이벤트어쩌고</p>
                    </div>
                    {/* TODO : search_bar 컴포넌트화 */}
                    <div className="w-full flex flex-col items-center justify-center gap-[30px] pb-16 border-b-2 border-b-lightgray">
                        <div className="w-full">
                            <div className="relative w-full">
                                <Image width={34} height={34} src="/icons/search_gray.svg" alt="search" className="absolute top-[15px] left-[23px]"/>
                                <div className="flex w-full gap-[50px]">
                                    <input type="text" className="bg-lightgray font-semibold text-lg border-[1px] text-gray placeholder:text-gray border-gray flex-1 rounded-[100px] px-[75px] py-[15px]" placeholder="물건 검색하기"  />
                                    <button className="bg-main text-[18px] font-semibold text-white px-[39px] py-[19px] rounded-[100px]">검색하기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                   
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 justify-center items-center pb-[284px]">
                    {losts.map((lost) => (
                        <Link href={`/losts/${lost.id}`} key={lost.id}>   
                            <LostItem key={lost.id} lost={lost} />
                        </Link>

                    ))}
                </div>
            </div>
        </div>
        
    )
}