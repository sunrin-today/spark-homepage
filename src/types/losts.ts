import { ImageItem } from "./common";

export interface Lost {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: ImageItem;
    detailImageUrls: ImageItem[];
    location: string;
    taker: string;
    status: string;
    foundDate: string;
    createdAt: string;
    updatedAt: string;
}
