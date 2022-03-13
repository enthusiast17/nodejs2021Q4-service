/* eslint-disable import/no-cycle */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BoardColumn, IBoardColumnParams } from '../columns/columns.model';

interface IBoardParams {
  id?: string;
  title: string;
  columns: IBoardColumnParams[];
}

@Entity('Boards')
class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => BoardColumn, (boardColumn) => boardColumn.board, {
    cascade: true,
  })
  columns: BoardColumn[];

  /**
   * Returns `Board` without `Column`'s ID
   * @param user `Board` to make `Board` without `Columns`'s ID
   * @return `Board` without `Column`'s ID
   */
  static toResponse(board: Board) {
    return { ...board };
  }
}

export { Board, IBoardParams };
