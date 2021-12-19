import { v4 as uuidv4 } from 'uuid';

export interface IColumnParams {
  id?: string;
  title: string;
  order: string[];
}

class Column {
  private id: string;

  private title: string;

  private order: string[];

  constructor({ id = uuidv4(), title, order = [] }: IColumnParams) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  /**
   * Returns `Column` without id object
   * @param user `Column` to make `Column` without id
   * @return `Column` without id object
   */
  static toResponse(column: Column): Omit<Column, 'id'> {
    const { title, order } = column;
    return { title, order };
  }
}

export { Column };
