import { validate } from 'uuid';
import { NOT_FOUND_ARGS, BAD_REQUEST_ARGS } from '../../common/constants';
import { HttpError } from '../../common/error';
import { IBoardParams } from './boards.model';
import boardsRepository from './boards.memory.repository';
import tasksRepository from '../tasks/tasks.memory.repository';

const getAll = async () => boardsRepository.getAll();

const getById = async (id: string) => {
  if (!validate(id)) {
    throw new HttpError(...BAD_REQUEST_ARGS, `The ${id} (id) is not uuid.`);
  }
  const board = await boardsRepository.getById(id);
  if (!board) {
    throw new HttpError(
      ...NOT_FOUND_ARGS,
      `The board with ${id} is not found.`
    );
  }

  return board;
};

const create = async (data: IBoardParams) => boardsRepository.create(data);

const updateById = async (id: string, data: IBoardParams) => {
  if (!validate(id)) {
    throw new HttpError(...BAD_REQUEST_ARGS, `The ${id} (id) is not uuid.`);
  }

  if (!(await boardsRepository.getById(id))) {
    throw new HttpError(
      ...NOT_FOUND_ARGS,
      `The board with "${id}" (id) is not found.`
    );
  }

  return boardsRepository.updateById(id, data);
};

const deleteById = async (id: string) => {
  if (!validate(id)) {
    throw new HttpError(...BAD_REQUEST_ARGS, `The ${id} (id) is not uuid.`);
  }

  if (!(await boardsRepository.getById(id))) {
    throw new HttpError(
      ...NOT_FOUND_ARGS,
      `The board with "${id}" (id) is not found.`
    );
  }

  await boardsRepository.deleteById(id);
  await tasksRepository.whenBoardDeleted(id);
};

export default {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
