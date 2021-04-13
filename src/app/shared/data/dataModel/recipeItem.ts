export interface RecipeItem {
  name: string;
  instruction: string;
  description: string;
  image: string;
  ingredients: {
    ingredient_name: string;
  }
}
