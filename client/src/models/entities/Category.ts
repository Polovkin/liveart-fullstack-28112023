import Entity from './Entity';
export class Category implements Entity {
  public id?: string;
  public name = '';
  public categoryId = '';
  public tags = [];

  constructor(initData: Partial<Category>) {
    Object.assign(this, initData);
  }
}
