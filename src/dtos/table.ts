export interface ITableData {
  number?: number;
  showResult?: boolean;
  tableResult?: ITableResult[];
}

export interface ITableResult {
  multiplicationFactor: number;
  result: number;
}
