import { ICrudEndpoint } from '../../api/common/CrudEndpoint';
import { CategoryCRUD } from '../endpoints/CategoryCRUD';
import { ProductCRUD } from '../endpoints/ProductCRUD';
import { EntityType } from '../../store/entityModules/types';

let categoryClient: CategoryCRUD;
let productClient: ProductCRUD;

export function getEntityApiClient(entityType: EntityType): ICrudEndpoint<any> {
  switch (entityType) {
    case EntityType.CATEGORY:
      if (!categoryClient) categoryClient = new CategoryCRUD();
      return categoryClient;
    case EntityType.PRODUCT:
      if (!productClient) productClient = new ProductCRUD();
      return productClient;
    default:
      throw Error(`No matching API client found for ${entityType}!`);
  }
}
