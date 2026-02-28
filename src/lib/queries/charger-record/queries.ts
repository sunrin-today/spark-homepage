import { useQuery } from "@tanstack/react-query";
import { chargerRecordKeys } from "./keys";
import chargerApi from "@/lib/api/charger";

interface UseGetChargerRecordListQueryParams {
  page: number;
  limit?: number;
  column?: string;
  orderDirection?: "ASC" | "DESC";
}

export function useGetChargerRecordListQuery({
  page,
  limit = 10,
  column = "createdAt",
  orderDirection = "DESC"
}: UseGetChargerRecordListQueryParams) {
  return useQuery({
    queryKey: chargerRecordKeys.list({ page, limit, column, orderDirection }),
    queryFn: () => chargerApi.getChargerRentalRecordList(page, limit, column, orderDirection),
  });
}
