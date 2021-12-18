const { validate } = require('uuid');
const { NOT_FOUND_ARGS, BAD_REQUEST_ARGS } = require('../../common/constants');
const { HttpError } = require('../../common/error');
const boardsRepository = require('./boards.memory.repository');
const tasksRepository = require('../tasks/tasks.memory.repository');

const getAll = async () => boardsRepository.getAll();

const getById = async (id) => {
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

const create = async (data) => boardsRepository.create(data);

const updateById = async (id, data) => {
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

const deleteById = async (id) => {
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

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
