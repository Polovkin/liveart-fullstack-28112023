export interface ISortFilter {
  key: string;
  order: 'asc' | 'desc';
}

export interface ISearchFilter {
  value?: string;
  headers: Array<ITableHeader>;
}

export interface ITableHeader {
  title: string;
  key: string;
  align?: string;
  sortable?: boolean;
  searchable?: boolean;
  editable?: boolean;
}
