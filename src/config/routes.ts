import { Express, Request, Response } from 'express';
import { authController } from '../http/v1/controllers/user/auth';
import { authenticatedMiddleware, errorHandler } from '../middleware';
import { NotFoundError } from '../utils/errors/not-found-error';
import v1Routes from '../http/v1/routes';
import { loginValidator } from '../validators';
import { validateRequest } from '../middleware/validate-request';

export default (app: Express): void => {
  app.get('/', async (_: Request, res: Response) => {
    return res.status(200).json({ message: 'Todo Test' });
  });

  app.use('/login', loginValidator, validateRequest, authController);
  app.use(authenticatedMiddleware);
  app.use('/v1', v1Routes);

  app.all('*', () => {
    throw new NotFoundError();
  });

  app.use(errorHandler);
};
