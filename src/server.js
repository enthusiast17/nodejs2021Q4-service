const { PORT } = require('./common/config');
const app = require('./app');

app.listen(PORT, (err) => {
  if (err) {
    process.stdin.write(`ERR: ${err.message}`);
    return
  }
  process.stdin.write(`App is running on http://localhost:${PORT}`);
});
