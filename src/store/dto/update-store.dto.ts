import { IsString, IsNotEmpty } from 'class-validator'
import { Prisma } from '@prisma/client'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateStoreDto implements Prisma.StoreUpdateInput {
  @IsString()
  @IsNotEmpty({ message: 'You should provide a storeId' })
  @ApiProperty()
  storeId!: string

  @IsString({ message: 'You should provide a string name' })
  @IsNotEmpty({ message: 'You should provide a name' })
  @ApiProperty()
  name!: string
}
