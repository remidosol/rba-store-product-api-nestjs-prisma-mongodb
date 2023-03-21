import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

/**
 * Created for Authentication (with JWT Token)
 *
 * @class LocalAuthGuard
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
