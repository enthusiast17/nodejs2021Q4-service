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
  AUTH_MODE: process.env.AUTH_MODE === 'true',
  POSTGRES_TYPE: process.env.POSTGRES_TYPE,
  POSTGRES_HOST:
    process.env.NODE_ENV === 'production'
      ? process.env.POSTGRES_HOST_PROD
      : process.env.POSTGRES_HOST,
  POSTGRES_PORT:
    process.env.NODE_ENV === 'production'
      ? Number(process.env.POSTGRES_PORT_PROD)
      : Number(process.env.POSTGRES_PORT),
  POSTGRES_DB: process.env.POSTGRES_DB,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
};
