import { Board, IBoardParams } from './boards.model';

const boards: Board[] = [];

const getAll = async () => boards;

const getById = async (id: string) => boards.find((board) => board.id === id);

const getByTitle = async (title: string) =>
  boards.find((board) => board.title === title);

const getIndexById = async (id: string) =>
  boards.findIndex((board) => board.id === id);

const create = async (data: IBoardParams) => {
  const board = new Board(data);
  boards.push(board);
  return board;
};

const updateById = async (id: string, data: IBoardParams) => {
  const boardIndex = await getIndexById(id);
  boards[boardIndex] = new Board({
    ...data,
    id,
  });
  return boards[boardIndex];
};

const deleteById = async (id: string) => {
  const boardIndex = await getIndexById(id);
  boards.splice(boardIndex);
};

export default { getAll, getById, getByTitle, create, updateById, deleteById };
