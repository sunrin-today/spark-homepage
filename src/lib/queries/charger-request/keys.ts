export const chargerRequestKeys = {
    all: ["charger-request"] as const,
    lists: () => [...chargerRequestKeys.all, "list"] as const,
    list: (filter: string) => [...chargerRequestKeys.lists(), { filter }] as const,
    details: () => [...chargerRequestKeys.all, "detail"] as const,
    detail: (id: string) => [...chargerRequestKeys.details(), id] as const,
};

