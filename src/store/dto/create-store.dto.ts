import { IsString, IsNotEmpty } from 'class-validator'
import { Prisma } from '@prisma/client'
import { ApiProperty } from '@nestjs/swagger'

export class CreateStoreDto
  implements Partial<Prisma.StoreUncheckedCreateInput>
{
  @IsString({ message: 'You should provide a string name' })
  @IsNotEmpty({ message: 'You should provide a name' })
  @ApiProperty()
  name!: string
}
