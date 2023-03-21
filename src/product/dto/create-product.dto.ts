import { IsString, IsNotEmpty, IsNumber } from 'class-validator'
import { Prisma } from '@prisma/client'
import { ApiProperty } from '@nestjs/swagger'

export class CreateProductDto
  implements Prisma.ProductUncheckedCreateInput
{
  @IsString({ message: 'You should provide a string name' })
  @IsNotEmpty({ message: 'You should provide a name' })
  @ApiProperty()
  storeId!: string

  @IsString({ message: 'You should provide a string name' })
  @IsNotEmpty({ message: 'You should provide a name' })
  @ApiProperty()
  name!: string

  @IsNumber()
  @IsNotEmpty({ message: 'You should provide a price' })
  @ApiProperty()
  price!: number

  @IsString()
  @ApiProperty()
  imageUrl?: string
}
