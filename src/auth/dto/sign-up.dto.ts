import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsString
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class SignUpDto {
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
  @IsNotEmpty({ message: 'You should provide an first name' })
  @ApiProperty()
  firstName!: string

  @IsString()
  @IsNotEmpty({ message: 'You should provide an last name' })
  @ApiProperty()
  lastName!: string
}
