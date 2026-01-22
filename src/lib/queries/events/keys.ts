// lib/queries/events/key.ts
export const eventKeys = {
  all: () => ["events"] as const,

  lists: () => [...eventKeys.all(), "list"] as const,

  list: (params: {
    url: string;   // /event/onGoing
    page: number;
  }) =>
    [
      ...eventKeys.lists(),
      params.url,
      params.page,
    ] as const,
  
  detail: (id: string) => [...eventKeys.all(), "detail", id] as const,
};
