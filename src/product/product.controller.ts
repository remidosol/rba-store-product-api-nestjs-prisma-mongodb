import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseFilters,
  UseGuards,
  Patch
} from '@nestjs/common'
import { Product } from '../entities'
import { ProductService } from './product.service'
import { prismaFilters } from '../prisma/prisma-exception.filter'
import { JwtAuthGuard, RolesGuard } from '../auth/guard'
import {
  CreateProductDto,
  FindProductDto,
  UpdateProductDto
} from './dto'
import { Role as AllowedRole } from '../auth/decorators/role.decorator'
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger'
import { Prisma, Roles } from '@prisma/client'
import { ParseIntPipe } from '@nestjs/common/pipes'

@UseInterceptors(ClassSerializerInterceptor)
@UseFilters(...prismaFilters)
@ApiBearerAuth()
@ApiTags('product')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  @ApiBody({
    required: false,
    schema: {
      example: {
        createdAt: 'desc'
      }
    }
  })
  async getProducts(
    @Query('page', ParseIntPipe) page?: number,
    @Body() orders?: Prisma.StoreOrderByWithRelationInput
  ): Promise<Product[]> {
    const products = await this.productService.getAll(page, orders)
    return products
  }

  @Post('/find')
  async findProductById(
    @Body() where: FindProductDto
  ): Promise<Product> {
    const products = await this.productService.findProductByUnique(
      where
    )

    return products
  }

  @Post('/create')
  @AllowedRole(Roles.STORE_MANAGER)
  async createProduct(
    @Body() dto: CreateProductDto
  ): Promise<Product> {
    const products = await this.productService.createProduct(dto)

    return products
  }

  @Patch('/update')
  @AllowedRole(Roles.STORE_MANAGER)
  async updateProduct(
    @Body() dto: UpdateProductDto
  ): Promise<Product> {
    let products = await this.productService.updateProduct(dto)

    return products
  }

  @Delete('/delete/:product_id')
  @AllowedRole(Roles.STORE_MANAGER)
  async deleteProduct(@Param('product_id') productId: string) {
    const deletedProduct = await this.productService.deleteProduct({
      id: productId
    })

    return {
      message: 'The product has been deleted successfully!',
      deletedProduct
    }
  }
}
