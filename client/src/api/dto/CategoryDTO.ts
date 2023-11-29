export interface CategoryDTO {
  id?: string;
  name: string;
  categoryId?: string;
  category?: CategoryDTO;
}
