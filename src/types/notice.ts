export interface Notice {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt?: string;
  views?: number;
  isPinned?: boolean;
  imageUrl?: string; 
}

export interface NoticeListResponse {
  notices: Notice[];
  total: number;
  page: number;
  pageSize: number;
}