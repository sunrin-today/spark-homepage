"use client";

import { useState } from "react";
import Link from "next/link";

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

      {/* 첫 페이지로 가는 버튼 (생략된 경우) */}
      {/* {!pageNumbers.includes(1) && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className={`px-3 py-1 rounded-md ${
              1 === currentPage
                ? "bg-main text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            1
          </button>
          {!pageNumbers.includes(2) && <span className="px-1">...</span>}
        </>
      )} */}

      {/* 페이지 번호들 */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-md ${
            page === currentPage
              ? "bg-main text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      {/* 마지막 페이지로 가는 버튼 (생략된 경우) */}
      {/* {!pageNumbers.includes(totalPages) && (
        <>
          {!pageNumbers.includes(totalPages - 1) && (
            <span className="px-1">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className={`px-3 py-1 rounded-md ${
              totalPages === currentPage
                ? "bg-main text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {totalPages}
          </button>
        </>
      )} */}

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