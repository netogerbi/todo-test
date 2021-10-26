import { Router } from 'express';
import taskRoutes from './task-routes';

const routes = Router();

routes.use(taskRoutes);

export default routes;
