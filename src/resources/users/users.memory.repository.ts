import { IUserParams, User } from './users.model';

const users: User[] = [];

/**
 * Returns all existing `User`
 * @returns Promise array of User object
 */
const getAll = async (): Promise<User[]> => users;

/**
 * Returns found `User` or null
 * @param id `User`'s ID to find user
 * @returns Promise `User` object or null
 */
const getById = async (id: string): Promise<User | null> =>
  users.find((user: User) => user.id === id) || null;

/**
 * Returns found `User` or null
 * @param login `User`'s login to find user
 * @returns Promise `User` object or null
 */
const getByLogin = async (login: string): Promise<User | null> =>
  users.find((user: User) => user.login === login) || null;

/**
 * Returns found `User`'s index
 * @param id `User`'s ID to find user with index
 * @returns Promise number
 */
const getIndexById = async (id: string): Promise<number> =>
  users.findIndex((user: User) => user.id === id);

/**
 * Returns created `User`
 * @param data User's params `IUserParams` to save user
 * @returns Promise `User` object
 */
const create = async (data: IUserParams): Promise<User> => {
  const user: User = new User(data);
  users.push(user);
  return user;
};

/**
 * Returns updated `User`
 * @param id `User`'s ID to find user
 * @param data `User`'s params (IUserParams) to update user
 * @returns Promise `User` object
 */
const updateById = async (id: string, data: IUserParams): Promise<User> => {
  const userIndex: number = await getIndexById(id);
  users[userIndex] = new User({
    ...data,
    id,
  });
  return users[userIndex];
};

/**
 * Returns void and deletes user from database
 * @param id `User`'s ID to find user
 * @return Promise void
 */
const deleteById = async (id: string): Promise<void> => {
  const userIndex: number = await getIndexById(id);
  users.splice(userIndex);
};

export default {
  getAll,
  getById,
  getByLogin,
  create,
  updateById,
  deleteById,
};
