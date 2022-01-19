import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column({ type: 'varchar', nullable: true })
  userId: string | null;

  @Column({ type: 'varchar', nullable: true })
  boardId: string | null;

  @Column({ type: 'varchar', nullable: true })
  columnId: string | null;
}

export { Task, ITaskParams };
