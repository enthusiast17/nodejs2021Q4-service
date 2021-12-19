import { v4 as uuidv4 } from 'uuid';

export interface IUserParams {
  id?: string;
  name: string;
  login: string;
  password: string;
}

class User {
  id: string;

  name: string;

  login: string;

  password: string;

  constructor({ id = uuidv4(), name, login, password }: IUserParams) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: User) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export { User };
