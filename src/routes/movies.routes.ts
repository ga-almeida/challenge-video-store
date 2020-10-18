import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import MoviesAvailableService from '../services/MoviesAvailableService';
import CreateMovieService from '../services/CreateMovieService';
import RentedMovieAvailableService from '../services/RentedMovieAvailableService';
import MovieSearchTitleService from '../services/MovieSearchTitleService';

const moviesRouter = Router();

moviesRouter.use(ensureAuthenticated);

moviesRouter.get('/', async (request, response) => {
  const moviesAvailableService = new MoviesAvailableService();

  const movies = await moviesAvailableService.execute();

  return response.json({ movies });
});

moviesRouter.get('/list-available', async (request, response) => {
  const { moviesAvailable } = request.body;

  const rentedMovieAvailableService = new RentedMovieAvailableService();

  const movies = await rentedMovieAvailableService.execute(moviesAvailable);

  return response.json({ movies });
});

moviesRouter.get('/title', async (request, response) => {
  const { title } = request.body;

  const movieSearchTitleService = new MovieSearchTitleService();

  const movies = await movieSearchTitleService.execute(title);

  return response.json({ movies });
});

moviesRouter.post('/', async (request, response) => {
  const { title, director, copys } = request.body;

  const createMovieService = new CreateMovieService();

  const movie = await createMovieService.execute({
    copys,
    director,
    title,
  });

  return response.json({ movie });
});

export default moviesRouter;
