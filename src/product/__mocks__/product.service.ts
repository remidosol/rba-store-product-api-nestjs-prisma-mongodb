import {
  createProductStub,
  getAllProductsStub,
  updatedProductStub,
  deletedProductStub
} from '../test/stubs'

export const ProductService = jest.fn().mockReturnValue({
  getAll: jest.fn().mockResolvedValue(getAllProductsStub()),
  findProductByUnique: jest
    .fn()
    .mockResolvedValue(getAllProductsStub()[0]),
  createProduct: jest.fn().mockResolvedValue(createProductStub()),
  updateProduct: jest.fn().mockResolvedValue(updatedProductStub()),
  deleteProduct: jest.fn().mockResolvedValue(deletedProductStub())
})
