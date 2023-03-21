import {
  Controller,
  Post,
  Body,
  Req,
  Get,
  Param,
  Patch,
  Query,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseFilters,
  UseGuards
} from '@nestjs/common'
import { Store } from '../entities'
import { StoreService } from './store.service'
import { prismaFilters } from '../prisma/prisma-exception.filter'
import { CreateStoreDto, FindStoreDto, UpdateStoreDto } from './dto'
import { Role as AllowedRole } from '../auth/decorators/role.decorator'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard, RolesGuard } from '../auth/guard'
import { Prisma, Roles } from '@prisma/client'
import { ParseIntPipe } from '@nestjs/common/pipes'

@UseInterceptors(ClassSerializerInterceptor)
@UseFilters(...prismaFilters)
@ApiBearerAuth()
@ApiTags('store')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('store')
export class StoreController {
  constructor(private storeService: StoreService) {}

  @Get()
  async getStores(
    @Query('page', ParseIntPipe) page?: number,
    @Body() orders?: Prisma.StoreOrderByWithRelationInput
  ): Promise<Partial<Store>[]> {
    const stores = await this.storeService.getAll(page, orders)
    return stores
  }

  @Post('/find')
  async findStoreById(
    @Body() where: FindStoreDto,
    @Query('page', ParseIntPipe) page?: number
  ): Promise<Partial<Store>> {
    const stores = await this.storeService.findStoreByUnique(
      where,
      page
    )

    return stores
  }

  @Post('/create')
  @AllowedRole(Roles.STORE_MANAGER)
  async createStore(
    @Req() req: any,
    @Body() dto: CreateStoreDto
  ): Promise<Partial<Store>> {
    const stores = await this.storeService.createStore(
      dto,
      req.user.userId
    )

    return stores
  }

  @Patch('/update')
  @AllowedRole(Roles.STORE_MANAGER)
  async updateStore(
    @Body() dto: UpdateStoreDto
  ): Promise<Partial<Store>> {
    let stores = await this.storeService.updateStore(dto)

    return stores
  }

  @Delete('/delete/:store_id')
  @AllowedRole(Roles.STORE_MANAGER)
  async deleteStore(@Param('store_id') storeId: string) {
    const deletedStore = await this.storeService.deleteStore({
      id: storeId
    })

    return {
      message: 'The store has been deleted successfully!',
      deletedStore
    }
  }
}
