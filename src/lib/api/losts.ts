import { LostResponse } from "@/types/losts";
import api from "./api";


export const getLostsToday = async (): Promise<LostResponse | null> => {
  try {
    const response = await api.get<LostResponse>("/api/losts");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch losts data:", error);
    return null;
  }
};

export const getLostsByDate = async (date: string): Promise<LostResponse | null> => {
  try {
    const response = await api.get<LostResponse>(`/api/losts?date=${date}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch losts data:", error);
    return null;
  }
};

export const createLost = async (lost: LostResponse): Promise<LostResponse | null> => {
  try {
    const response = await api.post<LostResponse>("/api/losts", lost);
    return response.data;
  } catch (error) {
    console.error("Failed to create lost:", error);
    return null;
  }
};

export const getMyChargerHistory = async () => {
    try {
        const response = await api.get<any>(`/api/charger-rentals/me/active`);
        return response.data;
    } catch (error) {
        console.error("Failed to get my charger history:", error);
        return null;
    }
};
