import { v4 as uuidv4 } from 'uuid';
import { Column, IColumnParams } from '../columns/columns.model';

interface IBoardParams {
  id?: string;
  title: string;
  columns: IColumnParams[];
}

class Board {
  id: string;

  title: string;

  columns: Column[];

  constructor({ id = uuidv4(), title, columns }: IBoardParams) {
    this.id = id;
    this.title = title;
    this.columns = columns.map((column: IColumnParams) => new Column(column));
  }

  /**
   * Returns `Board` without `Column`'s ID
   * @param user `Board` to make `Board` without `Columns`'s ID
   * @return `Board` without `Column`'s ID
   */
  static toResponse(
    board: Board
  ): Omit<Board, 'columns'> & { columns: Omit<Column, 'id'>[] } {
    return { ...board, columns: board.columns.map(Column.toResponse) };
  }
}

export { Board, IBoardParams };
