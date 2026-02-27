export const mealKeys = {
  all: ["meal"] as const,
  byYearMonth: (yearMonth: string) =>
    [...mealKeys.all, "yearMonth", yearMonth] as const,
};