import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';
import LogoutUserService from '../services/LogoutUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUserService = new AuthenticateUserService();

  const { user, token } = await authenticateUserService.execute({
    email,
    password,
  });

  return response.json({ user, token });
});

sessionsRouter.post(
  '/logout',
  ensureAuthenticated,
  async (request, response) => {
    const authHeader = request.headers.authorization;

    const logoutUserService = new LogoutUserService();

    await logoutUserService.execute(authHeader);

    return response.status(200).json({ message: 'Exiting the application' });
  },
);

export default sessionsRouter;
