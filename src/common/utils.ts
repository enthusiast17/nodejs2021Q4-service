import { User } from '@prisma/client';

export const toUserWithoutPassword = ({
  id,
  name,
  login,
}: User): Omit<User, 'password'> => ({ id, name, login });
