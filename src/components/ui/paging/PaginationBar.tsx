"use client";


interface PaginationBarProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const PaginationBar = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationBarProps) => {

  const maxVisiblePages = 8; 

  // 현재 페이지를 중심으로 보여줄 페이지 번호들을 계산
  const getPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-center space-x-2 mt-8">
      {/* 이전 페이지 버튼 */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-100"
        }`}
        aria-label="이전 페이지"
      >
        &lt;
      </button>


      {/* 페이지 번호들 */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={page > totalPages}
          className={`px-3 py-1 rounded-md ${
            page > totalPages
              ? "text-gray-300 cursor-not-allowed bg-gray-100"
              : page === currentPage
              ? "bg-main text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      {/* 다음 페이지 버튼 */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-100"
        }`}
        aria-label="다음 페이지"
      >
        &gt;
      </button>
    </nav>
  );
};