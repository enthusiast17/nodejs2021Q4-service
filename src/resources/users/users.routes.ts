import { FastifyPluginCallback, FastifyReply, FastifyRequest } from 'fastify';
import { IDone, IFastifyInstance } from '../../common/types';
import { IUserParams, User } from './users.model';
import usersSchema from './users.schema';
import usersService from './users.service';

export type IUserFastifyRequest = FastifyRequest<{
  Body: IUserParams;
  Params: { userId: string };
}>;

/**
 * Returns `FastifyPluginCallback` to register new routes
 * @param fastify `IFastifyInstance` to create new route
 * @param opts options from server for common routes
 * @param done function, tells that routes creation are finished
 * @return `FastifyPluginCallback` to register new routes
 */
const usersRoutes: FastifyPluginCallback = (
  fastify: IFastifyInstance,
  opts: Record<never, never>,
  done: IDone
) => {
  fastify.get('/users', opts, async (_, reply: FastifyReply) => {
    const users: User[] = await usersService.getAll();
    reply.code(200).type('application/json').send(users.map(User.toResponse));
  });

  fastify.get(
    '/users/:userId',
    opts,
    async (request: IUserFastifyRequest, reply: FastifyReply) => {
      const user: User = await usersService.getById(request.params.userId);
      reply.code(200).type('application/json').send(User.toResponse(user));
    }
  );

  fastify.post(
    '/users',
    { ...opts, schema: usersSchema },
    async (request: IUserFastifyRequest, reply: FastifyReply) => {
      const createdUser: User = await usersService.create(request.body);
      reply
        .code(201)
        .type('application/json')
        .send(User.toResponse(createdUser));
    }
  );

  fastify.put(
    '/users/:userId',
    { ...opts, schema: usersSchema },
    async (request: IUserFastifyRequest, reply: FastifyReply) => {
      const user: User = await usersService.updateById(
        request.params.userId,
        request.body
      );
      reply.code(200).type('application/json').send(User.toResponse(user));
    }
  );

  fastify.delete(
    '/users/:userId',
    opts,
    async (request: IUserFastifyRequest, reply: FastifyReply) => {
      await usersService.deleteById(request.params.userId);
      reply.code(204);
    }
  );

  done();
};

export default usersRoutes;
