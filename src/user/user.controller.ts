import {
  Controller,
  Post,
  Req,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseFilters,
  UseGuards
} from '@nestjs/common'
import { UserService } from './user.service'
import { Prisma, Roles } from '@prisma/client'
import { CreateUserDto, FindUserDto, UpdateUserDto } from './dto'
import { User } from '../entities'
import { prismaFilters } from '../prisma/prisma-exception.filter'
import { JwtAuthGuard, RolesGuard } from '../auth/guard'
import { Role as AllowedRole } from '../auth/decorators/role.decorator'
import { ApiBearerAuth, ApiTags, ApiBody } from '@nestjs/swagger'

@UseFilters(...prismaFilters)
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiBody({
    required: false,
    schema: {
      example: {
        createdAt: 'desc'
      }
    }
  })
  async getUsers(
    @Query('page', ParseIntPipe) page?: number,
    @Body() orders?: Prisma.UserOrderByWithRelationInput
  ): Promise<Partial<User>[]> {
    const users = await this.userService.getAll(page, orders)
    return users
  }

  @Post('find')
  async getUser(@Body() where: FindUserDto): Promise<Partial<User>> {
    const user = await this.userService.getUserByUnique(where)

    return user
  }

  @Post('/create')
  @AllowedRole(Roles.GLOBAL_ADMIN)
  async createUser(
    @Body() dto: CreateUserDto
  ): Promise<Partial<User>> {
    const user = await this.userService.createUser(dto)

    return user
  }

  @Patch('/update')
  async updateUser(
    @Body() dto: UpdateUserDto
  ): Promise<Partial<User>> {
    const user = await this.userService.updateUser(dto)

    return user
  }

  @Delete('/delete/:user_id')
  @AllowedRole(Roles.GLOBAL_ADMIN)
  async deleteUser(@Param('user_id') userId: string) {
    const user = await this.userService.deleteUser(userId)

    return {
      message: 'User has been deleted',
      deletedUser: user
    }
  }
}
