export interface MealMenuItem {
  dishName: string;
  allergyNumbers: number[];
}

export interface MealResponse {
  schoolName: string;
  mealDate: string;
  mealTypeName: string;
  menu: MealMenuItem[];
  calories: string;
}