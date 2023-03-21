import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

/**
 * Created for Local Authentication
 *
 * @class LocalAuthGuard
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
