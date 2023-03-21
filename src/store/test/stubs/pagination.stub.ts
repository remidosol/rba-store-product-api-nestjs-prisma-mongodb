import { Prisma } from '@prisma/client'

export const paginationStub = (): {
  page?: number
  order?: Prisma.StoreOrderByWithRelationInput
} => {
  return {
    page: 0,
    order: { createdAt: 'desc' }
  }
}
