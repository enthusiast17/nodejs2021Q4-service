import { ITaskParams, Task } from './tasks.model';

const tasks: Task[] = [];

const getAll = async (boardId: string) =>
  tasks.filter((task: Task) => task.boardId === boardId);

const getById = async (boardId: string, taskId: string) =>
  tasks.find((task: Task) => task.id === taskId && task.boardId === boardId);

const getIndexById = async (boardId: string, taskId: string) =>
  tasks.findIndex(
    (task: Task) => task.id === taskId && task.boardId === boardId
  );

const getIndexesByBoardId = async (boardId: string) =>
  tasks.reduce(
    (acc: number | false | number[], task: Task, index: number) =>
      task.boardId === boardId ? (acc as number[]).push(index) && acc : acc,
    []
  ) as number[];

const getIndexesByUserId = async (userId: string) =>
  tasks.reduce(
    (acc: number | false | number[], task: Task, index: number) =>
      task.userId === userId ? (acc as number[]).push(index) && acc : acc,
    []
  ) as number[];

const create = async (boardId: string, data: ITaskParams) => {
  const task = new Task({ ...data, boardId });
  tasks.push(task);
  return task;
};

const updateById = async (
  boardId: string,
  taskId: string,
  data: ITaskParams
) => {
  const taskIndex = await getIndexById(boardId, taskId);
  tasks[taskIndex] = new Task({
    ...tasks[taskIndex],
    ...data,
  });
  return tasks[taskIndex];
};

const deleteById = async (boardId: string, taskId: string) => {
  const taskIndex = await getIndexById(boardId, taskId);
  tasks.splice(taskIndex);
};

const whenBoardDeleted = async (boardId: string) => {
  const taskIndexes = await getIndexesByBoardId(boardId);
  taskIndexes.forEach((taskIndex) => tasks.splice(taskIndex));
};

const whenUserDeleted = async (userId: string) => {
  const taskIndexes = await getIndexesByUserId(userId);
  taskIndexes.forEach((taskIndex) => {
    tasks[taskIndex].userId = null;
  });
};

export default {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  whenBoardDeleted,
  whenUserDeleted,
};
