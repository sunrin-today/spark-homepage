export interface MealItem {
  meal: string;
  code: string | null;
}

export interface MealResponse {
  date: string;
  meals: MealItem[];
  existence: boolean;
  rest: boolean;
}