import { Lost } from "@/types/losts";
import api from "./api";
import { ListResponse } from "@/types/common";

export const lostsApi = {
  getLosts: async (page? : number, limit? : number, search? : string) => {
      const response = await api.get<ListResponse<Lost>>("/api/lost", {
        params: { page , limit, search }
      });
      return response.data;
  },
  getLostById: async (id: string) => {
    const response = await api.get<Lost>(`/api/lost/${id}`);
    return response.data;
  },

  postLostClaim: async (id: string) => {
    const response = await api.post(`/api/lost-claims/${id}`);
    return response.data;
  }
};

