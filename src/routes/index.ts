import { Router } from 'express';

import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import moviesRouter from './movies.routes';
import rentedsRouter from './renteds.routes';

const routes = Router();
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/movies', moviesRouter);
routes.use('/renteds', rentedsRouter);

export default routes;
