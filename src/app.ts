import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { logger } from './common/logger';
import { IDone, IFastifyInstance } from './common/types';
import boardsRoutes from './resources/boards/boards.routes';
import tasksRoutes from './resources/tasks/tasks.routes';
import usersRoutes from './resources/users/users.routes';

const app: IFastifyInstance = fastify({
  logger,
});

app.addHook(
  'preValidation',
  async (request: FastifyRequest, reply: FastifyReply, done: IDone) => {
    logger.child({ body: request.body }).info({});
    logger.child({ query: request.query }).info({});
    done();
  }
);

app.register(tasksRoutes);
app.register(usersRoutes);
app.register(boardsRoutes);

export default app;
