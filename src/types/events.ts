import { ImageItem } from "./common";

export interface Event {
    id: string;
    name: string;
    description: string;
    startedAt: string;
    deadline: string;
    link: string;
    thumbnail: ImageItem;
    detailImages: ImageItem[];
    isLinkOn: boolean;
}
