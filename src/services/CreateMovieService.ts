import { getRepository, LessThan, Not } from 'typeorm';

import Movie from '../models/Movie';
import AppError from '../errors/AppError';

interface Request {
  title: string;
  director: string;
  copys: number;
}

class CreateMoviesService {
  public async execute({ title, director, copys }: Request): Promise<Movie> {
    const moviesRepository = getRepository(Movie);

    if (!title || !director || !copys) {
      throw new AppError('All fields must be filled.', 400);
    }

    const existMovieTitleAndDirector = await moviesRepository.findOne({
      where: {
        title,
        director,
      },
    });

    let movie = moviesRepository.create({
      copys,
      director,
      storage: copys,
      title,
    });

    if (!existMovieTitleAndDirector) {
      await moviesRepository.save(movie);
    } else {
      existMovieTitleAndDirector.storage += copys;
      existMovieTitleAndDirector.copys += copys;
      movie = existMovieTitleAndDirector;
      await moviesRepository.save(movie);
    }

    return movie;
  }
}

export default CreateMoviesService;
