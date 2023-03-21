import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Env } from '../../entities'
import { JWTPayload } from '../auth.interfaces'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService<Env>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_PUBLIC_KEY'),
      algorithms: ['RS512']
    } as StrategyOptions)
  }

  async validate(payload: JWTPayload) {
    return {
      userId: payload.sub,
      email: payload.email,
      timeZone: payload.timeZone,
      role: payload.role
    }
  }
}
