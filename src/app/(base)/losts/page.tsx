"use client"
import { useState } from "react";
import type {Lost} from "@/types/losts"
import { LostItem } from "@/components/losts/LostItem";
import Link from "next/link";
import { lostDummy } from "@/lib/lostDummy";
import { useSearchParams, useRouter } from "next/navigation";
import { PaginationBar } from "@/components/ui/paging/PaginationBar";
import { SearchBar } from "@/components/ui/search/SearchBar";
import { BackButton } from "@/components/ui/button/BackButton";
export default function Losts() {
    const [searchValue, setSearchValue] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const searchParams = useSearchParams();
    const router = useRouter();
    const page = searchParams.get("page");
    const handlePageChange = (page: number) => {
        router.push(`/losts?page=${page}`);
    }    
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="w-full flex flex-col mt-36 max-w-[1280px]">
                <div className="w-full flex flex-col gap-[64px] mb-[64px]">
                    <BackButton/>
                    <div className="w-full flex flex-col gap-[15px]">
                        <h1 className="text-black font-semibold text-left text-4xl w-full">월간 분실물</h1>
                        <p className="text-[#777777] text-lg">매달 나오는 분실물 목록입니다.매달 나오는 분실물 목록입니다. </p>
                    </div>
                    {/* TODO : search_bar 컴포넌트화 */}
                    <div className="w-full flex flex-col items-center justify-center gap-[30px] pb-16 border-b-2 border-b-lightgray">
                        <SearchBar placeholder="물건 검색하기" handleSubmit={() => setSearchQuery(searchValue)} onChangeText={setSearchValue}/>
                    </div>
                   
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 justify-center items-center pb-[284px]">
                    {losts.map((lost) => (
                        <Link href={`/losts/${lost.id}`} key={lost.id}>   
                            <LostItem key={lost.id} lost={lost} />
                        </Link>

                    ))}
                </div>

                <PaginationBar totalItems={losts.length} currentPage={page ? parseInt(page) : 1} onPageChange={(page) => { handlePageChange(page)}}/>
            </div>
        </div>
        
    )
}