// lib/queries/events/key.ts
export const eventKeys = {
  all: () => ["events"] as const,

  lists: () => [...eventKeys.all(), "list"] as const,

  list: (params: {
    page: number;
    limit: number;
    query?: string;
  }) =>
    [
      ...eventKeys.lists(),
      params.page,
      params.limit,
      params.query ?? "",
    ] as const,

  infiniteList: (params: {
    limit: number;
    query?: string;
  }) =>
    [
      ...eventKeys.all(),
      "infinite-list",
      params.limit,
      params.query ?? "",
    ] as const,

  detail: (id: string) =>
    [...eventKeys.all(), "detail", id] as const,
};
