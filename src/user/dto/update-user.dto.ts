import { IsString, ValidateIf, IsNotEmpty } from 'class-validator'
import { Prisma } from '@prisma/client'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateUserDto implements Prisma.UserUpdateInput {
  @IsString()
  @IsNotEmpty({ message: 'You should provide a userId' })
  @ApiProperty()
  userId!: string

  @ValidateIf((dto: UpdateUserDto) => dto.firstName !== undefined)
  @IsString()
  @ApiProperty()
  firstName?: string

  @ValidateIf((dto: UpdateUserDto) => dto.lastName !== undefined)
  @IsString()
  @ApiProperty()
  lastName?: string
}
