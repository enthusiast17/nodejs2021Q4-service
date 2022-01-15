import config from './common/config';
import app from './app';
import { logger } from './common/logger';

const { PORT } = config;

app.listen(PORT || 4000, (err: Error | null) => {
  if (err) {
    process.stdin.write(`ERR: ${err.message}`);
    return;
  }
  process.stdin.write(`App is running on http://localhost:${PORT}`);
});

process.on('unhandledRejection', (reason) => {
  logger.error(reason);
});

process.on('uncaughtException', (err) => {
  logger.error(err);
});
