export interface RecipesIngredientsItem {
  id: number;
  unit_mas: string;
  cant_ingr: number;
  ingredientId: number;
  recipeId: number;
  ingredient: {
    id: number;
    name: string;
  };
}
