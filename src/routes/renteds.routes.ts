import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import RentedMovieService from '../services/RentedMovieService';
import GiveBackRentedMovieService from '../services/GiveBackRentedMovieService';

const rentedsRouter = Router();
rentedsRouter.use(ensureAuthenticated);

rentedsRouter.post('/', async (request, response) => {
  const { id } = request.user;
  const { rentedMovies } = request.body;

  const rentedMovieService = new RentedMovieService();

  const renteds = await rentedMovieService.execute(rentedMovies, Number(id));

  return response.json({ renteds });
});

rentedsRouter.post('/give-back', async (request, response) => {
  const { id } = request.user;
  const rentedMovies = request.body;

  const giveBackRentedMovieService = new GiveBackRentedMovieService();

  const renteds = await giveBackRentedMovieService.execute(
    rentedMovies,
    Number(id),
  );

  return response.json({ renteds });
});

export default rentedsRouter;
