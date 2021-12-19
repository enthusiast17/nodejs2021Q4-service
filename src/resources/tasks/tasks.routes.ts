import { FastifyPluginCallback, FastifyRequest } from 'fastify';
import { ITaskParams } from './tasks.model';
import { IDone, IFastifyInstance } from '../../common/types';
import tasksService from './tasks.service';
import tasksSchema from './tasks.schema';

export type ITasksFastifyRequest = FastifyRequest<{
  Body: ITaskParams;
  Params: { boardId?: string; taskId?: string };
}>;

const tasksRoutes: FastifyPluginCallback = (
  fastify: IFastifyInstance,
  opts: Record<never, never>,
  done: IDone
) => {
  fastify.get(
    '/boards/:boardId/tasks',
    opts,
    async (request: ITasksFastifyRequest, reply) => {
      const tasks = await tasksService.getAll(request.params.boardId || '');
      reply.code(200).type('application/json').send(tasks);
    }
  );

  fastify.get(
    '/boards/:boardId/tasks/:taskId',
    opts,
    async (request: ITasksFastifyRequest, reply) => {
      const task = await tasksService.getById(
        request.params.boardId || '',
        request.params.taskId || ''
      );
      reply.code(200).type('application/json').send(task);
    }
  );

  fastify.post(
    '/boards/:boardId/tasks',
    { ...opts, schema: { body: tasksSchema } },
    async (request: ITasksFastifyRequest, reply) => {
      const createdTask = await tasksService.create(
        request.params.boardId || '',
        request.body
      );
      reply.code(201).type('application/json').send(createdTask);
    }
  );

  fastify.put(
    '/boards/:boardId/tasks/:taskId',
    { ...opts, schema: { body: tasksSchema } },
    async (request: ITasksFastifyRequest, reply) => {
      const task = await tasksService.updateById(
        request.params.boardId || '',
        request.params.taskId || '',
        request.body
      );
      reply.code(200).type('application/json').send(task);
    }
  );

  fastify.delete(
    '/boards/:boardId/tasks/:taskId',
    opts,
    async (request: ITasksFastifyRequest, reply) => {
      await tasksService.deleteById(
        request.params.boardId || '',
        request.params.taskId || ''
      );
      reply.code(204);
    }
  );

  done();
};

export default tasksRoutes;
