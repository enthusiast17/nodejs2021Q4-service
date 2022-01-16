import { NextFunction, Request, Response, Router } from 'express';
import { Task } from './tasks.model';
import tasksService from './tasks.service';

const tasksRouter = Router();

tasksRouter.get(
  '/boards/:boardId/tasks',
  async (
    req: Request<{ boardId: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const tasks: Task[] = await tasksService.getAll(req.params.boardId || '');
      return res.status(200).json(tasks);
    } catch (err: unknown) {
      next(err);
    }
  }
);

tasksRouter.get(
  '/boards/:boardId/tasks/:taskId',
  async (
    req: Request<{ boardId: string; taskId: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const task: Task = await tasksService.getById(
        req.params.boardId || '',
        req.params.taskId || ''
      );
      return res.status(200).json(task);
    } catch (err: unknown) {
      next(err);
    }
  }
);

tasksRouter.post(
  '/boards/:boardId/tasks',
  async (
    req: Request<{ boardId: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const createdTask: Task = await tasksService.create(
        req.params.boardId || '',
        req.body
      );
      return res.status(201).json(createdTask);
    } catch (err: unknown) {
      next(err);
    }
  }
);

tasksRouter.put(
  '/boards/:boardId/tasks/:taskId',
  async (
    req: Request<{ boardId: string; taskId: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const task: Task = await tasksService.updateById(
        req.params.boardId || '',
        req.params.taskId || '',
        req.body
      );
      return res.status(200).json(task);
    } catch (err: unknown) {
      next(err);
    }
  }
);

tasksRouter.delete(
  '/boards/:boardId/tasks/:taskId',
  async (
    req: Request<{ boardId: string; taskId: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await tasksService.deleteById(
        req.params.boardId || '',
        req.params.taskId || ''
      );
      return res.status(204).json({});
    } catch (err: unknown) {
      next(err);
    }
  }
);

export default tasksRouter;
