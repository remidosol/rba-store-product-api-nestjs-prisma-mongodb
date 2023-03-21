import {
  Injectable,
  BadRequestException,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Store } from '../entities'
import { CreateStoreDto, FindStoreDto, UpdateStoreDto } from './dto'
import { Prisma } from '@prisma/client'

@Injectable()
export class StoreService {
  constructor(private prismaService: PrismaService) {}

  /**
   * Fetch stores
   *
   * @returns a list of stores
   */
  async getAll(
    page: number | undefined = 0,
    order: Prisma.StoreOrderByWithRelationInput = {
      createdAt: 'desc'
    }
  ): Promise<Store[]> {
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

    const stores = await this.prismaService.store.findMany(params)

    if (stores.length) {
      return stores.map((store) => new Store(store))
    } else {
      throw new HttpException('There are no other stores.', 404)
    }
  }

  /**
   * Find store by unique field
   *
   * @param where Object that contains one of or both of unique fields
   * @returns a Store or null
   */
  async findStoreByUnique(
    where: FindStoreDto,
    page: number = 0
  ): Promise<Store> {
    if (page && page >= 1) {
      page -= 1
    }

    if (Object.keys(where).length > 1) {
      throw new BadRequestException(
        'You should specify just one query factor!'
      )
    }

    const store = await this.prismaService.store.findUniqueOrThrow({
      where,
      include: {
        products: {
          skip: page * 15,
          take: 15
        },
        user: true
      }
    })

    return new Store(store)
  }

  /**
   * Creates a store
   *
   * @param roleName name of store
   * @returns created store
   */
  async createStore(
    data: CreateStoreDto,
    userId: string
  ): Promise<Store> {
    const createdStore = await this.prismaService.store.create({
      data: {
        name: data.name,
        userId
      }
    })

    return new Store(createdStore)
  }

  /**
   * Updates a store
   *
   * @param params contains new store name and store id that will be updated
   * @returns updated store
   */
  async updateStore(dto: UpdateStoreDto): Promise<Store> {
    const updatedStore = await this.prismaService.store.update({
      where: { id: dto.storeId },
      data: {
        name: dto.name
      }
    })

    return new Store(updatedStore)
  }

  /**
   * Deletes a store
   *
   * @param where Object that contains one unique field
   * @returns deleted store
   */
  async deleteStore(where: FindStoreDto): Promise<Partial<Store>> {
    const deletedStore = await this.prismaService.store.delete({
      where
    })

    return new Store(deletedStore)
  }
}
