import { validate } from 'uuid';
import { IUserParams, User } from './users.model';
import {
  NOT_FOUND_ARGS,
  BAD_REQUEST_ARGS,
  CONFLICT_ARGS,
} from '../../common/constants';
import { HttpError } from '../../common/error';
import usersRepository from './users.memory.repository';
import tasksRepository from '../tasks/tasks.memory.repository';

/**
 * Returns all existing `User` from user repository
 * @returns Promise array of User object
 */
const getAll = async (): Promise<User[]> => usersRepository.getAll();

/**
 * Returns found `User` from user repository
 * @param id User's ID to find user
 * @returns Promise `User` object
 */
const getById = async (id: string): Promise<User> => {
  if (!validate(id)) {
    throw new HttpError(...BAD_REQUEST_ARGS, `The ${id} (id) is not uuid.`);
  }
  const user: User | null = await usersRepository.getById(id);
  if (!user) {
    throw new HttpError(
      ...NOT_FOUND_ARGS,
      `The user with ${id} (id) is not found.`
    );
  }

  return user;
};

/**
 * Returns created `User` from user repository
 * @param data User's params `IUserParams` to save user
 * @returns Promise `User`
 */
const create = async (data: IUserParams): Promise<User> => {
  if (await usersRepository.getByLogin(data.login)) {
    throw new HttpError(
      ...CONFLICT_ARGS,
      `The user with "${data.login}" login is already exists.`
    );
  }

  return usersRepository.create(data);
};

/**
 * Returns updated `User`
 * @param id `User`'s ID to find user
 * @param data `User`'s params (IUserParams) to update user
 * @returns Promise `User` object
 */
const updateById = async (id: string, data: IUserParams): Promise<User> => {
  if (!validate(id)) {
    throw new HttpError(...BAD_REQUEST_ARGS, `The ${id} (id) is not uuid.`);
  }

  if (!(await usersRepository.getById(id))) {
    throw new HttpError(
      ...NOT_FOUND_ARGS,
      `The user with ${id} (id) is not found.`
    );
  }

  return usersRepository.updateById(id, data);
};

/**
 * Returns void and deletes user from database
 * @param id `User`'s ID to find user
 * @return Promise void
 */
const deleteById = async (id: string): Promise<void> => {
  if (!validate(id)) {
    throw new HttpError(...BAD_REQUEST_ARGS, `The ${id} (id) is not uuid.`);
  }

  if (!(await usersRepository.getById(id))) {
    throw new HttpError(
      ...NOT_FOUND_ARGS,
      `The user with ${id} (id) is not found.`
    );
  }

  await usersRepository.deleteById(id);
  await tasksRepository.whenUserDeleted(id);
};

export default {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
