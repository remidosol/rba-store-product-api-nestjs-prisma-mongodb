import { Prisma, Roles } from '@prisma/client'
import {
  Injectable,
  HttpStatus,
  HttpException,
  BadRequestException
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { HashService } from '../hash/hash.service'
import { CreateUserDto, FindUserDto, UpdateUserDto } from './dto'
import { User, Env } from '../entities'
import { ConfigService } from '@nestjs/config'

/**
 * #### Business layer for `user` module
 *
 * @class UserService
 */
@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private hashService: HashService,
    private configService: ConfigService<Env>
  ) {
    this.hashPasswordHook()
  }

  /**
   * Fetch users by paginating
   *
   * @param page page for pagination
   * @param order order of pagination
   * @returns a list of users
   */
  async getAll(
    page: number | undefined = 0,
    order: Prisma.UserOrderByWithRelationInput = { createdAt: 'desc' }
  ): Promise<User[]> {
    if (page && page >= 1) {
      page -= 1
    }

    if (Object.keys(order).length > 1) {
      throw new HttpException(
        'You should specify one order factor!',
        HttpStatus.BAD_REQUEST
      )
    }

    const params: {
      skip?: number
      take?: number
      cursor?: Prisma.UserWhereUniqueInput
      where?: Prisma.UserWhereInput
      orderBy?: Prisma.UserOrderByWithRelationInput
    } = {
      skip: page * 10,
      take: 10,
      orderBy: order
    }

    const users = await this.prismaService.user.findMany({
      ...params
    })

    if (users.length) {
      return users.map((user) => new User(user))
    } else {
      throw new HttpException('There are no other users.', 404)
    }
  }

  /**
   * Find user by unique field (in this case they're 'email' or 'id')
   *! for user login / signup
   *
   * @param where Object that contains one of or both of unique fields
   * @returns a `User` or `null`
   */
  async getUserByUniqueForLogin(
    where: FindUserDto
  ): Promise<User | undefined> {
    if (Object.keys(where).length > 1) {
      throw new HttpException(
        'You should specify just one query factor!',
        HttpStatus.BAD_REQUEST
      )
    }

    const user = await this.prismaService.user.findUnique({
      where: {
        email: where.email
      },
      include: {
        UserRole: true
      }
    })

    if (user) {
      return new User(user)
    } else {
      return undefined
    }
  }

  /**
   * Find user by unique field (in this case they're 'email' or 'id')
   *
   * @param where Object that contains one of or both of unique fields
   * @returns a `User` or `null`
   */
  async getUserByUnique(where: FindUserDto): Promise<User> {
    if (Object.keys(where).length > 1) {
      throw new HttpException(
        'You should specify just one query factor!',
        HttpStatus.BAD_REQUEST
      )
    }

    const user = await this.prismaService.user.findUnique({
      where
    })

    if (user) {
      return new User(user)
    } else {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'User not found!'
      })
    }
  }

  /**
   * Creates a user
   *
   * @param dto [`CreateUserDto`](./dto/create-user.dto.ts) object
   * @returns created [`User`](../entities/user.entity.ts)
   */
  async createUser(dto: CreateUserDto): Promise<User> {
    const isUserAlreadyCreated =
      await this.prismaService.user.findUnique({
        where: { email: dto.email }
      })

    if (isUserAlreadyCreated) {
      throw new BadRequestException({
        message: 'User already exists! Please login!'
      })
    }

    const user = await this.prismaService.user.create({
      data: {
        ...dto,
        UserRole: {
          create: {
            name: Roles.USER
          }
        }
      },
      include: {
        UserRole: true
      }
    })

    return new User(user)
  }

  /**
   * Updates a user
   *
   * @param dto [`UpdateUserDto`](./dto/update-user.dto.ts) object
   * @param userId user id
   * @returns updated [`User`](../entities/user.entity.ts)
   */
  async updateUser(dto: UpdateUserDto): Promise<User> {
    const user = await this.prismaService.user.update({
      where: { id: dto.userId },
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName
      }
    })

    return new User(user)
  }

  /**
   * Updates password of a user
   *
   * @param password string password
   * @param userId user id
   * @returns updated [`User`](../entities/user.entity.ts)
   */
  async updatePassword(
    password: string,
    userId: string
  ): Promise<User> {
    const user = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        password
      }
    })

    return new User(user)
  }

  /**
   * Deletes a user
   *
   * @param userId user id
   * @returns deleted user
   */
  async deleteUser(userId: string): Promise<User> {
    await this.prismaService.role.delete({ where: { userId } })
    const storesOfUser = await this.prismaService.store.findMany({
      where: { userId }
    })

    for (let store of storesOfUser) {
      await this.prismaService.product.deleteMany({
        where: { storeId: store.id }
      })
    }

    await this.prismaService.store.deleteMany({ where: { userId } })

    const deletedUser = await this.prismaService.user.delete({
      where: {
        id: userId
      }
    })

    return new User(deletedUser)
  }

  /**
   * Hashes password when creating or updating a user
   */
  hashPasswordHook() {
    //! BeforeCreate and BeforeUpdate Hook(Middleware)
    this.prismaService.$use(
      async ({ action, args, model, ..._rest }, next) => {
        if (
          model === 'User' &&
          (action === 'create' || action === 'update') &&
          args.data.password
        ) {
          args.data.password = await this.hashService.hash({
            plain: args.data.password
          })
        }

        return next({ action, args, model, ..._rest })
      }
    )
  }
}
