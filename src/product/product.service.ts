import {
  Injectable,
  BadRequestException,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Product } from '../entities'
import {
  CreateProductDto,
  FindProductDto,
  UpdateProductDto
} from './dto'
import { Prisma } from '@prisma/client'

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}

  /**
   * Fetch products
   *
   * @returns a list of products
   */
  async getAll(
    page: number | undefined = 0,
    order: Prisma.StoreOrderByWithRelationInput = {
      createdAt: 'desc'
    }
  ): Promise<Product[]> {
    if (page && page >= 1) {
      page -= 1
    }

    if (Object.keys(order).length > 1) {
      throw new HttpException(
        'You should specify one order factor!',
        HttpStatus.BAD_REQUEST
      )
    }

    const params: {
      skip?: number
      take?: number
      orderBy?: Prisma.StoreOrderByWithRelationInput
    } = {
      skip: page * 10,
      take: 10,
      orderBy: order
    }

    const products = await this.prismaService.product.findMany(params)

    return products.map((product) => new Product(product))
  }

  /**
   * Find product by unique field
   *
   * @param where Object that contains one of or both of unique fields
   * @returns a Product or null
   */
  async findProductByUnique(where: FindProductDto): Promise<Product> {
    if (Object.keys(where).length > 1) {
      throw new BadRequestException(
        'You should specify just one query factor!'
      )
    }

    const product =
      await this.prismaService.product.findUniqueOrThrow({
        where
      })

    return new Product(product)
  }

  /**
   * Creates a product
   *
   * @param data CreateProductDto
   * @returns created product
   */
  async createProduct(dto: CreateProductDto): Promise<Product> {
    const createdProduct = await this.prismaService.product.create({
      data: {
        ...dto
      }
    })

    return new Product(createdProduct)
  }

  /**
   * Updates a product
   *
   * @param params contains new product name and product id that will be updated
   * @returns updated product
   */
  async updateProduct(dto: UpdateProductDto): Promise<Product> {
    const updatedProduct = await this.prismaService.product.update({
      where: { id: dto.productId },
      data: {
        name: dto.name,
        price: dto.price,
        imageUrl: dto.imageUrl,
        storeId: dto.storeId
      }
    })

    return new Product(updatedProduct)
  }

  /**
   * Deletes a product
   *
   * @param where Object that contains one unique field
   * @returns deleted product
   */
  async deleteProduct(where: FindProductDto): Promise<Product> {
    const deletedProduct = await this.prismaService.product.delete({
      where
    })

    return new Product(deletedProduct)
  }
}
