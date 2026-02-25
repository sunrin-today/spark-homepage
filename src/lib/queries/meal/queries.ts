import { useQuery } from "@tanstack/react-query";
import { mealApi } from "@/lib/api/meal";
import { mealKeys } from "./keys";

export const useMealByYearMonth = (yearMonth: string) => {
  return useQuery({
    queryKey: mealKeys.byYearMonth(yearMonth),
    queryFn: () => mealApi.getMealByYearMonth(yearMonth),
    staleTime: 1000 * 60 * 60, // 1시간
    enabled: !!yearMonth,
  });
};