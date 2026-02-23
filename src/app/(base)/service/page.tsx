"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SearchBar } from "@/components/ui/search/SearchBar";
import { PaginationBar } from "@/components/ui/paging/PaginationBar";
import ServiceCard from "@/components/home/ServiceCard";

const SERVICES = [
  {
    id: "losts",
    title: "월간 분실물함",
    description: (
      <>
        해당 서비스를 이용하여<br />잃어버린 물건을 찾아보세요!
      </>
    ),
    href: "/losts",
    imageSrc: "/example-image/rough.png",
  },
  {
    id: "charger",
    title: "충전기 대여",
    description: (
      <>
        해당 서비스를 이용하여<br />잃어버린 물건을 찾아보세요!
      </>
    ),
    href: "/charger",
    imageSrc: "/example-image/rough.png",
  },
  {
    id: "meeting-room",
    title: "소회의실 대여",
    description: (
      <>
        해당 서비스를 이용하여<br />잃어버린 물건을 찾아보세요!
      </>
    ),
    href: "/meeting-room",
    imageSrc: "/example-image/rough.png",
  },
];

const ITEMS_PER_PAGE = 9;

function ServiceContent() {
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = SERVICES.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const currentItems = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearch = () => {
    setSearchQuery(searchValue);
    setCurrentPage(1);
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-8 lg:px-16 py-16 min-h-screen">
      <h1 className="text-2xl font-semibold mb-3">학생회 서비스</h1>

      <div className="flex justify-center mb-9">
        <SearchBar
          value={searchValue}
          onChangeText={setSearchValue}
          placeholder="검색어를 입력해주세요..."
          handleSubmit={handleSearch}
          buttonText="검색하기"
          searched={searchQuery}
        />
      </div>

      {currentItems.length > 0 ? (
        <div className="flex flex-wrap gap-[22px] mt-9 justify-center lg:justify-start">
          {currentItems.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              href={service.href}
              imageSrc={service.imageSrc}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center py-20">
          <p className="text-[#767676]">검색 결과가 없습니다.</p>
        </div>
      )}

      <div className="mt-9">
        <PaginationBar
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filtered.length}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}

export default function ServicePage() {
  return (
    <Suspense fallback={null}>
      <ServiceContent />
    </Suspense>
  );
}