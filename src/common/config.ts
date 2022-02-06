import { config } from 'dotenv';

config({
  path: `${__dirname}/../../.env${process.env.NODE_ENV ?? ''}`,
});

export default {
  PORT: process.env.PORT || '4000',
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY ?? 'secret-key',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '24h',
  BCRYPT_SALT: Number(process.env.BCRYPT_SALT) ?? 10,
};
