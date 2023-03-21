import {
  IsEmail,
  ValidateIf,
  IsNotEmpty,
  IsString
} from 'class-validator'
import { Prisma } from '@prisma/client'
import { ApiProperty } from '@nestjs/swagger'

export class FindUserDto implements Prisma.UserWhereUniqueInput {
  @ValidateIf((dto: FindUserDto) => dto.id !== undefined)
  @IsString()
  @IsNotEmpty({
    message: 'You should provide an email or id for getting User'
  })
  @ApiProperty()
  id?: string

  @ValidateIf((dto: FindUserDto) => dto.email !== undefined)
  @IsEmail({ message: 'You should provide a valid email!' })
  @IsNotEmpty({
    message: 'You should provide an email or id for getting User'
  })
  @ApiProperty()
  email?: string
}
