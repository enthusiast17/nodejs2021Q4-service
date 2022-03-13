import { getConnection } from 'typeorm';
import { IUserParams, User } from './users.model';

/**
 * Returns all existing `User`
 * @returns Promise array of User object
 */
const getAll = async (): Promise<User[]> =>
  getConnection().getRepository(User).find({});

/**
 * Returns found `User` or null
 * @param id `User`'s ID to find user
 * @returns Promise `User` object or null
 */
const getById = async (id: string): Promise<User | null> =>
  (await getConnection().getRepository(User).findOne({ id })) ?? null;

/**
 * Returns found `User` or null
 * @param login `User`'s login to find user
 * @returns Promise `User` object or null
 */
const getByLogin = async (login: string): Promise<User | null> =>
  (await getConnection().getRepository(User).findOne({ login })) ?? null;

/**
 * Returns created `User`
 * @param data User's params `IUserParams` to save user
 * @returns Promise `User` object
 */
const create = async (data: IUserParams): Promise<User> =>
  getConnection().getRepository(User).save(data);

/**
 * Returns updated `User`
 * @param id `User`'s ID to find user
 * @param data `User`'s params (IUserParams) to update user
 * @returns Promise `User` object
 */
const updateById = async (id: string, data: IUserParams): Promise<User> =>
  getConnection()
    .getRepository(User)
    .save({ ...data, id });

/**
 * Returns void and deletes user from database
 * @param id `User`'s ID to find user
 * @return Promise void
 */
const deleteById = async (id: string): Promise<void> => {
  await getConnection().getRepository(User).delete({ id });
};

export default {
  getAll,
  getById,
  getByLogin,
  create,
  updateById,
  deleteById,
};
