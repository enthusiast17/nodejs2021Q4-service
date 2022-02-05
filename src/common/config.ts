import { config } from 'dotenv';
import { join, resolve } from 'path';

config({
  path: join(resolve(), `../../.env.${process.env.NODE_ENV ?? ''}`),
});

export default {
  PORT: process.env.PORT || '4000',
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  BCRYPT_SALT: process.env.BCRYPT_SALT,
};
