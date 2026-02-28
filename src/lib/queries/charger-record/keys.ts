export const chargerRecordKeys = {
    all: ["chargerRecord"] as const,
    lists: () => [...chargerRecordKeys.all, "list"] as const,
    list: (params: {
        page: number;
        limit: number;
        column: string;
        orderDirection: string;
    }) =>
    [
      ...chargerRecordKeys.lists(),
      params.page,
      params.limit,
      params.column,
      params.orderDirection,
    ] as const,
}