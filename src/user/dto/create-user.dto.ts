import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsString
} from 'class-validator'
import { Prisma } from '@prisma/client'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto
  implements Prisma.UserUncheckedCreateInput
{
  @IsEmail({ message: 'You should provide a valid email' })
  @IsNotEmpty({ message: 'You should provide an email' })
  @ApiProperty()
  email!: string

  @MinLength(8)
  @MaxLength(16)
  @IsNotEmpty({ message: 'You should provide a password' })
  @ApiProperty()
  password!: string

  @IsString()
  @IsNotEmpty({ message: 'You should provide a first name' })
  @ApiProperty()
  firstName!: string

  @IsString()
  @IsNotEmpty({ message: 'You should provide a last name' })
  @ApiProperty()
  lastName!: string
}
