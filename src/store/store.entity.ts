import { instanceToPlain, Exclude, Expose } from 'class-transformer'
import { User, Product } from '../entities'
import { ApiProperty } from '@nestjs/swagger'

/**
 * Created to serialize Store entity from Prisma
 *
 * @class Store
 */
export class Store {
  @ApiProperty()
  id!: string

  @ApiProperty()
  name!: string

  @Exclude()
  userId!: string // ORM attr

  @Exclude()
  createdAt!: Date

  @Exclude()
  updatedAt!: Date

  @ApiProperty()
  @Expose({ toPlainOnly: true })
  products?: Partial<Product>[]

  @ApiProperty()
  @Expose({ toPlainOnly: true })
  user?: Partial<User>

  constructor(partial: Partial<Store>) {
    let plainPartial = instanceToPlain(partial)

    if (partial.user) {
      plainPartial.user = new User(partial.user)
    }

    if (partial.products && partial.products.length) {
      plainPartial.products = partial.products.map(
        (product) => new Product(product)
      )
    }

    Object.keys(plainPartial).forEach(
      (key) =>
        plainPartial[key] === undefined && delete plainPartial[key]
    )

    Object.assign(this, plainPartial)
  }
}
