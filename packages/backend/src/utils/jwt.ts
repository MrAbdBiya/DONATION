import jwt from 'jsonwebtoken';

interface TokenPayload {
  sub: string;
  role: string;
}

export function signAccessToken(payload: TokenPayload, expiresIn = process.env.TOKEN_EXPIRES_IN ?? '15m') {
  return jwt.sign(payload, process.env.JWT_SECRET ?? 'change-me', { expiresIn });
}

export function signRefreshToken(
  payload: TokenPayload,
  expiresIn = process.env.REFRESH_TOKEN_EXPIRES_IN ?? '7d'
) {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET ?? 'change-me-refresh', { expiresIn });
}
