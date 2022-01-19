import { getConnection } from 'typeorm';
import { ITaskParams, Task } from './tasks.model';

/**
 * Returns all existing `Task`
 * @returns Promise array of `Task` object
 */
const getAll = async (boardId: string): Promise<Task[]> =>
  getConnection().getRepository(Task).find({ boardId });

/**
 * Returns found `Task` or null
 * @param boardId `Board`'s ID to find task with board id
 * @param taskId `Task`'s ID to find task
 * @returns Promise `Task` object or null
 */
const getById = async (boardId: string, taskId: string): Promise<Task | null> =>
  (await getConnection()
    .getRepository(Task)
    .findOne({ id: taskId, boardId })) || null;

/**
 * Returns created `Task`
 * @param boardId `Board`'s ID to find task with board id
 * @param data `Task`'s params `ITaskParams` to save task
 * @returns Promise `Task` object
 */
const create = async (boardId: string, data: ITaskParams): Promise<Task> =>
  getConnection()
    .getRepository(Task)
    .save({ ...data, boardId });

/**
 * Returns updated `Task`
 * @param boardId `Board`'s ID to find task with board id
 * @param taskId `Task`'s ID to find task
 * @param data `Task`'s params `ITaskParams` to save task
 * @returns Promise `Task` object
 */
const updateById = async (boardId: string, taskId: string, data: ITaskParams) =>
  getConnection()
    .getRepository(Task)
    .save({ ...data, boardId, id: taskId });

/**
 * Returns void and deletes task from database
 * @param boardId `Board`'s ID to find task with board id
 * @param taskId `Task`'s ID to find task
 * @return Promise void
 */
const deleteById = async (boardId: string, taskId: string) => {
  await getConnection().getRepository(Task).delete({ id: taskId, boardId });
};

/**
 * Returns void and delete tasks from database
 * @param boardId `Board`'s ID to find tasks with board id
 * @return Promise void
 */
const whenBoardDeleted = async (boardId: string) => {
  await getConnection().getRepository(Task).delete({ boardId });
};

/**
 * Returns void and assigns tasks userId to null
 * @param userId `User`'s ID to find tasks with user id
 * @return Promise void
 */
const whenUserDeleted = async (userId: string) => {
  await getConnection().getRepository(Task).delete({ userId });
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
