import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import config from '../../common/config';
import { FORBIDDEN_ARGS } from '../../common/constants';
import { HttpError } from '../../common/error';
import usersRepository from '../users/users.memory.repository';
import { IUserParams, User } from '../users/users.model';

const login = async (
  data: Pick<IUserParams, 'login' | 'password'>
): Promise<string> => {
  const user: User | null = await usersRepository.getByLogin(data.login);
  if (!user) {
    throw new HttpError(...FORBIDDEN_ARGS, '');
  }
  const match: boolean = await compare(data.password, user.password);
  if (!match) {
    throw new HttpError(...FORBIDDEN_ARGS, '');
  }
  return sign(
    { userId: user.id, login: user.login },
    config.JWT_SECRET_KEY as string,
    { expiresIn: config.JWT_EXPIRES_IN }
  );
};

export default { login };
