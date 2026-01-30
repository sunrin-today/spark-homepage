import api from "./api"



const chargerApi = {
    getAvailableChargersCount: async () => {
        const response = await api.get<boolean>("/api/charger/any-not-rented");
        return response;
    },
    postChargerRentalRequest: async () => {
        const response = await api.post(`/api/rental-request`);
        return response;
    },
}

export default chargerApi
