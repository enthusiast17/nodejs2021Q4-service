import 'reflect-metadata';
import { createConnection } from 'typeorm';
import config from './common/config';
import app from './app';
import { logger } from './common/logger';

const {
  PORT,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  POSTGRES_USER,
} = config;

(async () => {
  try {
    await createConnection({
      database: POSTGRES_DB,
      username: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      type: 'postgres',
      host: POSTGRES_HOST,
      port: POSTGRES_PORT,
    });
    app.listen(PORT || 4000, () => {
      const message = `App is running on http://localhost:${PORT}`;
      logger.log('info', message);
    });
  } catch (err: unknown) {
    logger.log('error', err);
  }
})();

process.on('unhandledRejection', (err: Error) => {
  logger.log('error', { statusCode: 500, ...err });
});

process.on('uncaughtException', (err: Error) => {
  logger.log('error', { statusCode: 500, ...err });
});
