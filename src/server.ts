import config from './common/config';
import app from './app';
import { logger } from './common/logger';

const { PORT } = config;

app.listen(PORT || 4000, () => {
  const message = `App is running on http://localhost:${PORT}`;
  logger.log('info', message);
  process.stdin.write(message);
  process.stdin.end();
});

process.on('unhandledRejection', (err: Error) => {
  logger.log('error', { statusCode: 500, ...err });
});

process.on('uncaughtException', (err: Error) => {
  logger.log('error', { statusCode: 500, ...err });
});
