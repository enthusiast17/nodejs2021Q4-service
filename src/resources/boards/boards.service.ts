import { validate } from 'uuid';
import { NOT_FOUND_ARGS, BAD_REQUEST_ARGS } from '../../common/constants';
import { HttpError } from '../../common/error';
import { Board, IBoardParams } from './boards.model';
import boardsRepository from './boards.memory.repository';

/**
 * Returns all existing `Board` from board repository
 * @returns Promise array of `Board` object
 */
const getAll = async (): Promise<Board[]> => boardsRepository.getAll();

/**
 * Returns found `Board` or null from board repository
 * @param id `Board`'s ID to find board
 * @returns Promise `Board` object or null
 */
const getById = async (id: string): Promise<Board> => {
  if (!validate(id)) {
    throw new HttpError(...BAD_REQUEST_ARGS, `The ${id} (id) is not uuid.`);
  }
  const board: Board | null = await boardsRepository.getById(id);
  if (!board) {
    throw new HttpError(
      ...NOT_FOUND_ARGS,
      `The board with ${id} is not found.`
    );
  }

  return board;
};

/**
 * Returns created `Board` from board repository
 * @param data `Board`'s params `IBoardParams` to save board
 * @returns Promise `Board` object
 */
const create = async (data: IBoardParams): Promise<Board> =>
  boardsRepository.create(data);

/**
 * Returns updated `Board` from board repository
 * @param id `Board`'s ID to find board
 * @param data `Board`'s params `IBoardParams` to update board
 * @returns Promise `Board` object
 */
const updateById = async (id: string, data: IBoardParams): Promise<Board> => {
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

/**
 * Returns void and deletes board from database
 * @param id `Board`'s ID to find board
 * @return Promise void
 */
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
};

export default {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
