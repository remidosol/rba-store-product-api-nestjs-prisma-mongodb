import { IsNotEmpty, IsString } from 'class-validator'

export class HashDto {
  @IsNotEmpty()
  @IsString()
  plain!: string
}
