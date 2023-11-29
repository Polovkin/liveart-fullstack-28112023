import { CategoryDTO } from './CategoryDTO';
export interface ProductDTO {
  id?: string;
  name: string;
  categoryId?: string;
  description?: string;
  category?: CategoryDTO;
  previewImage?: string;
}
