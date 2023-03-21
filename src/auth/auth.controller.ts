import {
  Controller,
  Post,
  Body,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Req,
  Get,
  UseFilters
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignUpDto } from './dto'
import { User } from '../entities'
import { LocalAuthGuard, JwtAuthGuard } from './guard'
import { prismaFilters } from '../prisma/prisma-exception.filter'
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'

@UseFilters(...prismaFilters)
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * To sign up
   *
   * @function signUp
   * @param dto [`SignUpDto`](./dto/sign-up.dto.ts) object
   * @returns created user
   */
  @Post('sign_up')
  @ApiBody({
    schema: {
      example: {
        email: 'serverigaram@gmail.com',
        password: 'test1234',
        firstName: 'Ibrahim',
        lastName: 'AKSUET'
      }
    }
  })
  async signUp(@Body() dto: SignUpDto): Promise<Partial<User>> {
    const user = await this.authService.signUp(dto)

    return user
  }

  /**
   * To log in with LocalAuthGuard
   *
   * @param req Request context
   * @returns signed in user
   */
  @Post('sign_in')
  @ApiBody({
    schema: {
      example: {
        email: 'serverigaram@gmail.com',
        password: 'test1234'
      }
    }
  })
  @ApiResponse({
    schema: {
      example: {
        id: '64197b42095e5eb087141012',
        email: 'serverigaram@gmail.com',
        firstName: 'Ibrahim',
        lastName: 'AKSUET',
        role: {
          id: '64197b42095e5eb087141013',
          name: 'GLOBAL_ADMIN'
        },
        token:
          'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNlcnZlcmlnYXJhbUBnbWFpbC5jb20iLCJzdWIiOiI2NDE5N2I0MjA5NWU1ZWIwODcxNDEwMTIiLCJyb2xlIjoiR0xPQkFMX0FETUlOIiwiaWF0IjoxNjc5NDI0MDYzLCJleHAiOjE2ODY2ODE2NjN9.AmSDYDflW48idOlgpV9CWBkHh7iSP9RbzAhFdCrmcF3y_vslIMoKdFIV2Bu6MJcdQ6Ch0g5RduW_k7pw_E8O2YhqFnSaXDyGRdiz8ZkBxW8SccO9THolNGEAYubBHrslakOoWZBYqyhhce4ElIwXP2-QvXw-DcoPbE9YRaS7VlDi5tklZOIxEZXjrPR8FfRowd6Wwa9vANMph6ufQImbHqSATtMeIk-pszMtGTQsLTGcnw7wN_doKxkt-J_Cb7_AOTuYOzOkio9RZA2fqQpn_Y6Hz6rojI7rYiSSzh9s68ZdgJaI9MUUCeb2t5hoksD3G7mBR_wjTE8ghcd_Bgw_BQ'
      }
    }
  })
  @UseGuards(LocalAuthGuard)
  async signIn(@Req() req: any): Promise<Partial<User>> {
    const user = await this.authService.login(req.user)

    return user
  }

  /**
   * To get already signed in user with JwtAuthGuard
   *
   * @param req Request context
   * @returns signed in user
   */
  @Get('check')
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    schema: {
      example:
        'Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNlcnZlcmlnYXJhbUBnbWFpbC5jb20iLCJzdWIiOiI2NDE5N2I0MjA5NWU1ZWIwODcxNDEwMTIiLCJyb2xlIjoiR0xPQkFMX0FETUlOIiwiaWF0IjoxNjc5NDI0MDYzLCJleHAiOjE2ODY2ODE2NjN9.AmSDYDflW48idOlgpV9CWBkHh7iSP9RbzAhFdCrmcF3y_vslIMoKdFIV2Bu6MJcdQ6Ch0g5RduW_k7pw_E8O2YhqFnSaXDyGRdiz8ZkBxW8SccO9THolNGEAYubBHrslakOoWZBYqyhhce4ElIwXP2-QvXw-DcoPbE9YRaS7VlDi5tklZOIxEZXjrPR8FfRowd6Wwa9vANMph6ufQImbHqSATtMeIk-pszMtGTQsLTGcnw7wN_doKxkt-J_Cb7_AOTuYOzOkio9RZA2fqQpn_Y6Hz6rojI7rYiSSzh9s68ZdgJaI9MUUCeb2t5hoksD3G7mBR_wjTE8ghcd_Bgw_BQ'
    }
  })
  @UseGuards(JwtAuthGuard)
  async checkIsLoggedIn(@Req() req: any): Promise<Partial<User>> {
    return req.user
  }
}
