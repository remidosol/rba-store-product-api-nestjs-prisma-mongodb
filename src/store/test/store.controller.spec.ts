import { Test, TestingModule } from '@nestjs/testing'
import { Store } from '../store.entity'
import { StoreController } from '../store.controller'
import { StoreService } from '../store.service'
import {
  paginationStub,
  getAllStoresStub,
  createStoreStub,
  updateStoreDtoStub,
  updatedStoreStub,
  deletedStoreStub
} from './stubs'

jest.mock('../store.service.ts')

describe('StoreController', () => {
  let storeController: StoreController
  let storeService: StoreService

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [StoreController],
      providers: [StoreService]
    }).compile()

    storeController = moduleRef.get<StoreController>(StoreController)
    storeService = moduleRef.get<StoreService>(StoreService)
    jest.clearAllMocks()
  })

  describe('getStores', () => {
    describe('when getStores is called', () => {
      let stores: Partial<Store>[]

      beforeEach(async () => {
        stores = await storeController.getStores(
          paginationStub().page,
          paginationStub().order
        )
      })

      test('then it should call storeService', () => {
        expect(storeService.getAll).toBeCalledWith(
          paginationStub().page,
          paginationStub().order
        )
      })

      test('then it should return stores', () => {
        expect(stores).toEqual(getAllStoresStub())
      })
    })
  })

  describe('getStore', () => {
    describe('when getStore is called', () => {
      let store: Partial<Store>

      beforeEach(async () => {
        store = await storeController.findStoreById(
          {
            id: getAllStoresStub()[0].id!
          },
          paginationStub().page
        )
      })

      test('then it should call storeService', () => {
        expect(storeService.findStoreByUnique).toBeCalledWith(
          {
            id: getAllStoresStub()[0].id!
          },
          paginationStub().page
        )
      })

      test('then it should return store', () => {
        expect(store).toEqual(getAllStoresStub()[0])
      })
    })
  })

  describe('createStore', () => {
    describe('when createStore is called', () => {
      let createdStore: Partial<Store>

      beforeEach(async () => {
        createdStore = await storeController.createStore(
          {
            user: {
              userId: createStoreStub().userId
            }
          },
          createStoreStub()
        )
      })

      test('then it should call storeService', () => {
        expect(storeService.createStore).toBeCalledWith(
          createStoreStub(),
          createStoreStub().userId
        )
      })

      test('then it should return created store', () => {
        expect(createdStore).toEqual(createStoreStub())
      })
    })
  })

  describe('updateStore', () => {
    describe('when updateStore is called', () => {
      let updatedStore: Partial<Store>

      beforeEach(async () => {
        updatedStore = await storeController.updateStore({
          storeId: updateStoreDtoStub().storeId,
          name: updateStoreDtoStub().name
        })
      })

      test('then it should call storeService', () => {
        expect(storeService.updateStore).toBeCalledWith({
          storeId: updateStoreDtoStub().storeId,
          name: updateStoreDtoStub().name
        })
      })

      test('then it should return updated store', () => {
        expect(updatedStore).toEqual(updatedStoreStub())
      })
    })
  })

  describe('deleteStore', () => {
    describe('when deleteStore is called', () => {
      let deletedStore: {
        message: string
        deletedStore: Partial<Store>
      }

      beforeEach(async () => {
        deletedStore = await storeController.deleteStore(
          deletedStoreStub().id!
        )
      })

      test('then it should call storeService', () => {
        expect(storeService.deleteStore).toBeCalledWith({
          id: deletedStoreStub().id!
        })
      })

      test('then it should return deletion message', () => {
        expect(deletedStore.deletedStore).toEqual(deletedStoreStub())
      })
    })
  })
})
