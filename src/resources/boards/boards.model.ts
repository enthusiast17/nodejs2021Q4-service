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

  static toResponse(board: Board) {
    return { ...board, columns: board.columns.map(Column.toResponse) };
  }
}

export { Board, IBoardParams };
