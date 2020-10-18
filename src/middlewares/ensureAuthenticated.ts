import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import authConfig from '../config/auth';
import AppError from '../errors/AppError';
import Token from '../models/Token';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const tokensRepository = getRepository(Token);
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  const existTokenBlackList = await tokensRepository.find({
    where: {
      token,
    },
  });

  if (existTokenBlackList.length > 0) {
    throw new AppError('Expired token', 400);
  }

  try {
    const decode = verify(token, authConfig.jwt.secret);

    const { sub } = decode as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
