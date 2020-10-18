import { getRepository } from 'typeorm';

import Token from '../models/Token';
import AppError from '../errors/AppError';

class LogoutUserService {
  public async execute(authHeader: string | undefined): Promise<void> {
    const tokensRepository = getRepository(Token);

    if (!authHeader) {
      throw new AppError('Incorrect token.', 400);
    }

    const [, token] = authHeader.split(' ');

    const newTokenBlackList = tokensRepository.create({
      token,
    });

    await tokensRepository.save(newTokenBlackList);
  }
}

export default LogoutUserService;
