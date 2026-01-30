export interface ImageItem {
    url: string;
    index: number;
}

export interface ListResponse<T> {
    items: T[];
    total: number;
    currentPage: number;
    totalPages: number;
}