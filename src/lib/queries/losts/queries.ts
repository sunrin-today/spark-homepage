import { keepPreviousData, useQuery, queryOptions } from "@tanstack/react-query";
import { lostsApi } from "@/lib/api/losts";
import { lostsKeys } from "./keys";

export const useLostsQuery = (page: number, limit: number, search?: string) =>
  useQuery({
    queryKey: lostsKeys.list({ page, limit, search }),
    queryFn: () => lostsApi.getLosts(page, limit, search),
    placeholderData: keepPreviousData,
  });

export const useLostDetailQuery = (id: string) =>
  useQuery({
    queryKey: lostsKeys.detail(id),
    queryFn: () => lostsApi.getLostById(id),
    enabled: !!id,
  });
