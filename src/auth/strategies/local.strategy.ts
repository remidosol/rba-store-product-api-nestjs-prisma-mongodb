import { Strategy, IVerifyOptions } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../auth.service'
import { LoginDto } from '../dto'
import { validate } from 'class-validator'
import { User } from '../../entities'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (
        username: string,
        password: string,
        done: (
          error: any,
          user?: any,
          options?: IVerifyOptions
        ) => void
      ) => {
        const dto = new LoginDto()
        dto.email = username
        dto.password = password

        const validationErrors = await validate(dto)

        if (validationErrors.length) {
          const allErrorMessages: string[] = []

          for (let key in validationErrors[0].constraints) {
            allErrorMessages.push(
              validationErrors[0].constraints[key]
            )
          }

          return done(
            new UnauthorizedException({
              statusCode: 401,
              message: allErrorMessages[0],
              errors: 'Validation errors have occured!'
            })
          )
        } else {
          const userOrError = await this.authService.validateUser(dto)
          userOrError instanceof User
            ? done(null, userOrError)
            : done(userOrError)
        }
      }
    )
  }
}
