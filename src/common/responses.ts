import { User } from '@prisma/client';

export const toUserResponse = ({
  id,
  name,
  login,
}: User): Omit<User, 'password'> => ({ id, name, login });
