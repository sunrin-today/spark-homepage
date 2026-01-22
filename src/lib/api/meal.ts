import { MealResponse } from "@/types/meal";
import api from "./api";

export const getMealToday = async (): Promise<MealResponse | null> => {
  try {
    const response = await api.get<MealResponse>("/api/meal");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch meal data:", error);
    return null;
  }
};