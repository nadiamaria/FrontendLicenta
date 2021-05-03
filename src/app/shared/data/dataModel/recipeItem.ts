export interface RecipeItem {
  id?: number;
  name: string;
  instruction: string;
  description: string;
  image: string;
  kcal: number;
  ingredients: [];
}
