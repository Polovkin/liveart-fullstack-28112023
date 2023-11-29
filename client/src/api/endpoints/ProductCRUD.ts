import { ProductDTO } from '../dto/ProductDTO';
import { CrudEndpoint } from '../common/CrudEndpoint';

export class ProductCRUD extends CrudEndpoint<ProductDTO> {
  constructor() {
    super('products');
  }
}
