import { Notice } from '@/types/notice';

export const noticeDummyData: Notice[] = [
    {
        id: '1',
        title: '제목제목제목제목제목제목제목1',
        content: '내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1내용내용내용내용내용내용1',
        author: { "avatarUrl": "", "name": "", "email": "", "studentNumber": 0, "role": "", "createdAt": "", "updatedAt": "", "id": ""},
        createdAt: '2026-01-08',
        updatedAt: '2026-01-08',
        viewCount: 0,
        imageUrls: ['/example-image/event1.png']
    },
    {
        id: '2',
        title: '제목제목제목제목제목제목제목2',
        content: '내용내용내용내용내용내용2',
        author: { "avatarUrl": "", "name": "", "email": "", "studentNumber": 0, "role": "", "createdAt": "", "updatedAt": "", "id": ""},
        createdAt: '2026-01-06', 
        updatedAt: '2026-01-06',
        viewCount: 0,
        imageUrls: ['/example-image/event1.png']
    },
    {
        id: '3',
        title: '제목제목제목제목제목제목제목3',
        content: '내용내용내용내용내용내용3',
        author: { "avatarUrl": "", "name": "", "email": "", "studentNumber": 0, "role": "", "createdAt": "", "updatedAt": "", "id": ""},
        createdAt: '2026-01-04',
        updatedAt: '2026-01-04',
        viewCount: 0,
        imageUrls: ['/example-image/event1.png']
    },
    {
        id: '4',
        title: '제목제목제목제목제목제목제목4',
        content: '내용내용내용내용내용내용4',
        author: { "avatarUrl": "", "name": "", "email": "", "studentNumber": 0, "role": "", "createdAt": "", "updatedAt": "", "id": ""},
        createdAt: '2026-01-02',
        updatedAt: '2026-01-02',
        viewCount: 0,
        imageUrls: ['/example-image/event1.png']
    },
    {
        id: '5',
        title: '제목제목제목제목제목제목제목5',
        content: '내용내용내용내용내용내용5',
        author: { "avatarUrl": "", "name": "", "email": "", "studentNumber": 0, "role": "", "createdAt": "", "updatedAt": "", "id": ""},
        createdAt: '2025-12-30',
        updatedAt: '2025-12-30',
        viewCount: 0,
        imageUrls: ['/example-image/event1.png']
    },
    {
        id: '6',
        title: '제목제목제목제목제목제목제목6',
        content: '내용내용내용내용내용내용6',
        author: { "avatarUrl": "", "name": "", "email": "", "studentNumber": 0, "role": "", "createdAt": "", "updatedAt": "", "id": ""},
        createdAt: '2025-12-28',
        updatedAt: '2025-12-28',
        viewCount: 0,
        imageUrls: ['/example-image/event1.png']
    },
    {
        id: '7',
        title: '제목제목제목제목제목제목제목7',
        content: '내용내용내용내용내용내용7',
        author: { "avatarUrl": "", "name": "", "email": "", "studentNumber": 0, "role": "", "createdAt": "", "updatedAt": "", "id": ""},
        createdAt: '2025-12-25',
        updatedAt: '2025-12-25',
        viewCount: 0,
        imageUrls: ['/example-image/event1.png']
    },
    {
        id: '8',
        title: '제목제목제목제목제목제목제목8',
        content: '내용내용내용내용내용내용8',
        author: { "avatarUrl": "", "name": "", "email": "", "studentNumber": 0, "role": "", "createdAt": "", "updatedAt": "", "id": ""},
        createdAt: '2026-12-20',
        updatedAt: '2026-12-20',
        viewCount: 0,
        imageUrls: ['/example-image/event1.png']
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