import { NextFunction, Request, Response, Router } from 'express';
import authService from './auth.service';

const authRouter = Router();

authRouter.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token: string = await authService.login(req.body);
      return res.status(200).json({ token });
    } catch (err: unknown) {
      next(err);
    }
  }
);

export default authRouter;
