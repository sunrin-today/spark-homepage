import { MealResponse } from "@/types/meal";
import api from "./api";

export const mealApi = {
  getMealByYearMonth: async (yearMonth: string): Promise<MealResponse[] | null> => {
    try {
      const response = await api.get<MealResponse[]>("/api/meal", {
        params: { yearMonth },
      });
      return response.data;
    } catch (error) {
      console.error("Faialed to fetch meal data:", error);
      return null;
    }
  },
};