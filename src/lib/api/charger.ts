import { ChargerRentalRecord } from "@/types/charger";
import api from "./api"
import { ListResponse } from "@/types/common";



const chargerApi = {
    getAvailableChargersCount: async () => {
        const response = await api.get<boolean>("/api/charger/any-not-rented");
        return response;
    },
    postChargerRentalRequest: async () => {
        const response = await api.post(`/api/rental-request`);
        return response;
    },
    getChargerRentalRecordList: async (page: number, limit: number, column: string, orderDirection: string) => {
        const response = await api.get<ListResponse<ChargerRentalRecord>>(`/api/rental-record?page=${page}&limit=${limit}&column=${column}&orderDirection=${orderDirection}`);
        return response;
    }
    
}

export default chargerApi
