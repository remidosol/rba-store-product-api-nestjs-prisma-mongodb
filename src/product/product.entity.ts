import { instanceToPlain, Exclude, Expose } from 'class-transformer'
import { Store } from '../entities'
import { ApiProperty } from '@nestjs/swagger'

/**
 * Created to serialize Product entity from Prisma
 *
 * @class Product
 */
export class Product {
  @ApiProperty()
  id!: string

  @ApiProperty()
  name!: string

  @ApiProperty()
  price!: number

  @ApiProperty()
  imageUrl?: string | null

  @Exclude()
  storeId!: string // ORM attr

  @Exclude()
  createdAt!: Date

  @Exclude()
  updatedAt!: Date

  @ApiProperty()
  @Expose({ toPlainOnly: true })
  store?: Partial<Store>

  constructor(partial: Partial<Product>) {
    let plainPartial = instanceToPlain(partial)

    Object.keys(plainPartial).forEach(
      (key) =>
        plainPartial[key] === undefined && delete plainPartial[key]
    )

    Object.assign(this, plainPartial)
  }
}
