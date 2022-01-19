import { getConnection } from 'typeorm';
import { BoardColumn } from '../columns/columns.model';
import { Board, IBoardParams } from './boards.model';

/**
 * Returns all existing `Board`
 * @returns Promise array of `Board` object
 */
const getAll = async (): Promise<Board[]> =>
  getConnection()
    .getRepository(Board)
    .find({ relations: ['columns'] });

/**
 * Returns found `Board` or null
 * @param id `Board`'s ID to find board
 * @returns Promise `Board` object or null
 */
const getById = async (id: string): Promise<Board | null> =>
  (await getConnection()
    .getRepository(Board)
    .findOne({ where: { id }, relations: ['columns'] })) || null;

/**
 * Returns found `Board` or null
 * @param title `Board`'s title to find board
 * @returns Promise `Board` object or null
 */
const getByTitle = async (title: string): Promise<Board | null> =>
  (await getConnection()
    .getRepository(Board)
    .findOne({ where: { title }, relations: ['columns'] })) || null;

/**
 * Returns created `Board`
 * @param data `Board`'s params `IBoardParams` to save board
 * @returns Promise `Board` object
 */
const create = async (data: IBoardParams): Promise<Board> =>
  getConnection().getRepository(Board).save(data);

/**
 * Returns updated `Board`
 * @param id `Board`'s ID to find board
 * @param data `Board`'s params `IBoardParams` to update board
 * @returns Promise `Board` object
 */
const updateById = async (id: string, data: IBoardParams): Promise<Board> => {
  await Promise.all(
    data.columns.map(async (column) =>
      getConnection().getRepository(BoardColumn).save(column)
    )
  );

  return getConnection()
    .getRepository(Board)
    .save({ ...data, id });
};

/**
 * Returns void and deletes board from database
 * @param id `Board`'s ID to find board
 * @return Promise void
 */
const deleteById = async (id: string) => {
  await getConnection().getRepository(Board).delete({ id });
};

export default { getAll, getById, getByTitle, create, updateById, deleteById };
