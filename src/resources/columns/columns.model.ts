/* eslint-disable import/no-cycle */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Board } from '../boards/boards.model';

export interface IBoardColumnParams {
  id?: string;
  title: string;
  order: number;
}

@Entity('BoardColumns')
class BoardColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Board, (board) => board.columns, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  board: Board;

  @Column({ type: 'varchar', nullable: true })
  boardId: string | null;

  @Column()
  title: string;

  @Column()
  order: number;

  /**
   * Returns `Column` without id object
   * @param user `Column` to make `Column` without id
   * @return `Column` without id object
   */
  static toResponse(
    column: BoardColumn
  ): Omit<BoardColumn, 'id' | 'board' | 'boardId'> {
    const { title, order } = column;
    return { title, order };
  }
}

export { BoardColumn };
