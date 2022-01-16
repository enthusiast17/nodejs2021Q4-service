import { NextFunction, Request, Response, Router } from 'express';
import { IUserParams, User } from './users.model';
import usersService from './users.service';

const usersRouter = Router();

usersRouter.get(
  '/users',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users: User[] = await usersService.getAll();
      return res.status(200).json(users.map(User.toResponse));
    } catch (err: unknown) {
      next(err);
    }
  }
);

usersRouter.get(
  '/users/:userId',
  async (
    req: Request<{ userId: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user: User = await usersService.getById(req.params.userId);
      return res.status(200).json(User.toResponse(user));
    } catch (err: unknown) {
      next(err);
    }
  }
);

usersRouter.post(
  '/users',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createdUser: User = await usersService.create(
        req.body as IUserParams
      );
      return res.status(201).json(User.toResponse(createdUser));
    } catch (err: unknown) {
      next(err);
    }
  }
);

usersRouter.put(
  '/users/:userId',
  async (
    req: Request<{ userId: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user: User = await usersService.updateById(
        req.params.userId,
        req.body
      );
      return res.status(200).json(User.toResponse(user));
    } catch (err: unknown) {
      next(err);
    }
  }
);

usersRouter.delete(
  '/users/:userId',
  async (
    req: Request<{ userId: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await usersService.deleteById(req.params.userId);
      return res.status(204).json({});
    } catch (err: unknown) {
      next(err);
    }
  }
);

export default usersRouter;
