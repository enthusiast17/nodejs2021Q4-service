import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Board } from '../boards/boards.model';
import { BoardColumn } from '../columns/columns.model';
import { User } from '../users/users.model';

interface ITaskParams {
  id?: string;
  title: string;
  order: number;
  description: string;
  userId?: string | null;
  boardId?: string | null;
  columnId?: string | null;
}

@Entity('Tasks')
class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @Column()
  description: string;

  @ManyToOne(() => User, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
    nullable: true,
  })
  user: User;

  @Column({ type: 'varchar', nullable: true })
  userId: string | null;

  @ManyToOne(() => Board, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: true,
  })
  board: Board;

  @Column({ type: 'varchar', nullable: true })
  boardId: string | null;

  @ManyToOne(() => BoardColumn, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
    nullable: true,
  })
  column: BoardColumn;

  @Column({ type: 'varchar', nullable: true })
  columnId: string | null;
}

export { Task, ITaskParams };
