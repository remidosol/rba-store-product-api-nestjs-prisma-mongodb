import {
  createStoreStub,
  getAllStoresStub,
  updatedStoreStub,
  deletedStoreStub
} from '../test/stubs'

export const StoreService = jest.fn().mockReturnValue({
  getAll: jest.fn().mockResolvedValue(getAllStoresStub()),
  findStoreByUnique: jest
    .fn()
    .mockResolvedValue(getAllStoresStub()[0]),
  createStore: jest.fn().mockResolvedValue(createStoreStub()),
  updateStore: jest.fn().mockResolvedValue(updatedStoreStub()),
  deleteStore: jest.fn().mockResolvedValue(deletedStoreStub())
})
