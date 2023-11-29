import Mapper from './Mapper';
import { EntityType } from '../../store/entityModules/types';
import { CategoryMapper } from '../../models/mappers/CategoryMapper';
import { ProductMapper } from '../../models/mappers/ProductMapper';

let categoryMapper: CategoryMapper;
let productMapper: ProductMapper;

export function getEntityMapper(entityType: EntityType): Mapper<Object, Object> {
  switch (entityType) {
    case EntityType.CATEGORY:
      if (!categoryMapper) categoryMapper = new CategoryMapper();
      return categoryMapper;
    case EntityType.PRODUCT:
      if (!productMapper) productMapper = new ProductMapper();
      return productMapper;
    default:
      throw Error(`No matching mapper found for ${entityType}!`);
  }
}
