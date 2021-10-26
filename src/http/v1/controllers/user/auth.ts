import { Request, Response } from 'express';
import { authenticate } from '../../../../domain/v1/user/service';

export const authController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, password } = req.body;

  const auth = await authenticate({ email, password });

  return res.send(auth);
};
