import { Router } from 'express';
import * as controller from '../controllers/task';
import { validateRequest } from '../../../middleware/validate-request';
import {
  taskCreateValidator,
  validateTaskStatusParam,
} from '../../../validators';

const routes = Router();

routes.post(
  '/',
  taskCreateValidator,
  validateRequest,
  controller.createTaskController
);
routes.patch(
  '/:id/:status',
  validateTaskStatusParam,
  validateRequest,
  controller.updateTaskStatusController
);
routes.get('/', controller.getTasksByUserController);

export default routes;
