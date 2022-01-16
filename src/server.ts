import config from './common/config';
import app from './app';
import { logger } from './common/logger';

const { PORT } = config;

app.listen(PORT || 4000, () => {
  process.stdin.write(`App is running on http://localhost:${PORT}`);
  process.stdin.end();
});

process.on('unhandledRejection', (err: Error) => {
  logger.log('error', { statusCode: 500, ...err });
});

process.on('uncaughtException', (err: Error) => {
  logger.log('error', { statusCode: 500, ...err });
});
