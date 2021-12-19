import { Board, IBoardParams } from './boards.model';

const boards: Board[] = [];

/**
 * Returns all existing `Board`
 * @returns Promise array of `Board` object
 */
const getAll = async (): Promise<Board[]> => boards;

/**
 * Returns found `Board` or null
 * @param id `Board`'s ID to find board
 * @returns Promise `Board` object or null
 */
const getById = async (id: string): Promise<Board | null> =>
  boards.find((board) => board.id === id) || null;

/**
 * Returns found `Board` or null
 * @param title `Board`'s title to find board
 * @returns Promise `Board` object or null
 */
const getByTitle = async (title: string): Promise<Board | null> =>
  boards.find((board) => board.title === title) || null;

/**
 * Returns found `Board`'s index
 * @param id `Board`'s ID to find board
 * @returns Promise number
 */
const getIndexById = async (id: string): Promise<number> =>
  boards.findIndex((board) => board.id === id);

/**
 * Returns created `Board`
 * @param data `Board`'s params `IBoardParams` to save board
 * @returns Promise `Board` object
 */
const create = async (data: IBoardParams): Promise<Board> => {
  const board: Board = new Board(data);
  boards.push(board);
  return board;
};

/**
 * Returns updated `Board`
 * @param id `Board`'s ID to find board
 * @param data `Board`'s params `IBoardParams` to update board
 * @returns Promise `Board` object
 */
const updateById = async (id: string, data: IBoardParams) => {
  const boardIndex: number = await getIndexById(id);
  boards[boardIndex] = new Board({
    ...data,
    id,
  });
  return boards[boardIndex];
};

/**
 * Returns void and deletes board from database
 * @param id `Board`'s ID to find board
 * @return Promise void
 */
const deleteById = async (id: string) => {
  const boardIndex = await getIndexById(id);
  boards.splice(boardIndex);
};

export default { getAll, getById, getByTitle, create, updateById, deleteById };
