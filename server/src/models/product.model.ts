import {Entity, belongsTo, model, property, hasMany} from '@loopback/repository';
import {ProductCategory} from './product-category.model';
import {Tag} from "./tag.model";

@model({settings: {strict: false}})
export class Product extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    mongodb: {dataType: 'ObjectID'},
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @belongsTo(() => ProductCategory)
  categoryId: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  tags?: string[];

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
  })
  previewImage?: string;

  @property({
    type: 'boolean',
    default: false,
  })
  isHidden: false;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
