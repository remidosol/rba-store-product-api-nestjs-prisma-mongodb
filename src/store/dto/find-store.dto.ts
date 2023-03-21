import {
  IsString,
  IsNotEmpty,
  IsNumber,
  ValidateIf
} from 'class-validator'
import { Prisma } from '@prisma/client'
import { ApiProperty } from '@nestjs/swagger'

export class FindStoreDto implements Prisma.StoreWhereUniqueInput {
  @IsString({ message: 'You should provide a string id' })
  @IsNotEmpty({ message: 'You should provide a store id' })
  @ApiProperty()
  id?: string
}
