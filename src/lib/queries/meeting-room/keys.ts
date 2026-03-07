import { QueryKey } from "@tanstack/react-query";

export const meetingRoomKeys = {
    all: ["meeting-room"] as QueryKey,
    list: (page: number, limit: number, month?: number, column?: string, orderDirection?: string) => [...meetingRoomKeys.all, "list", page, limit, month, column, orderDirection] as QueryKey,
    detail: (id: string) => [...meetingRoomKeys.all, "detail", id] as QueryKey,
};