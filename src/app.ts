import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import {
  handleErrorMiddleware,
  handleNotFoundMiddleware,
  handleRequestLogMiddleware,
} from './common/middlewares';
import boardsRouter from './resources/boards/boards.router';
import tasksRouter from './resources/tasks/tasks.router';
import usersRouter from './resources/users/users.router';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(handleRequestLogMiddleware);
app.use(usersRouter);
app.use(boardsRouter);
app.use(tasksRouter);
app.use(handleNotFoundMiddleware);
app.use(handleErrorMiddleware);

export default app;
