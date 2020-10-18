import { getRepository, Not } from 'typeorm';

import Movie from '../models/Movie';
import AppError from '../errors/AppError';

class MoviesAvailableService {
  public async execute(): Promise<Movie[]> {
    const moviesRepository = getRepository(Movie);

    const movies = await moviesRepository.find({
      where: {
        storage: Not(0),
      },
    });

    if (!movies) {
      throw new AppError('All the movies are rentend.', 400);
    }

    return movies;
  }
}

export default MoviesAvailableService;
