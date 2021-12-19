import { FastifyInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';

export interface IFastifyInstance
  extends FastifyInstance<Server, IncomingMessage, ServerResponse> {}

export type IDone = (err?: Error) => void;
