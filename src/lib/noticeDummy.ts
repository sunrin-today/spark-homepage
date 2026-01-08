import { Notice } from '@/types/notice';

export const noticeDummyData: Notice[] = [
    {
        id: '1',
        title: '제목제목제목제목제목제목제목1',
        content: '내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1',
        author: '관리자',
        createdAt: '2026-01-08',
        imageUrl: '/example-image/event1.png'
    },
    {
        id: '2',
        title: '제목제목제목제목제목제목제목2',
        content: '내용내용내용내용내용내용2',
        author: '정우진',
        createdAt: '2026-01-06'
    },
    {
        id: '3',
        title: '제목제목제목제목제목제목제목3',
        content: '내용내용내용내용내용내용3',
        author: '김주영',
        createdAt: '2026-01-04'
    },
    {
        id: '4',
        title: '제목제목제목제목제목제목제목4',
        content: '내용내용내용내용내용내용4',
        author: '장한울',
        createdAt: '2026-01-02'
    },
    {
        id: '5',
        title: '제목제목제목제목제목제목제목5',
        content: '내용내용내용내용내용내용5',
        author: '권지원',
        createdAt: '2025-12-30'
    },
    {
        id: '6',
        title: '제목제목제목제목제목제목제목6',
        content: '내용내용내용내용내용내용6',
        author: '학생회',
        createdAt: '2025-12-28'
    },
    {
        id: '7',
        title: '제목제목제목제목제목제목제목7',
        content: '내용내용내용내용내용내용7',
        author: '관리자',
        createdAt: '2025-12-25'
    },
    {
        id: '8',
        title: '제목제목제목제목제목제목제목8',
        content: '내용내용내용내용내용내용8',
        author: '학생회',
        createdAt: '2026-12-20'
    }
];

// ID로 특정 공지사항 찾기
export const getNoticeById = (id: string): Notice | undefined => {
  return noticeDummyData.find((notice) => notice.id === id);
};

// 최신순으로 정렬
export const getNoticesSortedByDate = (): Notice[] => {
  return [...noticeDummyData].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
};