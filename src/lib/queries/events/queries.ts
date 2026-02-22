// lib/queries/events/queries.ts
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { eventKeys } from "./keys";
import eventsApi from "@/lib/api/events";

interface UseEventsParams {
  limit?: number;
  query?: string;
  page?: number;
}
export const useEventsInfiniteQuery = ({
  limit = 9,
  query,
}: UseEventsParams) => {
  return useInfiniteQuery({
    queryKey: eventKeys.infiniteList({ limit, query }),
    queryFn: ({ pageParam = 1 }) =>
      eventsApi.getEvents(pageParam, limit, query, ""),

    initialPageParam: 1,

    getNextPageParam: (lastPage, pages) => {
      return lastPage?.items?.length === limit
        ? pages.length + 1
        : undefined;
    },

    staleTime: 5 * 60 * 1000,
  });
};

// No infinite Version
export const useEventsQuery = ({ page = 1, limit = 9, query }: UseEventsParams) => {

  return useQuery({
    queryKey: eventKeys.list({ page, limit, query }),
    queryFn: () =>
      eventsApi.getEvents(
        page,
        limit,
        query,
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