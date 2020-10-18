import { getRepository, MoreThanOrEqual } from 'typeorm';

import Movie from '../models/Movie';
import AppError from '../errors/AppError';

interface Request {
  movie_id: number;
  amount: number;
}

class RentedMovieAvailableService {
  public async execute(rentedMovies: Request[]): Promise<Request[]> {
    const moviesRepository = getRepository(Movie);

    const rentedsAvailable = rentedMovies.filter(async rentedMovie => {
      const rentedAvailable = await moviesRepository.findOne({
        where: {
          id: rentedMovie.movie_id,
          storage: MoreThanOrEqual(rentedMovie.amount),
        },
      });

      return rentedAvailable;
    });

    return rentedsAvailable;
  }
}

export default RentedMovieAvailableService;
