import { FastifyPluginCallback, FastifyRequest } from 'fastify';
import { Board, IBoardParams } from './boards.model';
import { IDone, IFastifyInstance } from '../../common/types';
import boardsService from './boards.service';
import boardsSchema from './boards.schema';

export type IBoardsFastifyRequest = FastifyRequest<{
  Body: IBoardParams;
  Params: { boardId: string };
}>;

const boardsRoutes: FastifyPluginCallback = (
  fastify: IFastifyInstance,
  opts: Record<never, never>,
  done: IDone
) => {
  fastify.get('/boards', opts, async (_, reply) => {
    const boards = await boardsService.getAll();
    reply.code(200).type('application/json').send(boards.map(Board.toResponse));
  });

  fastify.get(
    '/boards/:boardId',
    opts,
    async (request: IBoardsFastifyRequest, reply) => {
      const board = await boardsService.getById(request.params.boardId);
      reply.code(200).type('application/json').send(Board.toResponse(board));
    }
  );

  fastify.post(
    '/boards',
    { ...opts, schema: { body: boardsSchema } },
    async (request: IBoardsFastifyRequest, reply) => {
      const createdBoard = await boardsService.create(request.body);
      reply
        .code(201)
        .type('application/json')
        .send(Board.toResponse(createdBoard));
    }
  );

  fastify.put(
    '/boards/:boardId',
    { ...opts, schema: { body: boardsSchema } },
    async (request: IBoardsFastifyRequest, reply) => {
      const board = await boardsService.updateById(
        request.params.boardId,
        request.body
      );
      reply.code(200).type('application/json').send(Board.toResponse(board));
    }
  );

  fastify.delete(
    '/boards/:boardId',
    opts,
    async (request: IBoardsFastifyRequest, reply) => {
      await boardsService.deleteById(request.params.boardId);
      reply.code(204);
    }
  );

  done();
};

export default boardsRoutes;
