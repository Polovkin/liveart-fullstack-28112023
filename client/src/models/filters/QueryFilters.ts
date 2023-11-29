import { ISortFilter } from './Filters';

export interface IMappedQueryFilters {
  'filter[skip]': number;
  'filter[limit]': number;
  'filter[order]'?: string;
}

/**
 * Basic filter supporting these options:
 *  - skip
 *  - limit
 *  - order by single key
 */
export class QueryFilters {
  public page: number = 1;
  public rowsPerPage: number = 20;
  public sortFilter?: ISortFilter[];

  constructor(initData: Partial<QueryFilters>) {
    Object.assign(this, initData);
  }

  public mapQueryFilterToRequestParams(): IMappedQueryFilters {
    const limit = this.rowsPerPage;
    const offset = limit * (this.page - 1);

    const filter: IMappedQueryFilters = {
      'filter[skip]': offset,
      'filter[limit]': limit,
    };

    this.sortFilter?.forEach(sf => {
      const { key, order } = sf;
      if (key && order) {
        filter['filter[order]'] = `${key} ${order}`;
      }
    });
    return filter;
  }
}
