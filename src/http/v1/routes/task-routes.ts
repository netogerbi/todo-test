import { Router } from 'express';
import { validateRequest } from '../../../middleware/validate-request';
import { taskCreateValidator } from '../../../validators';
import * as controller from '../controllers/task';

const routes = Router();

routes.post(
  '/',
  taskCreateValidator,
  validateRequest,
  controller.createTaskController
);
routes.get('/', controller.getTasksByUserController);

export default routes;
