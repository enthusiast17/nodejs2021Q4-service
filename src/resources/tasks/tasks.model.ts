import { v4 as uuidv4 } from 'uuid';

interface ITaskParams {
  id?: string;
  title: string;
  order: number;
  description: string;
  userId?: string | null;
  boardId?: string | null;
  columnId?: string | null;
}

class Task {
  id: string;

  title: string;

  order: number;

  description: string;

  userId: string | null;

  boardId: string | null;

  columnId: string | null;

  constructor({
    id = uuidv4(),
    title,
    order,
    description,
    userId = null,
    boardId = null,
    columnId = null,
  }: ITaskParams) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

export { Task, ITaskParams };
