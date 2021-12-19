import { IUserParams, User } from './users.model';

const users: User[] = [];

const getAll = async () => users;

const getById = async (id: string) =>
  users.find((user: User) => user.id === id);

const getByLogin = async (login: string) =>
  users.find((user: User) => user.login === login);

const getIndexById = async (id: string) =>
  users.findIndex((user: User) => user.id === id);

const create = async (data: IUserParams) => {
  const user = new User(data);
  users.push(user);
  return user;
};

const updateById = async (id: string, data: IUserParams) => {
  const userIndex = await getIndexById(id);
  users[userIndex] = new User({
    ...data,
    id,
  });
  return users[userIndex];
};

const deleteById = async (id: string) => {
  const userIndex = await getIndexById(id);
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
