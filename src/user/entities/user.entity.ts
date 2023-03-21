import { Exclude, Expose, instanceToPlain } from 'class-transformer'
import { Prisma } from '@prisma/client'
import { Role } from '../../entities'
import { ApiProperty } from '@nestjs/swagger'

/**
 * Created to serialize User entity from Prisma
 *
 * @class User
 */
export class User {
  @ApiProperty()
  id!: string

  @ApiProperty()
  email!: string

  @Exclude()
  password?: string | null

  @ApiProperty()
  @Expose({ toPlainOnly: true })
  token?: string

  @ApiProperty()
  firstName!: string

  @ApiProperty()
  lastName!: string

  @Exclude()
  createdAt!: Date

  @Exclude()
  updatedAt!: Date

  //! RELATIONSHIPS
  @Exclude()
  _count?: Partial<Prisma.UserCountOutputType>

  @Exclude()
  UserRole?: Partial<Role> | null

  //! SERIALIZING RELATIONS (EXPOSING)

  @ApiProperty()
  @Expose({ toPlainOnly: true })
  relationCounts?: Partial<Prisma.UserCountOutputType>

  @ApiProperty()
  @Expose({ toPlainOnly: true })
  role?: Partial<Role>

  constructor(partial: Partial<User>) {
    let plainPartial = instanceToPlain(partial)

    if (partial.UserRole) {
      plainPartial.role = new Role(partial.UserRole)
    }

    Object.keys(plainPartial).forEach(
      (key) =>
        plainPartial[key] === undefined && delete plainPartial[key]
    )

    Object.assign(this, plainPartial)
  }
}
