import { FastifyPluginCallback, FastifyReply, FastifyRequest } from 'fastify';
import { Board, IBoardParams } from './boards.model';
import { IDone, IFastifyInstance } from '../../common/types';
import boardsService from './boards.service';
import boardsSchema from './boards.schema';

export type IBoardsFastifyRequest = FastifyRequest<{
  Body: IBoardParams;
  Params: { boardId: string };
}>;

/**
 * Returns `FastifyPluginCallback` to register new routes
 * @param fastify `IFastifyInstance` to create new route
 * @param opts options from server for common routes
 * @param done function, tells that routes creation are finished
 * @return `FastifyPluginCallback` to register new routes
 */
const boardsRoutes: FastifyPluginCallback = (
  fastify: IFastifyInstance,
  opts: Record<never, never>,
  done: IDone
) => {
  fastify.get('/boards', opts, async (_, reply: FastifyReply) => {
    const boards: Board[] = await boardsService.getAll();
    reply.code(200).type('application/json').send(boards.map(Board.toResponse));
  });

  fastify.get(
    '/boards/:boardId',
    opts,
    async (request: IBoardsFastifyRequest, reply: FastifyReply) => {
      const board: Board = await boardsService.getById(request.params.boardId);
      reply.code(200).type('application/json').send(Board.toResponse(board));
    }
  );

  fastify.post(
    '/boards',
    { ...opts, schema: { body: boardsSchema } },
    async (request: IBoardsFastifyRequest, reply: FastifyReply) => {
      const createdBoard: Board = await boardsService.create(request.body);
      reply
        .code(201)
        .type('application/json')
        .send(Board.toResponse(createdBoard));
    }
  );

  fastify.put(
    '/boards/:boardId',
    { ...opts, schema: { body: boardsSchema } },
    async (request: IBoardsFastifyRequest, reply: FastifyReply) => {
      const board: Board = await boardsService.updateById(
        request.params.boardId,
        request.body
      );
      reply.code(200).type('application/json').send(Board.toResponse(board));
    }
  );

  fastify.delete(
    '/boards/:boardId',
    opts,
    async (request: IBoardsFastifyRequest, reply: FastifyReply) => {
      await boardsService.deleteById(request.params.boardId);
      reply.code(204);
    }
  );

  done();
};

export default boardsRoutes;
