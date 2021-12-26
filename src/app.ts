import fastify from 'fastify';
import { IFastifyInstance } from './common/types';
import boardsRoutes from './resources/boards/boards.routes';
import tasksRoutes from './resources/tasks/tasks.routes';
import usersRoutes from './resources/users/users.routes';

const app: IFastifyInstance = fastify({
  logger: true,
});

app.register(tasksRoutes);
app.register(usersRoutes);
app.register(boardsRoutes);

export default app;
