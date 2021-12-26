import { validate } from 'uuid';
import { NOT_FOUND_ARGS, BAD_REQUEST_ARGS } from '../../common/constants';
import { HttpError } from '../../common/error';
import tasksRepository from './tasks.memory.repository';
import boardsRepository from '../boards/boards.memory.repository';
import { ITaskParams, Task } from './tasks.model';

/**
 * Returns all existing `Task` from task repository
 * @returns Promise array of `Task` object
 */
const getAll = async (boardId: string): Promise<Task[]> => {
  if (!validate(boardId)) {
    throw new HttpError(
      ...BAD_REQUEST_ARGS,
      `The ${boardId} (boardId) is not uuid.`
    );
  }
  if (!(await boardsRepository.getById(boardId))) {
    throw new HttpError(
      ...NOT_FOUND_ARGS,
      `The board with ${boardId} is not found.`
    );
  }
  return tasksRepository.getAll(boardId);
};

/**
 * Returns found `Task` or null from task repository
 * @param boardId `Board`'s ID to find task with board id
 * @param taskId `Task`'s ID to find task
 * @returns Promise `Task` object or null
 */
const getById = async (boardId: string, taskId: string): Promise<Task> => {
  if (!validate(boardId)) {
    throw new HttpError(
      ...BAD_REQUEST_ARGS,
      `The ${boardId} (boardId) is not uuid.`
    );
  }
  if (!(await boardsRepository.getById(boardId))) {
    throw new HttpError(
      ...NOT_FOUND_ARGS,
      `The board with ${boardId} (boardId) is not found.`
    );
  }
  if (!validate(taskId)) {
    throw new HttpError(
      ...BAD_REQUEST_ARGS,
      `The ${taskId} (taskId) is not uuid.`
    );
  }
  const task: Task | null = await tasksRepository.getById(boardId, taskId);
  if (!task) {
    throw new HttpError(
      ...NOT_FOUND_ARGS,
      `The task with ${taskId} (taskId) is not found.`
    );
  }

  return task;
};

/**
 * Returns created `Task` from task repository
 * @param boardId `Board`'s ID to find task with board id
 * @param data `Task`'s params `ITaskParams` to save task
 * @returns Promise `Task` object
 */
const create = async (boardId: string, data: ITaskParams): Promise<Task> => {
  if (!validate(boardId)) {
    throw new HttpError(
      ...BAD_REQUEST_ARGS,
      `The ${boardId} (boardId) is not uuid.`
    );
  }
  if (!(await boardsRepository.getById(boardId))) {
    throw new HttpError(
      ...NOT_FOUND_ARGS,
      `The board with ${boardId} (boardId) is not found.`
    );
  }
  return tasksRepository.create(boardId, data);
};

/**
 * Returns updated `Task` from task repository
 * @param boardId `Board`'s ID to find task with board id
 * @param taskId `Task`'s ID to find task
 * @param data `Task`'s params `ITaskParams` to save task
 * @returns Promise `Task` object
 */
const updateById = async (
  boardId: string,
  taskId: string,
  data: ITaskParams
): Promise<Task> => {
  if (!validate(boardId)) {
    throw new HttpError(
      ...BAD_REQUEST_ARGS,
      `The ${boardId} (boardId) is not uuid.`
    );
  }
  if (!(await boardsRepository.getById(boardId))) {
    throw new HttpError(
      ...NOT_FOUND_ARGS,
      `The board with ${boardId} (boardId) is not found.`
    );
  }
  if (!validate(taskId)) {
    throw new HttpError(
      ...BAD_REQUEST_ARGS,
      `The ${taskId} (taskId) is not uuid.`
    );
  }
  if (!(await tasksRepository.getById(boardId, taskId))) {
    throw new HttpError(
      ...NOT_FOUND_ARGS,
      `The task with "${taskId}" (taskId) is not found.`
    );
  }

  return tasksRepository.updateById(boardId, taskId, data);
};

/**
 * Returns void and deletes task from database
 * @param boardId `Board`'s ID to find task with board id
 * @param taskId `Task`'s ID to find task
 * @return Promise void
 */
const deleteById = async (boardId: string, taskId: string) => {
  if (!validate(boardId)) {
    throw new HttpError(
      ...BAD_REQUEST_ARGS,
      `The ${boardId} (boardId) is not uuid.`
    );
  }
  if (!(await boardsRepository.getById(boardId))) {
    throw new HttpError(
      ...NOT_FOUND_ARGS,
      `The board with ${boardId} (boardId) is not found.`
    );
  }
  if (!validate(taskId)) {
    throw new HttpError(
      ...BAD_REQUEST_ARGS,
      `The ${taskId} (taskId) is not uuid.`
    );
  }

  return tasksRepository.deleteById(boardId, taskId);
};

export default {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
