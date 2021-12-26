import { ITaskParams, Task } from './tasks.model';

const tasks: Task[] = [];

/**
 * Returns all existing `Task`
 * @returns Promise array of `Task` object
 */
const getAll = async (boardId: string): Promise<Task[]> =>
  tasks.filter((task: Task) => task.boardId === boardId);

/**
 * Returns found `Task` or null
 * @param boardId `Board`'s ID to find task with board id
 * @param taskId `Task`'s ID to find task
 * @returns Promise `Task` object or null
 */
const getById = async (boardId: string, taskId: string): Promise<Task | null> =>
  tasks.find((task: Task) => task.id === taskId && task.boardId === boardId) ||
  null;

/**
 * Returns found `Task`'s index
 * @param boardId `Board`'s ID to find task with board id
 * @param taskId `Task`'s ID to find task
 * @returns Promise number
 */
const getIndexById = async (boardId: string, taskId: string): Promise<number> =>
  tasks.findIndex(
    (task: Task) => task.id === taskId && task.boardId === boardId
  );

/**
 * Returns found `Task`'s indexes
 * @param boardId `Board`'s ID to find task with board id
 * @returns Promise array of number
 */
const getIndexesByBoardId = async (boardId: string) =>
  tasks.reduce(
    (acc: number | false | number[], task: Task, index: number) =>
      task.boardId === boardId ? (acc as number[]).push(index) && acc : acc,
    []
  ) as number[];

/**
 * Returns found `Task`'s indexes
 * @param userId `User`'s ID to find task with user id
 * @returns Promise array of number
 */
const getIndexesByUserId = async (userId: string) =>
  tasks.reduce(
    (acc: number | false | number[], task: Task, index: number) =>
      task.userId === userId ? (acc as number[]).push(index) && acc : acc,
    []
  ) as number[];

/**
 * Returns created `Task`
 * @param boardId `Board`'s ID to find task with board id
 * @param data `Task`'s params `ITaskParams` to save task
 * @returns Promise `Task` object
 */
const create = async (boardId: string, data: ITaskParams): Promise<Task> => {
  const task: Task = new Task({ ...data, boardId });
  tasks.push(task);
  return task;
};

/**
 * Returns updated `Task`
 * @param boardId `Board`'s ID to find task with board id
 * @param taskId `Task`'s ID to find task
 * @param data `Task`'s params `ITaskParams` to save task
 * @returns Promise `Task` object
 */
const updateById = async (
  boardId: string,
  taskId: string,
  data: ITaskParams
) => {
  const taskIndex: number = await getIndexById(boardId, taskId);
  tasks[taskIndex] = new Task({
    ...tasks[taskIndex],
    ...data,
  });
  return tasks[taskIndex];
};

/**
 * Returns void and deletes task from database
 * @param boardId `Board`'s ID to find task with board id
 * @param taskId `Task`'s ID to find task
 * @return Promise void
 */
const deleteById = async (boardId: string, taskId: string) => {
  const taskIndex: number = await getIndexById(boardId, taskId);
  tasks.splice(taskIndex);
};

/**
 * Returns void and delete tasks from database
 * @param boardId `Board`'s ID to find tasks with board id
 * @return Promise void
 */
const whenBoardDeleted = async (boardId: string) => {
  const taskIndexes: number[] = await getIndexesByBoardId(boardId);
  taskIndexes.forEach((taskIndex) => tasks.splice(taskIndex));
};

/**
 * Returns void and assigns tasks userId to null
 * @param userId `User`'s ID to find tasks with user id
 * @return Promise void
 */
const whenUserDeleted = async (userId: string) => {
  const taskIndexes: number[] = await getIndexesByUserId(userId);
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
