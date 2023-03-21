import {
  Injectable,
  UnauthorizedException,
  HttpStatus,
  HttpException,
  NotFoundException
} from '@nestjs/common'
import { SignUpDto, LoginDto } from './dto'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../user/user.service'
import { HashService } from '../hash/hash.service'
import { Env, User } from '../entities'
import { PrismaService } from '../prisma/prisma.service'
import { ConfigService } from '@nestjs/config'

/**
 * #### Business layer for `auth` module
 *
 * @class AuthService
 */
@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    // private apiTokenService: ApiTokenService,
    private configService: ConfigService<Env>,
    private userService: UserService,
    private hashService: HashService,
    private jwtService: JwtService
  ) {
    //
  }

  /**
   * Use to sign up (create user)
   *
   * @param signUpDto [`SignUpDto`](./dto/sign-up.dto.ts) object
   * @returns [`User`](../entities/user.entity.ts) instance with access token (logged in user)
   */
  async signUp(signUpDto: SignUpDto): Promise<Partial<User>> {
    const user = await this.userService.createUser(signUpDto)

    const loggedInUser = await this.login(new User(user))

    return new User(loggedInUser)
  }

  /**
   * Use to log in with local auth guard
   *
   * @param user [`User`](../entities/user.entity.ts) instance
   * @returns [`User`](../entities/user.entity.ts) instance (logged in user)
   */
  async login(user: Partial<User>): Promise<Partial<User>> {
    user.token = await this.createJWT({
      id: user.id!,
      email: user.email!,
      role: user.role!.name!
    })

    return new User(user)
  }

  /**
   * Use to validate user for auth
   *
   * @param email user email
   * @param password plain user password
   * @returns [`User`](../entities/user.entity.ts) instance otherwise `throw` UnauthorizedException/NotFoundException
   */
  async validateUser(
    dto: LoginDto
  ): Promise<Partial<User> | HttpException> {
    try {
      const user = await this.userService.getUserByUniqueForLogin({
        email: dto.email
      })

      if (user) {
        if (
          await this.hashService.verify({
            hash: user.password!,
            plain: dto.password
          })
        ) {
          return user
        } else {
          return new UnauthorizedException({
            statusCode: HttpStatus.UNAUTHORIZED,
            message: 'Wrong password'
          })
        }
      } else {
        return new NotFoundException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'User not found'
        })
      }
    } catch (err: any) {
      console.error(err)
      return new HttpException(
        err.getStatus() ? err.message : 'Something went wrong!',
        err.getStatus() ?? HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  /**
   * Creates JWT token
   *
   * @param user JWT payload
   * @returns JWT token
   */
  async createJWT(user: { id: string; email: string; role: string }) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role
    }

    return this.jwtService.sign(payload)
  }
}
