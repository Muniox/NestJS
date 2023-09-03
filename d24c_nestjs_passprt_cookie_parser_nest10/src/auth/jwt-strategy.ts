import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

export interface JwtPayload {
  id: string;
}

function cookieExtractor(req: any): null | string {
  return req && req.cookies ? req.cookies?.nazwa_cizstka ?? null : null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor(),
      secretOrKey: 'Tajemniczy tekst, osobny dla każdej apki, długi',
    });
  }
  async validate(payload: JwtPayload, done: (error, user) => void) {
    if(!payload)
  }
}
