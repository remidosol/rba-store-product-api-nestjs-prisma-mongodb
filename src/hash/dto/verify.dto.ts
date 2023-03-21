import { IsNotEmpty, IsString } from 'class-validator'

export class VerifyDto {
  @IsNotEmpty()
  @IsString()
  plain!: string

  @IsNotEmpty()
  @IsString()
  hash!: string
}
