"use client"
import { useState } from "react";
import { LostItem } from "@/components/losts/LostItem";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PaginationBar } from "@/components/ui/paging/PaginationBar";
import { SearchBar } from "@/components/ui/search/SearchBar";
import { BackButton } from "@/components/ui/button/BackButton";
import { useLostsQuery } from "@/lib/queries/losts/queries";
import { usePaginationQuery } from "@/hooks/usePaginationQuery";
export default function Losts() {
    const [searchValue, setSearchValue] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();
    const { page: currentPage, setPage: setCurrentPage } = usePaginationQuery("page", 1  );
    const {data: lostsData } = useLostsQuery(currentPage, 20, searchQuery);
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        router.replace(`/losts?page=${page}`);
    }    
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="w-full flex flex-col mt-36 max-w-[1280px]">
                <div className="w-full flex flex-col gap-[64px] mb-[64px]">
                    <BackButton/>
                    <div className="w-full flex flex-col gap-[15px]">
                        <h1 className="text-black font-semibold text-left text-4xl w-full">월간 분실물</h1>
                        <p className="text-[#777777] text-lg">매달 나오는 분실물 목록입니다. </p>
                    </div>
                    <div className="w-full flex flex-col items-center justify-center gap-[30px] pb-16 border-b-2 border-b-lightgray">
                        <SearchBar placeholder="물건 검색하기" handleSubmit={() => setSearchQuery(searchValue)} onChangeText={setSearchValue}/>
                    </div>
                
                </div>
                { lostsData?.items && lostsData.items.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 justify-center items-center pb-[284px]">
                        {lostsData?.items.map((lost) => (
                            <Link href={`/losts/${lost.id}`} key={lost.id}>   
                                <LostItem key={lost.id} lost={lost} />
                            </Link>

                        ))}
                    </div>
                )}
                {lostsData?.items && lostsData.items.length === 0 && (
                    <div className="w-full flex flex-col pb-40 items-center justify-center">
                        <h1 className="text-gray text- text-xl">분실물이 없습니다.</h1>
                    </div>
                )}
                <PaginationBar totalPages={lostsData?.totalPages || 0} currentPage={currentPage} onPageChange={(page) => { handlePageChange(page)}}/>
            </div>
        </div>
        
    )
}