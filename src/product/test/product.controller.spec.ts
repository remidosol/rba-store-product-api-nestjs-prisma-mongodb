import { Test, TestingModule } from '@nestjs/testing'
import { Product } from '../product.entity'
import { ProductController } from '../product.controller'
import { ProductService } from '../product.service'
import {
  paginationStub,
  getAllProductsStub,
  createProductStub,
  updateProductDtoStub,
  updatedProductStub,
  deletedProductStub
} from './stubs'

jest.mock('../product.service.ts')

describe('ProductController', () => {
  let productController: ProductController
  let productService: ProductService

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService]
    }).compile()

    productController =
      moduleRef.get<ProductController>(ProductController)
    productService = moduleRef.get<ProductService>(ProductService)
    jest.clearAllMocks()
  })

  describe('getProducts', () => {
    describe('when getProducts is called', () => {
      let products: Partial<Product>[]

      beforeEach(async () => {
        products = await productController.getProducts(
          paginationStub().page,
          paginationStub().order
        )
      })

      test('then it should call productService', () => {
        expect(productService.getAll).toBeCalledWith(
          paginationStub().page,
          paginationStub().order
        )
      })

      test('then it should return products', () => {
        expect(products).toEqual(getAllProductsStub())
      })
    })
  })

  describe('getProduct', () => {
    describe('when getProduct is called', () => {
      let product: Partial<Product>

      beforeEach(async () => {
        product = await productController.findProductById({
          id: getAllProductsStub()[0].id!
        })
      })

      test('then it should call productService', () => {
        expect(productService.findProductByUnique).toBeCalledWith({
          id: getAllProductsStub()[0].id!
        })
      })

      test('then it should return product', () => {
        expect(product).toEqual(getAllProductsStub()[0])
      })
    })
  })

  describe('createProduct', () => {
    describe('when createProduct is called', () => {
      let createdProduct: Partial<Product>

      beforeEach(async () => {
        createdProduct = await productController.createProduct(
          createProductStub()
        )
      })

      test('then it should call productService', () => {
        expect(productService.createProduct).toBeCalledWith(
          createProductStub()
        )
      })

      test('then it should return created product', () => {
        expect(createdProduct).toEqual(createProductStub())
      })
    })
  })

  describe('updateProduct', () => {
    describe('when updateProduct is called', () => {
      let updatedProduct: Partial<Product>

      beforeEach(async () => {
        updatedProduct = await productController.updateProduct({
          productId: updateProductDtoStub().productId,
          name: updateProductDtoStub().name
        })
      })

      test('then it should call productService', () => {
        expect(productService.updateProduct).toBeCalledWith({
          productId: updateProductDtoStub().productId,
          name: updateProductDtoStub().name
        })
      })

      test('then it should return updated product', () => {
        expect(updatedProduct).toEqual(updatedProductStub())
      })
    })
  })

  describe('deleteProduct', () => {
    describe('when deleteProduct is called', () => {
      let deletedProduct: {
        message: string
        deletedProduct: Partial<Product>
      }

      beforeEach(async () => {
        deletedProduct = await productController.deleteProduct(
          deletedProductStub().id!
        )
      })

      test('then it should call productService', () => {
        expect(productService.deleteProduct).toBeCalledWith({
          id: deletedProductStub().id!
        })
      })

      test('then it should return deletion message', () => {
        expect(deletedProduct.deletedProduct).toEqual(
          deletedProductStub()
        )
      })
    })
  })
})
