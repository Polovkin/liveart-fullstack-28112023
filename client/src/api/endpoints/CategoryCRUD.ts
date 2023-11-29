import { CategoryDTO } from '../dto/CategoryDTO';
import { CrudEndpoint } from '../common/CrudEndpoint';

export class CategoryCRUD extends CrudEndpoint<CategoryDTO> {
  constructor() {
    super('product-categories');
  }
}
