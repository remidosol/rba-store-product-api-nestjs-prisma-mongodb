import {
  Injectable,
  CanActivate,
  ExecutionContext
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { roles } from '../auth.constants'

/**
 * Created for Role-based Authentication
 *
 * @class RolesGuard
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const role = this.reflector.getAllAndOverride<string>('role', [
      context.getHandler(),
      context.getClass()
    ])

    if (!roles) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const user = request.user

    const result = await this.matchRoles(role, user.role!)
    return result
  }

  async matchRoles(
    allowedRole: string,
    userRole: string
  ): Promise<boolean> {
    if (roles.indexOf(userRole) < roles.indexOf(allowedRole)) {
      return false
    }
    return true
  }
}
