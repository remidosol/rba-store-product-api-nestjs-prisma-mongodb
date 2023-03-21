import {
  createUserStub,
  paginationStub,
  findUserDtoStub,
  updateUserDtoStub,
  getAllUsersStub,
  updatedUserStub,
  deletedUserStub
} from '../test/stubs'

export const UserService = jest.fn().mockReturnValue({
  getAll: jest.fn().mockResolvedValue(getAllUsersStub()),
  getUserByUniqueForLogin: jest
    .fn()
    .mockResolvedValue(getAllUsersStub()[0]),
  getUserByUnique: jest.fn().mockResolvedValue(getAllUsersStub()[0]),
  createUser: jest.fn().mockResolvedValue(createUserStub()),
  updateUser: jest.fn().mockResolvedValue(updatedUserStub()),
  deleteUser: jest.fn().mockResolvedValue(deletedUserStub())
})
