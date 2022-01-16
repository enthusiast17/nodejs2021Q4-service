import { NextFunction, Request, Response, Router } from 'express';
import { Board } from './boards.model';
import boardsService from './boards.service';

const boardsRouter = Router();

boardsRouter.get(
  '/boards',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const boards: Board[] = await boardsService.getAll();
      return res.status(200).json(boards.map(Board.toResponse));
    } catch (err: unknown) {
      next(err);
    }
  }
);

boardsRouter.get(
  '/boards/:boardId',
  async (
    req: Request<{ boardId: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const board: Board = await boardsService.getById(req.params.boardId);
      return res.status(200).json(Board.toResponse(board));
    } catch (err: unknown) {
      next(err);
    }
  }
);

boardsRouter.post(
  '/boards',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createdBoard: Board = await boardsService.create(req.body);
      return res.status(201).json(Board.toResponse(createdBoard));
    } catch (err: unknown) {
      next(err);
    }
  }
);

boardsRouter.put(
  '/boards/:boardId',
  async (
    req: Request<{ boardId: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const board: Board = await boardsService.updateById(
        req.params.boardId,
        req.body
      );
      return res.status(200).json(Board.toResponse(board));
    } catch (err: unknown) {
      next(err);
    }
  }
);

boardsRouter.delete(
  '/boards/:boardId',
  async (
    req: Request<{ boardId: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await boardsService.deleteById(req.params.boardId);
      return res.status(204).json({});
    } catch (err: unknown) {
      next(err);
    }
  }
);

export default boardsRouter;
