import { Router } from 'express';
import { taskCreateValidator } from '../../../validators/task-create-validator';
import * as controller from '../controllers/task';

const routes = Router();

routes.post('/', taskCreateValidator, controller.insertOneFarmController);

export default routes;
