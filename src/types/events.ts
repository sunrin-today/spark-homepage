export interface Event {
    id: string;
    name: string;
    description: string;
    startedAt: string;
    deadline: string;
    link: string;
    thumbnail: string;
    detailImages: string[];
}


export interface EventListResponse {
  items: Event[];
  total: number;
  currentPage: number;
  totalPages: number;
}