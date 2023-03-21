import {
  IsString,
  IsNotEmpty,
  IsNumber,
  ValidateIf
} from 'class-validator'
import { Prisma } from '@prisma/client'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateProductDto
  implements Prisma.ProductUncheckedUpdateInput
{
  @IsString({ message: 'You should provide a string storeId' })
  @IsNotEmpty({ message: 'You should provide a productId' })
  @ApiProperty()
  productId!: string

  @ValidateIf((dto: UpdateProductDto) => dto.storeId !== undefined)
  @IsString({ message: 'You should provide a string storeId' })
  @ApiProperty()
  storeId?: string

  @ValidateIf((dto: UpdateProductDto) => dto.name !== undefined)
  @IsString({ message: 'You should provide a string name' })
  @ApiProperty()
  name?: string

  @ValidateIf((dto: UpdateProductDto) => dto.price !== undefined)
  @IsNumber()
  @ApiProperty()
  price?: number

  @ValidateIf((dto: UpdateProductDto) => dto.imageUrl !== undefined)
  @IsString()
  @ApiProperty()
  imageUrl?: string
}
