export interface insertRecipeItemDto {
  id?: number;
  name: string;
  instruction: string;
  description: string;
  image: string;
  kcal: number;
  recipeCategoryId: number;
  recipeTypeId: number;
}
