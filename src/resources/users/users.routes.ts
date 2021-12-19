import { FastifyPluginCallback, FastifyRequest } from 'fastify';
import { IDone, IFastifyInstance } from '../../common/types';
import { IUserParams, User } from './users.model';
import usersSchema from './users.schema';
import usersService from './users.service';

export type IUserFastifyRequest = FastifyRequest<{
  Body: IUserParams;
  Params: { userId: string };
}>;

const usersRoutes: FastifyPluginCallback = (
  fastify: IFastifyInstance,
  opts: Record<never, never>,
  done: IDone
) => {
  fastify.get('/users', opts, async (_, reply) => {
    const users = await usersService.getAll();
    reply.code(200).type('application/json').send(users.map(User.toResponse));
  });

  fastify.get(
    '/users/:userId',
    opts,
    async (request: IUserFastifyRequest, reply) => {
      const user = await usersService.getById(request.params.userId);
      reply.code(200).type('application/json').send(User.toResponse(user));
    }
  );

  fastify.post(
    '/users',
    { ...opts, schema: usersSchema },
    async (request: IUserFastifyRequest, reply) => {
      const createdUser = await usersService.create(request.body);
      reply
        .code(201)
        .type('application/json')
        .send(User.toResponse(createdUser));
    }
  );

  fastify.put(
    '/users/:userId',
    { ...opts, schema: usersSchema },
    async (request: IUserFastifyRequest, reply) => {
      const user = await usersService.updateById(
        request.params.userId,
        request.body
      );
      reply.code(200).type('application/json').send(User.toResponse(user));
    }
  );

  fastify.delete(
    '/users/:userId',
    opts,
    async (request: IUserFastifyRequest, reply) => {
      await usersService.deleteById(request.params.userId);
      reply.code(204);
    }
  );

  done();
};

export default usersRoutes;
