import { QueryKey } from "@tanstack/react-query";

export const meetingRoomKeys = {
    all: ["meeting-room"] as QueryKey,
    list: (page: number, limit: number, month?: number) => [...meetingRoomKeys.all, "list", page, limit, month] as QueryKey,
    detail: (id: string) => [...meetingRoomKeys.all, "detail", id] as QueryKey,
};