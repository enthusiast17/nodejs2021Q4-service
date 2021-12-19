import { validate } from 'uuid';
import { NOT_FOUND_ARGS, BAD_REQUEST_ARGS } from '../../common/constants';
import { HttpError } from '../../common/error';
import tasksRepository from './tasks.memory.repository';
import boardsRepository from '../boards/boards.memory.repository';
import { ITaskParams } from './tasks.model';

const getAll = async (boardId: string) => {
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

const getById = async (boardId: string, taskId: string) => {
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
  const task = await tasksRepository.getById(boardId, taskId);
  if (!task) {
    throw new HttpError(
      ...NOT_FOUND_ARGS,
      `The task with ${taskId} (taskId) is not found.`
    );
  }

  return task;
};

const create = async (boardId: string, data: ITaskParams) => {
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

const updateById = async (
  boardId: string,
  taskId: string,
  data: ITaskParams
) => {
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
