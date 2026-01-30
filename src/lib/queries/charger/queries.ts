import { useQuery } from "@tanstack/react-query";
import { chargerKeys } from "./keys";
import chargerApi from "@/lib/api/charger";

export function useGetRemainingChargerQuery() {
  return useQuery({
    queryKey: chargerKeys.chargerCount(),
    queryFn: () => chargerApi.getAvailableChargersCount(),
  });
}
