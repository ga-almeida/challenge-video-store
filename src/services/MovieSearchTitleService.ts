import { getRepository, Like } from 'typeorm';

import Movie from '../models/Movie';
import AppError from '../errors/AppError';

class MovieSearchTitleService {
  public async execute(title: string): Promise<Movie[]> {
    const moviesRepository = getRepository(Movie);

    const moviesSearchTitle = await moviesRepository.find({
      title: Like(title),
    });

    if (!moviesSearchTitle) {
      throw new AppError('Does not exist movie with that title.');
    }

    return moviesSearchTitle;
  }
}

export default MovieSearchTitleService;
