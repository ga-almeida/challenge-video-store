import { getRepository, MoreThanOrEqual } from 'typeorm';

import Movie from '../models/Movie';
import Rented from '../models/Rented';
import AppError from '../errors/AppError';

interface Request {
  movie_id: number;
  amount: number;
}

class RentedMovieService {
  public async execute(
    rentedMovies: Request[],
    user_id: number,
  ): Promise<Rented[]> {
    const moviesRepository = getRepository(Movie);
    const rentedsRepository = getRepository(Rented);

    let moviesAtt: Movie[] = [];
    var rentedsAvailable: Request[] = [];
    var renteds: Rented[] = [];

    for (let index = 0; index < rentedMovies.length; index++) {
      const rentedAvailable = await moviesRepository.findOne({
        where: {
          id: rentedMovies[index].movie_id,
          storage: MoreThanOrEqual(rentedMovies[index].amount),
        },
      });

      if (rentedAvailable) {
        rentedsAvailable.push(rentedMovies[index]);
        rentedAvailable.storage -= rentedMovies[index].amount;
        moviesAtt.push(rentedAvailable);
      }
    }

    if (!rentedsAvailable) {
      throw new AppError('None of these movies can be rented.');
    }

    rentedsAvailable.forEach(rented => {
      const newRented = rentedsRepository.create({
        amount: rented.amount,
        movie_id: rented.movie_id,
        user_id,
      });

      renteds.push(newRented);
    });

    await moviesRepository.save(moviesAtt);
    await rentedsRepository.save(renteds);

    return renteds;
  }
}

export default RentedMovieService;
