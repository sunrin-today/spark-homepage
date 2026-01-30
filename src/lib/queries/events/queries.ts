// lib/queries/events/queries.ts
import { useQuery } from "@tanstack/react-query";
import { eventKeys } from "./keys";
import eventsApi from "@/lib/api/events";

interface UseEventsParams {
  url: string;   // "/event/onGoing"
  page: number;
  limit?: number;
  query?: string;
}

export const useEventsQuery = ({ url, page, limit, query }: UseEventsParams) => {

  return useQuery({
    queryKey: eventKeys.list({ url, page }),
    queryFn: () =>
      eventsApi.getEvents(
        page,
        limit,
        query,
        url
      ),
    placeholderData: (previousData) => previousData, // 페이지 이동 UX
    staleTime: 5 * 60 * 1000,
  });
};

export const useEventByIdQuery = (id: string) => {
  return useQuery({
    queryKey: eventKeys.detail(id),
    queryFn: () => eventsApi.getEventById(id),
    enabled: !!id,
  });
};