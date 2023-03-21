import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength
} from 'class-validator'

export class LoginDto {
  @IsEmail({ message: 'You should provide a valid email' })
  @IsNotEmpty({ message: 'You should provide an email' })
  email!: string

  @MinLength(8)
  @MaxLength(16)
  @IsNotEmpty({ message: 'You should provide a password' })
  password!: string
}
