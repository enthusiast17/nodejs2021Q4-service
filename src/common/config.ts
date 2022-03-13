import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export default {
  PORT:
    process.env.NODE_ENV === 'production'
      ? Number(process.env.PORT_PROD)
      : Number(process.env.PORT),
  NODE_ENV: process.env.NODE_ENV,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  AUTH_MODE: process.env.AUTH_MODE === 'true',
  TYPEORM_CONNECTION: (process.env.DB_CONNECTION as 'postgres') || 'postgres',
  TYPEORM_HOST:
    process.env.NODE_ENV === 'production'
      ? process.env.DB_HOST_PROD
      : process.env.DB_HOST,
  TYPEORM_PORT:
    process.env.NODE_ENV === 'production'
      ? Number(process.env.DB_PORT_PROD)
      : Number(process.env.DB_PORT),
  TYPEORM_DATABASE: process.env.DB_DATABASE,
  TYPEORM_USERNAME: process.env.DB_USERNAME,
  TYPEORM_PASSWORD: process.env.DB_PASSWORD,
  TYPEORM_SYNCHRONIZE: Boolean(process.env.DB_SYNCHRONIZE),
  TYPEORM_ENTITIES: process.env.DB_ENTITIES,
  TYPEORM_MIGRATIONS: process.env.DB_MIGRATIONS,
  TYPEORM_MIGRATIONS_DIR: process.env.DB_MIGRATIONS_DIR,
  TYPEORM_MIGRATIONS_RUN: Boolean(process.env.DB_MIGRATIONS_RUN),
  BCRYPT_SALT: Number(process.env.BCRYPT_SALT),
};
