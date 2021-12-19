import config from './common/config';
import app from './app';

const { PORT } = config;

app.listen(PORT || 4000, (err: Error | null) => {
  if (err) {
    process.stdin.write(`ERR: ${err.message}`);
    return;
  }
  process.stdin.write(`App is running on http://localhost:${PORT}`);
});
