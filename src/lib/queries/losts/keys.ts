export const lostsKeys = {
  all: ["losts"] as const,
  lists: () => [...lostsKeys.all, "list"] as const,
  list: (params: {
    page: number;
    limit: number;
    search?: string;
  }) =>
    [
      ...lostsKeys.lists(),
      params.page,
      params.limit,
      params.search,
    ] as const,
  details: () => [...lostsKeys.all, "detail"] as const,
  detail: (id: string) => [...lostsKeys.details(), id] as const,
};