import { FastifyPluginCallback, FastifyReply, FastifyRequest } from 'fastify';
import { ITaskParams, Task } from './tasks.model';
import { IDone, IFastifyInstance } from '../../common/types';
import tasksService from './tasks.service';
import tasksSchema from './tasks.schema';

export type ITasksFastifyRequest = FastifyRequest<{
  Body: ITaskParams;
  Params: { boardId?: string; taskId?: string };
}>;

/**
 * Returns `FastifyPluginCallback` to register new routes
 * @param fastify `IFastifyInstance` to create new route
 * @param opts options from server for common routes
 * @param done function, tells that routes creation are finished
 * @return `FastifyPluginCallback` to register new routes
 */
const tasksRoutes: FastifyPluginCallback = (
  fastify: IFastifyInstance,
  opts: Record<never, never>,
  done: IDone
) => {
  fastify.get(
    '/boards/:boardId/tasks',
    opts,
    async (request: ITasksFastifyRequest, reply: FastifyReply) => {
      const tasks: Task[] = await tasksService.getAll(
        request.params.boardId || ''
      );
      reply.code(200).type('application/json').send(tasks);
    }
  );

  fastify.get(
    '/boards/:boardId/tasks/:taskId',
    opts,
    async (request: ITasksFastifyRequest, reply: FastifyReply) => {
      const task: Task = await tasksService.getById(
        request.params.boardId || '',
        request.params.taskId || ''
      );
      reply.code(200).type('application/json').send(task);
    }
  );

  fastify.post(
    '/boards/:boardId/tasks',
    { ...opts, schema: { body: tasksSchema } },
    async (request: ITasksFastifyRequest, reply: FastifyReply) => {
      const createdTask: Task = await tasksService.create(
        request.params.boardId || '',
        request.body
      );
      reply.code(201).type('application/json').send(createdTask);
    }
  );

  fastify.put(
    '/boards/:boardId/tasks/:taskId',
    { ...opts, schema: { body: tasksSchema } },
    async (request: ITasksFastifyRequest, reply: FastifyReply) => {
      const task: Task = await tasksService.updateById(
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
    async (request: ITasksFastifyRequest, reply: FastifyReply) => {
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
