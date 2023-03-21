import { JwtPayload } from 'jsonwebtoken'

export type JWTPayload = JwtPayload & {
  email: string
  role: string
}
