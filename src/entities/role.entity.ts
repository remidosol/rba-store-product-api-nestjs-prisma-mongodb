import { instanceToPlain, Exclude, Expose } from 'class-transformer'
import { User } from '../entities'

/**
 * Created to serialize Role entity from Prisma
 *
 * @class Role
 */
export class Role {
  id!: string

  @Exclude()
  userId!: string

  name!: string

  @Exclude()
  createdAt!: Date

  @Exclude()
  updatedAt!: Date

  @Exclude()
  User?: User

  @Expose({ toPlainOnly: true })
  user?: User

  constructor(partial: Partial<Role>) {
    let plainPartial = instanceToPlain(partial)

    Object.keys(plainPartial).forEach(
      (key) =>
        plainPartial[key] === undefined && delete plainPartial[key]
    )

    Object.assign(this, plainPartial)
  }
}

/**
 * Created to serialize UserRole entity from Prisma
 *
 * @class UserRole
 */
export class UserRole {
  userId!: number

  roleId!: number

  @Exclude()
  createdAt!: Date

  @Exclude()
  updatedAt!: Date

  @Exclude()
  Role?: Role

  @Exclude()
  User?: User

  @Expose({ toPlainOnly: true })
  role?: Role

  @Expose({ toPlainOnly: true })
  user?: User

  constructor(partial: Partial<UserRole>) {
    let plainPartial = instanceToPlain(partial)

    if (partial.Role) {
      plainPartial.role = new Role(partial.Role)
    }

    if (partial.User) {
      plainPartial.user = new User(partial.User)
    }

    Object.keys(plainPartial).forEach(
      (key) =>
        plainPartial[key] === undefined && delete plainPartial[key]
    )

    Object.assign(this, plainPartial)
  }
}
