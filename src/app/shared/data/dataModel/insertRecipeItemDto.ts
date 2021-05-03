export interface insertRecipeItemDto {
  id?: number;
  name: string;
  instruction: string;
  description: string;
  image: string;
  recipeCategoryId: number;
  recipeTypeId: number;
}
