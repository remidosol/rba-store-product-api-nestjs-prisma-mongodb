import { Prisma } from '@prisma/client'

export const paginationStub = (): {
  page?: number
  order?: Prisma.ProductOrderByWithRelationInput
} => {
  return {
    page: 0,
    order: { createdAt: 'desc' }
  }
}
