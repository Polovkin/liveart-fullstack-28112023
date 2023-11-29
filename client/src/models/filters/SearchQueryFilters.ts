import { IMappedQueryFilters, QueryFilters } from './QueryFilters';
import { ISearchFilter } from './Filters';

/**
 * Advanced filter, additionally supporting search.
 * Searching is done by looking up the single value for several searchable headers.
 * Filter structure:
 * filter={where: {or: [{header1:{like: value}}, {header2:{like: value}}, ...]}}
 */
export class SearchQueryFilters extends QueryFilters {
  public searchFilter?: ISearchFilter;

  constructor(initData: Partial<SearchQueryFilters>) {
    super(initData);
    Object.assign(this, initData);
  }

  public mapQueryFilterToRequestParams(): IMappedQueryFilters & Record<string, any> {
    const filter: IMappedQueryFilters & Record<string, any> =
      super.mapQueryFilterToRequestParams();

    this.searchFilter?.headers.forEach((header, pos) => {
      if (this.searchFilter && this.searchFilter.value) {
        filter[`filter[where][or][${pos}][${header.key}][like]`] =
          this.searchFilter.value;
        // make filter case-insensitive
        // filter[
        //   `filter[where][or][${pos}][${header.key}][options]`
        // ] = 'i'
      }
    });

    return filter;
  }
}
