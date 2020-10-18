import { getRepository, In } from 'typeorm';

import Movie from '../models/Movie';
import Rented from '../models/Rented';
import AppError from '../errors/AppError';

interface Request {
  movie_id: number;
  amount: number;
}

class GiveBackRentedMovieService {
  public async execute(
    rentedMovies: Request[],
    user_id: number,
  ): Promise<Rented[]> {
    const moviesRepository = getRepository(Movie);
    const rentedsRepository = getRepository(Rented);

    const movies: number[] = [];
    rentedMovies.map(r => {
      movies.push(r.movie_id);
    });

    if (movies && movies.length <= 0) {
      throw new AppError('No films were set.');
    }

    const allMoviesRented = await rentedsRepository.find({
      where: { user_id, movie_id: In(movies) },
    });

    if (allMoviesRented) {
      if (allMoviesRented.length <= movies.length) {
        throw new AppError(
          'There are some reported movies that have not been rented.',
        );
      }
    } else {
      throw new AppError('All of these informed movies that were not rented.');
    }

    const moviesBD = await moviesRepository.find({ id: In(movies) });

    const moviesAtt: Movie[] = [];
    moviesBD.map(movie => {
      allMoviesRented.map(rented => {
        if (rented.id === movie.id) {
          const newStorage = movie.storage + rented.amount;
          movie.storage = newStorage;
          moviesAtt.push(movie);
        }
      });
    });

    await moviesRepository.save(moviesAtt);
    await rentedsRepository.remove(allMoviesRented);

    return allMoviesRented;
  }
}

export default GiveBackRentedMovieService;
