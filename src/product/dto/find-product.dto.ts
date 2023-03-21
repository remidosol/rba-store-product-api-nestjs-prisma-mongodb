import {
  IsString,
  IsNotEmpty,
  IsNumber,
  ValidateIf
} from 'class-validator'
import { Prisma } from '@prisma/client'
import { ApiProperty } from '@nestjs/swagger'

export class FindProductDto
  implements Prisma.ProductWhereUniqueInput
{
  @IsString({ message: 'You should provide a string id' })
  @IsNotEmpty({ message: 'You should provide a product id' })
  @ApiProperty()
  id?: string
}
