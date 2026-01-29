export const chargerKeys = {
    all: ["charger"] as const,
    chargerCount: () => [...chargerKeys.all, "count"] as const,
    lists: () => [...chargerKeys.all, "list"] as const,
    list: (filter: string) => [...chargerKeys.lists(), { filter }] as const,
    details: () => [...chargerKeys.all, "detail"] as const,
    detail: (id: string) => [...chargerKeys.details(), id] as const,
};