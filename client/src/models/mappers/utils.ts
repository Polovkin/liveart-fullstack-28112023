import Mapper from './Mapper';
import { EntityType } from '../../store/entityModules/types';
import { CategoryMapper } from '../../models/mappers/CategoryMapper';
import { ProductMapper } from '../../models/mappers/ProductMapper';
import {TagMapper} from "./TagMapper";
import {ca} from "vuetify/locale";

let categoryMapper: CategoryMapper;
let productMapper: ProductMapper;
let tagMapper: TagMapper;

export function getEntityMapper(entityType: EntityType): Mapper<Object, Object> {
  switch (entityType) {
    case EntityType.CATEGORY:
      if (!categoryMapper) categoryMapper = new CategoryMapper();
      return categoryMapper;
    case EntityType.PRODUCT:
      if (!productMapper) productMapper = new ProductMapper();
      return productMapper;
    case EntityType.TAG:
        if (!tagMapper) tagMapper = new TagMapper();
        return tagMapper;
    default:
      throw Error(`No matching mapper found for ${entityType}!`);
  }
}
