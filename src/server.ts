import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { logger } from './common/logger';
import { handleUserPreSave } from './common/pre-saves';
import config from './common/config';
import ormconfig from './database/ormconfig';
import app from './app';

const { PORT } = config;

(async () => {
  try {
    await createConnection(ormconfig);
    await handleUserPreSave();
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
